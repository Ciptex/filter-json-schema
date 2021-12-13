import { promises as fs } from 'fs';
import { JsonSchema, ParseOptions, File, Src, Properties, Definitions } from './types';

const loadJsonFile = async (file: File): Promise<any> => {
    const content = await fs.readFile(file, 'utf8')
    return JSON.parse(content);
}

const cloneMe = (obj: any, doc: JsonSchema) => {
    return Object.entries(obj)
        .filter(([k, v]: any) => {
            if (v != undefined && !v.readOnly && !v["$ref"]) {
                return true;
            }
            else {
                if (v["$ref"] && doc.definitions[v["$ref"].split("/")[1]] !== undefined && !doc.definitions[v["$ref"].split("/")[1]].readOnly) {
                    return true;
                }
                else {
                    return false;
                }
            }
        })
        .reduce((r: any, [k, v]: any) => {
            r[k] = (typeof v === 'object' && !Array.isArray(v) && v !== null) ? cloneMe(v, doc) : v
            return r
        }, {});
}

const prepare = async (doc: JsonSchema, src: Src): Promise<JsonSchema> => {
    const newDefinition: Definitions = cloneMe(doc.definitions, doc);
    const newProperties: any = {};

    for (const [key] of Object.entries(newDefinition)) {
        newProperties[key] = { "$ref": `#definitions/${key}` };
    }

    return {
        type: "object",
        definitions: newDefinition,
        properties: newProperties
    };
}

export async function parse(options: ParseOptions): Promise<JsonSchema> {
    const { input } = options

    const doc: JsonSchema = await loadJsonFile(input);

    return prepare(doc, input);
}
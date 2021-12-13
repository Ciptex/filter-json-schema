# filter-json-schema
> Filter a Json Schema Document to remove readOnly properties

## Install
```
# global
npm install -g filter-json-schema
# in project
npm install --save-dev filter-json-schema
```

## Usage
```
# global
filter-json-schema json-schema.json
# in project
npx filter-json-schema json-schema.json
```

## Usage from repository
```
git clone https://github.com/Ciptex/filter-json-schema.git
cd filter-json-schema
npm install
npm run build
# command examples
npx filter-json-schema json-schema.json > json-schema-write.json
```

## Useful tools
- [https://github.com/rhrn/yaml-to-json-schema] - OpenApi Yaml to Json Schema
- [https://quicktype.io/](https://quicktype.io/) - Convert JSON into gorgeous, typesafe code in any language
- [https://ajv.js.org/](https://ajv.js.org/) - JSON Schema Validator
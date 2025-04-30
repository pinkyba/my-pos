const fs = require("fs");
const { crc32 } = require("crc");
module.exports = {
  input: [
    "src/**/*.{js,jsx,vue}",
    // No need to scan documents!
    "!src/i18n/**",
    "!**/node_modules/**",
  ],
  output: "./", //Output directory
  options: {
    debug: true,
    func: false,
    trans: false,
    lngs: ["en-US",'original'],
    defaultLng: "original",
    resource: {
      loadPath: "./src/i18n/json/{{lng}}.json", //Enter the path (manually create a new directory)
      savePath: "./src/i18n/json/{{lng}}.json", //Output path (the output will be incremented according to the input path content and will not overwrite existing keys)
      jsonIndent: 2,
      lineEnding: "\n",
    },
    removeUnusedKeys: false,//Remove non-existent keys
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    }
  },
  
  // Here we need to convert English into crc format, use the crc format key as the index, and finally switch the language pack.
  transform: function customTransform(file, enc, done) {
    // Use this function to process key or value
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    parser.parseFuncFromString(
      content,
      { list: ["lang"] },
      (key, options) => {
        options.defaultValue = key;
        let hashKey = `K${crc32(key).toString(16)}`; // crc32 conversion format
        parser.set(hashKey, options);
      }
    );
    done();
  },
};
// Node Deps.
const fs = require('fs');

// Load External Environment Config
require('dotenv').config();

// Google Translate
const {Translate} = require('@google-cloud/translate').v2;

// Title Screen
console.log("Google Translate API Auto-Translator");
console.log("------------------------------------\n");

if (!fs.existsSync('./google.json')) {
    console.error("[!]  You must install your Google API key JSON file. \nYou can do so by creating the 'google.json' file in the root of this directory and adding your credentials.\n");
    return;
}

// Language Packs Codes
const lang = ['de', 'es', 'fr', 'ja', 'ko', 'ru'];

// Google Translate API
const translate = new Translate();

// Load English Translation File
const english = JSON.parse(fs.readFileSync('src/language/en.json'));

// If clean arg has been set, wipe away all files except english.
if (process.argv[2] && process.argv[2] === '--clean') {
    console.log("[?]    Clean Translate, Wiping Files...");
    for (const code of lang) {
        console.log(`[*]    Cleaning src/language/${code}.json`);
        fs.writeFileSync(`src/language/${code}.json`, "{}\n");
    }
}

// Do Translation
async function doTranslate() {

    // Loop Through Languages
    for (const code of lang) {
        const data = JSON.parse(fs.readFileSync(`src/language/${code}.json`));
        console.log(`[?]    Starting translation of src/language/${code}.json`);
        for (const key in english) {
            if (!data[key] || data[key] === '') {

                const options = {
                    to: code
                };

                let [translation] = await translate.translate(english[key], options);

                if (translation) {
                    data[key] = translation;
                    console.log(`[*]        => Translated [${key}]`);
                } else {
                    data[key] = '';
                    console.log(`[*]        => [${key}] Could Not Be Translated`);
                }

            }
        }
        fs.writeFileSync(`src/language/${code}.json`, JSON.stringify(data, null, 4)+"\n");
    }

    console.log(`[*]    Translations Complete`);
}
doTranslate();



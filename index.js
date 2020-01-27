'use strict';

const express = require('express');
const app = express();

app.use(express.json())
    .use(express.urlencoded({ extended: false }))
    .post('/analyze', (req, res) => {
        const text = req.body.text;
        if (typeof text == 'string') {
            // trim and split on one or more whitespace and take length
            const words = text.trim().split(/\s+/);
            const wordCount = words[0].length > 0 ? words.length : 0;
            // whole text length
            const textLengthWithSpace = text.length;
            // replace all whitespace and take length
            const textLengthWithoutSpace = text.replace(/\s+/g, '').length;

            /* replace all characters which are not A-Z or a-z with empty string and convert to array of english alphabet charcters,
            all characters are converted to lower case to avoid separate count of small and capital letters */
            const charCount = text.replace(/[^A-Za-z]/g, "").toLocaleLowerCase().split('').reduce((acc, char) => {
                // if character exits in accmulator take count of charater, if not take 0 and add 1
                acc[char] = (acc[char] || 0) + 1;
                return acc;
            }, {});
            // iterating over key value pair of charaterst to sort and covert them to array
            res.status(200).json({
                "textLength": { "withSpaces": textLengthWithSpace, "withoutSpaces": textLengthWithoutSpace },
                "wordCount": wordCount,
                "characterCount": Object.keys(charCount).sort().map(k => { return { [k]: charCount[k] }; })
            });
        } else {
            res.status(400).json({
                error: {
                    message: 'Invalid request. Please check you have valid request. Only (POST) json data of {"text":"your text"} is supported.'
                }
            })
        }
    })
    .use((_, res) => res.status(501).json({ error: { message: 'Please check you have the correct URL.' } }));


module.exports = app.listen(process.env.PORT || 3000, () => console.log('Server runnig on port ' + (process.env.PORT || 3000)));
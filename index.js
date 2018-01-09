const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

function getOutputFilePath(inputFilePath) {
    return path.join(path.dirname(inputFilePath), path.basename(inputFilePath, path.extname(inputFilePath)) + '.json')
}

((inputFile) => {
    inputPath = path.join(__dirname, inputFile)
    csv()
        .fromFile(inputPath)
        .on('end_parsed', (jsonArr) => {
            const json = JSON.stringify(jsonArr, null, '\t')
            const outputPath = getOutputFilePath(inputPath)
            fs.writeFile(outputPath, json, 'utf8', function(err) {
                if(err) return console.log(err)
                console.log("finished writing file")
            })
        })
        .on('error', (err) => {
            console.log(err);
        })
})(process.argv[2])

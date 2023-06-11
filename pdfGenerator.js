const pdf = require('html-pdf');
const fs = require('fs');
const { error } = require('console');
const { resolve } = require('path');

var readFile = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, htmlString) => {
            if (!error && htmlString) {
                resolve(htmlString);
            } else {
                reject(error)
            }
        });
    });
}

var createPDFFile = function (htmlString, fileName, callback) {
    var options = {
        format: "Letter",
        header: {
            "height": "15mm",
            "contents": "<span>Shubham Verma: idkblogs.com</span>"
        },
        "timeout": 600000,
        "footer": {
            "height": "15mm",
            "contents": {
                first: "<div><span>1</span></div>",
                default: "<div><span>idkblogs.com</span></div>",
                last: "<div>"
            }
        }
    }

    pdf.create(htmlString, options)
        .toFile('./' + fileName, function (err, data) {
            if (err)
                console.log(err)
            else
                console.log("PDF Generated .");
        });
}

exports.createPdf = function (path) {
    return new Promise((resolve, reject) => {
        readFile("example.html")
            .then((string) => {
                return string;
            })
            .then((string) => {
                createPDFFile(string, "mypdf.pdf")
                    .then((res) => {
                        resolve("DONE");
                    })
            })
            .catch((err) => {
                resolve(err)
            });
    });
}
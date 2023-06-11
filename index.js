const express = require('express')
const app = express();
const utils = require('./pdfGenerator')
const port = 3100;

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    utils.createPdf()
        .then((htmlString) => {
            res.redirect("http://localhost:3100/mypdf.pdf");
        });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
const fs = require('fs');
const path = require('path');
const XlsxTemplate = require('xlsx-template');

// Load an XLSX file into memory
fs.readFile(path.join(__dirname, 'test-xlsx-template.xlsx'), (err, data) => {
    const template = new XlsxTemplate(data);
    const sheetName = 'mine';
    const values = {
            extractDate: new Date(),
            dates: [ new Date("2013-06-01"), new Date("2013-06-02"), new Date("2013-06-03") ],
            people: [
                {name: "John Smith", age: 20},
                {name: "Bob Johnson", age: 22}
            ]
        };

    // Perform substitution
    template.substitute(sheetName, values);

    // Get binary data
    var data = template.generate({type: 'nodebuffer'});

    // ...
    fs.writeFileSync('test-xlsx-template-result.xlsx', data);
});
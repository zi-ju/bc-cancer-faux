"use strict";
/**
 *
 * @param inputs a two dimensional array of strings
 * @returns an html document with a table containing the input data
 */
Object.defineProperty(exports, "__esModule", { value: true });
function makeTable(inputs) {
    let html = `
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Table</title>
        <style>
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
        </style>
    </head>
    <body>
        <table>`;
    for (const row of inputs) {
        html += "<tr>";
        for (const cell of row) {
            html += `<td>${cell}</td>`;
        }
        html += "</tr>";
    }
    html += "</table></body></html>";
    return html;
}
const makeJSON = (inputs) => {
    // get the first row of the array
    const headers = inputs[0];
    // remove the first row from the array
    inputs.shift();
    // create the object to hold the data
    const result = { "headers": headers, "data": inputs };
    return result;
};
const formatAndSendResponse = (inputs, format, res) => {
    if (format === 'html') {
        const response = makeTable(inputs);
        res.send(response);
    }
    if (format === 'json') {
        const response = makeJSON(inputs);
        res.json(response);
    }
    if (format === 'csv') {
        res.setHeader('Content-Type', 'text/csv');
        const response = inputs.map(row => row.join(',')).join('\n');
        res.send(response);
    }
};
exports.default = formatAndSendResponse;

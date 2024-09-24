/**
 * 
 * @param inputs a two dimensional array of strings
 * @returns an html document with a table containing the input data
 */

function makeArray(inputs: string[][]): string {
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

export default makeArray;
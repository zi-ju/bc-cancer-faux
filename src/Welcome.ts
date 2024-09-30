export const welcomeHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to the BC-Cancer Faux Data site</title>
    </head>
    <body>
        <h1>Welcome to the  BC-Cancer Faux Data API v1.0</h1>
        <p>This API provides information about donors in the region.</p>
        <h2> All queries accept format and limit parameters</h2>
        <ul>
                <li>You can also specify a limit by adding a query parameter like <a href="/donors?limit=5">/donors?limit=5</a>.</li>
                <li>You can also specify a json format by adding a query parameter like <a href="/donors?format=json">/donors?format=json</a>.</li>
                <li>You can also specify a csv format by adding a query parameter like <a href="/donors?format=csv">/donors?format=csv</a>.</li>
                <li>By default, the format is html.</li>
                <li>By default, the limit is 10.</li>   
               
            </ul>
        <ul>
        <hr>

        <li>To get a list of donors, visit <a href="/donors">/donors</a>.</li>
            
        <li>To get a list of PMMs, visit <a href="/pmm">/pmm</a>.</li>
        <li>To get a list of SMMs, visit <a href="/smm">/smm</a>.</li>
        <li>To get a list of VMMs, visit <a href="/vmm">/vmm</a>.</li>
        <li>To get a list of cities, visit <a href="/cities">/cities</a>.</li>
        <li>To generate an event list, 
            <ul>
                <li>
                <strong> HTML </strong> <a href="/event?cities=Vancouver&cities=Victoria">/event?cities=Vancouver&cities=Victoria</a>.
                </li>
                <li>
                <strong> JSON </strong> <a href="/event?cities=Vancouver&cities=Victoria&format=json">/event?cities=Vancouver&cities=Victoria&format=json</a>.
                </li>
                <li>
                    <strong> CSV </strong> <a href="/event?cities=Vancouver&cities=Victoria&format=csv">/event?cities=Vancouver&cities=Victoria&format=csv</a>.<br>
                    NOTE: CSV format will return a downloadable file, from a browser it will just download the file.
                </li>
            </ul>
        </li>
        </ul>
        <h2> Disclaimer </h2>
        <p> All data in this API is randomly generated and does not represent real people or events. </p>
        <p> This API is for educational purposes only. </p>
        <p> 

        <p> For more information please contact Dr. Juancho Buchanan at <i>j dot buchanan at northeastern dot edu</i> </p>
        <p> &copy; 2024 Juancho Buchanan, All Rights reserved. </p>
    </body>
</html>

`;
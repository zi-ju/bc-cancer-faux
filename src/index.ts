import express from 'express';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import DataGenerator from './DataFactory';
import makeArray from './MakeArray';

const app = express();
const PORT = 3000;
DataGenerator.getInstance();
let db: Database;





// Initialize the database and generate data
const initializeDB = async () => {
    db = await open({
        filename: ':memory:',
        driver: sqlite3.Database
    });
};

const generateData = async () => {
    const dataGenerator = DataGenerator.getInstance();
    await dataGenerator.generateRandomData(db);
};


const startServer = async (port: number) => {
    await initializeDB();
    await generateData();

    const app = express();
    defineRoutes(app);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

const welcomeHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to the Blood Donation API</title>
    </head>
    <body>
        <h1>Welcome to the Blood Donation API</h1>
        <p>To get a list of donors, visit <a href="/donors">/donors</a>.</p>
        <p>To get a list of donors in a specific region, visit <a href="/region/:region">/region/:region</a>.</p>
        <p>To get a list of donors by PMM, visit <a href="/PMM/:name">/PMM/:name</a>.</p>
        <p>To get a list of donors by coordinator, visit <a href="/coordinator/:name">/coordinator/:name</a>.</p>
    </body>
</html>

`;

const defineRoutes = (app: express.Express) => {

    // Define your routes here
    app.get('/', (req, res) => {
        // return the user a welcome message and instructions on how to use the API
        res.send(welcomeHTML);
    });

    app.get('/donors', async (req, res) => {
        const limit = parseInt(req.query.limit as string || '10');
        try {
            const limit = parseInt(req.query.limit as string || '10');
            const rows = await db.all(`SELECT * FROM donors LIMIT ?`, [limit]);

            if (rows.length === 0) {
                return res.json([]);
            }

            // Extract column titles
            const columnTitles = Object.keys(rows[0]);

            // Transform rows into an array of arrays
            const data = rows.map(row => Object.values(row));

            // Insert the column titles as the first element of the array
            data.unshift(columnTitles);
            let htmlDocument = makeArray(data as string[][]);
            res.send(htmlDocument);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    app.get('/pmm', async (req, res) => {
        try {
            const rows = await db.all(`SELECT DISTINCT pmm FROM donors ORDER BY pmm`);
            const pmmList = rows.map(row => [row.pmm]);
            // now insert the column header into the first element of the array
            pmmList.unshift(['pmm']);
            let htmlDocument = makeArray(pmmList as string[][]);
            res.send(makeArray(pmmList));
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/smm', async (req, res) => {
        try {
            const rows = await db.all(`SELECT DISTINCT smm FROM donors ORDER BY smm`);
            const smmList = rows.map(row => [row.smm]);
            // now insert the column header into the first element of the array
            smmList.unshift(['smm']);
            res.json(smmList);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/vmm', async (req, res) => {
        try {
            const rows = await db.all(`SELECT DISTINCT vmm FROM donors ORDER BY vmm`);
            const vmmList = rows.map(row => [row.vmm]);
            // now insert the column header into the first element of the array
            vmmList.unshift(['vmm']);
            res.json(vmmList);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });



    app.get('/pmm/:name', async (req, res) => {
        const pmm = req.params.name;
        const rows = await db.all(`SELECT * FROM donors WHERE pmm = ?`, [pmm]);
        res.json(rows);
    });

    app.get('/coord/:name', async (req, res) => {
        const coordinator = req.params.name;
        const rows = await db.all(`SELECT * FROM donors WHERE coordinator = ?`, [coordinator]);
        res.json(rows);
    });
}



startServer(10000).catch(err => {
    console.error('Failed to start server:', err);
});
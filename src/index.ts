import express from 'express';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import DataGenerator from './DataFactory';

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
        const rows = await db.all(`SELECT * FROM donors LIMIT ?`, [limit]);
        res.json(rows);
    });

    app.get('/event/:region', async (req, res) => {
        const region = req.params.region as string;
        const limit = parseInt(req.query.limit as string || '10');
        const rows = await db.all(`SELECT * FROM donors WHERE region = ? LIMIT ?`, [region, limit]);
        res.json(rows);
    });

    app.get('/region/:region', async (req, res) => {
        const region = req.params.region as string; // Type assertion to tell TypeScript that region is a string
        const limit = parseInt(req.query.limit as string || '10');
        const rows = await db.all(`SELECT * FROM donors WHERE region = ? LIMIT ?`, [region, limit]);
        res.json(rows);
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



startServer(5555).catch(err => {
    console.error('Failed to start server:', err);
});
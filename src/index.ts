import express from 'express';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import DataGenerator from './DataFactory';
import formatAndSendResponse from './FormatResponse';
import { cities } from './Cities';
import { welcomeHTML } from './Welcome';
import cors from 'cors'; // Import the cors middleware

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



const processFormatRequest = (format: string, res: any): boolean => {
    if (format !== 'json' && format !== 'html' && format !== 'csv') {
        res.status(400).json({
            error: `Invalid format: ${format}`,
            allowedFormats: ['json', 'html', 'csv'],
            defaultFormat: 'html'
        });
        return true;
    }
    return false;
};

const defineRoutes = (app: express.Express) => {

    // Configure CORS options
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    // Use the cors middleware
    app.use(cors(corsOptions));

    // Define your routes here
    app.get('/', (req, res) => {
        // return the user a welcome message and instructions on how to use the API
        res.send(welcomeHTML);
    });

    app.get('/donors', async (req, res) => {
        const limit = parseInt(req.query.limit as string || '10');
        const format = req.query.format as string || 'html';

        if (processFormatRequest(format, res)) {
            return;
        }


        try {
            console.log(`requesting ${limit} donors in format ${format}`);
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

            formatAndSendResponse(data as string[][], format, res);

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    app.get('/pmm', async (req, res) => {
        const format = req.query.format as string || 'html';

        if (processFormatRequest(format, res)) {
            return;
        }


        try {
            const rows = await db.all(`SELECT DISTINCT pmm FROM donors ORDER BY pmm`);

            const pmmList = rows.map(row => [row.pmm]);
            // now insert the column header into the first element of the array
            pmmList.unshift(['pmm']);


            let response = formatAndSendResponse(pmmList as string[][], format, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/smm', async (req, res) => {
        const format = req.query.format as string || 'html';

        if (processFormatRequest(format, res)) {
            return;
        }

        try {
            const rows = await db.all(`SELECT DISTINCT smm FROM donors ORDER BY smm`);
            const smmList = rows.map(row => [row.smm]);
            // now insert the column header into the first element of the array
            smmList.unshift(['smm']);

            formatAndSendResponse(smmList as string[][], format, res);

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/vmm', async (req, res) => {
        const format = req.query.format as string || 'html';

        if (processFormatRequest(format, res)) {
            return;
        }
        try {
            const rows = await db.all(`SELECT DISTINCT vmm FROM donors ORDER BY vmm`);
            const vmmList = rows.map(row => [row.vmm]);
            // now insert the column header into the first element of the array
            vmmList.unshift(['vmm']);

            formatAndSendResponse(vmmList as string[][], format, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/cities', async (req, res) => {
        const format = req.query.format as string || 'html';

        if (processFormatRequest(format, res)) {
            return;
        }

        try {
            const citiesList = cities.map(city => [city]);
            // now insert the column header into the first element of the array
            citiesList.unshift(['city']);

            formatAndSendResponse(citiesList as string[][], format, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });



    app.get('/event/', async (req, res) => {
        const limit = parseInt(req.query.limit as string || '10');
        const format = req.query.format as string || 'html';
        let cities = req.query.cities as string[] || [];

        if (cities.length === 0) {
            return res.status(400).json({ error: 'No cities provided' });
        }

        // Normalize cities to always be an array
        if (typeof cities === 'string') {
            cities = [cities];
        }

        const placeholders = cities.map(() => '?').join(',');
        const query = `SELECT * FROM events WHERE city IN (${placeholders})`;



        if (processFormatRequest(format, res)) {
            return;
        }

        try {
            console.log(`requesting ${limit} donors in format ${format}`);
            const rows = await db.all(`SELECT * FROM donors where city in (${placeholders}) LIMIT ?`, [...cities, limit]);

            if (rows.length === 0) {
                return res.json([]);
            }

            // Extract column titles
            const columnTitles = Object.keys(rows[0]);

            // Transform rows into an array of arrays
            const data = rows.map(row => Object.values(row));

            // Insert the column titles as the first element of the array
            data.unshift(columnTitles);

            formatAndSendResponse(data as string[][], format, res);

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }



    });

}



startServer(10000).catch(err => {
    console.error('Failed to start server:', err);
});
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import FauxData from './FauxData';

class DataGenerator {
    private static instance: DataGenerator;

    private constructor() { }

    public static getInstance(): DataGenerator {
        if (!DataGenerator.instance) {
            DataGenerator.instance = new DataGenerator();
        }
        return DataGenerator.instance;
    }

    // headers for data in the project






    public async generateRandomData(db: Database) {

        const fauxData = FauxData.getInstance();


        const createTableRequest = fauxData.getTableGenerator();

        console.log(createTableRequest);
        // create the table
        await db.run(createTableRequest);



        // get a list of the tables in the database
        const tables = await db.all(`SELECT name FROM sqlite_master WHERE type='table'`);

        // if donors is there then log the headers
        if (tables.some((table) => table.name === 'donors')) {
            const headers = await db.all(`PRAGMA table_info(donors)`);
        }


        for (let i = 0; i < 10000; i++) {
            // get the random insert request
            const insertRequest = fauxData.getRandomInsert();
            // insert the data
            try {
                await db.run(insertRequest);
            } catch (e) {
                console.log(e);
            }

        }


    }
}

export default DataGenerator;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const DataFactory_1 = __importDefault(require("./DataFactory"));
const FormatResponse_1 = __importDefault(require("./FormatResponse"));
const Cities_1 = require("./Cities");
const Welcome_1 = require("./Welcome");
const cors_1 = __importDefault(require("cors")); // Import the cors middleware
const app = (0, express_1.default)();
const PORT = 3000;
DataFactory_1.default.getInstance();
let db;
// Initialize the database and generate data
const initializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    db = yield (0, sqlite_1.open)({
        filename: ':memory:',
        driver: sqlite3_1.default.Database
    });
});
const generateData = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataGenerator = DataFactory_1.default.getInstance();
    yield dataGenerator.generateRandomData(db);
});
const startServer = (port) => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeDB();
    yield generateData();
    const app = (0, express_1.default)();
    defineRoutes(app);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
const processFormatRequest = (format, res) => {
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
const defineRoutes = (app) => {
    // Configure CORS options
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    // Use the cors middleware
    app.use((0, cors_1.default)(corsOptions));
    // Define your routes here
    app.get('/', (req, res) => {
        // return the user a welcome message and instructions on how to use the API
        res.send(Welcome_1.welcomeHTML);
    });
    // log the request, including the method and the URL and the calling host
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url} from ${req.hostname}`);
        next();
    });
    app.get('/donors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = parseInt(req.query.limit || '10');
        const format = req.query.format || 'html';
        if (processFormatRequest(format, res)) {
            return;
        }
        try {
            console.log(`requesting ${limit} donors in format ${format}`);
            const rows = yield db.all(`SELECT * FROM donors LIMIT ?`, [limit]);
            if (rows.length === 0) {
                return res.json([]);
            }
            // Extract column titles
            const columnTitles = Object.keys(rows[0]);
            // Transform rows into an array of arrays
            const data = rows.map(row => Object.values(row));
            // Insert the column titles as the first element of the array
            data.unshift(columnTitles);
            (0, FormatResponse_1.default)(data, format, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    app.get('/pmm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = parseInt(req.query.limit || '10');
        const format = req.query.format || 'html';
        if (processFormatRequest(format, res)) {
            return;
        }
        try {
            const rows = yield db.all(`SELECT DISTINCT pmm FROM donors ORDER BY pmm`);
            let pmmList = rows.map(row => [row.pmm]);
            // return the number in the limit
            if (limit < pmmList.length)
                pmmList.length = limit;
            // now insert the column header into the first element of the array
            pmmList.unshift(['pmm']);
            let response = (0, FormatResponse_1.default)(pmmList, format, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    app.get('/smm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = parseInt(req.query.limit || '10');
        const format = req.query.format || 'html';
        if (processFormatRequest(format, res)) {
            return;
        }
        try {
            const rows = yield db.all(`SELECT DISTINCT smm FROM donors ORDER BY smm`);
            let smmList = rows.map(row => [row.smm]);
            // return the number in the limit
            if (limit < smmList.length)
                smmList.length = limit;
            // now insert the column header into the first element of the array
            smmList.unshift(['smm']);
            (0, FormatResponse_1.default)(smmList, format, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    app.get('/vmm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = parseInt(req.query.limit || '10');
        const format = req.query.format || 'html';
        if (processFormatRequest(format, res)) {
            return;
        }
        try {
            const rows = yield db.all(`SELECT DISTINCT vmm FROM donors ORDER BY vmm`);
            let vmmList = rows.map(row => [row.vmm]);
            // return the number in the limit
            if (limit < vmmList.length)
                vmmList.length = limit;
            // now insert the column header into the first element of the array
            vmmList.unshift(['vmm']);
            (0, FormatResponse_1.default)(vmmList, format, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    app.get('/cities', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = parseInt(req.query.limit || '10');
        const format = req.query.format || 'html';
        if (processFormatRequest(format, res)) {
            return;
        }
        try {
            const citiesList = Cities_1.cities.map(city => [city]);
            // return the number in the limit
            if (limit < citiesList.length)
                citiesList.length = limit;
            // now insert the column header into the first element of the array
            citiesList.unshift(['city']);
            (0, FormatResponse_1.default)(citiesList, format, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    app.get('/event/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = parseInt(req.query.limit || '10');
        const format = req.query.format || 'html';
        let cities = req.query.cities || [];
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
            const rows = yield db.all(`SELECT * FROM donors where city in (${placeholders}) LIMIT ?`, [...cities, limit]);
            if (rows.length === 0) {
                return res.json([]);
            }
            // Extract column titles
            const columnTitles = Object.keys(rows[0]);
            // Transform rows into an array of arrays
            const data = rows.map(row => Object.values(row));
            // Insert the column titles as the first element of the array
            data.unshift(columnTitles);
            (0, FormatResponse_1.default)(data, format, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
};
startServer(10000).catch(err => {
    console.error('Failed to start server:', err);
});

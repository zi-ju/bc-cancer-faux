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
const FauxData_1 = __importDefault(require("./FauxData"));
class DataGenerator {
    constructor() { }
    static getInstance() {
        if (!DataGenerator.instance) {
            DataGenerator.instance = new DataGenerator();
        }
        return DataGenerator.instance;
    }
    // headers for data in the project
    generateRandomData(db) {
        return __awaiter(this, void 0, void 0, function* () {
            const fauxData = FauxData_1.default.getInstance();
            const createTableRequest = fauxData.getTableGenerator();
            console.log(createTableRequest);
            // create the table
            yield db.run(createTableRequest);
            // get a list of the tables in the database
            const tables = yield db.all(`SELECT name FROM sqlite_master WHERE type='table'`);
            // if donors is there then log the headers
            if (tables.some((table) => table.name === 'donors')) {
                const headers = yield db.all(`PRAGMA table_info(donors)`);
            }
            for (let i = 0; i < 10000; i++) {
                // get the random insert request
                const insertRequest = fauxData.getRandomInsert();
                // insert the data
                try {
                    yield db.run(insertRequest);
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
}
exports.default = DataGenerator;

import seedrandom from 'seedrandom';
// define the structure in this file

interface DataStructure {
    [key: string]: [string, (string | number)[]];
}


class FauxData {

    data: DataStructure = {
        "pmm": ["TEXT", ["pmm1", "pmm2", "pmm3"]],
        "smm": ["TEXT", ["smm1", "smm2", "smm3"]],
        "vmm": ["TEXT", ["vmm1", "vmm2", "vmm3"]],
        "exclude": ["TEXT", ["yes", "no"]],
        "deceased": ["TEXT", ["yes", "no"]],
        "first_name": ["TEXT", [
            "John", "Jane", "Alice", "Bob", "Peter",
            "Amina", "Hiroshi", "Carlos", "Fatima", "Dimitri",
            "Mei", "Rajesh", "Ingrid", "Ahmed", "Yuki",
            "Maria", "Sergei", "Leila", "Juan", "Zainab",
            "Sven", "Chao", "Priya", "Olga", "Hassan"
        ]],
        "nick_name": ["TEXT", [
            "Buddy", "Champ", "Sweetie", "Honey", "Darling",
            "Love", "Babe", "Sunshine", "Angel", "Pumpkin",
            "Dear", "Cutie", "Snookums", "Sugar", "Peach",
            "Doll", "Buttercup", "Precious", "Sweetheart", "Beloved"
        ]],
        "last_name": ["TEXT", [
            "Иванов", // Ivanov in Cyrillic
            "王", // Wang in Chinese
            "김", // Kim in Korean
            "佐藤", // Sato in Japanese 
            "Smith", "Williams", "Jones", "Brown", "García",
            "Müller", "Smirnov", "Lee", "Kumar", "Nguyen",
            "Hernández", "López", "Nakamura", "Ivanov", "Kim",
            "Singh", "Chen", "Ahmed", "Öztürk", "González",
            "Silva", "Cohen", "Gupta"
        ]],
        "organization_name": ["TEXT", [
            "Acme Anvils Inc.", "Widgets R Us", "Gag Gifts Galore",
            "Whatchamacallit Corp.", "Frobozz Magic Co.", "Wacky Widgets",
            "Giggle Goods", "Nonsense Enterprises", "Silly Solutions",
            "Quirky Quacks", "Jokester Junction", "Laughing Labs",
            "Prankster Partners", "Whimsy Works", "Goofy Gadgets",
            "Hilarity Holdings", "Chuckles & Co.", "Snicker Supplies",
            "Jester Jamboree", "Mirthful Manufacturing"
        ]],
        "total_donations": ["INTEGER", [
            1234567, 2345678, 3456789, 4567890, 5678901, 6789012, 7890123, 8901234, 9012345, 123456,
            234567, 345678, 456789, 567890, 678901, 789012, 890123, 901234, 12345, 23456,
            34567, 45678, 56789, 67890, 78901, 89012, 90123, 1234, 2345, 3456,
            4567, 5678, 6789, 7890, 8901, 9012, 123, 234, 345
        ]],
        "total_pledge": ["INTEGER", [
            0, 2345678, 0, 4567890, 5678901, 0, 7890123, 8901234, 0, 123456,
            234567, 0, 456789, 567890, 0, 789012, 890123, 0, 12345, 23456,
            0, 45678, 56789, 0, 78901, 89012, 0, 1234, 2345, 0,
            4567, 5678, 0, 7890, 8901, 0, 123, 234, 0, 345
        ]],
        "largest_gift": ["INTEGER", [0]],
        "largest_gift_appeal": ["TEXT", ["Appeal1", "Appeal2", "Appeal3"]],
        "first_gift_date": ["INTEGER", [
            1625097600, 1619827200, 1614556800, 1609286400, 1604016000, 1598745600, 1593475200, 1588204800, 1582934400, 1577664000,
            1572393600, 1567123200, 1561852800, 1556582400, 1551312000, 1546041600, 1540771200, 1535500800, 1530230400, 1524960000,
            1519689600, 1514419200, 1509148800, 1503878400, 1498608000, 1493337600, 1488067200, 1482796800, 1477526400, 1472256000
        ]],
        "last_gift_date": ["INTEGER", [0]],
        "last_gift_amount": ["INTEGER", [0]],
        "last_gift_request": ["INTEGER", [0]],
        "last_gift_appeal": ["TEXT", ["Appeal1", "Appeal2", "Appeal3"]],
        "address_line1": ["TEXT", [
            "123 Maple Street", "456 Oak Avenue", "789 Pine Lane", "101 Birch Boulevard", "202 Cedar Court",
            "303 Elm Drive", "404 Spruce Road", "505 Willow Way", "606 Aspen Circle", "707 Redwood Terrace",
            "808 Cypress Place", "909 Fir Street", "111 Poplar Avenue", "222 Sycamore Lane", "333 Magnolia Boulevard",
            "444 Dogwood Court", "555 Hickory Drive", "666 Juniper Road", "777 Laurel Way", "888 Sequoia Circle",
            "999 Alder Terrace", "121 Maplewood Place", "232 Oakwood Street", "343 Pinewood Avenue", "454 Birchwood Lane",
            "565 Cedarwood Boulevard", "676 Elmwood Court", "787 Sprucewood Drive", "898 Willowwood Road", "909 Aspenwood Way",
            "1010 Redwoodwood Circle", "1111 Cypresswood Terrace", "1212 Firwood Place", "1313 Poplarwood Street",
            "1414 Sycamorewood Avenue", "1515 Magnoliawood Lane", "1616 Dogwoodwood Boulevard", "1717 Hickorywood Court",
            "1818 Juniperwood Drive", "1919 Laurelwood Road"
        ]],
        "address_line2": ["TEXT", [
            "Apt 101", "Unit 202", "Apt 303", "", "Unit 404", "Apt 505", "", "Unit 606", "Apt 707", "",
            "Unit 808", "Apt 909", "", "Unit 111", "Apt 222", "", "Unit 333", "Apt 444", "", "Unit 555",
            "Apt 666", "", "Unit 777", "Apt 888", "", "Unit 999", "Apt 121", "", "Unit 232", "Apt 343",
            "", "Unit 454", "Apt 565", "", "Unit 676", "Apt 787", "", "Unit 898", "Apt 909", ""
        ]],
        "city": ["TEXT", [
            "Vancouver", "Victoria", "Surrey", "Burnaby", "Richmond", "Kelowna", "Kamloops", "Nanaimo", "Prince George",
            "Abbotsford", "Coquitlam", "Langley", "Saanich", "Delta", "Maple Ridge", "New Westminster", "Port Coquitlam",
            "North Vancouver", "West Vancouver", "Chilliwack", "Vernon", "Courtenay", "Penticton", "Campbell River",
            "Fort St. John", "Cranbrook", "Terrace", "Dawson Creek", "Port Moody", "White Rock", "Quesnel", "Squamish",
            "Salmon Arm", "Parksville", "Powell River", "Williams Lake", "Trail", "Castlegar", "Kitimat", "Revelstoke"
        ]],
        "contact_phone_type": ["TEXT", ["Home", "Work", "Mobile"]],
        "phone_restrictions": ["TEXT", ["do not call", "no weekend", "no evening"]],
        "email_restrictions": ["TEXT", ["do not email", ""]],
        "communication_restrictions": ["TEXT", ["only email", "only phone", "only christmas card", ""]],
        "subscription_events_in_person": ["TEXT", ["all", "annual", "financial", "operations", "research"]],
        "subscription_events_magazine": ["TEXT", [
            "christmas gala", "summer picnic", "fall fundraiser", "spring fling", "winter wonderland"
        ]]
    }

    private constructor() {
        // reset the random number seed so that the data is the same each run
        seedrandom('seed', { global: true });
    }

    private static instance: FauxData;

    public static getInstance(): FauxData {
        if (!FauxData.instance) {
            FauxData.instance = new FauxData();
        }
        return FauxData.instance;
    }

    public getTableGenerator() {
        let tableRequest = "CREATE TABLE donors (";
        for (const key in this.data) {
            const values = this.data[key];
            tableRequest += `${key} ${values[0]},`;
        }
        tableRequest = tableRequest.slice(0, -1);
        tableRequest += ")";
        return tableRequest;
    }

    public getRandomInsert() {
        let insertRequest = "INSERT INTO donors (";
        let valuesRequest = "VALUES (";
        for (const key in this.data) {

            const values = this.data[key];
            const type = values[0];
            const options = values[1];

            if (options.length === 0) {
                continue;
            }
            insertRequest += `${key},`;
            const randomIndex = Math.floor(Math.random() * options.length);
            const randomValue = options[randomIndex];
            if (type === "TEXT") {
                valuesRequest += `'${randomValue}',`;
            } else {
                valuesRequest += `${randomValue},`;
            }
        }
        insertRequest = insertRequest.slice(0, -1);
        valuesRequest = valuesRequest.slice(0, -1);
        insertRequest += ") ";
        valuesRequest += ")";
        return insertRequest + valuesRequest;
    }

}

export default FauxData;
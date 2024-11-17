import seedrandom from 'seedrandom';
import { cities, getOrganizersAndCity } from './Cities';
// define the structure in this file

interface DataStructure {
    [key: string]: [string, (string | number)[]];
}

interface DonorData {
    [key: string]: string | number;
}



class FauxData {

    data: DataStructure = {
        "pmm": ["TEXT", ["Peter Smith", "Gurtrude Schmidt", "Parvati Patel", "Hiroshi Nakamura", "Maria González"]],
        "smm": ["TEXT", ["John Doe", "Jane Doe", "Alice Smith", "Bob Brown", "Carlos Hernández"]],
        "vmm": ["TEXT", ["Sven Müller", "Chao Nguyen", "Priya Gupta", "Olga Smirnov", "Hassan Ahmed"]],
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
            "Doll", "Buttercup", "Precious", "Sweetheart", "Beloved",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", ""
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
            "Jester Jamboree", "Mirthful Manufacturing",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", ""
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
        "first_gift_date": ["INTEGER", [0]],
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
        "phone_restrictions": ["TEXT", ["No Surveys", "No Mass Appeals", "No Mass Communications", "Do Not Call", ""]],
        "email_restrictions": ["TEXT", ["No Surveys", "No Mass Appeals", "No Mass Communications", "Do Not Email", ""]],
        "communication_restrictions": ["TEXT", ["No Surveys", "No Mass Appeals", "No Mass Communications", "Do Not Email", ""]],
        "subscription_events_in_person": ["TEXT", ["Opt-in", "Opt-out"]],
        "subscription_events_magazine": ["TEXT", ["Opt-in", "Opt-out"]],
        "communication_preference": ["TEXT", ["Holiday Card", "Inspiration event",
            "Research update", "Appeal", "Newsletter", "Thank you", "Survey", "Event", "Magazine", ""]],
        "cancer_type": ["TEXT", ["Lung Cancer", "Breast Cancer", "Prostate Cancer", "Colorectal Cancer", "Skin Cancer", 
            "Pancreatic Cancer", "Ovarian Cancer", "Leukemia", "Stomach Cancer", "Brain Cancer"]]


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



    private getRandomDatum(): DonorData {
        let donor: DonorData = {
            pmm: "",
            smm: "",
            vmm: "",
            exclude: "",
            deceased: "",
            first_name: "",
            nick_name: "",
            last_name: "",
            organization_name: "",
            total_donations: 0,
            total_pledge: 0,
            largest_gift: 0,
            largest_gift_appeal: "",
            first_gift_date: 0,
            last_gift_date: 0,
            last_gift_amount: 0,
            last_gift_request: 0,
            last_gift_appeal: "",
            address_line1: "",
            address_line2: "",
            city: "",
            contact_phone_type: "",
            phone_restrictions: "",
            email_restrictions: "",
            communication_restrictions: "",
            subscription_events_in_person: "",
            subscription_events_magazine: "",
            communication_preference: "",
            cancer_type: ""
        };

        const [city, pmm, vmm, smm] = getOrganizersAndCity();
        donor.city = city;
        donor.pmm = pmm;
        donor.vmm = vmm;
        donor.smm = smm;

        // 1% chance of being deceased
        if (Math.random() < 0.01) {
            donor.deceased = "yes";
        } else {
            donor.deceased = "no";
        }

        let totalDonations = Math.floor(Math.random() * 1000000);
        // 50% chance of having a pledge
        if (Math.random() < 0.5) {
            totalDonations = 0;
        }

        // largest gift is a random number between 0 and total donations
        let largestGift = Math.floor(Math.random() * totalDonations);
        let totalPledge = Math.floor(Math.random() * 1000000);
        // 20% chance of having a pledge
        if (Math.random() < 0.2) {
            totalPledge = 0;
        }

        let firstGiftDate = Math.floor(Math.random() * 1000000);
        if (totalDonations === 0) {
            firstGiftDate = 0;
        }
        const today = Math.floor(Date.now() / 1000);
        let lastGiftDate = firstGiftDate + Math.floor(Math.random() * (today - firstGiftDate));
        if (totalDonations === 0) {
            lastGiftDate = 0;
        }

        const lastGiftAmamount = Math.floor(Math.random() * largestGift);

        for (const key in this.data) {
            const values = this.data[key];
            const type = values[0];
            const options = values[1];


            switch (key) {
                case "exclude":
                case "first_name":
                case "nick_name":
                case "last_name":
                case "organization_name":
                case "largest_gift_appeal":
                case "last_gift_appeal":
                case "address_line1":
                case "address_line2":
                case "contact_phone_type":
                case "phone_restrictions":
                case "email_restrictions":
                case "communication_restrictions":
                case "subscription_events_in_person":
                case "subscription_events_magazine":
                case "cancer_type":
                case "communication_preference":
                    const randomIndex = Math.floor(Math.random() * options.length);
                    const randomValue = options[randomIndex];
                    donor[key] = randomValue as string;
                    break;
                case "total_donations":
                    donor[key] = totalDonations;
                    break;
                case "total_pledge":
                    donor[key] = totalPledge;
                    break;
                case "largest_gift":
                    if (totalDonations > 0) {
                        donor[key] = Math.floor(Math.random() * totalDonations);
                    }
                    break;
                case "first_gift_date":
                    if (totalDonations > 0) {
                        // get today date in seconds
                        const today = Math.floor(Date.now() / 1000);
                        // random date in the last 5 years
                        donor[key] = today - Math.floor(Math.random() * 157680000);
                    } else {
                        donor[key] = 0;
                    }
                    break;
                case "last_gift_date":
                    if (totalDonations > 0) {
                        donor[key] = lastGiftDate
                    } else {
                        donor[key] = 0;
                    }
                    break;

                case "last_gift_amount":
                    donor[key] = lastGiftAmamount;
                    break;

                case "last_gift_request":
                    // some random date in the last year
                    // get today date
                    const today = Math.floor(Date.now() / 1000);
                    donor[key] = today - Math.floor(Math.random() * 31536000);
                    break;
                default:
                    break;

            }
        }
        return donor
    }


    public getRandomInsert() {
        let insertRequest = "INSERT INTO donors (";
        let valuesRequest = "VALUES (";

        const donor = this.getRandomDatum();
        for (const key in this.data) {

            const value: string | number = donor[key];


            insertRequest += `${key},`;


            valuesRequest += `'${value}',`;

        }
        insertRequest = insertRequest.slice(0, -1);
        valuesRequest = valuesRequest.slice(0, -1);
        insertRequest += ") ";
        valuesRequest += ")";
        return insertRequest + valuesRequest;
    }

}

export default FauxData;
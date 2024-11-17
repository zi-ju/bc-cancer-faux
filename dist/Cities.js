"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganizersAndCity = exports.cities = void 0;
const island_cities = ["Victoria", "Nanaimo", "Courtenay", "Parksville", "Campbell River", "Saanich"];
const lower_mainland_cities = ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Langley", "Delta", "Maple Ridge", "New Westminster", "Port Coquitlam", "North Vancouver", "West Vancouver", "White Rock"];
const interior_cities = ["Kelowna", "Kamloops", "Prince George", "Vernon", "Salmon Arm", "Williams Lake"];
const cities = [...island_cities, ...lower_mainland_cities, ...interior_cities];
exports.cities = cities;
const getOrganizersAndCity = () => {
    const island_pmm = ["Peter Smith", "Gurtrude Schmidt"];
    const lower_mainland_pmm = ["Parvati Patel", "Hiroshi Nakamura"];
    const interior_pmm = ["Maria González"];
    const island_vmm = ["Sven Müller", "Chao Nguyen"];
    const lower_mainland_vmm = ["Priya Gupta", "Olga Smirnov"];
    const interior_vmm = ["Hassan Ahmed"];
    const island_smm = ["John Doe", "Jane Doe"];
    const lower_mainland_smm = ["Alice Smith", "Bob Brown"];
    const interior_smm = ["Carlos Hernández"];
    // 60% chance of being in the lower mainland, 25% chance of being on the island, 15% chance of being in the interior
    const random = Math.random();
    let city = "";
    let pmm = "";
    let vmm = "";
    let smm = "";
    if (random < 0.6) {
        city = lower_mainland_cities[Math.floor(Math.random() * lower_mainland_cities.length)];
        pmm = lower_mainland_pmm[Math.floor(Math.random() * lower_mainland_pmm.length)];
        vmm = lower_mainland_vmm[Math.floor(Math.random() * lower_mainland_vmm.length)];
        smm = lower_mainland_smm[Math.floor(Math.random() * lower_mainland_smm.length)];
    }
    else if (random < 0.85) {
        city = island_cities[Math.floor(Math.random() * island_cities.length)];
        pmm = island_pmm[Math.floor(Math.random() * island_pmm.length)];
        vmm = island_vmm[Math.floor(Math.random() * island_vmm.length)];
        smm = island_smm[Math.floor(Math.random() * island_smm.length)];
    }
    else {
        city = interior_cities[Math.floor(Math.random() * interior_cities.length)];
        pmm = interior_pmm[Math.floor(Math.random() * interior_pmm.length)];
        vmm = interior_vmm[Math.floor(Math.random() * interior_vmm.length)];
        smm = interior_smm[Math.floor(Math.random() * interior_smm.length)];
    }
    return [city, pmm, vmm, smm];
};
exports.getOrganizersAndCity = getOrganizersAndCity;

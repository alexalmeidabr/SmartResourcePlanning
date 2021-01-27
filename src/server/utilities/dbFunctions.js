console.log('Using nedb');
const Datastore = require('nedb');
const { request, response } = require('express');

// Resource Types
const dbResource_Types = new Datastore('../resource_types.db');
dbResource_Types.loadDatabase();
console.log('Resource Types initiated');

// Resource Groups
const dbResource_Groups = new Datastore('../resource_groups.db');
dbResource_Groups.loadDatabase();
console.log('Resource Groups initiated');

// Resource Status
const dbResource_Status = new Datastore('../resource_status.db');
dbResource_Status.loadDatabase();
console.log('Resource Status initiated');

// Resource Ownership
const dbResource_Ownership = new Datastore('../resource_ownership.db');
dbResource_Ownership.loadDatabase();
console.log('Resource Ownership initiated');

// Locations
const dbLocations = new Datastore('../locations.db');
dbLocations.loadDatabase();
console.log('Locations initiated');

// Resources
const dbResources = new Datastore('../resources.db');
dbResources.loadDatabase();
console.log('Resources initiated');

// Depots
const dbDepots = new Datastore('../depots.db');
dbDepots.loadDatabase();
console.log('Depots initiated');

// Resource per Group
const dbResourceGroups = new Datastore('../resourceGroups.db');
dbResourceGroups.loadDatabase();
console.log('Resources Groups initiated');

// Stock per Group
const dbStockGroups = new Datastore('../resourceStock.db');
dbStockGroups.loadDatabase();
console.log('Stock Groups initiated');

// Location Filters
const dbLocationFilters = new Datastore('../locationFilters.db');
dbLocationFilters.loadDatabase();
console.log('Location Filters initiated');

// Status per Depot
const dbStatusDepot = new Datastore('../statusDepot.db');
dbStatusDepot.loadDatabase();
console.log('Status per Depot initiated');

// Ownership per Depot
const dbOwnershipDepot = new Datastore('../ownershipDepot.db');
dbOwnershipDepot.loadDatabase();
console.log('Ownership per Depot initiated');

const csv=require('csvtojson');
const csvFileLocations = '../data/locations.csv';
const csvFileResources = '../data/resources.csv';
const csvFileDepots = '../data/depots.csv';
const csvFileResourceGroups = '../data/resource_group.csv';
const csvFileStockGroups = '../data/resource_stock.csv';
const csvFileLocationFilters = '../data/location_filter.csv';
const csvFileStatusDepot = '../data/depot_status.csv';
const csvFileOwnershipDepot = '../data/depot_ownership.csv';
const csvFileResource_Types = '../data/resource_types.csv';
const csvFileResource_Groups = '../data/resource_groups.csv';
const csvFileResource_Status = '../data/resource_status.csv';
const csvFileResource_Ownership = '../data/resource_ownership.csv';

function csvToJson(csvFile){

    const jsonObj = csv().fromFile(csvFile)
    return jsonObj;

}

async function loadLocations(csvFileLocations){

    let dbData = {
        location: null,
        loctype: null,
        qtde: null,
        lat: null,
        lon: null
    };

    var jsonData = await csvToJson(csvFileLocations);    
    console.log(jsonData);
    dbLocations.insert(jsonData);

}

async function loadResources(csvFileResources){

    let dbData = {
        depot: null,
        code: null,
        type: null,
        group: null,
        TEU: null,
        status: null,
        foodgrade: null,
        idledays: null,
        leasecontract: null,
        ownership: null,
        soc: null,
        builddate: null

    };

    var jsonData = await csvToJson(csvFileResources);    
    console.log(jsonData);
    dbResources.insert(jsonData);

}

async function loadDepots(csvFileDepots){

    let dbData = {
        location: null,
        group: null,
        quantity: null             
    };

    var jsonData = await csvToJson(csvFileDepots);    
    console.log(jsonData);
    dbDepots.insert(jsonData);

}

async function loadResourceGroups(csvFileResourceGroups){

    let dbData = {
        
        location: null,
        group: null,
        qtde: null

    };

    var jsonData = await csvToJson(csvFileResourceGroups);    
    console.log(jsonData);
    dbResourceGroups.insert(jsonData);
}

async function loadStockGroups(csvFileStockGroups){

    console.log("file: " + csvFileStockGroups);

    let dbData = {
        
        location: null,
        quantity: null,
        minStock: null,
        maxStock: null,
        maxCap: null,
        flatRack: null,
        hcPalletWide: null,
        openTop: null,
        reefer: null,
        standard: null,
        tank: null

    };

    var jsonData = await csvToJson(csvFileStockGroups);    
    console.log(jsonData);
    dbStockGroups.insert(jsonData);
}

async function loadLocationFilters(csvFileLocationFilters){

    let dbData = {
        
        filter: null,
        location: null,

    };

    var jsonData = await csvToJson(csvFileLocationFilters);    
    console.log(jsonData);
    dbLocationFilters.insert(jsonData);
}

async function loadStatusDepot(csvFileStatusDepot){

    let dbData = {
        
        filter: null,
        location: null,

    };

    var jsonData = await csvToJson(csvFileStatusDepot);    
    console.log(jsonData);
    dbStatusDepot.insert(jsonData);
}

async function loadOwnershipDepot(csvFileOwnershipDepot){

    let dbData = {
        
        filter: null,
        location: null,

    };

    var jsonData = await csvToJson(csvFileOwnershipDepot);    
    console.log(jsonData);
    dbOwnershipDepot.insert(jsonData);
}

async function loadResource_Types(csvFileResource_Types){

    let dbData = {
        
        type: null,        

    };

    var jsonData = await csvToJson(csvFileResource_Types);    
    console.log(jsonData);
    dbResource_Types.insert(jsonData);
}

async function loadResource_Groups(csvFileResource_Groups){

    let dbData = {
        
        group: null,        

    };

    var jsonData = await csvToJson(csvFileResource_Groups);    
    console.log(jsonData);
    dbResource_Groups.insert(jsonData);
}

async function loadResource_Status(csvFileResource_Status){

    let dbData = {
        
        status: null,        

    };

    var jsonData = await csvToJson(csvFileResource_Status);    
    console.log(jsonData);
    dbResource_Status.insert(jsonData);
}

async function loadResource_Ownership(csvFileResource_Ownership){

    let dbData = {
        
        ownership: null,        

    };

    var jsonData = await csvToJson(csvFileResource_Ownership);    
    console.log(jsonData);
    dbResource_Ownership.insert(jsonData);
}


//loadLocations(csvFileLocations);

//loadResources(csvFileResources);

//loadResourceGroups(csvFileResourceGroups);

//loadDepots(csvFileDepots);

//loadStockGroups(csvFileStockGroups);

//loadLocationFilters(csvFileLocationFilters);

//loadStatusDepot(csvFileStatusDepot);

//loadOwnershipDepot(csvFileOwnershipDepot);

loadResource_Types(csvFileResource_Types);

loadResource_Groups(csvFileResource_Groups);

loadResource_Status(csvFileResource_Status);

loadResource_Ownership(csvFileResource_Ownership);
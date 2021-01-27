// EXPRESS SERVER

const express = require('express');
const app = express();
app.listen(5000, () => console.log('listening at 5000'));
app.use(express.static('../../public'));
//app.use(express.static('__dirname/../public'));
app.use(express.json({ limit: '100mb' }));  

// Database

// Choose the Database
const dbSource = 'nedb';

const Datastore = require('nedb');
const { request, response } = require('express');

// Resource Types
const dbResource_Types = new Datastore('resource_types.db');
dbResource_Types.loadDatabase();
console.log('Resource Types loaded');

// Resource Groups
const dbResource_Groups = new Datastore('resource_groups.db');
dbResource_Groups.loadDatabase();
console.log('Resource Groups loaded');

// Resource Status
const dbResource_Status = new Datastore('resource_status.db');
dbResource_Status.loadDatabase();
console.log('Resource Status loaded');

// Resource Ownership
const dbResource_Ownership = new Datastore('resource_ownership.db');
dbResource_Ownership.loadDatabase();
console.log('Resource Ownership loaded');

// Locations
const dbLocations = new Datastore('locations.db');
dbLocations.loadDatabase(); 
console.log('Locations loaded');

// Resources
const dbResources = new Datastore('resources.db');
dbResources.loadDatabase();
console.log('Resources loaded');

// Depots
const dbDepots = new Datastore('depots.db');
dbDepots.loadDatabase();
console.log('Depots loaded');

// Resources Groups
const dbResourceGroups = new Datastore('resourceGroups.db');
dbResourceGroups.loadDatabase();
console.log('Resource Groups per Depot loaded');

// Resources Groups
const dbStockGroups = new Datastore('resourceStock.db');
dbStockGroups.loadDatabase();
console.log('Stock Groups loaded');

// Location Filters
const dbLocationFilters = new Datastore('locationFilters.db');
dbLocationFilters.loadDatabase();
console.log('Location Filters loaded');

// Configuration
const dbConfiguration = new Datastore('configuration.db');
dbConfiguration.loadDatabase();
console.log('Configuration loaded');

// Status per Depot
const dbStatusDepot = new Datastore('statusDepot.db');
dbStatusDepot.loadDatabase();
console.log('Status per Depot loaded');

// Ownership per Depot
const dbOwnershipDepot = new Datastore('ownershipDepot.db');
dbOwnershipDepot.loadDatabase();
console.log('Ownership per Depot loaded');

switch (dbSource) {
        
    case 'nedb':
        //console.log('Using nedb');
        
        dbActive = true;
        break;

    case 'hanaDB':
        console.log('using HANA DB');

}

app.get('/getResource_Types', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate resource types');
                
                dbResource_Types.find({},(err,data) => {
                    if (err) response.end();
                    response.json(data);
                })
            }

          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getResource_Groups', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate resource groups');
                
                dbResource_Groups.find({},(err,data) => {
                    if (err) response.end();
                    response.json(data);
                })
            }

          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getResource_Status', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate resource status');
                
                dbResource_Status.find({},(err,data) => {
                    if (err) response.end();
                    response.json(data);
                })
            }

          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getResource_Ownership', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate resource ownership');
                
                dbResource_Ownership.find({},(err,data) => {
                    if (err) response.end();
                    response.json(data);
                })
            }

          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getLocation', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate location data');
                
                dbLocations.find({},(err,data) => {
                    if (err) response.end();
                    response.json(data);
                })
            }

          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getDepot/:depot', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate depot data');

                var location = request.params.depot;
                console.log(location);

                dbDepots.find({LOCATION: location},(err,data) => {
                    if (err) response.end();                                        
                    response.json(data);
                })
            }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getDepotType/:depots', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate depot data');

                var locations = JSON.parse(request.params.depots);
                console.log(locations);

                dbDepots.find({LOCATION: {$in: locations}},(err,data) => {
                    if (err) response.end();                                        
                    response.json(data);
                })
            }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getResourceGroups/:depot', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate resource groups data');
                var location = request.params.depot;
                console.log(location);

                dbResourceGroups.find({LOCATION: location},(err,data) => {
                    if (err) response.end();                                        
                    response.json(data);
                })
            }

          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getResource/:depot', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate resource data from specific depot');

                var location = request.params.depot;
                console.log(location);

                dbResources.find({DEPOT: location},(err,data) => {
                    if (err) response.end();                                        
                    response.json(data);
                })
            }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getResources/:depots', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate resource data from several depots');

                var locations = JSON.parse(request.params.depots);
                console.log(locations);

                dbResources.find({DEPOT: {$in: locations}},(err,data) => {
                    if (err) response.end();                                        
                    response.json(data);
                })
            }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getStocks/:depots', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate stock data');

                var locations = JSON.parse(request.params.depots);
                console.log(locations);
                 
                dbStockGroups.find({LOCATION: {$in: locations}},(err,data) => {
                    if (err) response.end();                                        
                    response.json(data);
                })

            }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getStatusDepot/:depots', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate depot status data');

                var locations = JSON.parse(request.params.depots);
                console.log(locations);
                 
                dbStatusDepot.find({LOCATION: {$in: locations}},(err,data) => {                
                    if (err) response.end();                                        
                    response.json(data);    
                    //console.log(data);                
                })

             }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

app.get('/getOwnershipDepot/:depots', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate depot ownership data');

                var locations = JSON.parse(request.params.depots);
                console.log(locations);
                 
                dbOwnershipDepot.find({LOCATION: {$in: locations}},(err,data) => {
                    if (err) response.end();                                        
                    response.json(data);
                    //console.log(data);
                })
             }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

// Get ALL location filters
app.get('/getLocationFilters', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate location filters');
                 
                dbLocationFilters.find({},(err,data) => {
                if (err) response.end();                                        
                response.json(data);
                })

          }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

// Get a specific location filter
app.get('/getLocationFilter/:locationFilter', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {
              
                console.log('Using nedb to simulate location filters');
                 
                dbLocationFilters.find({LOCATION_FILTER: request.params.locationFilter},(err,data) => {
                if (err) response.end();                                        
                response.json(data);
                })

          }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});

// Save configuration
app.post('/saveConfiguration', (request, response) => {
    
    let dbRecord = {
        UserID: null,
        resourceVisibility_DefaultFilter: null,
    };

    dbConfiguration.count({UserID: request.body.UserID}, (err, count) => {
        if (err){
            console.log("An error has occured when reading the database configuration file");
            response.end();
        }

        // New user
        if(count === 0) {

            dbConfiguration.insert(request.body);
            console.log("Configuration for User " + request.body.UserID + " added")

        }
        // Update user
        else {

            console.log(request.body);
            dbConfiguration.update(
                {UserID: request.body.UserID},
                {UserID: request.body.UserID, 
                defaultLocationFilter: request.body.defaultLocationFilter, 
                defaultMinicards: request.body.defaultMinicards,
                dashboardChart: request.body.dashboardChart,
                defaultMiniCharts: request.body.defaultMiniCharts
                },
                {},
                function (err, numReplaced) {
                    console.log("number of records affected: " + numReplaced);
                    console.log("Configuration for User " + request.body.UserID + " updated");
                }
            )
        }
    })

    response.end; 

})

app.get('/getConfiguration/:UserID', (request, response) => {
    
    switch (dbSource) {
        
        case 'nedb':
            
            if(dbActive) {              

                var UserID = request.params.UserID;
                 
                dbConfiguration.find({UserID: UserID},(err,data) => {
                if (err) response.end();                                        
                response.json(data);
                })

          }
          break;

          case 'hanaDB':
          console.log('using HANA DB');

    }
});


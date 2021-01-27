// Stock data
export const stockDataReducer = (state = {
    stockData: [],
    stockGroupData: [],
    stockGroupBarData: [],
    stockTypeData: [],
    stockTypeBarData: [],
    stockTotal: 0,
    stockDepotGroup: [],
    stockDepotSubData: [],
    tag: "",
    }, 
    
    action) => {

        if(action.type === "SET_STOCK_DATA"){            
            state = {
                ...state,
                stockData: action.payload,
                tag: action.tag
            }
        }      
        if(action.type === "SET_STOCKGROUP_DATA"){            
            state = {
                ...state,
                stockGroupData: action.payload,
                tag: action.tag
            }
        }     
        if(action.type === "SET_STOCK_TOTAL"){            
            state = {
                ...state,
                stockTotal: action.payload,
                tag: action.tag
            }
        }   
        if(action.type === "SET_STOCKTYPE_DATA"){            
            state = {
                ...state,
                stockTypeData: action.payload,
                tag: action.tag
            }
        }
        if(action.type === "SET_STOCKGROUPBAR_DATA"){           
            state = {
                ...state,
                stockGroupBarData: action.payload,
                tag: action.tag
            }
        } 
        if(action.type === "SET_STOCKTYPEBAR_DATA"){            
            state = {
                ...state,
                stockTypeBarData: action.payload,
                tag: action.tag
            }
        } 
        if(action.type === "SET_STOCKRADIUS_DATA"){            
            state = {
                ...state,
                stockDepotGroup: action.payload,
                tag: action.tag
            }
        }
        if(action.type === "SET_STOCKDEPOTSUB_DATA"){            
            state = {
                ...state,
                stockDepotSubData: action.payload,
                tag: action.tag
            }
        } 
    return state;
};
 
//Container data
export const ContainerDataReducer = (state = {
    containerData: [],
    containerCount: 0,
    containerStatus: [],
    containerOwnership:[],
    containerDepotStatus: [],
    containerDepotOwnership: []
    }, 
    
    action) => {

        if(action.type === "SET_CONTAINER_DATA"){            
            state = {
                ...state,
                containerData: action.payload
            }
        }    
        if(action.type === "SET_CONTAINER_COUNT"){            
            state = {
                ...state,
                containerCount: action.payload
            }
        }
        if(action.type === "SET_CONTAINER_STATUS"){            
            state = {
                ...state,
                containerStatus: action.payload
            }
        }   
        if(action.type === "SET_CONTAINER_OWNERSHIP"){            
            state = {
                ...state,
                containerOwnership: action.payload
            }
        }    
        if(action.type === "SET_CONTAINER_DEPOTSTATUS"){            
            state = {
                ...state,
                containerDepotStatus: action.payload
            }
        } 
        if(action.type === "SET_CONTAINER_DEPOTOWNERSHIP"){            
            state = {
                ...state,
                containerDepotOwnership: action.payload
            }
        }   
    return state;
};

// Resource Dashboard Data

export const ResourceDashBoardReducer = ( state = {
    miniCardCount: 0,
    miniCards: [],
    chartSource: null,
    miniCharts: []
    },
    
    action) => {

        if(action.type === "SET_DASHBOARD_MINICARDS"){            

            state = {
                ...state,                
                miniCards: action.values,
                miniCardCount: action.count
            }
        }
        if(action.type === "SET_DASHBOARD_CHART"){            

            state = {
                ...state,                
                chartSource: action.payload
            }
        }
        if(action.type === "SET_DASHBOARD_MINICHARTS"){            

            state = {
                ...state,                
                miniCharts: action.payload
            }
        }
    return state;
};
    


// Locations available for searching
export const SearchLocationsReducer = (state = {
    searchLocations: [],
    selectedLocations: [],
    defaultLocations: [],
    },

    action) => {

        if(action.type === "SET_SEARCH_LOCATIONS"){

            state = {
                ...state,
                searchLocations: action.payload
            }      
        }
        if(action.type === "SET_SELECTED_LOCATIONS"){

            state = {
                ...state,
                selectedLocations: action.payload
            }      
        }

        if(action.type === "SET_DEFAULT_LOCATIONS"){

            state = {
                ...state,
                selectedLocations: action.payload,
                defaultLocations: action.payload
            }      
        }
    return state;
};



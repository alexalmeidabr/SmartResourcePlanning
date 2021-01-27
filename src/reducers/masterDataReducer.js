// Master Data
export const masterDataReducer = (state = {
    resourceType: [],
    resourceGroup: [],
    resourceStatus: [],
    resourceOwnership: [],
    resourceData: [],
    dataTag: "",
},

action) => {

    if(action.type === "SET_RESOURCE_TYPE"){
        state = {
            ...state,
            resourceType: action.payload
        }
    }
    if(action.type === "SET_RESOURCE_GROUP"){
        state = {
            ...state,
            resourceGroup: action.payload
        }
    }
    if(action.type === "SET_RESOURCE_STATUS"){
        state = {
            ...state,
            resourceStatus: action.payload
        }
    }
    if(action.type === "SET_RESOURCE_OWNERSHIP"){
        state = {
            ...state,
            resourceOwnership: action.payload
        }
    }

    if(action.type === "SET_RESOURCE_DATA"){
        state = {
            ...state,
            resourceData: action.payload,
            dataTag: action.tag
        }
    }
    return state;

};
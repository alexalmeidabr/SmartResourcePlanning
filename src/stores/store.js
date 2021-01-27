import {createStore, applyMiddleware, combineReducers} from "redux";
import {stockDataReducer, 
        SearchLocationsReducer, 
        ContainerDataReducer, 
        ResourceDashBoardReducer} from "../reducers/resourceVisibilityReducer";
        
import {masterDataReducer} from "../reducers/masterDataReducer";

import thunk from "redux-thunk";

export default createStore(
    combineReducers ({stockDataReducer, SearchLocationsReducer, ContainerDataReducer, ResourceDashBoardReducer,
                      masterDataReducer}), 
    {}, 
    applyMiddleware(thunk)
);  
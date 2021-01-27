import store from '../stores/store';
import {UpdateResourceData, UpdateResourceType, UpdateResourceGroup, UpdateResourceStatus, UpdateResourceOwnership} from '../actions/masterDataActions';

function addPercentage(items){

    var result = [];

    for(let i=0; i<items.length; i++){
      result.push(items[i] + " %")
    }

    return result;
  }

 async function isType(Item){

    const state = store.getState();

    var types = [];
    var p_types = [];
    var result = false;
   
    if(state.masterDataReducer.resourceType.length === 0) {
        store.dispatch(UpdateResourceType());       
    }

    types = state.masterDataReducer.resourceType;
    
    if (types.length === 0){
        await fetch('/getResource_Types')
        .then(response => response.json())
        .then(json => {

            for (let i = 0; i < json.length; i++) {
                types.push(json[i].TYPE)
            }

            p_types = addPercentage(types)

            for(let i=0; i<types.length; i++){            
                if(Item === types[i]) result = true;
            }

            for(let i=0; i<p_types.length; i++){
                if(Item === p_types[i]) result = true;
            }        

        });
    }
    else{

        p_types = addPercentage(types)

            for(let i=0; i<types.length; i++){            
                if(Item === types[i]) result = true;
            }

            for(let i=0; i<p_types.length; i++){
                if(Item === p_types[i]) result = true;
            }  
    }

    return result;
}

async function isGroup(Item){

    const state = store.getState();

    var groups = [];
    var p_groups = [];
    var result = false;

    if(state.masterDataReducer.resourceGroup.length === 0) {
        store.dispatch(UpdateResourceGroup());       
    }

    groups = state.masterDataReducer.resourceGroup;

    if (groups.length === 0){
        await fetch('/getResource_Groups')
        .then(response => response.json())
        .then(json => {

            for (let i = 0; i < json.length; i++) {
                groups.push(json[i].GROUP)
            }

            p_groups = addPercentage(groups)

            for(let i=0; i<groups.length; i++){            
                if(Item === groups[i]) result = true;
            }

            for(let i=0; i<p_groups.length; i++){
                if(Item === p_groups[i]) result = true;
            }        
        });
    }
    else{

        p_groups = addPercentage(groups)

            for(let i=0; i<groups.length; i++){            
                if(Item === groups[i]) result = true;
            }

            for(let i=0; i<p_groups.length; i++){
                if(Item === p_groups[i]) result = true;
            }  
    }

    return result;
}

async function isStatus(Item){

    const state = store.getState();

    var status = [];
    var p_status = [];
    var result = false;

    if(state.masterDataReducer.resourceStatus.length === 0) {
        store.dispatch(UpdateResourceStatus());       
    }

    status = state.masterDataReducer.resourceStatus;

    if (status.length === 0){

        await fetch('/getResource_Status')
        .then(response => response.json())
        .then(json => {

            for (let i = 0; i < json.length; i++) {
                status.push(json[i].STATUS)
            }

            p_status = addPercentage(status)

            for(let i=0; i<status.length; i++){            
                if(Item === status[i]) result = true;
            }

            for(let i=0; i<p_status.length; i++){
                if(Item === p_status[i]) result = true;
            }        
        });
    }
    else{

        p_status = addPercentage(status)

            for(let i=0; i<status.length; i++){            
                if(Item === status[i]) result = true;
            }

            for(let i=0; i<p_status.length; i++){
                if(Item === p_status[i]) result = true;
            }  
    }

    return result;
}

async function isOwnership(Item){

    const state = store.getState();

    var ownership = [];
    var p_ownership = [];
    var result = false;    

    if(state.masterDataReducer.resourceOwnership.length === 0) {
        store.dispatch(UpdateResourceOwnership());               
    }
        
    ownership = state.masterDataReducer.resourceOwnership;    

    if (ownership.length === 0){
        
        await fetch('/getResource_Ownership')
        .then(response => response.json())
        .then(json => {            

            for (let i=0; i < json.length; i++) {
                ownership.push(json[i].OWNERSHIP)
            }

            p_ownership = addPercentage(ownership)

            for(let i=0; i<ownership.length; i++){            
                if(Item === ownership[i]) result = true;

            }

            for(let i=0; i<p_ownership.length; i++){
                if(Item === p_ownership[i]) result = true;
            }        
        });
    }
    else{

        p_ownership = addPercentage(ownership)

            for(let i=0; i<ownership.length; i++){            
                if(Item === ownership[i]) result = true;
            }

            for(let i=0; i<p_ownership.length; i++){
                if(Item === p_ownership[i]) result = true;
            }  
    }

    return result;
}

function isPerc(Item){    

    return Item.includes("%",1);

}

// Update Dashboard settings
export function UpdateDashboardData(selection){
    return async dispatch => {    

        var dashconfig = [];   
        var locationCodes = selection;
        var miniCardsValues = [];
        var hashtag = "";
        var dashboardChart = null;
        var dashboardMiniCharts = [];

        // Fixing User ID for now
        await fetch(`/getConfiguration/${"S00871562"}`)
        .then(response => response.json())
        .then(json => {
            dashconfig = json[0].defaultMinicards;  
            dashboardChart = json[0].dashboardChart;        
            dashboardMiniCharts = json[0].defaultMiniCharts
            }
        )        
        
        selection = selection.sort();
        for(let i=0; i<selection.length; i++) hashtag = hashtag + selection[i];

        for(let i=0; i<dashconfig.length; i++){

            var istype = false;
            var isgroup = false;
            var isstatus = false;
            var isownership = false;
            var isTotal = false;       
            
            await isType(dashconfig[i])
            .then(response => istype = response)

            if(istype){

                var typevalue = null;
                var typeTotal = 0;     
                var total = 0;

                if(isPerc(dashconfig[i])) typevalue = dashconfig[i].substring(0,4);
                else typevalue = dashconfig[i];

                //Calculate stock type data
                var typedata = [];
                var typeJSON = JSON.stringify(locationCodes);

                await fetch(`/getDepotType/${typeJSON}`)
                .then(response => response.json())
                .then(json => {typedata = json});

                for(let j=0; j<typedata.length; j++){
                    
                    if(typedata[j].TYPE == typevalue) {
                        typeTotal += parseInt(typedata[j].QUANTITY);
                    }
                    total += parseInt(typedata[j].QUANTITY);

                }                

                if(isPerc(dashconfig[i])){

                    var percentage = (typeTotal / total * 100).toFixed(2) + " %";

                    miniCardsValues.push({
                        value: percentage,
                        text: "Percentage of " + typevalue
                    });

                }
                else {
                    miniCardsValues.push({
                        value: typeTotal,
                        text: "Total of " + typevalue
                });}
            }

            await isGroup(dashconfig[i])
            .then(response => isgroup = response)

            if(isgroup){

                var groupvalue = null;
                var groupTotal = 0;

                if(isPerc(dashconfig[i])) {
                    groupvalue = dashconfig[i].replace(' %','');
                }
                else groupvalue = dashconfig[i];                       
                
                //Stock data
                let stockdata = [];
                let selectionJSON = JSON.stringify(locationCodes);

                await fetch(`/getStocks/${selectionJSON}`)
                .then(response => response.json())
                .then(json => {stockdata = json;})

                //Calculate stock group data
                var totalFlatRack = 0;
                var totalHCPalletWide = 0;
                var totalOpenTop = 0;
                var totalReefer = 0;
                var totalStandard = 0;
                var totalTank = 0;
                var totalStock = 0;                
                
                for(let j = 0; j < stockdata.length; j++){
                    totalFlatRack += parseInt(stockdata[j].FLATRACK);
                    totalHCPalletWide += parseInt(stockdata[j].HC_PALLET_WIDE);
                    totalOpenTop += parseInt(stockdata[j].OPEN_TOP);
                    totalReefer += parseInt(stockdata[j].REEFER);
                    totalStandard += parseInt(stockdata[j].STANDARD);
                    totalTank += parseInt(stockdata[j].TANK);
                    totalStock += parseInt(stockdata[j].QUANTITY);
                }
                
                switch(groupvalue) {
                    
                    case "STANDARD":
                        groupTotal = totalStandard;
                        break;
                    
                    case "HC_PALLET_WIDE":
                        groupTotal = totalHCPalletWide;
                        break;

                    case "REEFER":
                        groupTotal = totalReefer;
                        break;

                    case "TANK":
                        groupTotal = totalTank;
                        break;

                    case "FLAT-RACK":
                        groupTotal = totalFlatRack;
                        break;

                    case "OPEN_TOP":
                        groupTotal = totalOpenTop;

                }

                if(isPerc(dashconfig[i])){

                    var percentage = (groupTotal / totalStock * 100).toFixed(2) + " %";

                    miniCardsValues.push({
                        value: percentage,
                        text: "Percentage of " + groupvalue
                    });

                }
                else {
                    miniCardsValues.push({
                        value: groupTotal,
                        text: "Total of " + groupvalue
                });}

            }

            await isStatus(dashconfig[i])
            .then(response => isstatus = response)

            await isOwnership(dashconfig[i])
            .then(response => isownership = response)

            if (dashconfig[i] === "TOTAL") isTotal = true;

            if(isstatus || isownership || isTotal){

                var value = null;
                var total = 0;

                if(isPerc(dashconfig[i])) {                    
                    value = dashconfig[i].replace(' %','');
                }
                else value = dashconfig[i];   

                let containerdata = [];                
                
                const state = store.getState();

                if(hashtag === state.masterDataReducer.dataTag) containerdata = state.masterDataReducer.resourceData;
                else{

                    store.dispatch(UpdateResourceData(locationCodes));
                    let selectionJSON = JSON.stringify(locationCodes);
                    await fetch(`/getResources/${selectionJSON}`)
                    .then(response => response.json())
                    .then(json => {
                        containerdata = json;
                        }
                    ) 
                }               

                var totalNotBlocked = 0;
                var totalDamaged = 0;
                var totalOutOfFleet = 0;
                var totalStock = 0;

                var totalOwned = 0;
                var totalLeased = 0;
                var totalThirdParty = 0;
                var totalEligibleforOffHire = 0;

                for(let i = 0; i < containerdata.length; i++){

                    if(containerdata[i].STATUS === "Not Blocked")
                        totalNotBlocked += 1
                    if(containerdata[i].STATUS === "Damaged")
                        totalDamaged += 1
                    if(containerdata[i].STATUS === "Out of Fleet")
                        totalOutOfFleet += 1

                    if(containerdata[i].OWNERSHIP === "Owned")
                        totalOwned += 1
                    if(containerdata[i].OWNERSHIP === "Leased")
                        totalLeased += 1
                    if(containerdata[i].OWNERSHIP === "Third party")
                        totalThirdParty += 1
                    if(containerdata[i].OWNERSHIP === "Eligible for offhire")
                        totalEligibleforOffHire += 1
                        }

                totalStock = totalNotBlocked + totalDamaged + totalOutOfFleet;

                switch(value){

                    case "Not Blocked":
                        total = totalNotBlocked;
                        break;

                    case "Damaged":
                        total = totalDamaged;
                        break;

                    case "Out of Fleet":
                        total = totalOutOfFleet;
                        break;

                    case "Owned":
                        total = totalOwned;
                        break;

                    case "Leased":
                        total = totalLeased;
                        break;

                    case "Third Party":
                        total = totalThirdParty;
                        break;

                    case "Eligible for offhire":
                        total = totalEligibleforOffHire;
                        break;

                    case "TOTAL":
                        total = totalStock;
                        break;
                }

                if(isPerc(dashconfig[i])){

                    var percentage = (total / totalStock * 100).toFixed(2) + " %";

                    miniCardsValues.push({
                        value: percentage,
                        text: "Percentage of " + value
                    });

                }
                else if (dashconfig[i] === "TOTAL"){
                    miniCardsValues.push({
                        value: total,
                        text: "Total n° of Containers"
                });}
                else {
                    miniCardsValues.push({
                        value: total,
                        text: "Total of " + value
                    })};

            }
        }

        dispatch({
            type: "SET_DASHBOARD_MINICHARTS",
            payload: dashboardMiniCharts
        })

        dispatch({
            type: "SET_DASHBOARD_MINICARDS",
            count: dashconfig.length,
            values: miniCardsValues
        })

        dispatch({
            type: "SET_DASHBOARD_CHART",
            payload: dashboardChart
        })

    }

}

// Set Dashboard settings
export function setDashboardData(){
    return async dispatch => {            

        var dashconfig = [];
        var defaultLocationFilter = [];
        var locationCodes = [];
        var miniCardsValues = [];
        var hashtag = "";
        var dashboardChart = null;
        var dashboardMiniCharts = [];

        // Fixing User ID for now
        await fetch(`/getConfiguration/${"S00871562"}`)
        .then(response => response.json())
        .then(json => {
            dashconfig = json[0].defaultMinicards;
            defaultLocationFilter = json[0].defaultLocationFilter;
            dashboardChart = json[0].dashboardChart;
            dashboardMiniCharts = json[0].defaultMiniCharts
            }
        )

        //Default Location Filter
        await fetch(`/getLocationFilter/${defaultLocationFilter}`)
        .then(response => response.json())
        .then(json => {            
            for(let i=0; i<json.length; i++){
                locationCodes.push(json[i].LOCATION)
            }
        })
        
        locationCodes = locationCodes.sort();
        for(let i=0; i<locationCodes.length; i++) hashtag = hashtag + locationCodes[i];

        for(let i=0; i<dashconfig.length; i++){
            
            var istype = false;
            var isgroup = false;
            var isstatus = false;
            var isownership = false;
            var isTotal = false;  
            
            await isType(dashconfig[i])
            .then(response => istype = response)

            if(istype){

                var typevalue = null;
                var typeTotal = 0;     
                var total = 0;

                if(isPerc(dashconfig[i])) typevalue = dashconfig[i].substring(0,4);
                else typevalue = dashconfig[i];

                //Calculate stock type data
                var typedata = [];
                var typeJSON = JSON.stringify(locationCodes);

                await fetch(`/getDepotType/${typeJSON}`)
                .then(response => response.json())
                .then(json => {typedata = json});

                for(let j=0; j<typedata.length; j++){
                    
                    if(typedata[j].TYPE == typevalue) {
                        typeTotal += parseInt(typedata[j].QUANTITY);
                    }
                    total += parseInt(typedata[j].QUANTITY);

                }                

                if(isPerc(dashconfig[i])){

                    var percentage = (typeTotal / total * 100).toFixed(2) + " %";

                    miniCardsValues.push({
                        value: percentage,
                        text: "Percentage of " + typevalue
                    });

                }
                else {
                    miniCardsValues.push({
                        value: typeTotal,
                        text: "Total of " + typevalue
                });}
            }

            await isGroup(dashconfig[i])
            .then(response => isgroup = response)

            if(isgroup){
                
                var groupvalue = null;
                var groupTotal = 0;

                if(isPerc(dashconfig[i])) {
                    groupvalue = dashconfig[i].replace(' %','');
                }
                else groupvalue = dashconfig[i];                       
                
                //Stock data
                let stockdata = [];
                let selectionJSON = JSON.stringify(locationCodes);

                await fetch(`/getStocks/${selectionJSON}`)
                .then(response => response.json())
                .then(json => {stockdata = json;})

                //Calculate stock group data
                var totalFlatRack = 0;
                var totalHCPalletWide = 0;
                var totalOpenTop = 0;
                var totalReefer = 0;
                var totalStandard = 0;
                var totalTank = 0;
                var totalStock = 0;                
                
                for(let j = 0; j < stockdata.length; j++){
                    totalFlatRack += parseInt(stockdata[j].FLATRACK);
                    totalHCPalletWide += parseInt(stockdata[j].HC_PALLET_WIDE);
                    totalOpenTop += parseInt(stockdata[j].OPEN_TOP);
                    totalReefer += parseInt(stockdata[j].REEFER);
                    totalStandard += parseInt(stockdata[j].STANDARD);
                    totalTank += parseInt(stockdata[j].TANK);
                    totalStock += parseInt(stockdata[j].QUANTITY);
                }
                
                switch(groupvalue) {
                    
                    case "STANDARD":
                        groupTotal = totalStandard;
                        break;
                    
                    case "HC_PALLET_WIDE":
                        groupTotal = totalHCPalletWide;
                        break;

                    case "REEFER":
                        groupTotal = totalReefer;
                        break;

                    case "TANK":
                        groupTotal = totalTank;
                        break;

                    case "FLAT-RACK":
                        groupTotal = totalFlatRack;
                        break;

                    case "OPEN_TOP":
                        groupTotal = totalOpenTop;

                }

                if(isPerc(dashconfig[i])){

                    var percentage = (groupTotal / totalStock * 100).toFixed(2) + " %";

                    miniCardsValues.push({
                        value: percentage,
                        text: "Percentage of " + groupvalue
                    });

                }
                else {
                    miniCardsValues.push({
                        value: groupTotal,
                        text: "Total of " + groupvalue
                });}

            }

            await isStatus(dashconfig[i])
            .then(response => isstatus = response)

            await isOwnership(dashconfig[i])
            .then(response => isownership = response)


            if (dashconfig[i] === "TOTAL") isTotal = true;

            if(isstatus || isownership || isTotal){

                var value = null;
                var total = 0;

                if(isPerc(dashconfig[i])) {                    
                    value = dashconfig[i].replace(' %','');
                }
                else value = dashconfig[i];   

                let containerdata = [];
                
                const state = store.getState();

                if(hashtag === state.masterDataReducer.dataTag) containerdata = state.masterDataReducer.resourceData;
                else{

                    store.dispatch(UpdateResourceData(locationCodes));
                    let selectionJSON = JSON.stringify(locationCodes);
                    await fetch(`/getResources/${selectionJSON}`)
                    .then(response => response.json())
                    .then(json => {
                        containerdata = json;
                        }
                    ) 
                }

                var totalNotBlocked = 0;
                var totalDamaged = 0;
                var totalOutOfFleet = 0;
                var totalStock = 0;

                var totalOwned = 0;
                var totalLeased = 0;
                var totalThirdParty = 0;
                var totalEligibleforOffHire = 0;

                for(let i = 0; i < containerdata.length; i++){

                    if(containerdata[i].STATUS === "Not Blocked")
                        totalNotBlocked += 1
                    if(containerdata[i].STATUS === "Damaged")
                        totalDamaged += 1
                    if(containerdata[i].STATUS === "Out of Fleet")
                        totalOutOfFleet += 1

                    if(containerdata[i].OWNERSHIP === "Owned")
                        totalOwned += 1
                    if(containerdata[i].OWNERSHIP === "Leased")
                        totalLeased += 1
                    if(containerdata[i].OWNERSHIP === "Third party")
                        totalThirdParty += 1
                    if(containerdata[i].OWNERSHIP === "Eligible for offhire")
                        totalEligibleforOffHire += 1
                        }

                totalStock = totalNotBlocked + totalDamaged + totalOutOfFleet;

                switch(value){

                    case "Not Blocked":
                        total = totalNotBlocked;
                        break;

                    case "Damaged":
                        total = totalDamaged;
                        break;

                    case "Out of Fleet":
                        total = totalOutOfFleet;
                        break;

                    case "Owned":
                        total = totalOwned;
                        break;

                    case "Leased":
                        total = totalLeased;
                        break;

                    case "Third Party":
                        total = totalThirdParty;
                        break;

                    case "Eligible for offhire":
                        total = totalEligibleforOffHire;
                        break;

                    case "TOTAL":
                        total = totalStock;
                        break;
                }                

                if(isPerc(dashconfig[i])){

                    var percentage = (total / totalStock * 100).toFixed(2) + " %";

                    miniCardsValues.push({
                        value: percentage,
                        text: "Percentage of " + value
                    });

                }
                else if (dashconfig[i] === "TOTAL"){
                    miniCardsValues.push({
                        value: total,
                        text: "Total n° of Containers"
                });}
                else {
                    miniCardsValues.push({
                        value: total,
                        text: "Total of " + value
                    })};

            }
        }

        dispatch({
            type: "SET_DASHBOARD_MINICHARTS",
            payload: dashboardMiniCharts
        })

        dispatch({
            type: "SET_DASHBOARD_MINICARDS",
            count: dashconfig.length,
            values: miniCardsValues
        })

        dispatch({
            type: "SET_DASHBOARD_CHART",
            payload: dashboardChart
        })

    }

}

// Update Stock data
export function setStockData(selection) {
    return async dispatch => {

        //Stock Data
        var stockdata = [];
        var selectionJSON = JSON.stringify(selection);

        await fetch(`/getStocks/${selectionJSON}`)
        .then(response => response.json())
        .then(json => {
            stockdata = json;
            }
        )

        //Calculate total stock
        var totalStock = 0;

        for(var i = 0; i < stockdata.length; i++){
            totalStock += parseInt(stockdata[i].QUANTITY);
        }

        //Calculate stock group data
        var totalFlatRack = 0;
        var totalHCPalletWide = 0;
        var totalOpenTop = 0;
        var totalReefer = 0;
        var totalStandard = 0;
        var totalTank = 0;

        for(i = 0; i < stockdata.length; i++){
            totalFlatRack += parseInt(stockdata[i].FLATRACK);
            totalHCPalletWide += parseInt(stockdata[i].HC_PALLET_WIDE);
            totalOpenTop += parseInt(stockdata[i].OPEN_TOP);
            totalReefer += parseInt(stockdata[i].REEFER);
            totalStandard += parseInt(stockdata[i].STANDARD);
            totalTank += parseInt(stockdata[i].TANK);
        }

        var groupdata = [
            {
                type: "Tank",
                value: totalTank
            },
            {
                type: "Flat Rack",
                value: totalFlatRack
            },
            {
                type: "Pallet Wide",
                value: totalHCPalletWide
            },
            {
                type: "Open Top",
                value: totalOpenTop
            },
            {
                type: "Reefer",
                value: totalReefer
            },
            {
                type: "Standard",
                value: totalStandard
            }
        ]

        //Agregate group values to be used in a Bar chart
        var groupbardata = [];

        for (let i=0; i<groupdata.length; i++){
            groupbardata.push({
                XVALUES: groupdata[i].type,
                YVALUES: groupdata[i].value.toString()
            })
        }

        //Calculate stock type data
        var typedata = [];
        var typeJSON = JSON.stringify(selection);

        await fetch(`/getDepotType/${typeJSON}`)
        .then(response => response.json())
        .then(json => {typedata = json});

        //Agregate type values to be used in a Bar chart
        var typebardata = [];

        typedata.reduce(function(res, value) {
        if (!res[value.TYPE]) {
            res[value.TYPE] = { XVALUES: value.TYPE, YVALUES: 0 };
            typebardata.push(res[value.TYPE])
        }
        res[value.TYPE].YVALUES += parseInt(value.QUANTITY);
        return res;
        }, {});

        // Agregate group values for Radius chart
        var radiusdata = [];

        for (i=0; i < stockdata.length; i++){

            radiusdata.push({

                LOCATION: stockdata[i].LOCATION,
                FLATRACK: stockdata[i].FLATRACK,
                HC_PALLET_WIDE: stockdata[i].HC_PALLET_WIDE,
                OPEN_TOP: stockdata[i].OPEN_TOP,
                REEFER: stockdata[i].REEFER,
                STANDARD: stockdata[i].STANDARD,
                TANK: stockdata[i].TANK
            })
        }

        //Agregate depots using sub group data for Double Pie Chart
        var depotsubgroup = [];

        for (i=0; i < stockdata.length; i++){

            depotsubgroup.push({

                LOCATION: stockdata[i].LOCATION,
                TOTAL: parseInt(stockdata[i].QUANTITY),
                subData: [
                    {name:"FLATRACK", value: parseInt(stockdata[i].FLATRACK)},
                    {name:"HC_PALLET_WIDE", value: parseInt(stockdata[i].HC_PALLET_WIDE)},               
                    {name:"OPEN_TOP", value: parseInt(stockdata[i].OPEN_TOP)},
                    {name:"REEFER", value: parseInt(stockdata[i].REEFER)},
                    {name:"STANDARD", value: parseInt(stockdata[i].STANDARD)},
                    {name:"TANK", value: parseInt(stockdata[i].TANK)}
                ]
            })
        }

        dispatch({
            type: "SET_STOCK_DATA",
            payload: stockdata
        })
        dispatch({
            type: "SET_STOCKGROUP_DATA",
            payload: groupdata
        })
        dispatch({
            type: "SET_STOCK_TOTAL",
            payload: totalStock
        })
        dispatch({
            type: "SET_STOCKTYPE_DATA",
            payload: typedata
        })
        dispatch({
            type: "SET_STOCKGROUPBAR_DATA",
            payload: groupbardata
        })
        dispatch({
            type: "SET_STOCKTYPEBAR_DATA",
            payload: typebardata
        })
        dispatch({
            type: "SET_STOCKRADIUS_DATA",
            payload: radiusdata
        })
        dispatch({
            type: "SET_STOCKDEPOTSUB_DATA",
            payload: depotsubgroup
        })
    }
}

export function setDefaultStockData() {
    return async dispatch => {

        let defaultLocationFilter = null;
        let defaultLocations = [];
        var locationCodes = [];

        // Fixing User ID for now
        await fetch(`/getConfiguration/${"S00871562"}`)
        .then(response => response.json())
        .then(json => {
            defaultLocationFilter= json[0].defaultLocationFilter;
            }
        )

        //Default Location Filter
        await fetch(`/getLocationFilter/${defaultLocationFilter}`)
        .then(response => response.json())
        .then(json => {
            defaultLocations = json;
            for(let i=0; i<defaultLocations.length; i++){
                locationCodes.push(defaultLocations[i].LOCATION)
            }
        })

        //Stock data
        let stockdata = [];
        let selectionJSON = JSON.stringify(locationCodes);

        await fetch(`/getStocks/${selectionJSON}`)
        .then(response => response.json())
        .then(json => {stockdata = json;})

        //Calculate total stock
        var totalStock = 0;

        for(var i = 0; i < stockdata.length; i++){
          totalStock += parseInt(stockdata[i].QUANTITY);
        }

        //Calculate stock group data
        var totalFlatRack = 0;
        var totalHCPalletWide = 0;
        var totalOpenTop = 0;
        var totalReefer = 0;
        var totalStandard = 0;
        var totalTank = 0;

        for(i = 0; i < stockdata.length; i++){
            totalFlatRack += parseInt(stockdata[i].FLATRACK);
            totalHCPalletWide += parseInt(stockdata[i].HC_PALLET_WIDE);
            totalOpenTop += parseInt(stockdata[i].OPEN_TOP);
            totalReefer += parseInt(stockdata[i].REEFER);
            totalStandard += parseInt(stockdata[i].STANDARD);
            totalTank += parseInt(stockdata[i].TANK);
        }

        var groupdata = [
            {
                type: "Tank",
                value: totalTank
            },
            {
                type: "Flat Rack",
                value: totalFlatRack
            },
            {
                type: "Pallet Wide",
                value: totalHCPalletWide
            },
            {
                type: "Open Top",
                value: totalOpenTop
            },
            {
                type: "Reefer",
                value: totalReefer
            },
            {
                type: "Standard",
                value: totalStandard
            }
        ]

        //Agregate group values to be used in a Bar chart
        var groupbardata = [];

        for (let i=0; i<groupdata.length; i++){
            groupbardata.push({
                XVALUES: groupdata[i].type,
                YVALUES: groupdata[i].value.toString()
            })
        }

        //Calculate stock type data
        var typedata = [];
        var typeJSON = JSON.stringify(locationCodes);

        await fetch(`/getDepotType/${typeJSON}`)
        .then(response => response.json())
        .then(json => {typedata = json});

        //Agregate type values to be used in a Bar chart
        var typebardata = [];

        typedata.reduce(function(res, value) {
        if (!res[value.TYPE]) {
            res[value.TYPE] = { XVALUES: value.TYPE, YVALUES: 0 };
            typebardata.push(res[value.TYPE])
        }
        res[value.TYPE].YVALUES += parseInt(value.QUANTITY);
        return res;
        }, {});

        // Agregate group values for Radius chart
        var radiusdata = [];

        for (i=0; i < stockdata.length; i++){

            radiusdata.push({

                LOCATION: stockdata[i].LOCATION,
                FLATRACK: stockdata[i].FLATRACK,
                HC_PALLET_WIDE: stockdata[i].HC_PALLET_WIDE,
                OPEN_TOP: stockdata[i].OPEN_TOP,
                REEFER: stockdata[i].REEFER,
                STANDARD: stockdata[i].STANDARD,
                TANK: stockdata[i].TANK
            })
        }

        //Agregate depots using sub group data for Double Pie Chart
        var depotsubgroup = [];

        for (i=0; i < stockdata.length; i++){

            depotsubgroup.push({

                LOCATION: stockdata[i].LOCATION,
                TOTAL: parseInt(stockdata[i].QUANTITY),
                subData: [
                    {name:"FLATRACK", value: parseInt(stockdata[i].FLATRACK)},
                    {name:"HC_PALLET_WIDE", value: parseInt(stockdata[i].HC_PALLET_WIDE)},               
                    {name:"OPEN_TOP", value: parseInt(stockdata[i].OPEN_TOP)},
                    {name:"REEFER", value: parseInt(stockdata[i].REEFER)},
                    {name:"STANDARD", value: parseInt(stockdata[i].STANDARD)},
                    {name:"TANK", value: parseInt(stockdata[i].TANK)}
                ]
            })
        }

        dispatch({
            type: "SET_STOCK_DATA",
            payload: stockdata
        })
        dispatch({
            type: "SET_STOCKGROUP_DATA",
            payload: groupdata
        })
        dispatch({
            type: "SET_STOCK_TOTAL",
            payload: totalStock
        })
        dispatch({
            type: "SET_STOCKTYPE_DATA",
            payload: typedata
        })
        dispatch({
            type: "SET_STOCKGROUPBAR_DATA",
            payload: groupbardata
        })
        dispatch({
            type: "SET_STOCKTYPEBAR_DATA",
            payload: typebardata
        })
        dispatch({
            type: "SET_STOCKRADIUS_DATA",
            payload: radiusdata
        })
        dispatch({
            type: "SET_STOCKDEPOTSUB_DATA",
            payload: depotsubgroup
        })
    }
}

// Update Container data
export function setContainerData(selection) {
    return async dispatch => {

        let containerdata = [];        
        var hashtag = "";

        let selectionJSON = JSON.stringify(selection);

        selection = selection.sort();
        for(let i=0; i<selection.length; i++) hashtag = hashtag + selection[i];
        
        const state = store.getState();

        if(hashtag === state.masterDataReducer.dataTag) containerdata = state.masterDataReducer.resourceData;
        else{

            store.dispatch(UpdateResourceData(selection));
            await fetch(`/getResources/${selectionJSON}`)
            .then(response => response.json())
            .then(json => {
                containerdata = json;
                }
            ) 
        }  

        //Calculate container count
        var count = 0;

        for(var i = 0; i < containerdata.length; i++){
            count += 1;
        }

        //Calculate Status group data
        var totalNotBlocked = 0;
        var totalDamaged = 0;
        var totalOutOfFleet = 0;

        for(i = 0; i < containerdata.length; i++){

            if(containerdata[i].STATUS === "Not Blocked")
                totalNotBlocked += 1
            if(containerdata[i].STATUS === "Damaged")
                totalDamaged += 1
            if(containerdata[i].STATUS === "Out of Fleet")
                totalOutOfFleet += 1
        }

        var statusdata = [
            {
                type: "Not Blocked",
                value: totalNotBlocked
            },
            {
                type: "Damaged",
                value: totalDamaged
            },
            {
                type: "Out of Fleet",
                value: totalOutOfFleet
            }
        ]

        //Calculate Ownership group data
        var totalOwned = 0;
        var totalLeased = 0;
        var totalThirdParty = 0;
        var totalEligibleforOffHire = 0;

        for(i = 0; i < containerdata.length; i++){

            if(containerdata[i].OWNERSHIP === "Owned")
                totalOwned += 1
            if(containerdata[i].OWNERSHIP === "Leased")
                totalLeased += 1
            if(containerdata[i].OWNERSHIP === "Third party")
                totalThirdParty += 1
            if(containerdata[i].OWNERSHIP === "Eligible for offhire")
                totalEligibleforOffHire += 1
        }

        //Calculate status group data per depot
        var statusdepot = [];
        var statusdepotsub = [];

        await fetch(`/getStatusDepot/${selectionJSON}`)
        .then(response => response.json())
        .then(json => {
            statusdepot = json;
            }
        )

        for (i=0; i < statusdepot.length; i++){

            statusdepotsub.push({

                LOCATION: statusdepot[i].LOCATION,
                TOTAL: parseInt(statusdepot[i].TOTAL),
                subData: [
                    {name:"DAMAGED", value: parseInt(statusdepot[i].DAMAGED)},
                    {name:"NOT_BLOCKED", value: parseInt(statusdepot[i].NOT_BLOCKED)},               
                    {name:"OUT_OF_FLEET", value: parseInt(statusdepot[i].OUT_OF_FLEET)},
                ]
            })
        }

        //Calculate Ownership group data per depot
        var ownershipdepot = [];
        var ownershipdepotsub = [];

        await fetch(`/getOwnershipDepot/${selectionJSON}`)
        .then(response => response.json())
        .then(json => {
            ownershipdepot = json;
            }
        )

        for (i=0; i < ownershipdepot.length; i++){

            ownershipdepotsub.push({

                LOCATION: ownershipdepot[i].LOCATION,
                TOTAL: parseInt(ownershipdepot[i].TOTAL),
                subData: [
                    {name:"ELIGIBLE_OFFHIRE", value: parseInt(ownershipdepot[i].ELIGIBLE_OFFHIRE)},
                    {name:"LEASED", value: parseInt(ownershipdepot[i].LEASED)},               
                    {name:"OWNED", value: parseInt(ownershipdepot[i].OWNED)},
                    {name:"THIRD_PARTY", value: parseInt(ownershipdepot[i].THIRD_PARTY)},
                ]
            })
        }

        var ownershipdata = [
            {
                type: "Owned",
                value: totalOwned
            },
            {
                type: "Leased",
                value: totalLeased
            },
            {
                type: "Third Party",
                value: totalThirdParty
            },
            {
                type: "Eligible for offhire",
                value: totalEligibleforOffHire
            }
        ]

        dispatch({
            type: "SET_CONTAINER_DATA",
            payload: containerdata
        })
        dispatch({
            type: "SET_CONTAINER_COUNT",
            payload: count
        })
        dispatch({
            type: "SET_CONTAINER_STATUS",
            payload: statusdata
        })
        dispatch({
            type: "SET_CONTAINER_OWNERSHIP",
            payload: ownershipdata
        })
        dispatch({
            type: "SET_CONTAINER_DEPOTSTATUS",
            payload: statusdepotsub
        })
        dispatch({
            type: "SET_CONTAINER_DEPOTOWNERSHIP",
            payload: ownershipdepotsub
        })
    }
}

export function setDefaulContainerData() {
    return async dispatch => {
        
        let defaultLocationFilter = null;
        let defaultLocations = [];
        var locationCodes = [];
        var hashtag = "";

        // Fixing User ID for now
        await fetch(`/getConfiguration/${"S00871562"}`)
        .then(response => response.json())
        .then(json => {
            defaultLocationFilter= json[0].defaultLocationFilter;
            }
        )

        await fetch(`/getLocationFilter/${defaultLocationFilter}`)
        .then(response => response.json())
        .then(json => {
            defaultLocations = json;
            for(let i=0; i<defaultLocations.length; i++){
                locationCodes.push(defaultLocations[i].LOCATION)
            }
        })

        let containerdata = [];   

        let selectionJSON = JSON.stringify(locationCodes);
        
        locationCodes = locationCodes.sort();
        for(let i=0; i<locationCodes.length; i++) hashtag = hashtag + locationCodes[i];
                
        const state = store.getState();        

        if(hashtag === state.masterDataReducer.dataTag) containerdata = state.masterDataReducer.resourceData;
        else{
            
            store.dispatch(UpdateResourceData(locationCodes));
            await fetch(`/getResources/${selectionJSON}`)
            .then(response => response.json())
            .then(json => {
                containerdata = json;
                }
            ) 
        }

        //Calculate container count
        var count = 0;

        for(var i = 0; i < containerdata.length; i++){
            count += 1;
        }

        //Calculate Status group data
        var totalNotBlocked = 0;
        var totalDamaged = 0;
        var totalOutOfFleet = 0;

        for(i = 0; i < containerdata.length; i++){

            if(containerdata[i].STATUS === "Not Blocked")
                totalNotBlocked += 1
            if(containerdata[i].STATUS === "Damaged")
                totalDamaged += 1
            if(containerdata[i].STATUS === "Out of Fleet")
                totalOutOfFleet += 1
        }

        var statusdata = [
            {
                type: "Not Blocked",
                value: totalNotBlocked
            },
            {
                type: "Damaged",
                value: totalDamaged
            },
            {
                type: "Out of Fleet",
                value: totalOutOfFleet
            }
        ]

        //Calculate Ownership group data
        var totalOwned = 0;
        var totalLeased = 0;
        var totalThirdParty = 0;
        var totalEligibleforOffHire = 0;

        for(i = 0; i < containerdata.length; i++){

            if(containerdata[i].OWNERSHIP === "Owned")
                totalOwned += 1
            if(containerdata[i].OWNERSHIP === "Leased")
                totalLeased += 1
            if(containerdata[i].OWNERSHIP === "Third party")
                totalThirdParty += 1
            if(containerdata[i].OWNERSHIP === "Eligible for offhire")
                totalEligibleforOffHire += 1
        }

        var ownershipdata = [
            {
                type: "Owned",
                value: totalOwned
            },
            {
                type: "Leased",
                value: totalLeased
            },
            {
                type: "Third Party",
                value: totalThirdParty
            },
            {
                type: "Eligible for offhire",
                value: totalEligibleforOffHire
            }
        ]

        //Calculate status group data per depot
        var statusdepot = [];
        var statusdepotsub = [];

        await fetch(`/getStatusDepot/${selectionJSON}`)
        .then(response => response.json())
        .then(json => {
            statusdepot = json;
            }
        )

        for (i=0; i < statusdepot.length; i++){

            statusdepotsub.push({

                LOCATION: statusdepot[i].LOCATION,
                TOTAL: parseInt(statusdepot[i].TOTAL),
                subData: [
                    {name:"DAMAGED", value: parseInt(statusdepot[i].DAMAGED)},
                    {name:"NOT_BLOCKED", value: parseInt(statusdepot[i].NOT_BLOCKED)},               
                    {name:"OUT_OF_FLEET", value: parseInt(statusdepot[i].OUT_OF_FLEET)},
                ]
            })
        }

        //Calculate Ownership group data per depot
        var ownershipdepot = [];
        var ownershipdepotsub = [];

        await fetch(`/getOwnershipDepot/${selectionJSON}`)
        .then(response => response.json())
        .then(json => {
            ownershipdepot = json;
            }
        )

        for (i=0; i < ownershipdepot.length; i++){

            ownershipdepotsub.push({

                LOCATION: ownershipdepot[i].LOCATION,
                TOTAL: parseInt(ownershipdepot[i].TOTAL),
                subData: [
                    {name:"ELIGIBLE_OFFHIRE", value: parseInt(ownershipdepot[i].ELIGIBLE_OFFHIRE)},
                    {name:"LEASED", value: parseInt(ownershipdepot[i].LEASED)},               
                    {name:"OWNED", value: parseInt(ownershipdepot[i].OWNED)},
                    {name:"THIRD_PARTY", value: parseInt(ownershipdepot[i].THIRD_PARTY)},
                ]
            })
        }

        dispatch({
            type: "SET_CONTAINER_DATA",
            payload: containerdata
        })
        dispatch({
            type: "SET_CONTAINER_COUNT",
            payload: count
        })
        dispatch({
            type: "SET_CONTAINER_STATUS",
            payload: statusdata
        })
        dispatch({
            type: "SET_CONTAINER_OWNERSHIP",
            payload: ownershipdata
        })
        dispatch({
            type: "SET_CONTAINER_DEPOTSTATUS",
            payload: statusdepotsub
        })
        dispatch({
            type: "SET_CONTAINER_DEPOTOWNERSHIP",
            payload: ownershipdepotsub
        })
    }
}

//Update the search locations
export function setSearchLocation() {
    return async dispatch => {

        let locdata = [];

        await fetch('/getLocation')
        .then(response => response.json())
        .then(json => {
            for (let i = 0; i < json.length; i++) {
                locdata.push(json[i].LOCATION)
            }
        });

        dispatch({
            type: "SET_SEARCH_LOCATIONS",
            payload: locdata
        })
    }
}

//Update the selected locations
export function setSelectedLocation(selection) {
    return dispatch => {
        dispatch({
            type: "SET_SELECTED_LOCATIONS",
            payload: selection
        })
    }
}

//Update the default locations
export function setDefaultLocation() {
    return async dispatch => {

        let defaultLocationFilter = null;
        let defaultLocations = [];

        // Fixing User ID for now
        await fetch(`/getConfiguration/${"S00871562"}`)
        .then(response => response.json())
        .then(json => {
            defaultLocationFilter= json[0].defaultLocationFilter;
            }
        )

        await fetch(`/getLocationFilter/${defaultLocationFilter}`)
        .then(response => response.json())
        .then(json => {

            for(let i=0; i<json.length; i++){
                defaultLocations.push(json[i].LOCATION)
            }
        })

        dispatch({
            type: "SET_DEFAULT_LOCATIONS",
            payload: defaultLocations
        })
    }
}

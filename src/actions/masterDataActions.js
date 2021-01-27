export function UpdateResourceType(){
    return async dispatch => {

        var types = [];
    
        await fetch('/getResource_Types')
        .then(response => response.json())
        .then(json => {

            for (let i = 0; i < json.length; i++) {
                types.push(json[i].TYPE)
            }

            dispatch({
                type: "SET_RESOURCE_TYPE",
                payload: types
            })
        })
    }
}

export function UpdateResourceGroup(){
    return async dispatch => {

        var groups = [];
    
        await fetch('/getResource_Groups')
        .then(response => response.json())
        .then(json => {

            for (let i = 0; i < json.length; i++) {
                groups.push(json[i].GROUP)
            }

            dispatch({
                type: "SET_RESOURCE_GROUP",
                payload: groups
            })
        })
    }
}

export function UpdateResourceStatus(){
    return async dispatch => {

        var status = [];
    
        await fetch('/getResource_Status')
        .then(response => response.json())
        .then(json => {

            for (let i = 0; i < json.length; i++) {
                status.push(json[i].STATUS)
            }

            dispatch({
                type: "SET_RESOURCE_STATUS",
                payload: status
            })
        })
    }
}

export function UpdateResourceOwnership(){
    return async dispatch => {

        var ownership = [];
    
        await fetch('/getResource_Ownership')
        .then(response => response.json())
        .then(json => {

            for (let i = 0; i < json.length; i++) {
                ownership.push(json[i].OWNERSHIP)
            }

            dispatch({
                type: "SET_RESOURCE_OWNERSHIP",
                payload: ownership
            })
        })
    }
}

export function UpdateResourceData(selection){
    return async dispatch => {

        var data = [];
        var hashtag = "";

        let selectionJSON = JSON.stringify(selection);

        for (let i = 0; i < selection.length; i++) hashtag = hashtag + selection[i];
    
        await fetch(`/getResources/${selectionJSON}`)
        .then(response => response.json())
        .then(json => {
            data = json.sort();    
            dispatch({
                type: "SET_RESOURCE_DATA",
                payload: data,
                tag: hashtag
            })
        })
    }
}
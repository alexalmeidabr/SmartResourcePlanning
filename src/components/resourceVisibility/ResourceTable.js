import MaterialTable from 'material-table';
import React, { Component } from 'react';

class ResourceTable extends Component {

    constructor(){

        super();
        this.state = {
            data: [],
            columns: [
                {title:"Depot", field:"DEPOT"},
                {title:"Container", field: "CODE"},
                {title:"Type", field: "TYPE"},
                {title:"Group", field: "GROUP"},
                {title:"TEUs", field: "TEU", type: 'numeric', 
                    cellStyle: {textAlign: "center"},
                    headerStyle: {textAlign: "left"}
                },
                {title: "Status", field: "STATUS"},
                {title:"Food Grade", field: "FOODGRADE"},
                {title:"Idle days", field: "IDLEDAYS", type: 'numeric', 
                    cellStyle: {textAlign: "center"},
                    headerStyle: {textAlign: "left"}
                },
                {title:"Lease Contract", field: "LEASECONTRACT"},
                {title:"Ownership", field: "OWNERSHIP"},
                {title:"Shipper Owned" , field: "SOC"},
                {title:"Manufacture date", 
                 field: "BUILDDATE", 
                 type: "date",
                 sorting: false
                 //bug: need to fix sorting date column. Deactivating for now
                }
            ]
        }
    }             
    
    componentWillReceiveProps(nextProps){

        this.setState({data: nextProps.data});     
        
    }
        
    render() {

        return(                
            <div className={"ResourceTable"}>        
                <MaterialTable 
                    title={"Containers"}                        
                    data={this.props.data}
                    columns={this.state.columns}
                    options={{
                        search: false,
                        sorting: true,
                        filtering: true,
                        exportButton: true,
                        pageSize: 10,
                        cellStyle: {height:30, paddingTop:0, paddingBottom:0},
                        emptyRowsWhenPaging: false,
                        headerStyle: {
                            maxWidth: 20,
                            height: 10,
                            maxHeight: 10,                                                                                        
                            }
                    }}
                />
            </div>
    
        );
    }
}

export default ResourceTable;
import MaterialTable from 'material-table';
import React, { Component } from 'react';


class SDActualStockTable extends Component {

    generatechartData() {
    
        var baseData = [];        
        
        baseData.push(
            {CODE: "MSAU2178006",
             TYPE: "20GP",
             GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "CSNU2940489",
             TYPE: "20GP",
             GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "MSAU9925489",
             TYPE: "40GP",
             GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "SCMU2769057",
             TYPE: "40HC",
             GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "MSWU5676075",
            TYPE: "40HC",
            GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "HAMU8489979",
             TYPE: "45HC",
             GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "HAMU1289638",
            TYPE: "45HC",
            GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "HLXU2275501",
             TYPE: "20RE",
             GROUP: "REEFER"
            }
        );
    
        baseData.push(
            {CODE: "SCMU4791574",
             TYPE: "40RH",
             GROUP: "REEFER"
            }
        );
    
        baseData.push(
            {CODE: "CSNU1188589",
             TYPE: "45PW",
             GROUP: "HC_PALLET_WIDE"
            }
        );
    
        baseData.push(
            {CODE: "COZU1001270",
             TYPE: "20KL",
             GROUP: "TANK"
            }
        );
    
        baseData.push(
            {CODE: "CJYU3344834",
             TYPE: "20GP",
             GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "ITAU1820117",
             TYPE: "40GP",
             GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "MSFU2876634",
             TYPE: "40HC",
             GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "COZU4864204",
             TYPE: "45HC",
             GROUP: "STANDARD"
            }
        );
    
        baseData.push(
            {CODE: "MSFU3918108",
             TYPE: "20RE",
             GROUP: "REEFER"
            }
        );
    
        baseData.push(
            {CODE: "CSNU3304335",
             TYPE: "40RH",
             GROUP: "REEFER"
            }
        );
    
        baseData.push(
            {CODE: "HAMU3414251",
             TYPE: "45RH",
             GROUP: "REEFER"
            }
        );
    
        baseData.push(
            {CODE: "MSFU5405167",
             TYPE: "20OT",
             GROUP: "OPEN_TOP"
            }
        );
    
        baseData.push(
            {CODE: "CJYU2015950",
             TYPE: "40OT",
             GROUP: "OPEN_TOP"
            }
        );         
        return baseData;
    }      

    constructor(){

        super();
        this.state = {
            data: [],
            columns: [
                {title:"Container", field: "CODE"},
                {title:"Type", field: "TYPE"},
                {title:"Group", field: "GROUP"},
            ]
        }
    }            
    
    componentDidMount() {

        this.setState({data: this.generatechartData()});
        
      }     
        
    render() {

        return(                
            <div>        
                <MaterialTable 
                    title={"Resources or Transportation Units "}
                    data={this.state.data}
                    columns={this.state.columns}
                    options={{
                        search: false,
                        filtering: true,
                        exportButton: true,
                        pageSize: 20
                    }}
                />
            </div>
    
        );
    }
}
    
export default SDActualStockTable;
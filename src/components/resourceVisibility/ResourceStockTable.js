import MaterialTable from 'material-table';
import React, { Component } from 'react';
import {setStockData, setSearchLocation, setDefaultStockData} from '../../actions/resourceVisibilityActions';
import {connect} from "react-redux";
import '../../App.css';
 
var columns= [
    {title:"Depot", field: "LOCATION"},
    {title:"Total", field: "QUANTITY", type: 'numeric'},
    {title:"Min Safety Stock", field: "MINSTOCK", type: 'numeric'},
    {title:"Max Safety Stock", field: "MAXSTOCK", type: 'numeric'},
    {title:"Max Capacity", field: "MAXCAP", type: 'numeric'},
    {title:"STANDARD", field: "STANDARD", type: 'numeric'},
    {title:"FLAT-RACK", field: "FLATRACK", type: 'numeric'},
    {title:"HC_PALLET_WIDE", field: "HC_PALLET_WIDE", type: 'numeric'},
    {title:"OPEN_TOP", field: "OPEN_TOP", type: 'numeric'},
    {title:"REEFER", field: "REEFER", type: 'numeric'},
    {title:"TANK", field: "TANK", type: 'numeric'},
                      
]

class ResourceTable extends Component {
        
    render() {

        // console.log("Table stock data:");
        // console.log(this.props.stockData);

        return (                 
            <div className={"ResourceTable"}>        
                <MaterialTable 
                    title={"Stock"}                        
                    data= {this.props.stockData}
                    columns={columns}
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

    const mapStateToProps = (state) => {
        return {
            stockData: state.stockDataReducer.stockData,
            searchLocations: state.SearchLocationsReducer.searchLocations
            
        };
    };
    
    const mapDispatchToProps = (dispatch) => {
        return {
            setStockData: (selection) => {
                dispatch(setStockData(selection));
            },
            setSearchLocation: () => {
                dispatch(setSearchLocation());
            },
            setDefaultStockData: () => {
            dispatch(setDefaultStockData())
        }
        };
    };
    
export default connect(mapStateToProps, mapDispatchToProps) (ResourceTable);
import React, {Component} from "react";
import Loader from '../components/reusables/Loader';
import MiniCard from '../components/reusables/MiniCardSingleText'; 
import MultiSelection from '../components/reusables/MultiSelection';
import SimpleBarChart from '../components/reusables/SimpleBarChart';
import SCPieChart from '../components/reusables/SCPieChart';
import ResourceAngularGauge from '../components/resourceVisibility/ResourceAngularGauge';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {UpdateDashboardData, setDashboardData, setStockData, setSearchLocation, setDefaultLocation, setDefaultStockData, setSelectedLocation, setContainerData, setDefaulContainerData} from '../actions/resourceVisibilityActions';

class ResourceVisibility extends Component {    
 
    constructor(){

        super();
        this.state = {
            defaultLocationFilter: null,
            dashconfig: null,
            numCards: Math.floor(window.innerHeight / 140),
            numCharts: Math.floor(window.innerHeight / 200),

            data: [],
            locations: [],
            groups: [],
            resources: [],            
        }
    }

    updateDimensions = () => {
        this.setState({numCards: Math.floor(window.innerHeight / 140)});
        this.setState({numCharts: Math.floor(window.innerHeight / 200)})
      };
  
    componentDidMount(){

        this.props.setSearchLocation();        

        if(this.props.selectedLocations.length === 0) {
            this.props.setDashboardData();            
            this.props.setDefaultStockData(); 
            this.props.setDefaultLocation();
            this.props.setDefaulContainerData();
            
        }
        else {
            this.props.UpdateDashboardData(this.props.selectedLocations);
            this.props.setStockData(this.props.selectedLocations); 
            this.props.setContainerData(this.props.selectedLocations);
        }   

        window.addEventListener('resize', this.updateDimensions);
        
    }

    updateStockData() {
        console.log(this.props.selectedLocations);
        this.props.setStockData(this.props.selectedLocations);
        //this.props.setSelectedLocation(values);
        this.props.setContainerData(this.props.selectedLocations);
        this.props.UpdateDashboardData(this.props.selectedLocations);
         
    }

    removeStockData(values){
        console.log(values);
        this.props.setStockData(values);
        this.props.setSelectedLocation(values);
        this.props.setContainerData(values);
        this.props.UpdateDashboardData(values);

    }

    updateSelectedLocations(values){

        this.props.setSelectedLocation(values);

    }

    shouldComponentUpdate(nextProps, nextState){       

        //Below code will re-render the charts in case of window resize
        if(this.state.numCards !== nextState.numCards || this.state.numCharts !== nextState.numCharts) return true;

        //Checking if Props from Redux have been initiated
        if( nextProps.searchLocations.length === 0) {            
                return false;
        }
        
        // Below code is to avoid multiple renders when updating the selection && 
        // The Assumption, that seems to be true, is that miniCards or chartSource is always the
        // last props to be updated

        //  console.log("----------------- START -------------------")
        //  console.log("chartSource: " + this.props.chartSource + " " + nextProps.chartSource)
        //  console.log("miniCards: " + this.props.miniCards.length + " " + nextProps.miniCards)
        //  console.log("stockTypeBarData: " + this.props.stockTypeBarData.length + " " + nextProps.stockTypeBarData)
        //  console.log("miniCardCount: " + this.props.miniCardCount + " " + nextProps.miniCardCount)
        //  console.log("searchLocations: " + this.props.searchLocations.length + " " + nextProps.searchLocations)
        //  console.log("stockGroupBarData: " + this.props.stockGroupBarData.length + " " + nextProps.stockGroupBarData)
        //  console.log("selectedLocations: " + this.props.selectedLocations.length + " " + nextProps.selectedLocations)
        //  console.log("defaultLocations: " + this.props.defaultLocations.length + " " + nextProps.defaultLocations)
        // console.log("containerStatus: " + this.props.containerStatus.length);
        // console.log("containerOwnership: " + this.props.containerOwnership.length);

          if(this.props.miniCards !== nextProps.miniCards || this.props.chartSource !== nextProps.chartSource) {
            return true;
        }
        else {
            return false;    
        }        
        //return true;
    }

    miniChartsList = (chartItems, count) => (
        
        <div className={"dashboardColRight"}>
        {            
            chartItems.map(chartItem => {
                
                if(chartItem === "Status" && count > 0){     
                    count--;                                            
                    return (
                        <div >
                            <SCPieChart 
                                title="Statuses" 
                                id="pieChart01"
                                data={this.props.containerStatus}
                            />                         
                        </div>
                    )
                }
                else if(chartItem === "Ownership" && count > 0){
                    count--; 
                    return (
                        <div >
                            <SCPieChart 
                                title="Ownership" 
                                id="pieChart02"
                                data={this.props.containerOwnership}
                            /> 
                        </div>
                    )
                }
                else if(chartItem === "Stock-Level" && count > 0){
                    count--; 
                    return (
                        <ResourceAngularGauge/>
                    )
                }
            })
        }
        </div>
    )

    render (){

        // Only load if all Redux props are loaded
        var propsLoaded = false;

        var chartdata = null;
        
        if(this.props.chartSource === "Type") chartdata = this.props.stockTypeBarData;
        else chartdata = this.props.stockGroupBarData;

        if(this.props.miniCards.length > 0 && this.props.chartSource !== null &&
            this.props.stockTypeBarData.length > 0 && this.props.miniCardCount > 0 &&
            this.props.searchLocations.length > 0 && this.props.stockGroupBarData.length > 0 &&
            this.props.selectedLocations.length > 0 && this.props.containerStatus.length > 0 &&
            this.props.containerOwnership.length > 0 ) {propsLoaded = true};  
            
        if (propsLoaded) {            

            return (            
                            
                    <div className={"dashboard"}>   

                        <div className={"dashboardCol"}>   

                            {
                            this.props.miniCards.slice(0,this.state.numCards).map((card, index) => 
                                <MiniCard value={card.value} title={card.text}/>
                            )}                        

                        </div>  

                        <div className={"dashboardCenter"}>
                            <br/><MultiSelection 
                                searchValues={this.props.searchLocations}
                                updateData={this.updateStockData.bind(this)}
                                updateSelection={this.updateSelectedLocations.bind(this)}
                                values={this.props.selectedLocations}
                                removeData={this.removeStockData.bind(this)}
                            />
                            <Paper className={"dashboardChart"}>
                                <SimpleBarChart
                                    data={chartdata}                                
                                    //data={this.props.stockTypeBarData}
                                    type={"NORMAL"}                                                                
                                />
                            </Paper>  

                        </div>

                        {this.miniChartsList(this.props.miniCharts, this.state.numCharts)}

                    </div>                    
            );
        }
        else 
            //return (<Typography className={classes.heading}>Loading...</Typography> )    
            return (<Loader />)
    }

};

const mapStateToProps = (state) => {
    return {

        searchLocations: state.SearchLocationsReducer.searchLocations,
        defaultLocations: state.SearchLocationsReducer.defaultLocations,
        selectedLocations: state.SearchLocationsReducer.selectedLocations,
        miniCards: state.ResourceDashBoardReducer.miniCards,
        miniCardCount: state.ResourceDashBoardReducer.miniCardCount,
        chartSource: state.ResourceDashBoardReducer.chartSource,
        miniCharts: state.ResourceDashBoardReducer.miniCharts,
        stockTypeBarData: state.stockDataReducer.stockTypeBarData,
        stockGroupBarData: state.stockDataReducer.stockGroupBarData,
        containerStatus: state.ContainerDataReducer.containerStatus,
        containerOwnership: state.ContainerDataReducer.containerOwnership
        
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
        setStockData: (selection) => {
            dispatch(setStockData(selection));
        },
        setDefaultStockData: () => {
            dispatch(setDefaultStockData())
        },
        setSearchLocation: () => {
            dispatch(setSearchLocation());
        },
        setDefaultLocation: () => {
            dispatch(setDefaultLocation())
        },
        setContainerData: (selection) => {
            dispatch(setContainerData(selection))
        },
        setDefaulContainerData: () => {
            dispatch(setDefaulContainerData())
        },
        setSelectedLocation: (selection) => {
            dispatch(setSelectedLocation(selection))
        },
        setDashboardData: () => {
            dispatch(setDashboardData())
        },
        UpdateDashboardData: (selection) => {
            dispatch(UpdateDashboardData(selection))
        },
      };
  };

export default connect(mapStateToProps, mapDispatchToProps) (ResourceVisibility);
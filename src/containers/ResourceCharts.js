import React, {Component} from "react";
import Loader from '../components/reusables/Loader';
import MultiSelection from '../components/reusables/MultiSelection';
import PieChart from '../components/reusables/PieChart';
import SimpleBarChart from '../components/reusables/SimpleBarChart';
import DoublePieChart from '../components/reusables/DoublePieChart';
import VariableRadiusChart from '../components/reusables/VariableRadiusChart';
import ResourceBarConfig from '../components/resourceVisibility/ResourceBarConfig';
import ResourcePieChartConfig from '../components/resourceVisibility/ResourcePieChartConfig';
import ResourceDoublePieConfig from '../components/resourceVisibility/ResourceDoublePieConfig';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles'; 
import '../App.css';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {setStockData, setSearchLocation, setDefaultLocation, setDefaultStockData, setSelectedLocation, setContainerData, setDefaulContainerData} from '../actions/resourceVisibilityActions';

const styles = makeStyles((theme) => ({ 
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));  

class ResourceStock extends Component {  
    
    constructor(){

        super();

        this.state = {
            width: 0,
            heigth: 0,
            loaded: false,
            barOption: "TYPE",
            barType: "NORMAL",
            pieOption: "ABSOLUTE",
            pieType: "NORMAL",
            doublePieOption: "ABSOLUTE",
            doublePieType: "GROUP"
        }
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

    componentDidMount(){     

        this.props.setSearchLocation();

        if(this.props.selectedLocations.length === 0) {
            this.props.setDefaultLocation();
            this.props.setDefaultStockData(); 
            this.props.setDefaulContainerData();
            
        }
        else {
            this.props.setStockData(this.props.selectedLocations); 
            this.props.setContainerData(this.props.selectedLocations);
        }       

        window.addEventListener('resize', this.updateDimensions);
    }

    shouldComponentUpdate(nextProps, nextState){

        //Below code will re-render the charts in case of window resize
        //if(this.state.width != nextState.width || this.state.heigth != nextState.height) return true;

        //Checking if Chart options have been changed
        if(this.state.barOption !== nextState.barOption ||
            this.state.barType !== nextState.barType ||
            this.state.pieOption !== nextState.pieOption ||
            this.state.pieType !== nextState.pieType ||
            this.state.doublePieOption !== nextState.doublePieOption ||
            this.state.doublePieType !== nextState.doublePieType) return true;

        //Checking if Props from Redux have been initiated
        if(nextProps.stockGroupData.length === 0 || nextProps.stockGroupBarData.length === 0 || 
            nextProps.stockTypeBarData.length === 0 || nextProps.stockDepotGroup.length === 0 || 
            nextProps.stockDepotSubData.length === 0 || nextProps.searchLocations.length === 0 || 
            nextProps.selectedLocations.length === 0 || nextProps.containerDepotStatus.length === 0 || 
            nextProps.containerDepotOwnership.length === 0) {
                return false;
        }

        //if(this.props.selectedLocations != nextProps.selectedLocations) return true;
        
        // Below code is to avoid multiple renders when updating the selection
        // The Assumption, that seems to be true, is that DepotOwnership is always the
        // last props to be updated
        if(this.props.containerDepotOwnership !== nextProps.containerDepotOwnership) {
            return true;
        }
        else {
            return false;    
        }
    }
    
    updateStockData() {

        this.props.setStockData(this.props.selectedLocations);
        //this.props.setSelectedLocation(values);
        this.props.setContainerData(this.props.selectedLocations);
         
    }

    removeStockData(values){

        this.props.setStockData(values);
        this.props.setSelectedLocation(values);
        this.props.setContainerData(values);

    }

    updateSelectedLocations(values){

        this.props.setSelectedLocation(values);

    }

    updateBarChart(option){

        if(option.target.value === "type") this.setState({barOption: "TYPE"})
        if(option.target.value === "group") this.setState({barOption: "GROUP"})

        if(option.target.value === "normal") this.setState({barType: "NORMAL"})
        if(option.target.value === "3D") this.setState({barType: "3D"})

    }

    updatePieChart(option){

        if(option.target.value === "absolute") this.setState({pieOption: "ABSOLUTE"})
        if(option.target.value === "percentage") this.setState({pieOption: "PERCENTAGE"})

        if(option.target.value === "normal") this.setState({pieType: "NORMAL"})
        if(option.target.value === "3D") this.setState({pieType: "3D"})
        if(option.target.value === "donut") this.setState({pieType: "DONUT"})
        if(option.target.value === "3Ddonut") this.setState({pieType: "3DDONUT"})
        if(option.target.value === "v3D") this.setState({pieType: "V3D"})

    }
    
    updateDoublePie(option){

        if(option.target.value === "absolute") this.setState({doublePieOption: "ABSOLUTE"})
        if(option.target.value === "percentage") this.setState({doublePieOption: "PERCENTAGE"})

        if(option.target.value === "group") this.setState({doublePieType: "GROUP"})
        if(option.target.value === "ownership") this.setState({doublePieType: "OWNERSHIP"})
        if(option.target.value === "status") this.setState({doublePieType: "STATUS"})

    }

    render (){ 
        
        const {classes} = this.props;  
        
        var barData = null;
        var doublePieData = null;

        if(this.state.barOption === "TYPE") barData = this.props.stockTypeBarData;
        if(this.state.barOption === "GROUP") barData = this.props.stockGroupBarData;   
        
        if(this.state.doublePieType === "GROUP") doublePieData = this.props.stockDepotSubData;
        if(this.state.doublePieType === "STATUS") doublePieData = this.props.containerDepotStatus;
        if(this.state.doublePieType === "OWNERSHIP") doublePieData = this.props.containerDepotOwnership;
           
        // Only load if all Redux props are loaded
        var propsLoaded = false;

        if(this.props.stockGroupData.length > 0 && this.props.stockGroupBarData.length > 0 && 
            this.props.stockTypeBarData.length > 0 && this.props.stockDepotGroup.length > 0 && 
            this.props.stockDepotSubData.length > 0 && this.props.searchLocations.length > 0 && 
            this.props.selectedLocations.length > 0 && this.props.containerDepotStatus.length > 0 && 
            this.props.containerDepotOwnership.length > 0) {propsLoaded = true};        

        if (propsLoaded) {
            
            return (                                 
                
                <div className={classes.root}>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className={classes.heading}>Selection</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MultiSelection 
                                searchValues={this.props.searchLocations}
                                updateData={this.updateStockData.bind(this)}
                                updateSelection={this.updateSelectedLocations.bind(this)}
                                values={this.props.selectedLocations}
                                removeData={this.removeStockData.bind(this)}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            >
                            <Typography className={classes.heading}>Bar Chart Overall</Typography>
                        </AccordionSummary>
                        <div className={"summary"}  >
                            <AccordionDetails>
                                <Paper className={"resourceBarChart"}>  
                                    <SimpleBarChart
                                        //data={this.props.stockGroupBarData}                                
                                        data={barData}
                                        type={this.state.barType}                                                                
                                    />
                                </Paper>
                                <ResourceBarConfig updateOption={this.updateBarChart.bind(this)}/>
                            </AccordionDetails>
                        </div>
                    </Accordion>

                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            >
                            <Typography className={classes.heading}>Bar Chart per Depot</Typography>
                        </AccordionSummary>
                        <div className={"summary"}  >
                            <AccordionDetails>
                                <VariableRadiusChart data={this.props.stockDepotGroup}/>
                            </AccordionDetails>
                        </div>
                    </Accordion> 

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        >
                            <Typography className={classes.heading}>Pie chart</Typography>                        
                        </AccordionSummary>
                        <div className={"content"}  >
                            <AccordionDetails>
                                <br/><br/>
                                <Paper className={"resourcePieChart"}>  
                                    <PieChart 
                                        type={this.state.pieType}
                                        option={this.state.pieOption}
                                        data={this.props.stockGroupData}/>
                                </Paper>
                                <ResourcePieChartConfig updateOption={this.updatePieChart.bind(this)}/>
                            </AccordionDetails>
                        </div>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        >
                        <Typography className={classes.heading}>Double Pie chart</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper className={"resourcePieChart"}>  
                                <DoublePieChart 
                                    data={doublePieData}
                                    option={this.state.doublePieOption}/>
                            </Paper>
                            <ResourceDoublePieConfig updateOption={this.updateDoublePie.bind(this)}
                            />
                        </AccordionDetails>
                    </Accordion>
                </div>                
            ); 
        }  
        else 

            return (<Loader />)
    }
};

const mapStateToProps = (state) => {
    return {
       
        stockGroupData: state.stockDataReducer.stockGroupData,
        stockGroupBarData: state.stockDataReducer.stockGroupBarData,
        stockTypeBarData: state.stockDataReducer.stockTypeBarData,
        stockDepotGroup: state.stockDataReducer.stockDepotGroup,
        stockDepotSubData: state.stockDataReducer.stockDepotSubData,
        searchLocations: state.SearchLocationsReducer.searchLocations,
        selectedLocations: state.SearchLocationsReducer.selectedLocations,
        containerDepotStatus: state.ContainerDataReducer.containerDepotStatus,
        containerDepotOwnership: state.ContainerDataReducer.containerDepotOwnership
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
        setDefaultLocation: () => {
            dispatch(setDefaultLocation())
        },
        setDefaultStockData: () => {
            dispatch(setDefaultStockData())
        },
        setSelectedLocation: (selection) => {
            dispatch(setSelectedLocation(selection))
        },
        setContainerData: (selection) => {
            dispatch(setContainerData(selection))
        },
        setDefaulContainerData: () => {
            dispatch(setDefaulContainerData())
        }
      };
  };

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles, { withTheme: true })(ResourceStock));

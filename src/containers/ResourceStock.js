import React, {Component} from "react";
import Loader from '../components/reusables/Loader';
import ResourceStockTable from '../components/resourceVisibility/ResourceStockTable'; 
import MultiSelection from '../components/reusables/MultiSelection';
import ResourceCardTotal from '../components/reusables/CardSingleText'; 
import ResourceAngularGauge from '../components/resourceVisibility/ResourceAngularGauge';
import ResourceSCPieChart from '../components/reusables/SCPieChart';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles'; 
import '../App.css';
import {connect} from "react-redux";
import {setStockData, setSearchLocation, setDefaultLocation, setDefaultStockData, setSelectedLocation} from '../actions/resourceVisibilityActions';

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
            heigth: 0
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
            
        }
        else this.props.setStockData(this.props.selectedLocations);
    }

    shouldComponentUpdate(nextProps, nextState){

        //Checking if Props from Redux have been initiated
        if( nextProps.searchLocations.length === 0 || nextProps.defaultLocations.length === 0 ||
            nextProps.selectedLocations.length === 0 || nextProps.stockGroupData.length === 0 ) 
            return false;                

        // Below code is to avoid multiple renders when updating the selection
        // The Assumption, that seems to be true, is that stockTotal is always the
        // last props to be updated
        if(this.props.stockTotal !== nextProps.stockTotal) {
            return true;
        }
        else {
            return false;    
        }                
    } 
    
    updateStockData ()  {

        this.props.setStockData(this.props.selectedLocations);
         
    }

    removeStockData(values){

        this.props.setSelectedLocation(values);
        this.props.setStockData(values);

    }

    updateSelectedLocations(values){

        this.props.setSelectedLocation(values);

    }

    render (){   
        
        const {classes} = this.props;    

        var propsLoaded = false;

        if( this.props.searchLocations.length > 0 && this.props.selectedLocations.length > 0 &&
            this.props.stockGroupData.length > 0 ) 
            {propsLoaded = true};  

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
                            <Typography className={classes.heading}>Summary</Typography>
                        </AccordionSummary>
                        <div className={"summary"}  >
                            <AccordionDetails>
                                <div className={"sumaryItem"}>
                                    <ResourceCardTotal 
                                        title={"Total number of containers"}
                                        value={this.props.stockTotal}/>
                                </div>
                                <div className={"sumaryItem"}>
                                    <ResourceAngularGauge />
                                </div>
                                <div className={"sumaryItem"}>
                                    <ResourceSCPieChart 
                                        data={this.props.stockGroupData}
                                        title={"Container Group Distribution"}
                                        id={"pieChart01"}/>
                                </div>
                            </AccordionDetails>
                        </div>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        >
                        <Typography className={classes.heading}>Stock Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ResourceStockTable/>
                        </AccordionDetails>
                    </Accordion>
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
        //stockData: state.stockDataReducer.stockData,
        stockGroupData: state.stockDataReducer.stockGroupData,
        stockTotal: state.stockDataReducer.stockTotal,
        searchLocations: state.SearchLocationsReducer.searchLocations,
        defaultLocations: state.SearchLocationsReducer.defaultLocations,
        selectedLocations: state.SearchLocationsReducer.selectedLocations
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
        }
      };
  };

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles, { withTheme: true })(ResourceStock));

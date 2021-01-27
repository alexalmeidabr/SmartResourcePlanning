import React, {Component} from "react";
import Loader from '../components/reusables/Loader';
import ResourceTable from '../components/resourceVisibility/ResourceTable'; 
import MultiSelection from '../components/reusables/MultiSelection';
import CardSimpleText from '../components/reusables/CardSingleText';
import SCPieChart from '../components/reusables/SCPieChart';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles'; 
import '../App.css';
import {connect} from "react-redux"; 
import {setSearchLocation, setDefaultLocation, setSelectedLocation, setContainerData, setDefaulContainerData} from '../actions/resourceVisibilityActions';

const styles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular, 
    },
  }));  

class ResourceContainers extends Component {   

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
            this.props.setDefaulContainerData();
            
        }
        else this.props.setContainerData(this.props.selectedLocations);
    }

    shouldComponentUpdate(nextProps, nextState){

        //Checking if Props from Redux have been initiated
        if( nextProps.searchLocations.length === 0 || nextProps.defaultLocations.length === 0 ||
            nextProps.selectedLocations.length === 0 || nextProps.containerData.length === 0 ||
            nextProps.containerCount === 0 || nextProps.containerStatus.length === 0 ||
            nextProps.containerOwnership.length === 0) 
            return false;                

        // Below code is to avoid multiple renders when updating the selection
        // The Assumption, that seems to be true, is that containerOwnership is always the
        // last props to be updated
        if(this.props.containerOwnership !== nextProps.containerOwnership) {
            return true;
        }
        else {
            return false;    
        }                
    }    
    
    updateStockData ()  {

        this.props.setContainerData(this.props.selectedLocations);
         
    }

    removeStockData(values){

        this.props.setSelectedLocation(values);
        this.props.setContainerData(values);

    }

    updateSelectedLocations(values){

        this.props.setSelectedLocation(values);

    }

    render (){   
        
        const {classes} = this.props;        

        var propsLoaded = false;

        if( this.props.searchLocations.length > 0 && this.props.selectedLocations.length > 0 &&
            this.props.containerData.length > 0 && this.props.containerCount > 0 &&
            this.props.containerStatus.length > 0 && this.props.containerOwnership.length > 0 ) 
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
                                    <CardSimpleText
                                        title={"Total number of containers"}
                                        value={this.props.containerCount}/>
                                </div>
                                <div className={"sumaryItem"}>
                                    <SCPieChart 
                                        title="Statuses" 
                                        id="pieChart01"
                                        data={this.props.containerStatus}/>
                                </div>
                                <div className={"sumaryItem"}>
                                    <SCPieChart 
                                    title="Ownership" 
                                    id="pieChart02"
                                    data={this.props.containerOwnership}/>
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
                        <Typography className={classes.heading}>Container Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ResourceTable data={this.props.containerData}/>
                        </AccordionDetails>
                    </Accordion>
                </div>                
            );   
        }     
        else 
            //return (<Typography className={classes.heading}>Loading...</Typography> ) 
            return (<Loader/>)
    }
};

const mapStateToProps = (state) => {
    return {
        searchLocations: state.SearchLocationsReducer.searchLocations,
        defaultLocations: state.SearchLocationsReducer.defaultLocations,
        selectedLocations: state.SearchLocationsReducer.selectedLocations,
        containerData: state.ContainerDataReducer.containerData,
        containerCount: state.ContainerDataReducer.containerCount,
        containerStatus: state.ContainerDataReducer.containerStatus,
        containerOwnership: state.ContainerDataReducer.containerOwnership
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {

        setSearchLocation: () => {
              dispatch(setSearchLocation());
        },
        setDefaultLocation: () => {
            dispatch(setDefaultLocation())
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

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles, { withTheme: true })(ResourceContainers));

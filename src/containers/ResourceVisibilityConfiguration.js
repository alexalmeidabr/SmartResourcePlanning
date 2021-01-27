import React, { Component } from 'react';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles'; 
import DashBoardConfig from '../components/resourceVisibility/ResourceDashBoardConfig';
import '../App.css';
import {setSelectedLocation} from '../actions/resourceVisibilityActions';

const styles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

class ResourceVisibilityConfiguration extends Component { 

    constructor(){

        super();
        this.state = {
            options: [],
            defaultLocationFilter: null,
            minicardconfig: null,
            dashboardChart: null,
            minichart1config: null,
            minichart2config: null,
            minichart3config: null
        }
    } 

    loadUserConfiguration = async() => {

        // Fixing User ID for now
        await fetch(`/getConfiguration/${"S00871562"}`)
        .then(response => response.json())
        .then(json => {            
            if (json[0] !== undefined){
                this.setState({
                    defaultLocationFilter: json[0].defaultLocationFilter,
                    minicardconfig: json[0].defaultMinicards,
                    dashboardChart: json[0].dashboardChart,
                    minichartconfig: json[0].minichartconfig,
                    minichart1config: json[0].defaultMiniCharts[0],
                    minichart2config: json[0].defaultMiniCharts[1],
                    minichart3config: json[0].defaultMiniCharts[2],
                });
            }            
        })
    }    

    componentDidMount() {

        this.loadLocationFilters();
        this.loadUserConfiguration();

    }

    loadLocationFilters = async() => {

        var data = [];

        await fetch(`/getLocationFilters`)
        .then(response => response.json())
        .then(json => {
            for (let i = 0; i < json.length; i++) {
                data.push(json[i].LOCATION_FILTER)
            }      
            var locationFilters = [...new Set(data)]   
            this.setState({options: locationFilters})
        }) 
    }

    onClickSaveConfiguration = async() => {

        // Fixing User ID for now
        const UserID = "S00871562";
        const defaultLocationFilter = this.state.defaultLocationFilter;
        const defaultMinicards = this.state.minicardconfig;        
        const dashboardChart = this.state.dashboardChart;
        var defaultMiniCharts = [];

        if(this.state.minichart1config !== null || this.state.minichart1config !== "None") 
            defaultMiniCharts.push(this.state.minichart1config);
        if(this.state.minichart2config !== null || this.state.minichart2config !== "None") 
        defaultMiniCharts.push(this.state.minichart2config);
        if(this.state.minichart3config !== null || this.state.minichart3config !== "None") 
        defaultMiniCharts.push(this.state.minichart3config);
        
        var nextSelection = [];

        const data = { UserID, defaultLocationFilter, defaultMinicards, defaultMiniCharts, dashboardChart};

        await fetch(`/getLocationFilter/${this.state.defaultLocationFilter}`)
        .then(json => {
            for(let i=0; i<json.length; i++) nextSelection.push(json[i].LOCATION)
        })

        this.props.setSelectedLocation(nextSelection);

        const options = {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('/saveConfiguration',options);        

    }

    setDashboardMiniCards(minicardconfig){

        this.setState({minicardconfig: minicardconfig})

    }

    shouldComponentUpdate(nextProps, nextState){

        if(this.state.options !== nextState.options ||
            this.state.defaultLocationFilter !== nextState.defaultLocationFilter ||
            this.state.dashboardChart !== nextState.dashboardChart ||
            this.state.minichart1config !== nextState.minichart1config ||
            this.state.minichart2config !== nextState.minichart2config ||
            this.state.minichart3config !== nextState.minichart3config
            ) return true;
        

        if(this.state.minicardconfig !== null) return false;
        return true;

    }

    render(){

        const {classes} = this.props; 

        return(        
            <div className={"resourceConfig"}>     

                <div className={"resourceConfigLeft"}>
                    
                    <DashBoardConfig updateDashboard={this.setDashboardMiniCards.bind(this)}
                        currentConfig={this.state.minicardconfig}/>

                    <br/>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={this.onClickSaveConfiguration.bind(this)}
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>     

                </div>                                                                              

                <div className={"resourceConfigRight"}>

                    <Autocomplete
                        id="set-loc-filter"
                        value={this.state.defaultLocationFilter}
                        options={this.state.options}
                        onChange={(event, value) => this.setState({defaultLocationFilter: value})}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Default Location Filter" variant="outlined" />}
                    />     
                    <br/>

                    <Autocomplete
                        id="set-chart-source"
                        value={this.state.dashboardChart}
                        options={["Type","Group"]}
                        onChange={(event, value) => this.setState({dashboardChart: value})}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Default Chart source" variant="outlined" />}
                    />      
                    <br/>

                    <Autocomplete
                        id="set-miniChart-1"
                        value={this.state.minichart1config}
                        options={["Status","Ownership","Stock-Level","None"]}
                        onChange={(event, value) => this.setState({minichart1config: value})}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="MiniChart 1 source" variant="outlined" />}
                    />    
                    <br/>

                    <Autocomplete
                        id="set-miniChart-2"
                        value={this.state.minichart2config}
                        options={["Status","Ownership","Stock-Level","None"]}
                        onChange={(event, value) => this.setState({minichart2config: value})}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="MiniChart 2 source" variant="outlined" />}
                    />    
                    <br/>

                    <Autocomplete
                        id="set-miniChart-3"
                        value={this.state.minichart3config}
                        options={["Status","Ownership","Stock-Level","None"]}
                        onChange={(event, value) => this.setState({minichart3config: value})}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="MiniChart 3 source" variant="outlined" />}
                    />            

                </div>
        </div>  
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setSelectedLocation: (selection) => {
          dispatch(setSelectedLocation(selection))
      }
    };
};

export default connect(null,mapDispatchToProps) ((withStyles(styles)) (ResourceVisibilityConfiguration));
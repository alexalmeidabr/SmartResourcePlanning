import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/styles'; 
import {setStockData, setSearchLocation, setDefaultLocation, setDefaultStockData, setSelectedLocation} from '../../actions/resourceVisibilityActions';

const styles = theme => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 250,
    height: 230,
    overflow: 'auto',
  },
  // button: {
  //   margin: theme.spacing(0.5, 0),
  // },
});

class ResourceDashBoardConfig extends Component {

  constructor(){

    super();

    this.state = {
        types: [],
        groups: [],
        status: [],
        ownership: [],
        p_types: [],
        p_groups: [],
        p_status: [],
        p_ownership: [],
        left: [],
        right: [],
        selectedLeft: [],
        selectedRight: [],
        valueType: "absolute",
        initiated: false
    }

    this.dataSourceUpdateList = this.dataSourceUpdateList.bind(this)
  }

  addPercentage(items){

    var result = [];

    for(let i=0; i<items.length; i++){
      result.push(items[i] + " %")
    }

    return result;
  }

  componentDidMount(){

    let typedata = [];
    let groupdata = [];
    let statusdata = [];
    let ownershipdata = [];

    fetch('/getResource_Types')
    .then(response => response.json())
    .then(json => {
        var tarray = ["TOTAL"];
        for (let i = 0; i < json.length; i++) {
          typedata.push(json[i].TYPE)
          }
        this.setState({types: typedata})        
        this.setState({p_types: this.addPercentage(this.state.types)})        
        this.setState({types: tarray.concat(this.state.types)})
        this.setState({left: this.state.types})
    });

    fetch('/getResource_Groups')
    .then(response => response.json())
    .then(json => {
        for (let i = 0; i < json.length; i++) {
          groupdata.push(json[i].GROUP)
          }
        this.setState({groups: groupdata});
        this.setState({p_groups: this.addPercentage(this.state.groups)})
    });

    fetch('/getResource_Status')
    .then(response => response.json())
    .then(json => {
        for (let i = 0; i < json.length; i++) {
          statusdata.push(json[i].STATUS)
          }
        this.setState({status: statusdata});
        this.setState({p_status: this.addPercentage(this.state.status)})
    });

    fetch('/getResource_Ownership')
    .then(response => response.json())
    .then(json => {
        for (let i = 0; i < json.length; i++) {
          ownershipdata.push(json[i].OWNERSHIP)
          }
        this.setState({ownership: ownershipdata});
        this.setState({p_ownership: this.addPercentage(this.state.ownership)})
    });    
    
  }

  componentDidUpdate(){

    if(this.props.currentConfig !== null && !this.state.initiated) {
      this.setState({initiated: true});
      this.setState({right: this.props.currentConfig},
      () => {
        let result = [...this.state.left];
        result = result.filter( (el) => {
          return !this.state.right.includes( el );
        })        
        this.setState({left: result});
      })      
    }
  }

  shouldComponentUpdate(nextProps, nextState){

    if(this.state.right !== nextState.right || this.state.left !== nextState.left ||
      this.state.selectedRight !== nextState.selectedRight || this.state.selectedLeft !== nextState.selectedLeft) {
      return true
    }
    if (this.state.initiated) return false;

    return true;

  }

  updateSelectedLeft(ev){    

    if(ev.target.checked)this.setState({selectedLeft: this.state.selectedLeft.concat([ev.target.value])})
    else {
      var array = [...this.state.selectedLeft];
      var index = array.indexOf(ev.target.value);
      if (index !== -1){
        array.splice(index,1);
        this.setState({selectedLeft: array})
      }
    }    
  }

  updateSelectedRight(ev){
    
    if(ev.target.checked)this.setState({selectedRight: this.state.selectedRight.concat([ev.target.value])})
    else {
      var array = [...this.state.selectedRight];
      var index = array.indexOf(ev.target.value);
      if (index !== -1){
        array.splice(index,1);
        this.setState({selectedRight: array})
      }
    }
  }

  customList = (items, classes, updateFunction) => (   
    
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `${value}`;

          return (
            <ListItem key={value} role="listitem" button >
              <ListItemIcon>
                <Checkbox
                  //checked={updateFunction}
                  onChange={e => updateFunction(e)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'value': labelId}}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  dataSourceUpdateList(event){

    var opt_radio = null;

    if(event.target.value === "absolute") {
      opt_radio = "absolute";
      this.setState({valueType: "absolute"})
    }
    else if (event.target.value === "percentage"){
      opt_radio = "percentage";
      this.setState({valueType: "percentage"})
    }
    else opt_radio = this.state.valueType;
    
    const opt_types = document.getElementsByName('checkbox-types')[0].checked;
    const opt_groups = document.getElementsByName('checkbox-groups')[0].checked;
    const opt_status = document.getElementsByName('checkbox-status')[0].checked;
    const opt_ownership = document.getElementsByName('checkbox-ownership')[0].checked;
    const opt_absolute = document.getElementsByName('radio-absolute')[0];
    
    var result = [];

    this.setState({left: []});

    if (opt_types && opt_radio === "absolute") result = result.concat(this.state.types);
    if (opt_groups && opt_radio === "absolute") result = result.concat(this.state.groups);
    if (opt_status && opt_radio === "absolute") result = result.concat(this.state.status);
    if (opt_ownership && opt_radio === "absolute") result = result.concat(this.state.ownership);   
    
    if (opt_types && opt_radio === "percentage") result = result.concat(this.state.p_types);
    if (opt_groups && opt_radio === "percentage") result = result.concat(this.state.p_groups);
    if (opt_status && opt_radio === "percentage") result = result.concat(this.state.p_status);
    if (opt_ownership && opt_radio === "percentage") result = result.concat(this.state.p_ownership); 

    result = result.filter( (el) => {
      return this.state.right.indexOf(el) < 0;
    })

    this.setState({left: result});

  }

  updateRight(){

    this.setState({right: this.state.selectedLeft});
    this.setState({right: this.state.right.concat(this.state.selectedLeft)},
    () => {this.props.updateDashboard(this.state.right)})
    
    this.setState({left: this.state.left.filter( (el) => {
      return this.state.selectedLeft.indexOf(el) < 0;
    })});

    this.setState({selectedLeft: []});    
    
  }

  updateAllRight(){

    this.setState({right: this.state.selectedLeft});
    this.setState({right: this.state.right.concat(this.state.left)},
    () => {this.props.updateDashboard(this.state.right)})
    
    this.setState({left: []});
    this.setState({selectedLeft: []}); 
        
  }

  updateLeft(){

    this.setState({left: this.state.selectedRight});
    this.setState({left: this.state.left.concat(this.state.selectedRight)});
    
    
    this.setState({right: this.state.right.filter( (el) => {
      return this.state.selectedRight.indexOf(el) < 0;
    })},
    () => {this.props.updateDashboard(this.state.right)})

    this.setState({selectedRight: []});
      
  }

  updateAllLeft(){

    this.setState({left: this.state.selectedRight});
    this.setState({left: this.state.left.concat(this.state.right)});    
    
    this.setState({right: []},
      () => {this.props.updateDashboard(this.state.right)})

    this.setState({selectedRight: []});
    
  }

  render() {

    const {classes} = this.props;  

    return (

      <div>

        <div>

          <FormControl component="fieldset">

            <FormLabel component="legend">MiniCard Configuration</FormLabel>

            <FormGroup row>
              <FormLabel component="legend"></FormLabel>

              <FormControlLabel
                control={
                  <Checkbox
                    //checked={state.checkedB}
                    onChange={this.dataSourceUpdateList.bind(this)}
                    defaultChecked
                    name="checkbox-types"
                    color="primary"
                  />
                }
                label="Types"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    //checked={state.checkedB}
                    onChange={this.dataSourceUpdateList.bind(this)}
                    name="checkbox-groups"
                    color="primary"
                  />
                }
                label="Groups"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    //checked={state.checkedB}
                    onChange={this.dataSourceUpdateList.bind(this)}
                    name="checkbox-status"
                    color="primary"
                  />
                }
                label="Status"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    //checked={state.checkedB}
                    onChange={this.dataSourceUpdateList.bind(this)}
                    name="checkbox-ownership"
                    color="primary"
                  />
                }
                label="Ownership"
              />

            </FormGroup>

            <RadioGroup row aria-label="position" name="radio-box" defaultValue="absolute" onChange={e => this.dataSourceUpdateList(e)}>
              <FormLabel component="legend"></FormLabel>
              <FormControlLabel
                value="absolute"
                control={<Radio                   
                  color="primary" 
                  name="radio-absolute" 
                  />}
                label="Absolute"
                labelPlacement="end"
              />

              <FormControlLabel
                value="percentage"
                control={<Radio                   
                  color="primary" 
                  name="radio-percentage" 
                  />}
                label="Percentage"
                labelPlacement="end"
              />

            </RadioGroup>

          </FormControl>
        </div>

        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>

          <Grid item> {this.customList(this.state.left, classes, this.updateSelectedLeft.bind(this))} </Grid>          

          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={this.updateAllRight.bind(this)}
                aria-label="move all right"
              >
                ≫
            </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={this.updateRight.bind(this)}
                aria-label="move selected right"
              >
                &gt;
            </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={this.updateLeft.bind(this)}
                aria-label="move selected left"
              >
                &lt;
            </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={this.updateAllLeft.bind(this)}
                aria-label="move all left"
              >
                ≪
            </Button>
            </Grid>
          </Grid>
          <Grid item> {this.customList(this.state.right, classes, this.updateSelectedRight.bind(this))} </Grid>
        </Grid>
      </div>
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles, { withTheme: true })(ResourceDashBoardConfig));

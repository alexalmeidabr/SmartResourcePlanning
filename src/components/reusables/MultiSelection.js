/* eslint-disable no-use-before-define */
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class ResourceSearchBar extends Component {

    constructor(){

        super();

        this.state = {
            values: [],
            initialted: false
        }
    }

    componentDidMount(){     
        // console.log("MOUNT this.props.values");
        // console.log(this.props.values);

        // console.log("MOUNT this.props.searchValues");
        // console.log(this.props.searchValues);

        // console.log("MOUNT: this.props.values");
        // console.log(this.props.values);

        if(this.props.values.length > 0){
            this.setState({
                values: this.props.values, 
                initialted: true
            });     
        }

    }

    updateValues(newValues){
        
        // console.log("newValues");
        // console.log(newValues);
        this.setState({values: newValues})

    }

    componentDidUpdate(){
        // console.log("UPDATE: this.props.values");
        // console.log(this.props.values);

        // console.log("Initiated? " + this.state.initialted)

        if(!this.state.initialted && this.props.values.length > 0) {
            // console.log("UPDATING!");
            this.setState({values: this.props.values});
            this.setState({initialted: true})
        }

        // console.log("UPDATE: this.props.searchValues");
        // console.log(this.props.searchValues);

    }

    shouldComponentUpdate(nextProps, nextState){

        // console.log("this.state.values: " + this.state.values + "nextState.values: " + nextState.values);
        // console.log("this.props.values: " + this.props.values);
        //console.log(this.state.values.length === 0);
        //if(this.state.values === nextState.values) return false;      
        
        //console.log(this.state.values.length);
        //if(nextState.values.length === 0 ) return false;      
        //if(nextProps.values.length === 0 ) return false;     
        if(this.state.values !== nextState.values || this.state.values.length === 0) return true;

        if(nextProps.values !== this.state.values && this.state.initialted === true) return false;
        return true;

    }

    render(){

        // console.log("RENDER: this.state.values");
        //  console.log(this.state.values);

        return (        
            
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={this.props.searchValues.sort()}
                disableCloseOnSelect
                getOptionLabel={(options) => options}
                value={this.state.values}        
                onChange={(event, value, reason) => {
                    this.updateValues(value);                    
                    if(reason === "remove-option") this.props.removeData(value);
                    else this.props.updateSelection(value);
                } 
                }
                onClose={() => this.props.updateData()} 
                renderOption={(options, { selected }) => (
                    <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {options}
                    </React.Fragment>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Locations" placeholder="Add" />
                )}
            />
        );
} }

export default ResourceSearchBar;
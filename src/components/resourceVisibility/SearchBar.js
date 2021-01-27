/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';

export const SearchBar = (props) => {     

  const options = props.depots.sort();

  return (

    
    <Autocomplete
      
      size="small"
      id="size-small-outlined"
      options={options}
      style={{ width: "45%", height: "5px" }}
      onChange={(event, value) => props.selection(value)} 
      renderInput={
          (params) => <TextField {...params} 
          label="Input Location or Location Group" 
          variant="outlined" />}
    />
  );
} 

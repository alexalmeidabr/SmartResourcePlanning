import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

function Header(props){    

    const useStyles = makeStyles((theme) => ({
        
        appBar: {
          [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${props.width}px)`,
            marginLeft: props.width,
            background: '#673ab7',
          },
        },       
      }));

      const classes = useStyles();

    return(
        
        <AppBar position="relative" className={classes.appBar} >
        <Toolbar>          
          <Typography variant="h6" noWrap>
            Transportation Resource SmartView
          </Typography>
        </Toolbar>
      </AppBar>
      
    )

}

export default Header;
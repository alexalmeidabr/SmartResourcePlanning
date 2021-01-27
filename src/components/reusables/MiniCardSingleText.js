import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    Width: 200,
    maxWidth: 200,
    maxHeight: 120,
    paddingLeft: 10,
    
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardSimpleText(props) {
  const classes = useStyles();  

  return (
    <Paper className={classes.root} elevation={0}>
      
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        
        <Typography className={classes.pos} variant="h3" component="h1" color="textPrimary" align="center">
          {props.value}
        </Typography>        
    </Paper>
  );
}
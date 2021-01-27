import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 227,
    height: "100%",
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

    <div>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <br />
        <Typography className={classes.pos} variant="h1" component="h1" color="textPrimary" align="center">
          {props.value}
        </Typography>      
      </div>  

  );
}
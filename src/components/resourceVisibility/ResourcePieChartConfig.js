import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles({
  root: {
    minWidth: "20vh",
    '&:hover': {
        backgroundColor: 'transparent',
    }
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
}

export default function ResourcePieChartConfig(props) {
  const classes = useStyles();  

  return (
    <Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.title}Configuration
            </Typography>
            
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Value Type</FormLabel><br/>
                <RadioGroup defaultValue="absolute" aria-label="Value Type" name="customized-radios" onChange={props.updateOption}>
                    <FormControlLabel value="absolute" control={<StyledRadio />} label="Absolute" />
                    <FormControlLabel value="percentage" control={<StyledRadio />} label="Percentage" />
                </RadioGroup>
            </FormControl>  

            <br /><br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Chart type</FormLabel><br/>
                <RadioGroup defaultValue="normal" aria-label="Data source" name="customized-radios" onChange={props.updateOption}>
                    <FormControlLabel value="normal" control={<StyledRadio />} label="Normal" />
                    <FormControlLabel value="3D" control={<StyledRadio />} label="3D" />
                    <FormControlLabel value="donut" control={<StyledRadio />} label="Donut" />
                    <FormControlLabel value="3Ddonut" control={<StyledRadio />} label="Donut 3D" />
                    <FormControlLabel value="v3D" control={<StyledRadio />} label="Variable 3D" />
                </RadioGroup>
            </FormControl>   

        </CardContent>
    </Card>
  );
}
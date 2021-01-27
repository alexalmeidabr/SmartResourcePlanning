import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles'; 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const styles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

class SCPieChart extends Component {   

  initChart(){

    am4core.useTheme(am4themes_animated);
        
    var chart = am4core.create(this.props.id, am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    //console.log(this.props.data)
    
    chart.data = this.props.data;

    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;  
    
    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "type";      
    series.fontSize = 8;
    series.labels.template.text = "{category}: {value.value}";
        
    series.slices.template.inert = true;
    series.alignLabels = false;
    
    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "right";
    chart.exporting.menu.verticalAlign = "top";            

  }
    
  componentDidMount() {
    this.initChart();  
  } 

  componentDidUpdate(){
    this.initChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {

    const {classes} = this.props;   

    return (

        <div>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {this.props.title}
            </Typography>
            <div id={this.props.id} style={{ width: "100%", height: "100%", autoGridCount: false}}></div>

        </div>
    );
  }
}

export default (withStyles(styles) (SCPieChart));
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles'; 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {connect} from "react-redux";
import {setStockData, setSearchLocation} from '../../actions/resourceVisibilityActions';

const styles = makeStyles({
    root: {
      minWidth: 575,            
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

class ResourceAngularGauge extends Component {   

  initChart(){


    am4core.useTheme(am4themes_animated);
    var stockData = this.props.stockData;

    var totalStock = 0;
    var totalMinStock = 0;
    var totalMaxStock = 0;
    var totalCapacity = 0;

    for(var i = 0; i < stockData.length; i++){
        totalStock += parseInt(stockData[i].QUANTITY);
        totalMinStock += parseInt(stockData[i].MINSTOCK);
        totalMaxStock += parseInt(stockData[i].MAXSTOCK);
        totalCapacity += parseInt(stockData[i].MAXCAP);
    }

    // Create chart instance
    var container = am4core.create("chartAngularGauge", am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";
    var chart = container.createChild(am4charts.GaugeChart);

    chart.innerRadius = -15;

    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = totalCapacity;
    axis.strictMinMax = true;
    axis.renderer.minGridDistance = 10000;

    var colorSet = new am4core.ColorSet();

    var range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = totalMinStock;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(12);

    var range1 = axis.axisRanges.create();
    range1.value = totalMinStock;
    range1.endValue = totalMaxStock;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(0);

    var range2 = axis.axisRanges.create();
    range2.value = totalMaxStock;
    range2.endValue = totalCapacity;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(7);

    var hand = chart.hands.push(new am4charts.ClockHand());
    hand.innerRadius = am4core.percent(35);
    hand.pin.disabled = true;
    hand.value = 0;

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "right";
    chart.exporting.menu.verticalAlign = "bottom";

    setInterval(function() {
      var value = totalStock;
      var animation = new am4core.Animation(hand, {
        property: "value",
        to: value
      }, 1000, am4core.ease.cubicOut).start();
    }, 500);

    var label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 24;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";    
    label.text = Math.round(totalStock/totalCapacity*100) + "%";
       
  }
    
  componentDidMount() {

    this.initChart();
    
  } 

  componentDidUpdate(){

    this.initChart();

  }

  componentWillReceiveProps(){

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
            Stock capacity
        </Typography>
        <div id="chartAngularGauge" style={{ display: "flexGrow", width: "100%", height: "100%", autoGridCount: false}}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        stockData: state.stockDataReducer.stockData,
        searchLocations: state.SearchLocationsReducer.searchLocations
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
          setStockData: (selection) => {
              dispatch(setStockData(selection));
          },
          setSearchLocation: () => {
              dispatch(setSearchLocation());
          }
      };
  };

export default connect(mapStateToProps, mapDispatchToProps) ((withStyles(styles)) (ResourceAngularGauge));
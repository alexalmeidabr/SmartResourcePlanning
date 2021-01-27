import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function generatechartData() {
    
    var chartData = [];
    var firstDate = new Date();
        
    firstDate.setDate(firstDate.getDate() );
    var visits = 0;
    var b = 0.6;
    for ( var i = 0; i < 14; i++ ) {

      var newDate = new Date( firstDate );
      newDate.setDate( newDate.getDate() + i );
      if(i > 80){
          b = 0.4;
      }

      visits += Math.round((Math.random()<b?1:-1)*Math.random()*2);
  
      chartData.push( {
        date: newDate,
        visits: visits
      } );
    }
    return chartData;
}  

class SDBalanceChart extends Component {

  initChart(props){    

    let chart = am4core.create("chartbalance", am4charts.XYChart);

    chart.data = generatechartData();

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 3;
    series.tooltipText = "{valueY.value}";
    series.fillOpacity = 0.1;

    // Create a range to change stroke for values below 0
    var range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -1000;
    range.contents.stroke = chart.colors.getIndex(4);
    range.contents.fill = range.contents.stroke;
    range.contents.strokeOpacity = 0.7;
    range.contents.fillOpacity = 0.1;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";

    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    bullet.events.on("hit", function(ev) {

        props.selection(ev.target.dataItem.dataContext)

    });

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.behavior = "panXY";
    chart.cursor.snapToSeries = series;
    chart.scrollbarX = new am4core.Scrollbar();

    series.tooltip.getFillFromObject = false;
    series.tooltip.adapter.add("x", (x, target)=>{
        if(series.tooltip.tooltipDataItem.valueY < 0){
            series.tooltip.background.fill = chart.colors.getIndex(4);
        }
        else{
            series.tooltip.background.fill = chart.colors.getIndex(0);
        }
        return x;
    }
    )

}
    
    componentDidMount() {
      
        this.initChart(this.props);
    
    } 

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

  render() {
    return (
      <div id="chartbalance" style={{ width: "100%", height: "95%", position: "relative", top: "2%"}}></div>
    );
  }
}

export default SDBalanceChart;
import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

class PieChart extends Component {

  initChart(){

    if(this.props.type === "NORMAL" || this.props.type === "DONUT") var chart = am4core.create("piechart", am4charts.PieChart);
    if(this.props.type === "3D" || this.props.type === "V3D" || this.props.type === "3DDONUT") var chart = am4core.create("piechart", am4charts.PieChart3D);    

    // console.log("Pie chart props");
    // console.log(this.props.data);    

    chart.data = this.props.data;

    // Add and configure Series
    //var pieSeries = chart.series.push(new am4charts.PieSeries3D());
    if(this.props.type === "NORMAL" || this.props.type === "DONUT") var pieSeries = chart.series.push(new am4charts.PieSeries());
    if(this.props.type === "3D" || this.props.type === "V3D" || this.props.type === "3DDONUT") var pieSeries = chart.series.push(new am4charts.PieSeries3D());
    pieSeries.dataFields.value = "value";
    if(this.props.option === "ABSOLUTE") pieSeries.labels.template.text = "{category}: {value.value}";
    pieSeries.dataFields.category = "type";
    if(this.props.type === "V3D"){
      pieSeries.dataFields.depthValue = "value";
      pieSeries.slices.template.cornerRadius = 5;
      chart.depth = 120;
    }
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.labels.template.maxWidth = 100;
    pieSeries.labels.template.wrap = true;
    pieSeries.labels.template.fontSize = 12;
    pieSeries.alignLabels = false;        
    
    if(this.props.type === "DONUT" || this.props.type === "3DDONUT" || this.props.type === "V3D" ){
      chart.innerRadius = am4core.percent(40);
      chart.radius = am4core.percent(65);
    }
    
    // Set up fills
    pieSeries.slices.template.fillOpacity = 1;
    
    var hs = pieSeries.slices.template.states.getKey("hover");
    hs.properties.scale = 1;
    hs.properties.fillOpacity = 0.5;      

    // Export
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "right";
    chart.exporting.menu.verticalAlign = "bottom";
    
    // Title
    let title = chart.titles.create();
    title.text = this.props.title;
    if (window.innerHeight > 1024) title.fontSize = 18;
    else title.fontSize = 12;
    title.marginBottom = -20;
    title.marginTop = 15;
   
  }

  componentDidMount(){   

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
    return (
      <div id="piechart" style={{ width: "100%", height: "100%", autoGridCount: false}}></div>
    );
  }
}

export default PieChart;
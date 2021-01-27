import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function generatechartData() {

    let data = [];

    var balance = 50;  
    var overdue_pickup = Math.round(Math.random() * 6);  
    var mar_er_out = Math.round(Math.random() * 6);  
    var land_er_out = Math.round(Math.random() * 6);

    if (Math.random() > 0.2) mar_er_out = 0;
    if (Math.random() > 0.2) land_er_out = 0;

    var empty_pickup = balance - overdue_pickup - mar_er_out - land_er_out ;

    if (empty_pickup !== 0) data.push(
        {CATEGORY: "Empty Pickup",
         QUANTITY: empty_pickup}
    )

    if (overdue_pickup !== 0) data.push(
        {CATEGORY: "Overdue Pickup",
         QUANTITY: overdue_pickup}
    )

    if (mar_er_out !== 0) data.push(
        {CATEGORY: "Maritime ER Out",
         QUANTITY: mar_er_out}
    )

    if (land_er_out !== 0) data.push(
        {CATEGORY: "Land ER Out",
         QUANTITY: land_er_out}
    )

    return data;

}

class DemandPieChart extends Component {

    

  initChart(){

    //console.log(this.props.data);    

    let chart = am4core.create("demandpiechart", am4charts.PieChart);

    chart.data = generatechartData();

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "QUANTITY";
      pieSeries.dataFields.category = "CATEGORY";
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.labels.template.maxWidth = 100;
      pieSeries.labels.template.wrap = true;
      pieSeries.labels.template.fontSize = 12;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.disabled = true;
      pieSeries.legendSettings.valueText = "{QUANTITY}";
      
      // Let's cut a hole in our Pie chart the size of 40% the radius
      chart.innerRadius = am4core.percent(40);
      chart.radius = am4core.percent(65);
      
      // Set up fills
      pieSeries.slices.template.fillOpacity = 1;
      
      var hs = pieSeries.slices.template.states.getKey("hover");
      hs.properties.scale = 1;
      hs.properties.fillOpacity = 0.5;      

      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "right";
      chart.exporting.menu.verticalAlign = "bottom";

      chart.legend = new am4charts.Legend();
      chart.legend.position = "right";
      chart.legend.fontSize = 12;      

      // Title
      let title = chart.titles.create();
      title.text = "[bold]Demand";
      if (window.innerHeight > 1024) title.fontSize = 24;
      else title.fontSize = 18;
      title.marginBottom = -20;
      title.marginTop = 35;            
   
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
    return (
      <div id="demandpiechart" style={{ width: "100%", height: "100%", autoGridCount: false}}></div>
    );
  }
}

export default DemandPieChart;
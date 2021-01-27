import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function generatechartData(props) {

    let data = [];    

    var balance = 50;
    var actual_stock = Math.round(Math.random() * 21);        
    var overdue_return = Math.round(Math.random() * 6);    
    var damage_return = Math.round(Math.random() * 6);    
    var mar_er_in = Math.round(Math.random() * 6);    
    var land_er_in = Math.round(Math.random() * 6);    

    if (Math.random() > 0.3) damage_return = 0; 
    if (Math.random() > 0.2) mar_er_in = 0;
    if (Math.random() > 0.2) land_er_in = 0;

    var empty_return = balance - actual_stock - overdue_return - damage_return - mar_er_in - land_er_in + props.value;

    if (empty_return !== 0) data.push(
      {CATEGORY: "Empty Return",
       QUANTITY: empty_return}
  )

    if (actual_stock !== 0) data.push(
        {CATEGORY: "Actual Stock",
         QUANTITY: actual_stock}
    )

    if (overdue_return !== 0) data.push(
        {CATEGORY: "Overdue Return",
         QUANTITY: overdue_return}
    )

    if (damage_return !== 0) data.push(
        {CATEGORY: "Damage Return",
         QUANTITY: damage_return}
    )

    if (mar_er_in !== 0) data.push(
        {CATEGORY: "Maritime ER In",
         QUANTITY: mar_er_in}
    )

    if (land_er_in !== 0) data.push(
        {CATEGORY: "Land ER In",
         QUANTITY: land_er_in}
    )

    return data;

}

class SupplyPieChart extends Component {

  initChart(props){    

    let chart = am4core.create("supplypiechart", am4charts.PieChart);

    chart.data = generatechartData(this.props);

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "QUANTITY";
      pieSeries.dataFields.category = "CATEGORY";
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.labels.template.maxWidth = 100;
      pieSeries.labels.template.wrap = true;
      pieSeries.labels.template.fontSize = 10;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.disabled = true;
      pieSeries.legendSettings.valueText = "{QUANTITY}";

      pieSeries.slices.template.events.on("hit", function(ev) {

        console.log(ev.target.dataItem.dataContext);
        //props.selection(ev.target.dataItem.dataContext);
  
      });
      
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
      title.text = "[bold]Supply";
      if (window.innerHeight > 1024) title.fontSize = 24;
      else title.fontSize = 18;
      title.marginBottom = -20;
      title.marginTop = 35;
   
  }
    
  componentDidMount() {

    this.initChart(this.props);
    
  } 

  componentDidUpdate(){
    this.initChart(this.props);

  }

  componentWillReceiveProps(){
    this.initChart(this.props);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="supplypiechart" style={{ width: "100%", height: "100%", autoGridCount: false}}></div>
    );
  }
}

export default SupplyPieChart;
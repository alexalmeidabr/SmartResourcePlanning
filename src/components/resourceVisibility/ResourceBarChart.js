import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ResourceBarChart extends Component {

  initChart(){

    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.scrollbarX = new am4core.Scrollbar();

    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const qtdeA = parseInt(a.QUANTITY);
        const qtdeB = parseInt(b.QUANTITY);
      
        let comparison = 0;
        if (qtdeA > qtdeB) {
          comparison = -1;
        } else if (qtdeA < qtdeB) {
          comparison = 1;
        }
        return comparison;
      }

    chart.data = this.props.data.sort(compare);  
    
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "TYPE";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "middle";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 0;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;    
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "QUANTITY";
    series.dataFields.categoryX = "TYPE";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;
    
    series.tooltip.pointerOrientation = "vertical";
    
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;
    
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "right";
    chart.exporting.menu.verticalAlign = "bottom";
    
    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;
    
    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });
    
    // Cursor
    chart.cursor = new am4charts.XYCursor();

    // Title
    let title = chart.titles.create();
    title.text = "[bold]Number of containers per type in " + this.props.depot;    
    if (window.innerHeight > 1024) title.fontSize = 22;
    else title.fontSize = 16;
    title.marginBottom = 12;    

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
      <div id="chartdiv" style={{ width: "100%", height: "85%", autoGridCount: false}}></div>
    );
  }
}

export default ResourceBarChart;
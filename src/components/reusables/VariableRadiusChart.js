import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class VariableRadiusChart extends Component {    

    initChart(){
  
        var chart = am4core.create("variablechart", am4charts.RadarChart);

        // console.log("radius data props");
        // console.log(this.props.data);

        chart.data = this.props.data;
            
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        
        chart.radius = am4core.percent(95);
        chart.startAngle = 270 - 180;
        chart.endAngle = 270 + 180;
        chart.innerRadius = am4core.percent(60);

        chart.legend = new am4charts.Legend();
        chart.legend.useDefaultMarker = true;
        chart.legend.fontSize = 10;
        var marker = chart.legend.markers.template.children.getIndex(0);
        marker.cornerRadius(12, 12, 12, 12);
        marker.strokeWidth = 2;
        marker.strokeOpacity = 1;
        marker.stroke = am4core.color("#ccc");

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "LOCATION";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.labels.template.fontSize = 10;
        categoryAxis.renderer.grid.template.strokeOpacity = 0.1;
        categoryAxis.renderer.axisFills.template.disabled = true;
        categoryAxis.mouseEnabled = false;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.grid.template.strokeOpacity = 0.05;
        valueAxis.renderer.labels.template.fontSize = 10;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.axisAngle = 260;
        valueAxis.renderer.labels.template.horizontalCenter = "right";
        valueAxis.min = 0;        

        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.columns.template.radarColumn.strokeOpacity = 1;
        series1.name = "STANDARD";
        series1.dataFields.categoryX = "LOCATION";
        series1.columns.template.tooltipText = "{name}: {valueY.value}";
        series1.dataFields.valueY = "STANDARD";
        series1.stacked = true;
        let valueLabel1 = series1.bullets.push(new am4charts.LabelBullet());
        valueLabel1.label.text = "{valueY.value}";
        valueLabel1.label.fontSize = 8;
        valueLabel1.locationY = 0.5;

        var series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.columns.template.radarColumn.strokeOpacity = 1;
        series2.columns.template.tooltipText = "{name}: {valueY.value}";
        series2.name = "REEFER";
        series2.dataFields.categoryX = "LOCATION";
        series2.dataFields.valueY = "REEFER";
        series2.stacked = true;
        let valueLabel2 = series2.bullets.push(new am4charts.LabelBullet());
        valueLabel2.label.text = "{valueY.value}";
        valueLabel2.label.fontSize = 8;
        valueLabel2.locationY = 0.5;

        var series3 = chart.series.push(new am4charts.RadarColumnSeries());
        series3.columns.template.radarColumn.strokeOpacity = 1;
        series3.columns.template.tooltipText = "{name}: {valueY.value}";  
        series3.name = "HC_PALLET_WIDE";
        series3.dataFields.categoryX = "LOCATION";
        series3.dataFields.valueY = "HC_PALLET_WIDE";
        series3.stacked = true;
        let valueLabel3 = series3.bullets.push(new am4charts.LabelBullet());
        valueLabel3.label.text = "{valueY.value}";
        valueLabel3.label.fontSize = 8;
        valueLabel3.locationY = 0.5;

        var series4 = chart.series.push(new am4charts.RadarColumnSeries());
        series4.columns.template.radarColumn.strokeOpacity = 1;
        series4.columns.template.tooltipText = "{name}: {valueY.value}";
        series4.name = "OPEN_TOP";
        series4.dataFields.categoryX = "LOCATION";
        series4.dataFields.valueY = "OPEN_TOP";
        series4.stacked = true;
        let valueLabel4 = series4.bullets.push(new am4charts.LabelBullet());
        valueLabel4.label.text = "{valueY.value}";
        valueLabel4.label.fontSize = 8;
        valueLabel4.locationY = 0.5;

        var series5 = chart.series.push(new am4charts.RadarColumnSeries());
        series5.columns.template.radarColumn.strokeOpacity = 1;
        series5.columns.template.tooltipText = "{name}: {valueY.value}";
        series5.name = "FLATRACK";
        series5.dataFields.categoryX = "LOCATION";
        series5.dataFields.valueY = "FLATRACK";
        series5.stacked = true;
        let valueLabel5 = series5.bullets.push(new am4charts.LabelBullet());
        valueLabel5.label.text = "{valueY.value}";
        valueLabel5.label.fontSize = 8;
        valueLabel5.locationY = 0.5;

        var series6 = chart.series.push(new am4charts.RadarColumnSeries());
        series6.columns.template.radarColumn.strokeOpacity = 1;
        series6.columns.template.tooltipText = "{name}: {valueY.value}";
        series6.name = "TANK";
        series6.dataFields.categoryX = "LOCATION";
        series6.dataFields.valueY = "TANK";
        series6.stacked = true;
        let valueLabel6 = series6.bullets.push(new am4charts.LabelBullet());
        valueLabel6.label.text = "{valueY.value}";
        valueLabel6.label.fontSize = 8;
        valueLabel6.locationY = 0.5;

        chart.seriesContainer.zIndex = -1;

        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.align = "right";
        chart.exporting.menu.verticalAlign = "top";   

        var slider = chart.createChild(am4core.Slider);
        slider.start = 0;
        slider.exportable = false;
        slider.events.on("rangechanged", function() {
            var start = slider.start;

            chart.startAngle = 270 - start * 179 - 1;
            chart.endAngle = 270 + start * 179 + 1;

            valueAxis.renderer.axisAngle = chart.startAngle;
        });  
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
        <div id="variablechart" style={{ width: "95%", height: "95vh", autoGridCount: false, marginLeft: "20px"}}></div>
      );
    }
  }
  
  export default VariableRadiusChart;
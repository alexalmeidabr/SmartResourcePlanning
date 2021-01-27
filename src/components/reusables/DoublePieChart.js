import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class DoublePieChart extends Component {

  initChart(){

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    am4core.options.autoDispose = true;

    var container = am4core.create("chartdiv", am4core.Container);
    container.width = am4core.percent(90);
    container.height = am4core.percent(100);
    container.layout = "horizontal";

    var chart = container.createChild(am4charts.PieChart);
    chart.radius = am4core.percent(60);

    // Add data
    chart.data = this.props.data;

    // console.log("chart.data");
    // console.log(chart.data);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "TOTAL";
    pieSeries.dataFields.category = "LOCATION";
    pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
    pieSeries.labels.template.fontSize = 10;
    if(this.props.option === "ABSOLUTE") pieSeries.labels.template.text = "{category}: {value.value}";

    pieSeries.slices.template.events.on("hit", function(event) {
        selectSlice(event.target.dataItem);
    })

    var chart2 = container.createChild(am4charts.PieChart);
    chart2.width = am4core.percent(30);
    chart2.radius = am4core.percent(80);

    // Add and configure Series
    var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "value";
    pieSeries2.dataFields.category = "name";
    if(this.props.option === "ABSOLUTE") pieSeries2.labels.template.text = "{category}: {value.value}";
    pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
    pieSeries2.labels.template.fontSize = 8;
    pieSeries2.ticks.template.disabled = true;
    pieSeries2.alignLabels = false;
    pieSeries2.events.on("positionchanged", updateLines);

    var interfaceColors = new am4core.InterfaceColorSet();

    var line1 = container.createChild(am4core.Line);
    line1.strokeDasharray = "2,2";
    line1.strokeOpacity = 0.5;
    line1.stroke = interfaceColors.getFor("alternativeBackground");
    line1.isMeasured = false;

    var line2 = container.createChild(am4core.Line);
    line2.strokeDasharray = "2,2";
    line2.strokeOpacity = 0.5;
    line2.stroke = interfaceColors.getFor("alternativeBackground"); 
    line2.isMeasured = false;

    var selectedSlice;

    function selectSlice(dataItem) {

        selectedSlice = dataItem.slice;

        var fill = selectedSlice.fill;

        var count = dataItem.dataContext.subData.length;
        pieSeries2.colors.list = [];
        for (var i = 0; i < count; i++) {
            pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
        }

        chart2.data = dataItem.dataContext.subData;
        pieSeries2.appear();

        var middleAngle = selectedSlice.middleAngle;
        var firstAngle = pieSeries.slices.getIndex(0).startAngle;
        var animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
        animation.events.on("animationprogress", updateLines);

        selectedSlice.events.on("transformed", updateLines);
    }


    function updateLines() {
        if (selectedSlice) {
            var p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
            var p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };

            p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
            p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

            var p21 = { x: 0, y: -pieSeries2.pixelRadius };
            var p22 = { x: 0, y: pieSeries2.pixelRadius };

            p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
            p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

            line1.x1 = p11.x;
            line1.x2 = p21.x;
            line1.y1 = p11.y;
            line1.y2 = p21.y;

            line2.x1 = p12.x;
            line2.x2 = p22.x;
            line2.y1 = p12.y;
            line2.y2 = p22.y;
        }
    }

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
      <div id="chartdiv" style={{ width: "100%", height: "100%", autoGridCount: false}}></div>
    );
  }
}

export default DoublePieChart;
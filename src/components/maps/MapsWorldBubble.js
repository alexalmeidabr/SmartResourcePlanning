import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

class MapsWorldBubble extends Component {

    initMap(){

        var chart = am4core.create("mapdiv", am4maps.MapChart);

        var title = chart.titles.create();
        title.text = "[bold font-size: 20]Container Distribution[/]";
        title.textAlign = "middle";

        var mapData = [
        { "id":"AF", "name":"Afghanistan", "value":2987, "color": chart.colors.getIndex(0) },
        { "id":"AL", "name":"Albania", "value":1449, "color":chart.colors.getIndex(1) },
        { "id":"DZ", "name":"Algeria", "value":3598, "color":chart.colors.getIndex(2) },
        { "id":"AO", "name":"Angola", "value":4468, "color":chart.colors.getIndex(2) },
        { "id":"AR", "name":"Argentina", "value":5624, "color":chart.colors.getIndex(3) },
        { "id":"AM", "name":"Armenia", "value":2578, "color":chart.colors.getIndex(1) },
        { "id":"AU", "name":"Australia", "value":8542, "color":"#8aabb0" },
        { "id":"AT", "name":"Austria", "value":2354, "color":chart.colors.getIndex(1) },
        { "id":"AZ", "name":"Azerbaijan", "value":865, "color":chart.colors.getIndex(1) },
        { "id":"BH", "name":"Bahrain", "value":9544, "color": chart.colors.getIndex(0) },
        { "id":"BD", "name":"Bangladesh", "value":5112, "color": chart.colors.getIndex(0) },
        { "id":"BY", "name":"Belarus", "value":632, "color":chart.colors.getIndex(1) },
        { "id":"BE", "name":"Belgium", "value":14521, "color":chart.colors.getIndex(1) },
        { "id":"BJ", "name":"Benin", "value":52, "color":chart.colors.getIndex(2) },
        { "id":"BT", "name":"Bhutan", "value":122, "color": chart.colors.getIndex(0) },
        { "id":"BO", "name":"Bolivia", "value":55, "color":chart.colors.getIndex(3) },
        { "id":"BA", "name":"Bosnia and Herzegovina", "value":124, "color":chart.colors.getIndex(1) },
        { "id":"BW", "name":"Botswana", "value":521, "color":chart.colors.getIndex(2) },
        { "id":"BR", "name":"Brazil", "value":12320, "color":chart.colors.getIndex(3) },
        { "id":"BN", "name":"Brunei", "value":233, "color": chart.colors.getIndex(0) },
        { "id":"BG", "name":"Bulgaria", "value":896, "color":chart.colors.getIndex(1) },
        { "id":"BF", "name":"Burkina Faso", "value":0, "color":chart.colors.getIndex(2) },
        { "id":"BI", "name":"Burundi", "value":0, "color":chart.colors.getIndex(2) },
        { "id":"KH", "name":"Cambodia", "value":1475, "color": chart.colors.getIndex(0) },
        { "id":"CM", "name":"Cameroon", "value":3254, "color":chart.colors.getIndex(2) },
        { "id":"CA", "name":"Canada", "value":9541, "color":chart.colors.getIndex(4) },
        { "id":"CV", "name":"Cape Verde", "value":547, "color":chart.colors.getIndex(2) },
        { "id":"CF", "name":"Central African Rep.", "value":0, "color":chart.colors.getIndex(2) },
        { "id":"TD", "name":"Chad", "value":101, "color":chart.colors.getIndex(2) },
        { "id":"CL", "name":"Chile", "value":3254, "color":chart.colors.getIndex(3) },
        { "id":"CN", "name":"China", "value":85209, "color": chart.colors.getIndex(0) },
        { "id":"CO", "name":"Colombia", "value":7520, "color":chart.colors.getIndex(3) },
        { "id":"KM", "name":"Comoros", "value":358, "color":chart.colors.getIndex(2) },
        { "id":"CD", "name":"Congo, Dem. Rep.", "value":85, "color":chart.colors.getIndex(2) },
        { "id":"CG", "name":"Congo, Rep.", "value":41, "color":chart.colors.getIndex(2) },
        { "id":"CR", "name":"Costa Rica", "value":201, "color":chart.colors.getIndex(4) },
        { "id":"CI", "name":"Cote d'Ivoire", "value":453, "color":chart.colors.getIndex(2) },
        { "id":"HR", "name":"Croatia", "value":659, "color":chart.colors.getIndex(1) },
        { "id":"CU", "name":"Cuba", "value":41, "color":chart.colors.getIndex(4) },
        { "id":"CY", "name":"Cyprus", "value":365, "color":chart.colors.getIndex(1) },
        { "id":"CZ", "name":"Czech Rep.", "value":510, "color":chart.colors.getIndex(1) },
        { "id":"DK", "name":"Denmark", "value":11254, "color":chart.colors.getIndex(1) },
        { "id":"DJ", "name":"Djibouti", "value":205, "color":chart.colors.getIndex(2) },
        { "id":"DO", "name":"Dominican Rep.", "value":352, "color":chart.colors.getIndex(4) },
        { "id":"EC", "name":"Ecuador", "value":1574, "color":chart.colors.getIndex(3) },
        { "id":"EG", "name":"Egypt", "value":4251, "color":chart.colors.getIndex(2) },
        { "id":"SV", "name":"El Salvador", "value":765, "color":chart.colors.getIndex(4) },
        { "id":"GQ", "name":"Equatorial Guinea", "value":120, "color":chart.colors.getIndex(2) },
        { "id":"ER", "name":"Eritrea", "value":0, "color":chart.colors.getIndex(2) },
        { "id":"EE", "name":"Estonia", "value":2351, "color":chart.colors.getIndex(1) },
        { "id":"ET", "name":"Ethiopia", "value":851, "color":chart.colors.getIndex(2) },
        { "id":"FJ", "name":"Fiji", "value":299, "color":"#8aabb0" },
        { "id":"FI", "name":"Finland", "value":2456, "color":chart.colors.getIndex(1) },
        { "id":"FR", "name":"France", "value":65204, "color":chart.colors.getIndex(1) },
        { "id":"GA", "name":"Gabon", "value":154, "color":chart.colors.getIndex(2) },
        { "id":"GM", "name":"Gambia", "value":254, "color":chart.colors.getIndex(2) },
        { "id":"GE", "name":"Georgia", "value":147, "color":chart.colors.getIndex(1) },
        { "id":"DE", "name":"Germany", "value":29874, "color":chart.colors.getIndex(1) },
        { "id":"GH", "name":"Ghana", "value":248, "color":chart.colors.getIndex(2) },
        { "id":"GR", "name":"Greece", "value":4251, "color":chart.colors.getIndex(1) },
        { "id":"GT", "name":"Guatemala", "value":587, "color":chart.colors.getIndex(4) },
        { "id":"GN", "name":"Guinea", "value":254, "color":chart.colors.getIndex(2) },
        { "id":"GW", "name":"Guinea-Bissau", "value":21, "color":chart.colors.getIndex(2) },
        { "id":"GY", "name":"Guyana", "value":98, "color":chart.colors.getIndex(3) },
        { "id":"HT", "name":"Haiti", "value":31, "color":chart.colors.getIndex(4) },
        { "id":"HN", "name":"Honduras", "value":257, "color":chart.colors.getIndex(4) },
        { "id":"HK", "name":"Hong Kong, China", "value":9510, "color": chart.colors.getIndex(0) },
        { "id":"HU", "name":"Hungary", "value":2101, "color":chart.colors.getIndex(1) },
        { "id":"IS", "name":"Iceland", "value":651, "color":chart.colors.getIndex(1) },
        { "id":"IN", "name":"India", "value":8540, "color": chart.colors.getIndex(0) },
        { "id":"ID", "name":"Indonesia", "value":7510, "color": chart.colors.getIndex(0) },
        { "id":"IR", "name":"Iran", "value":150, "color": chart.colors.getIndex(0) },
        { "id":"IQ", "name":"Iraq", "value":459, "color": chart.colors.getIndex(0) },
        { "id":"IE", "name":"Ireland", "value":6521, "color":chart.colors.getIndex(1) },
        { "id":"IL", "name":"Israel", "value":6899, "color": chart.colors.getIndex(0) },
        { "id":"IT", "name":"Italy", "value":10578, "color":chart.colors.getIndex(1) },
        { "id":"JM", "name":"Jamaica", "value":236, "color":chart.colors.getIndex(4) },
        { "id":"JP", "name":"Japan", "value":4521, "color": chart.colors.getIndex(0) },
        { "id":"JO", "name":"Jordan", "value":352, "color": chart.colors.getIndex(0) },
        { "id":"KZ", "name":"Kazakhstan", "value":41, "color": chart.colors.getIndex(0) },
        { "id":"KE", "name":"Kenya", "value":102, "color":chart.colors.getIndex(2) },
        { "id":"KP", "name":"Korea, Dem. Rep.", "value":0, "color": chart.colors.getIndex(0) },
        { "id":"KR", "name":"Korea, Rep.", "value":4259, "color": chart.colors.getIndex(0) },
        { "id":"KW", "name":"Kuwait", "value":1057, "color": chart.colors.getIndex(0) },
        { "id":"KG", "name":"Kyrgyzstan", "value":54, "color": chart.colors.getIndex(0) },
        { "id":"LA", "name":"Laos", "value":154, "color": chart.colors.getIndex(0) },
        { "id":"LV", "name":"Latvia", "value":425, "color":chart.colors.getIndex(1) },
        { "id":"LB", "name":"Lebanon", "value":4210, "color": chart.colors.getIndex(0) },
        { "id":"LS", "name":"Lesotho", "value":0, "color":chart.colors.getIndex(2) },
        { "id":"LR", "name":"Liberia", "value":0, "color":chart.colors.getIndex(2) },
        { "id":"LY", "name":"Libya", "value":0, "color":chart.colors.getIndex(2) },
        { "id":"LT", "name":"Lithuania", "value":214, "color":chart.colors.getIndex(1) },
        { "id":"LU", "name":"Luxembourg", "value":1577, "color":chart.colors.getIndex(1) },
        { "id":"MK", "name":"Macedonia, FYR", "value":410, "color":chart.colors.getIndex(1) },
        { "id":"MG", "name":"Madagascar", "value":1127, "color":chart.colors.getIndex(2) },
        { "id":"MW", "name":"Malawi", "value":121, "color":chart.colors.getIndex(2) },
        { "id":"MY", "name":"Malaysia", "value":6527, "color": chart.colors.getIndex(0) },
        { "id":"ML", "name":"Mali", "value":254, "color":chart.colors.getIndex(2) },
        { "id":"MR", "name":"Mauritania", "value":235, "color":chart.colors.getIndex(2) },
        { "id":"MU", "name":"Mauritius", "value":785, "color":chart.colors.getIndex(2) },
        { "id":"MX", "name":"Mexico", "value":5214, "color":chart.colors.getIndex(4) },
        { "id":"MD", "name":"Moldova", "value":587, "color":chart.colors.getIndex(1) },
        { "id":"MN", "name":"Mongolia", "value":421, "color": chart.colors.getIndex(0) },
        { "id":"ME", "name":"Montenegro", "value":55, "color":chart.colors.getIndex(1) },
        { "id":"MA", "name":"Morocco", "value":4521, "color":chart.colors.getIndex(2) },
        { "id":"MZ", "name":"Mozambique", "value":3201, "color":chart.colors.getIndex(2) },
        { "id":"MM", "name":"Myanmar", "value":520, "color": chart.colors.getIndex(0) },
        { "id":"NA", "name":"Namibia", "value":201, "color":chart.colors.getIndex(2) },
        { "id":"NP", "name":"Nepal", "value":35, "color": chart.colors.getIndex(0) },
        { "id":"NL", "name":"Netherlands", "value":29510, "color":chart.colors.getIndex(1) },
        { "id":"NZ", "name":"New Zealand", "value":2587, "color":"#8aabb0" },
        { "id":"NI", "name":"Nicaragua", "value":412, "color":chart.colors.getIndex(4) },
        { "id":"NE", "name":"Niger", "value":85, "color":chart.colors.getIndex(2) },
        { "id":"NG", "name":"Nigeria", "value":651, "color":chart.colors.getIndex(2) },
        { "id":"NO", "name":"Norway", "value":2985, "color":chart.colors.getIndex(1) },
        { "id":"OM", "name":"Oman", "value":41, "color": chart.colors.getIndex(0) },
        { "id":"PK", "name":"Pakistan", "value":4256, "color": chart.colors.getIndex(0) },
        { "id":"PA", "name":"Panama", "value":1002, "color":chart.colors.getIndex(4) },
        { "id":"PG", "name":"Papua New Guinea", "value":55, "color":"#8aabb0" },
        { "id":"PY", "name":"Paraguay", "value":125, "color":chart.colors.getIndex(3) },
        { "id":"PE", "name":"Peru", "value":658, "color":chart.colors.getIndex(3) },
        { "id":"PH", "name":"Philippines", "value":3847, "color": chart.colors.getIndex(0) },
        { "id":"PL", "name":"Poland", "value":5247, "color":chart.colors.getIndex(1) },
        { "id":"PT", "name":"Portugal", "value":3524, "color":chart.colors.getIndex(1) },
        { "id":"PR", "name":"Puerto Rico", "value":3100, "color":chart.colors.getIndex(4) },
        { "id":"QA", "name":"Qatar", "value":2351, "color": chart.colors.getIndex(0) },
        { "id":"RO", "name":"Romania", "value":1985, "color":chart.colors.getIndex(1) },
        { "id":"RU", "name":"Russia", "value":10587, "color":chart.colors.getIndex(1) },
        { "id":"RW", "name":"Rwanda", "value":233, "color":chart.colors.getIndex(2) },
        { "id":"SA", "name":"Saudi Arabia", "value":8541, "color": chart.colors.getIndex(0) },
        { "id":"SN", "name":"Senegal", "value":221, "color":chart.colors.getIndex(2) },
        { "id":"RS", "name":"Serbia", "value":187, "color":chart.colors.getIndex(1) },
        { "id":"SL", "name":"Sierra Leone", "value":55, "color":chart.colors.getIndex(2) },
        { "id":"SG", "name":"Singapore", "value":16587, "color": chart.colors.getIndex(0) },
        { "id":"SK", "name":"Slovak Republic", "value":854, "color":chart.colors.getIndex(1) },
        { "id":"SI", "name":"Slovenia", "value":354, "color":chart.colors.getIndex(1) },
        { "id":"SB", "name":"Solomon Islands", "value":12, "color":"#8aabb0" },
        { "id":"SO", "name":"Somalia", "value":0, "color":chart.colors.getIndex(2) },
        { "id":"ZA", "name":"South Africa", "value":5874, "color":chart.colors.getIndex(2) },
        { "id":"ES", "name":"Spain", "value":11574, "color":chart.colors.getIndex(1) },
        { "id":"LK", "name":"Sri Lanka", "value":2547, "color": chart.colors.getIndex(0) },
        { "id":"SD", "name":"Sudan", "value":0, "color":chart.colors.getIndex(2) },
        { "id":"SR", "name":"Suriname", "value":87, "color":chart.colors.getIndex(3) },
        { "id":"SZ", "name":"Swaziland", "value":28, "color":chart.colors.getIndex(2) },
        { "id":"SE", "name":"Sweden", "value":4258, "color":chart.colors.getIndex(1) },
        { "id":"CH", "name":"Switzerland", "value":3548, "color":chart.colors.getIndex(1) },
        { "id":"SY", "name":"Syria", "value":0, "color": chart.colors.getIndex(0) },
        { "id":"TW", "name":"Taiwan", "value":18652, "color": chart.colors.getIndex(0) },
        { "id":"TJ", "name":"Tajikistan", "value":52, "color": chart.colors.getIndex(0) },
        { "id":"TZ", "name":"Tanzania", "value":102, "color":chart.colors.getIndex(2) },
        { "id":"TH", "name":"Thailand", "value":6541, "color": chart.colors.getIndex(0) },
        { "id":"TG", "name":"Togo", "value":99, "color":chart.colors.getIndex(2) },
        { "id":"TT", "name":"Trinidad and Tobago", "value":54, "color":chart.colors.getIndex(4) },
        { "id":"TN", "name":"Tunisia", "value":2541, "color":chart.colors.getIndex(2) },
        { "id":"TR", "name":"Turkey", "value":15874, "color":chart.colors.getIndex(1) },
        { "id":"TM", "name":"Turkmenistan", "value":24, "color": chart.colors.getIndex(0) },
        { "id":"UG", "name":"Uganda", "value":120, "color":chart.colors.getIndex(2) },
        { "id":"UA", "name":"Ukraine", "value":651, "color":chart.colors.getIndex(1) },
        { "id":"AE", "name":"United Arab Emirates", "value":12501, "color": chart.colors.getIndex(0) },
        { "id":"GB", "name":"United Kingdom", "value":24210, "color":chart.colors.getIndex(1) },
        { "id":"US", "name":"United States", "value":55254, "color":chart.colors.getIndex(4) },
        { "id":"UY", "name":"Uruguay", "value":1024, "color":chart.colors.getIndex(3) },
        { "id":"UZ", "name":"Uzbekistan", "value":320, "color": chart.colors.getIndex(0) },
        { "id":"VE", "name":"Venezuela", "value":258, "color":chart.colors.getIndex(3) },
        { "id":"PS", "name":"West Bank and Gaza", "value":0, "color": chart.colors.getIndex(0) },
        { "id":"VN", "name":"Vietnam", "value":789, "color": chart.colors.getIndex(0) },
        { "id":"YE", "name":"Yemen, Rep.", "value":0, "color": chart.colors.getIndex(0) },
        { "id":"ZM", "name":"Zambia", "value":254, "color":chart.colors.getIndex(2) },
        { "id":"ZW", "name":"Zimbabwe", "value":147, "color":chart.colors.getIndex(2) }
        ];

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.exclude = ["AQ"];
        polygonSeries.useGeodata = true;
        polygonSeries.nonScalingStroke = true;
        polygonSeries.strokeWidth = 0.5;
        polygonSeries.calculateVisualCenter = true;

        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.data = mapData;
        imageSeries.dataFields.value = "value";

        var imageTemplate = imageSeries.mapImages.template;
        imageTemplate.nonScaling = true

        var circle = imageTemplate.createChild(am4core.Circle);
        circle.fillOpacity = 0.7;
        circle.propertyFields.fill = "color";
        circle.tooltipText = "{name}: [bold]{value}[/]";        

        imageSeries.heatRules.push({
        "target": circle,
        "property": "radius",
        "min": 1,
        "max": 35,
        "dataField": "value"
        })

        imageTemplate.adapter.add("latitude", function(latitude, target) {
        var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
        if(polygon){
            return polygon.visualLatitude;
        }
        return latitude;
        })

        imageTemplate.adapter.add("longitude", function(longitude, target) {
        var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
        if(polygon){
            return polygon.visualLongitude;
        }
        return longitude;
        
        })        
    }

    componentDidMount() {
        console.log("loandig map");
        this.initMap();
        
    }

    componentDidUpdate(){

        this.initMap();
    
      }

      componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    
    render() {
        return (
          <div id="mapdiv" style={{ width: "100%", height: "100%"}}></div>
        );
      }


}

export default MapsWorldBubble;

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv3", am4charts.XYChart);

// Add data
chart.data = [
  {date:new Date(2019,5,12), value1:50, value2:48, previousDate:new Date(2019, 5, 5)},
  {date:new Date(2019,5,13), value1:53, value2:51, previousDate:new Date(2019, 5, 6)},
  {date:new Date(2019,5,14), value1:56, value2:58, previousDate:new Date(2019, 5, 7)},
  {date:new Date(2019,5,15), value1:52, value2:53, previousDate:new Date(2019, 5, 8)},
  {date:new Date(2019,5,16), value1:48, value2:44, previousDate:new Date(2019, 5, 9)},
  {date:new Date(2019,5,17), value1:47, value2:42, previousDate:new Date(2019, 5, 10)},
  {date:new Date(2019,5,18), value1:59, value2:55, previousDate:new Date(2019, 5, 11)}
]

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value1";
series.dataFields.dateX = "date";
series.strokeWidth = 2;
series.minBulletDistance = 10;
series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
series.tooltip.pointerOrientation = "vertical";

// Create series
var series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "value2";
series2.dataFields.dateX = "date";
series2.strokeWidth = 2;
series2.strokeDasharray = "3,4";
series2.stroke = series.stroke;

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;

});

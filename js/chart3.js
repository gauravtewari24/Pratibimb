

am4core.ready(function() {
  
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv3", am4charts.XYChart);
    
    // Add data
    chart.data = [
      {date:new Date(2019,5,5), value1:50, value2:15, previousDate:new Date(2019, 5, 5)},
      {date:new Date(2019,5,6), value1:53, value2:30, previousDate:new Date(2019, 5, 6)},
      {date:new Date(2019,5,7), value1:56, value2:45, previousDate:new Date(2019, 5, 7)},
      {date:new Date(2019,5,8), value1:52, value2:60, previousDate:new Date(2019, 5, 8)},
      {date:new Date(2019,5,9), value1:48, value2:70, previousDate:new Date(2019, 5, 9)},
      {date:new Date(2019,5,10), value1:47, value2:75, previousDate:new Date(2019, 5, 10)},
      {date:new Date(2019,5,11), value1:59, value2:75, previousDate:new Date(2019, 5, 11)},
      
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
    
    


    /* 
                         

                          am4core.ready(function () {
                            // Themes begin
                                                  am4core.useTheme(am4themes_frozen)
                                                  am4core.useTheme(am4themes_animated)
                                                  // Themes end
                                                
                                                  var chart = am4core.create('chartdiv1', am4charts.XYChart)
                                                  chart.paddingRight = 20
                                                
                                                  var data = []
                                                  var visits = 10
                                                  var previousValue
                                                  //var name="<%=elements[0]['avg']%>";
                                               // console.log(typeof (name));
                                              //  console.log(elements["avg"]);
                                                 
                        
                                                  for (var i = 0; i < 10; i++) {
                                                    
                                                   // var name="<%=elements["+i+"['avg']%>";
                        
                                                    
                                                    visits = 10;//elements[0]["avg"];//Math.round((Math.random() < 0.5 ? 2 : -2) * Math.random() * 10)
                                                
                                                    if (i > 0) {
                                                      // add color to previous data item depending on whether current value is less or more than previous value
                                                      if (previousValue <= visits) {
                                                        data[i - 1].color = chart.colors.getIndex(0)
                                                      } else {
                                                        data[i - 1].color = chart.colors.getIndex(5)
                                                      }
                                                    }
                                                
                                                    data.push({ date: new Date(2020,11, i+1), value: visits })
                                                    previousValue = visits
                                                  }
                                                
                                                  chart.data = data
                                                
                                                  var dateAxis = chart.xAxes.push(new am4charts.DateAxis())
                                                  dateAxis.renderer.grid.template.location = 0
                                                  dateAxis.renderer.axisFills.template.disabled = true
                                                  dateAxis.renderer.ticks.template.disabled = true
                                                
                                                  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
                                                  valueAxis.tooltip.disabled = true
                                                  valueAxis.renderer.minWidth = 35
                                                  valueAxis.renderer.axisFills.template.disabled = true
                                                  valueAxis.renderer.ticks.template.disabled = true
                                                
                                                  var series = chart.series.push(new am4charts.LineSeries())
                                                  series.dataFields.dateX = 'date'
                                                  series.dataFields.valueY = 'value'
                                                  series.strokeWidth = 2
                                                  series.tooltipText = 'value: {valueY}, day change: {valueY.previousChange}'
                                                
                                                  // set stroke property field
                                                  series.propertyFields.stroke = 'color'
                                                
                                                  chart.cursor = new am4charts.XYCursor()
                                                
                                                  var scrollbarX = new am4core.Scrollbar()
                                                  chart.scrollbarX = scrollbarX
                                                
                                                  dateAxis.start = 0.7
                                                  dateAxis.keepSelection = true
                                                }); */
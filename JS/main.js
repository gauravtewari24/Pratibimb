// variables for graph accuracy
var acc=0.30 , nacc =0.60;
// ==== TIMER and ML Model
function timer() {
    var z = document.getElementById("timer");


var countDownDate = 10;
var now = 0;
// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time


  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  /* var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   *///var seconds = Math.floor((distance % (1000 * 60)) / 1000);
   var seconds = distance;
  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = seconds + "s ";
    now=now+1;
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "Finsished";
  }
}, 1000);
       }
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/Ypf9Iq02B/";
    let model, webcam, ctx, labelContainer, maxPredictions;

    async function init() {

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 670;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        ctx = canvas.getContext("2d");
        var x = document.getElementById("hideit");
        x.style.display = "none";
        var y= document.getElementById("timer");
        y.style.display = "block";
        timer();
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop(timestamp) {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
            var san = prediction[i].probability.toFixed(1);
            console.log("san= "+san);
        }

        // finally draw the poses
        drawPose(pose);
    }

    function drawPose(pose) {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }


// ==== Chart 1 ====
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

  for (var i = 0; i < 100; i++) {
    visits += Math.round((Math.random() < 0.5 ? 2 : -2) * Math.random() * 10)

    if (i > 0) {
      // add color to previous data item depending on whether current value is less or more than previous value
      if (previousValue <= visits) {
        data[i - 1].color = chart.colors.getIndex(0)
      } else {
        data[i - 1].color = chart.colors.getIndex(5)
      }
    }

    data.push({ date: new Date(2018, 0, i + 1), value: visits })
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
}) // end am4core.ready()

// ==== CHART 2 ====
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv2", am4charts.PieChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = [
  {
    country: "Lithuania",
    value: acc
  },
  {
    country: "Czech Republic",
    value: nacc
  },

];
chart.radius = am4core.percent(70);
chart.innerRadius = am4core.percent(40);
chart.startAngle = 180;
chart.endAngle = 360;

var series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "value";
series.dataFields.category = "country";

series.slices.template.cornerRadius = 10;
series.slices.template.innerCornerRadius = 7;
series.slices.template.draggable = true;
series.slices.template.inert = true;
series.alignLabels = false;

series.hiddenState.properties.startAngle = 90;
series.hiddenState.properties.endAngle = 90;

chart.legend = new am4charts.Legend();

}); // end am4core.ready()


// ==== CHART 3 ====

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



// ==== CHART 4 ====
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// create chart
var chart = am4core.create("chartdiv4", am4charts.GaugeChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

chart.innerRadius = -25;

var axis = chart.xAxes.push(new am4charts.ValueAxis());
axis.min = 0;
axis.max = 100;
axis.strictMinMax = true;
axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
axis.renderer.grid.template.strokeOpacity = 0.3;

var colorSet = new am4core.ColorSet();

var range0 = axis.axisRanges.create();
range0.value = 0;
range0.endValue = 50;
range0.axisFill.fillOpacity = 1;
range0.axisFill.fill = colorSet.getIndex(0);
range0.axisFill.zIndex = - 1;

var range1 = axis.axisRanges.create();
range1.value = 50;
range1.endValue = 80;
range1.axisFill.fillOpacity = 1;
range1.axisFill.fill = colorSet.getIndex(2);
range1.axisFill.zIndex = -1;

var range2 = axis.axisRanges.create();
range2.value = 80;
range2.endValue = 100;
range2.axisFill.fillOpacity = 1;
range2.axisFill.fill = colorSet.getIndex(4);
range2.axisFill.zIndex = -1;

var hand = chart.hands.push(new am4charts.ClockHand());

// using chart.setTimeout method as the timeout will be disposed together with a chart
chart.setTimeout(randomValue, 2000);

function randomValue() {
    hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
    chart.setTimeout(randomValue, 2000);
}

}); // end am4core.ready()

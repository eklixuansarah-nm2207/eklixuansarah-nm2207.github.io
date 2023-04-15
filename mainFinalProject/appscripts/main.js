//scrollReveal
ScrollReveal().reveal(".section", {
  // time for reveal animations to begin
  delay: 500,
  // set portion of the section that should be in the viewport for it to be visible
  viewFactor: 0.2,
  // set how long animations take to complete
  duration: 500,
});

// graphics for all buttons
let buttons = document.getElementsByClassName("button");
// mouseover and mouseleave event listener for all elements with class name "button"
for (let i = 0; i < buttons.length; i++) {
// for every button, change background colour when mouse hovers over the button
buttons[i].addEventListener("mouseover", function () {
  buttons[i].style.backgroundColor = "#5c6a85";
});
// for every button, change background colour back to original when mouse leaves button
buttons[i].addEventListener("mouseleave", function () {
  buttons[i].style.backgroundColor = "#677694";
});
}

// deals with error about autoplay sound on hover
// by clicking on button, this ensures that user interacts with the webpage
// this allows for audio to autoplay when mouse hovers over video
document.getElementById("soundon").addEventListener("click", function () {
  // this brings user to the video section
  document.location.href = "#video-container";
});

// to autoplay audio when mouse enters the video-container
document.getElementById("video-container").addEventListener("mouseenter", function () {
  song = new Audio(document.getElementById("song").getAttribute("src"));
  song.play();
});

// to pause audio when mouse leaves video-container
document
.getElementById("video-container")
.addEventListener("mouseleave", function () {
  song.pause();
});

// to integrate user's name into website content after user types name and clicks button
document.getElementById("nameButton").addEventListener("click", function () {
  //greeting message
  let name = document.getElementById("nameBox").value;
  document.getElementById("greeting").innerHTML = "Hello " + name + "!";
  // main content: for loop to replace every <t class="name"></t> by the user input name
  let names = document.getElementsByClassName("name");
  for (let i = 0; i < names.length; i++) {
    names[i].innerHTML = name + ".";
  }
});

// "yes" button for section 2
document.getElementById("yes").addEventListener("click", function () {
// brings user to stated section upon click of button
document.location.href = "#section3";
// changing words displayed according to choice of button
document.getElementById("change").innerHTML =
  "Nice! I love games too! I want you to think of your gaming habits and attitudes. How often do you game per week? For how long? How do you feel while gaming? How do you feel <i>after</i> gaming? <br><br> I'm sure you would understand the feeling of wanting to keep continuing game after game, would you?";
});

// "no" button for section 2
document.getElementById("no").addEventListener("click", function () {
// brings user to stated section upon click of button
document.location.href = "#section3";
// changing words displayed according to choice of button
document.getElementById("change").innerHTML =
  "Oh, that's alright! You could have other hobbies, no worries. However, it would still be interesting to learn about the worldwide gaming situation, wouldn't it? :) Or perhaps you might know someone around you who is an avid gamer. <br><br> Let me try to describe to you how gaming is like. It's something like scrolling on TikTok, for example.";
});

// text animations
// simplifying code by using loop and if-else statements
const animation = document.getElementsByClassName("anim1")
// for loop to go through all the 8 text animations with the class "anim1"
for (let i=0; i<animation.length; i++){
  // getting the ID of the class "anim1" so that I can personalise the animation
  const animId= animation[i].id
  // getting the element itself through the ID
  const animElement = document.getElementById(animId)
  if(animId== "text0" || animId == "text2" || animId == "text4" || animId == "text6"){
    gsap.to(animElement,{
      // translate element 50% to the right
      x: "50%",
      // rotate element by 30 degrees
      rotate: 30,
      // animation duration
      duration: 0.9,
      scrollTrigger: {
      // scrolling of the element triggers the animation
      trigger: animElement,
      // to ensure that animation scrolls along with user scroll
      scrub: true,
      // animation starts only when 50% of the viewport is gone through
      start: "top 50%",
      }
    })
  }
  else{
    // same idea as before
    gsap.to(animElement,{
      // translate to the left instead of right
      x: "-50%",
      // rotate different direction
      rotate: -30,
      duration: 0.9,
      scrollTrigger: {
      trigger: animElement,
      scrub: true,
      start: "top 50%",
      }
    })
  }
}

// fetchapi
const data = fetch(
  "https://2207-resources.s3.ap-southeast-1.amazonaws.com/GamingStudyData3.csv"
)
  .then(function (response) {
    return response.text();
  })
  .then(function (data) {
    processData(data);
    createBarChart();
    createPieChart();
    updatePieChart();
    createAgeBar();
    createWWMap();
    createWWScatter();
    createRegionPie();
    createRegionScatter();
  });

// function for extracting data
const table = [];
const processData = function(data){
  const rows = data.split("\r\n");
  //creating the table
  rows.forEach((r, index) => {
    const item = r.split(",");
    table.push(item);
  });
}

// gaming penetration chart
// defining variables
const labelRegion = [ "Africa","Asia","South America","North America","Europe","Oceania",];
const percentage = ["86.6", "86.1", "85.3", "84.6", "77.5", "76.3"];

// function for creating gaming penetration chart
const createBarChart = function(){
 const regionDataObj = {
   labels: labelRegion,
   datasets: [
     {
       label: "Average % by Region",
       data: percentage,
       backgroundColor: "#ffff99",
     },
   ],
  };
 new Chart("gaming-penetration-chart", {
   type: "horizontalBar",
   data: regionDataObj,
   options: {
     maintainAspectRatio: false,
     legend: {
       display: false,
     },
     scales: {
       xAxes: [
         {
           display: true,
           ticks: {
             // changing scale of x-axis
             suggestedMin: 0,
             suggestedMax: 100,
             fontColor: "bisque",
           },
           gridLines: {
             display: false,
           },
         },
       ],
       yAxes: [
         {
           display: true,
           ticks: {
             fontColor: "bisque",
           },
           gridLines: {
             display: false,
           },
         },
       ],
     },
    //  adding line to show worldwide average
     annotation: {
       annotations: [
         {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: 82.0,
          borderColor: "red",
          borderWidth: 2,
          // adding label to the line
          label: {
            content: "Worldwide Avg: 82%",
            enabled: true,
            // setting position of label
            position: "top",
           },
         },
       ],
     },
   },
 });
}

// gender pie chart
// defining variables
const gender = [492, 8896, 27];
const genderlabels = ["Female", "Male", "Other"];
const gendercolor = ["#ffd1dc", "#8e9dcd", "#00e6e6"];
const recruitment = [2, 4, 30, 9358, 21];
const recruitmentlabels = ["Crowdflower","NA","Other","Reddit","TeamLiquid.net",];
const recruitmentcolor = ["green", "cyan", "#291F1E", "#ffc87a", "red"];

// function to create gender pie
const createPieChart = function(){
  const genderDataObj = {
    labels: genderlabels,
    datasets: [
      {
        label: "Gender",
        data: gender,
        backgroundColor: gendercolor,
      },
    ],
  }
  ch = new Chart("demographics1", {
    type: "doughnut",
    data: genderDataObj,
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Gender",
        fontColor: "bisque",
        fontSize: 20,
      },
      legend: {
        display:true,
        labels: {
          boxWidth: 20,
          fontColor: "bisque",
          fontSize: 12,
        },
        position: "top",
      },
      // remove border of doughnut chart
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
    },
  });
}

// function to update gender piechart
const updatePieChart = function(){
  document.getElementById("toggle").addEventListener("click", function () {
    // if-else to see which chart is being displayed at the moment
    if (ch.data.datasets[0].label == "Recruitment") {
      // changing data from recruitment to gender
      ch.data.datasets[0].data = gender;
      // change label so system that can tell which chart is being displayed
      ch.data.datasets[0].label = "Gender";
      // changing labels, background colour and text from recruitment chart to gender chart
      ch.data.labels = genderlabels;
      ch.data.datasets[0].backgroundColor = gendercolor;
      ch.options.title.text = "Participants by Gender";
      document.getElementById("toggle").innerHTML = "<b>Change to Recruitment Platform<b>";
    } else {
      // changing data from gender to recruiment
      ch.data.datasets[0].data = recruitment;
      // change label so system that can tell which chart is being displayed
      ch.data.datasets[0].label = "Recruitment";
      // changing labels, background colour and text from recruitment chart to gender chart
      ch.data.labels = recruitmentlabels;
      ch.data.datasets[0].backgroundColor = recruitmentcolor;
      ch.options.title.text = ["Where participants were", "recruited from"];
      // change text in toggle button too
      document.getElementById("toggle").innerHTML = "<b>Change to Gender<b>";
    }
    // update the chart with the new details
    ch.update();
  });
}

// bar graph of ages
// defining variables
const labelAge = [18, 19, 20, 21, 22, 23, 24];
const ageCount = [2914, 1730, 1485, 1193, 883, 695, 515];
//function to create age bar chart
const createAgeBar = function(){
  const dataAge = {
    labels: labelAge,
    datasets: [
      {
        label: "Number of Participants",
        data: ageCount,
        fill: false,
        backgroundColor: "#b2d3c2",
      },
    ],
  };
  new Chart("age", {
    type: "bar",
    data: dataAge,
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: ["Participant Age Group"],
        fontColor: "bisque",
        fontSize: 20,
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              fontColor: "bisque",
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              fontColor: "bisque",
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  })
};

// ww map
// function to create scatterplot
const createWWMap = function() {
  // defining variables
  // columns 1 to 105, because there are empty values
  const residence = table[0].slice(1, 105);
  const residenceAvgHours = table[1].slice(1, 105);
  const residenceAvgSWL = table[2].slice(1, 105);

  // round off numbers to 1 d.p.
  let len = residenceAvgSWL.length;
  for (let x = 0; x < len; x++) {
    // parseFloat ensures all are numbers
    residenceAvgSWL[x] = parseFloat(residenceAvgSWL[x]).toFixed(1);
  }

  // create map
  const mapdata = [
    {
      type: "choropleth",
      // so that plotly knows that the variable is meant to be country names
      locationmode: "country names",
      locations: residence,
      z: residenceAvgHours,
      text: residenceAvgSWL,
      customdata: residence,
      // create customised tooltip
      hovertemplate:
        // gaming hours to be presented in 1 dp by using the code: ,.1f
        "<b>%{customdata}</b> <br><br>" +
        "Average Gaming Hours Per Week: %{z:,.1f}<br>" +
        "Average Satisfaction with Life: %{text}<br>" +
        "<extra></extra>",
    },
  ];

  const maplayout = {
    // format the background
    paper_bgcolor: "transparent",
    font: {color: "white",},
    geo: {
      // map view type
      scope: "world",
      bgcolor: "transparent",
      showframe: false,
      resolution: 110,
      // add details
      showland: true,
      oceancolor: "#aec6cf",
      showocean: true,
      landcolor: "#bfefbf",
      showlakes: true,
      lakecolor: "#e0ffff",
      projection: {type: "robinson",},
    },
  };

  Plotly.newPlot("mapchart", mapdata, maplayout);
};

// ww scatterplot
// function to create scatter plot
const createWWScatter = function(){
  // declaring variables used
  const wwHours = table[3].slice(1);
  const wwSWL = table[4].slice(1);
  // putting the data from different slices into coordinates for scatterplot
  const coords = wwHours.map((s, h) => ({ x: s, y: wwSWL[h] }));

    scatterChart = new Chart("ww-scatter-plot", {
    type: "scatter",
    data: {
      datasets: [
        {
          data: coords,
          label: "Label",
          pointRadius: 2,
          pointBackgroundColor: "white",
        },
      ],
    },
    options: {
      legend: false,
      responsive: true,
      tooltips: {
        mode: "index",
        callbacks: {
          label: function (tooltipItems) {
            if (tooltipItems.datasetIndex === 2) {
              return "y=-0.066x+21.2107";
            } else {
              return (
                "Number of Hours per week: " +
                tooltipItems.xLabel +
                ", Life Satisfaction: " +
                tooltipItems.yLabel
              );
            }
          },
        },
      },
      plugins: {legend: { display: false },},
      animation: false,
      scales: {
        xAxes: [
          {
            // adding labels and formatting
            scaleLabel: {
              labelString: "Number of Hours of Gaming per Week",
              display: true,
              fontColor: "white",
              fontSize: 20,
            },
            ticks: {
              fontColor: "white",
            },
            // removing gridlines
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            // adding labels and formatting
            scaleLabel: {
              labelString: "Life Satisfaction Score (out of 35)",
              display: true,
              fontSize: 20,
              fontColor: "white",
            },
            ticks: {
              fontColor: "white",
            },
            // removing gridlines
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  });

  // creating trendline
  let trendLineDataSet = {
    type: "line",
    data: [
      { x: 0, y: 21.207 },
      { x: 112, y: 13.815 },
    ],
    borderColor: "red",
    borderWidth: 3,
    showLine: true,
    pointRadius: 0,
    fill: false,
  };

  // adding trendline
  scatterChart.data.datasets.push(trendLineDataSet);
  scatterChart.data.datasets.reverse();
  scatterChart.update();
}

// region pie chart
// function to create region pie chart
const createRegionPie = function(){
  // pie chart of regions
  const regionDataObj2 = {
    labels: ["Africa","Asia","Europe","North America","Oceania","South America",],
    datasets: [
      {
        label: "Regions",
        data: [39, 207, 4528, 4020, 231, 390],
        backgroundColor: ["#609cf4","#705f5f","#a08b78","#c2b9ed","#4e7049","#dfd20d",],
      },
    ],
  };
  new Chart("region-pie", {
    type: "pie",
    data: regionDataObj2,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        labels: {
          boxWidth: 20,
          fontColor: "bisque",
          fontSize: 16,
        },
        position: "right",
      },
      // remove border of doughnut chart
      elements: {
        arc: {borderWidth: 0,},
      },
    },
  });
}

// region scatterplot
// defining button
const change = document.getElementsByClassName("region");

// defining trendline points to plot
const africaTL = [{ x: 0, y: 16.647 },{ x: 50, y: 22.112 },];
const oceaniaTL = [{ x: 0, y: 20.79 },{ x: 90, y: 14.625 },];
const saTL = [{ x: 0, y: 20.639 },{ x: 85, y: 17.8085 },];
const asiaTL = [{ x: 0, y: 18.753 },{ x: 75, y: 18.093 },];
const euTL = [{ x: 0, y: 21.394 },{ x: 105, y: 12.91 },];
const naTL = [{ x: 0, y: 21.222 },{ x: 112, y: 15.0508 },];

// function to create scatterplot
const createRegionScatter = function(){
  // splitting variables
  const africaHours = table[5].slice(1, 40);
  const africaSWL = table[6].slice(1, 40);
  const oceaniaHours = table[7].slice(1, 232);
  const oceaniaSWL = table[8].slice(1, 232);
  const saHours = table[9].slice(1, 391);
  const saSWL = table[10].slice(1, 391);
  const asiaHours = table[11].slice(1, 208);
  const asiaSWL = table[12].slice(1, 208);
  const euHours = table[13].slice(1, 4529);
  const euSWL = table[14].slice(1, 4529);
  const naHours = table[15].slice(1, 4021);
  const naSWL = table[16].slice(1, 4021);
  
  // putting variables into (x,y) scatterplot points
  const africaData = africaHours.map((s, h) => ({ x: s, y: africaSWL[h] }));
  const asiaData = asiaHours.map((s, h) => ({ x: s, y: asiaSWL[h] }));
  const euData = euHours.map((s, h) => ({ x: s, y: euSWL[h] }));
  const naData = naHours.map((s, h) => ({ x: s, y: naSWL[h] }));
  const oceaniaData = oceaniaHours.map((s, h) => ({x: s, y: oceaniaSWL[h],}));
  const saData = saHours.map((s, h) => ({ x: s, y: saSWL[h] }));
  
  // creating scatterchart
  scatterChartRegion = new Chart("scatter-plots", {
    type: "scatter",
    data: {
      datasets: [
        {
          data: africaData,
          label: "Africa",
          pointRadius: 2,
          pointBackgroundColor: "white",
        },
      ],
    },
    options: {
      tooltips: {
        mode: "index",
        // adding customised tooltip
        callbacks: {
          label: function (tooltipItems) {
            return (
              "Number of Hours per Week: " +
              tooltipItems.xLabel +
              ", Life Satisfaction: " +
              tooltipItems.yLabel
            );
          },
        },
      },
      responsive: true,
      legend:false,
      animation: false,
      title: {
        display: true,
        text: "Africa",
        fontSize: 24,
        fontColor: "white",
      }, 
      scales: {
        xAxes: [
          {
            scaleLabel: {
              labelString: ["Number of Hours of Gaming per Week"],
              display: true,
              fontColor: "white",
              fontSize: 20,
            },
            ticks: {
              fontColor: "white",
              suggestedMin: 0,
              suggestedMax: 116,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              labelString: "Life Satisfaction Score (out of 35)",
              display: true,
              fontSize: 20,
              fontColor: "white",
            },
            ticks: {
              fontColor: "white",
              suggestedMin: 0,
              suggestedMax: 35,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  });

  // creating trendline
  let trendLineDataSet2 = {
    type: "line",
    data: africaTL,
    borderColor: "red",
    borderWidth: 3,
    showLine: true,
    // so that the two points i plotted to draw the line wouldn't be seen
    pointRadius: 0,
    fill: false,
  };
  // adding trendline to chart
  scatterChartRegion.data.datasets.push(trendLineDataSet2);
  // reverse the order of the data in datasets so that trendline can appear in front the points
  scatterChartRegion.data.datasets.reverse();
  scatterChartRegion.update();
  
  // function to update scatterplot
  let updateScatter = function (line, data, label) {
    scatterChartRegion.data.datasets[1].data = data;
    scatterChartRegion.data.datasets[1].label = label;
    scatterChartRegion.options.title.text = label;
    trendLineDataSet2.data = line;
    scatterChartRegion.update()
  };

  // event handler that changes chart view between regions when clicked
  for (let i = 0; i < change.length; i++) {
    // changing charts
    change[i].addEventListener("click", function () {
      // if-else statement to check which button was clicked and change data accordingly
      if (change[i].value == "Africa") {
        updateScatter(africaTL, africaData, "Africa");
      } else if (change[i].value == "Asia") {
        updateScatter(asiaTL, asiaData, "Asia");
      } else if (change[i].value == "Europe") {
        updateScatter(euTL, euData, "Europe");
      } else if (change[i].value == "North America") {
        updateScatter(naTL, naData, "North America");
      } else if (change[i].value == "Oceania") {
        updateScatter(oceaniaTL, oceaniaData, "Oceania");
      } else if (change[i].value == "South America") {
        updateScatter(saTL, saData, "South America");
      }
    })
  }
};

// formatting buttons for the region scatter plot
for (let i = 0; i < change.length; i++) {
  // for every button, change background colour when mouse hovers over the button
  change[i].addEventListener("mouseover", function () {
    change[i].style.backgroundColor = "#5c6a85";
  })
  // for every button, change background colour back to original when mouse leaves button
  change[i].addEventListener("mouseleave", function () {
    change[i].style.backgroundColor = "#677694";
  })
};



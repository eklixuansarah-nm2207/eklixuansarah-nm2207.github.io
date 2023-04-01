ScrollReveal().reveal('.mainsection',{ delay: 300 });
ScrollReveal().reveal('.section',{ delay: 600 });

// fetchapi
const data = fetch(
  "https://2207-resources.s3.ap-southeast-1.amazonaws.com/GamingStudyData3.csv" //replace this with the appropriate URL
)
  .then(function (response) {
    return response.text();
  })
  .then(function (data) {
    const table = [];
    const rows = data.split("\r\n"); 

    //creating the table
    rows.forEach((r, index) => {
      const item = r.split(",");
      table.push(item);
    });

    // declaring all the variables i'm using
 
    const wwHours = table[3].slice(1);
    const wwSWL = table[4].slice(1);
  


    // to replace greeting content with input name
    document
      .getElementById("nameButton")
      .addEventListener("click", function () {
        let name = document.getElementById("nameBox").value;
        document.getElementById("greeting").innerHTML = "Hello " + name + "!";
        // for loop to replace every <t class="name"></t> by the user input name
        let names = document.getElementsByClassName("name");
        for (let i = 0; i < names.length; i++) {
          names[i].innerHTML = name + ".";
        }
      });

    // to get song to loop when finished, but this doesn't seem to work. need to debug
    document.getElementById("song").loop = true;

    // to autoplay audio when mouse enters the video-container
    document
      .getElementById("video-container")
      .addEventListener("mouseenter", function () {
        song = new Audio(document.getElementById("song").getAttribute("src"));
        song.play();
      });

    // to pause audio when mouse leaves video-container
    document
      .getElementById("video-container")
      .addEventListener("mouseleave", function () {
        song.pause();
      });

    // mouseover and mouseleave event listener for all classes named button
    let buttons = document.getElementsByClassName("button");
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


    document.getElementById("yes").addEventListener("click", function () {
      // brings user to stated section upon click of button
      document.location.href = "#section3.1";
    });

    // when no is pressed, user is moved to the next section, and innerhtml of the next section is changed
    document.getElementById("no").addEventListener("click", function () {
      document.location.href = "#section3.1";
      document.getElementById("change").innerHTML =
        "Oh, that's alright! You could have other hobbies, no worries. However, it would still be interesting to learn about the worldwide gaming situation, wouldn't it? :) Or perhaps you might know someone around you who is an avid gamer. Let me try to describe to you how gaming is like. <br><br>";
    });

    // button to go next
    document.getElementById("ok").addEventListener("click", function () {
      document.location.href = "#section4";
    });

    // bar chart for region penetration %
    const labelRegion = [
      "Africa",
      "Asia",
      "South America",
      "North America",
      "Europe",
      "Oceania",
    ];
    const percentage = ["86.6", "86.1", "85.3", "84.6", "77.5", "76.3"];

    //Source of data: Statista
    // need to work on adding worldwide average % as a line to compare all the regions to

    const dataObj = {
      labels: labelRegion,
      datasets: [
        {
          label: "Average % by Region",
          data: percentage,
          fill: false,
          backgroundColor: "#e97976",
        },
      ],
      grid: {
        x: {
          lines: { value: 82, text: 82 },
          color: "yellow",
        },
      },
    };

    new Chart("gaming-penetration-chart", {
      type: "horizontalBar",
      data: dataObj,
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
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
      },
    });

    const gender = [492, 8896, 27];
    const genderlabels = ["Female", "Male", "Other"];
    const gendercolor = ["#ffd1dc", "#8e9dcd", "#00e6e6"];
    const recruitment = [2, 4, 30, 9358, 21];
    const recruitmentlabels = [
      "Crowdflower",
      "NA",
      "Other",
      "Reddit",
      "TeamLiquid.net",
    ];
    const recruitmentcolor = ["green", "cyan", "#291F1E", "#ffb347", "red"];
    const ch = new Chart("demographics1", {
      type: "doughnut",
      data: {
        labels: genderlabels,
        datasets: [
          {
            label: "Gender",
            data: gender,
            backgroundColor: gendercolor,
          },
        ],
      },

      options: {
        maintainAspectRatio: false,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Gender",
          fontColor: "bisque",
          fontfamily: "'Fredoka One', cursive",
          fontSize:20,
        },
        legend: {
          labels: {
            boxWidth: 20,
            fontColor: "bisque",
            fontfamily: "'Fredoka One', cursive",
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

    document.getElementById("toggle").addEventListener("click", function () {
      // if-else to see which chart is being displayed at the moment
      if (ch.data.datasets[0].label == "Recruitment") {
        // changing data from recruiment to gender
        ch.data.datasets[0].data = gender;
        // change label so system that can tell which chart is being displayed
        ch.data.datasets[0].label = "Gender";
        // changing labels, background colour and text from recruitment chart to gender chart
        ch.data.labels = genderlabels;
        ch.data.datasets[0].backgroundColor = gendercolor;
        ch.options.title.text = ["Participants by Gender"];

        document.getElementById("toggle").innerHTML =
          "Change to Recruitment Platform";
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
        document.getElementById("toggle").innerHTML = "Change to Gender";
      }
      // update the chart with the new details
      ch.update();
    });

    // bar graph of ages
    const labelAge = [18, 19, 20, 21, 22, 23, 24];
    const ageCount = [2914, 1730, 1485, 1193, 883, 695, 515];
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
    });
    
    // columns 1 to 105, because there are empty values
    const residence = table[0].slice(1,105);
    const residenceAvgHours= table[1].slice(1,105);
    const residenceAvgSWL = table[2].slice(1,105);
  
    // round off numbers to 1 d.p.
    let len = residenceAvgSWL.length
    for(let x=0; x < len; x++){ 
    // parseFloat ensures all are numbers
    residenceAvgSWL[x] = parseFloat(residenceAvgSWL[x]).toFixed(1); 
    };

    // map chart

    const mapdata = [{
        type: "choropleth",
        // so that plotly knows that the variable is meant to be country names
        locationmode:'country names',
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
            "<extra></extra>"
      }];
      

    const maplayout = {
      font:{
        color:'white'
      },
      paper_bgcolor:'rgba(0,0,0,0)',
      geo: {
        // map view type
        resolution: 150,
        lataxis: {
          range: [-90, 90]
        }, 
        lonaxis: {
          range: [-180, 180]
        },
        projection: {
          type: "robinson",
        },
        width:600,
        height: 500,
      },
    }
    const mapconfig = {responsive:true}
    Plotly.newPlot("mapchart", mapdata, maplayout, mapconfig);
      
  

    // putting the data from different slices into coordinates for scatterplot
    const coords = wwHours.map((s, h) => ({ x: s, y: wwSWL[h] }));

    let ctx = document.getElementById("ww-scatter-plot");
    const scatterChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            data: coords,
            label:"Label",
            pointRadius:2,
            pointBackgroundColor:'white',
          },
        ]
      },
      options: {
        tooltips:{
          mode:'index',
          callbacks:{
            label:function(tooltipItems){
              return 'Number of Hours per week: ' + tooltipItems.xLabel + '\n Life Satisfaction: ' + tooltipItems.yLabel;}
            } 
        },
          legend:false,
          responsive:true,
          plugins:{
            legend:{display:false,},
          },
          animation:false,
          title:{
            display:false
          },
          scales: {
            xAxes: [{
                scaleLabel: {
                  labelString: ['Number of Hours of Gaming per Week'],
                  display: true,
                  fontColor: "white",
                  fontSize:20
                },
                ticks: {
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                }
              },
            ],
            yAxes: [
              {
                scaleLabel:{
                  labelString: "Life Satisfaction Score (out of 35)",
                  display: true,
                  fontSize:20,
                  fontColor: "white",
                },
                ticks: {
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                }
              },
            ],
          },
        },
      },
    );

    // pie chart of regions
    const region = {
      labels: [
        "Africa",
        "Asia",
        "Europe",
        "North America",
        "Oceania",
        "South America",
      ],
      datasets: [
        {
          label: "Regions",
          data: [39, 207, 4528, 4020, 231, 390],
          backgroundColor: [
            "#609cf4",
            "#705f5f",
            "#a08b78",
            "#c2b9ed",
            "#4e7049",
            "#dfd20d",
          ],
        },
      ],
    };

    new Chart("region-pie", {
      type: "pie",
      data: region,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Number of Participants by Region",
          fontColor: "bisque",
          fontfamily: "'Fredoka One', cursive",
          fontSize: 24,
        },
        legend: {
          labels: {
            boxWidth: 20,
            fontColor: "bisque",
            fontfamily: "'Fredoka One', cursive",
            fontSize: 10,
          },
          position: "right",
        },
        // remove border of doughnut chart
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      },
    });
    // scatterplot of different regions

    const africaHours = table[5].slice(1,40);
    const africaSWL = table[6].slice(1,40);
    const oceaniaHours = table[7].slice(1,232);
    const oceaniaSWL = table[8].slice(1,232);
    const saHours = table[9].slice(1,391);
    const saSWL = table[10].slice(1,391);
    const asiaHours = table[11].slice(1,208);
    const asiaSWL = table[12].slice(1,208);
    const euHours = table[13].slice(1,4529);
    const euSWL = table[14].slice(1,4529);
    const naHours = table[15].slice(1,4021);
    const naSWL = table[16].slice(1,4021);

    const africaData = africaHours.map((s, h) => ({ x: s, y: africaSWL[h] }));
    const asiaData = asiaHours.map((s, h) => ({ x: s, y: asiaSWL[h] }));
    const euData = euHours.map((s, h) => ({ x: s, y: euSWL[h] }));
    const naData = naHours.map((s, h) => ({ x: s, y: naSWL[h] }));
    const oceaniaData = oceaniaHours.map((s, h) => ({ x: s, y: oceaniaSWL[h] }));
    const saData = saHours.map((s, h) => ({ x: s, y: saSWL[h] }));

    let ctx2 = document.getElementById("scatter-plots");
    const scatterChartRegion = new Chart(ctx2, {
      type: "scatter",
      data: {
        datasets: [
          {
            data: africaData,
            label:"Africa",
            pointRadius:2,
            pointBackgroundColor:'white',
          },
        ]
      },
      options: {
        tooltips:{
          mode:'index',
          callbacks:{
            label:function(tooltipItems){
              return 'Number of Hours per week: ' + tooltipItems.xLabel + '\u000d Life Satisfaction: ' + tooltipItems.yLabel;}
            } 
        },
          legend:false,
          responsive:true,
          plugins:{
            legend:{display:false,},
          },
          animation:false,
          title:{
            display:true,
            text:'Africa',
            fontSize:24,
            fontColor:'white'
          },
          scales: {
            xAxes: [{
                scaleLabel: {
                  labelString: ['Number of Hours of Gaming per Week'],
                  display: true,
                  fontColor: "white",
                  fontSize:20
                },
                ticks: {
                  fontColor: "white",
                  suggestedMin: 0,
                  suggestedMax: 116,
                },
                gridLines: {
                  display: false,
                }
              },
            ],
            yAxes: [
              {
                scaleLabel:{
                  labelString: "Life Satisfaction Score (out of 35)",
                  display: true,
                  fontSize:20,
                  fontColor: "white",
                },
                ticks: {
                  fontColor: "white",
                  suggestedMin: 0,
                  suggestedMax: 35,
                },
                gridLines: {
                  display: false,
                }
              },
            ],
          },
        },
      },
    );

    let updateScatter = function(data,label){
      scatterChartRegion.data.datasets[0].data = data;
      scatterChartRegion.data.datasets[0].label = label;
      scatterChartRegion.options.title.text = label;
      scatterChartRegion.update();
    };

    // event handler that changes chart view between regions when clicked
    let change = document.getElementsByClassName("region")
    for (let i=0;i<change.length;i++){
      // for every button, change background colour when mouse hovers over the button
      change[i].addEventListener("mouseover", function () {
        change[i].style.backgroundColor = "#5c6a85";
      });
      // for every button, change background colour back to original when mouse leaves button
        change[i].addEventListener("mouseleave", function () {
        change[i].style.backgroundColor = "#677694";
      });

      // changing charts
      change[i].addEventListener("click", function(){
         if (change[i].value=="Africa") {
          updateScatter(africaData, "Africa");
        }
        else if(change[i].value=="Asia"){
          updateScatter(asiaData,"Asia");
        }
        else if (change[i].value=="Europe") {
          updateScatter(euData,"Europe");
        }
        else if (change[i].value=="North America") {
          updateScatter(naData,"North America");
        }
        else if (change[i].value=="Oceania") {
          updateScatter(oceaniaData,"Oceania");
        }
        else if(change[i].value=="South America"){
          updateScatter(saData,"South America");
        }
      })
    }
   
  });

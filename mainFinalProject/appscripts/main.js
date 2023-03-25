// let sectionview = document.getElementsByClassName("section")
// for(i=0;i<sectionview.length;i++){
//   sectionview[i].style.display= none;
// }

// fetchapi
const data = fetch(
  "https://2207-resources.s3.ap-southeast-1.amazonaws.com/GamingStudyData1.csv" //replace this with the appropriate URL
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
    console.log(table);

    // declaring all the variables i'm using
    const hours = table[0].slice(1);
    const age = table[2].slice(0);
    const residence = table[3].slice(1);
    const regions = table[4].slice(1);
    const swl = table[6].slice(1);

    // to replace greeting content with input name
    document
      .getElementById("nameButton")
      .addEventListener("click", function () {
        let name = document.getElementById("nameBox").value;
        document.getElementById("greeting").innerHTML = "Hello " + name + "!";
        // test
        console.log(name);
        // for loop to replace every <t class="name"></t> by the user input name
        let names = document.getElementsByClassName("name");
        for (i = 0; i < names.length; i++) {
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

    // to rework the mouseover event listener
    let buttons = document.getElementsByClassName("button");
    for (i = 0; i < buttons.length; i++) {
      // for every button, change background colour when mouse hovers over the button
      buttons[i].addEventListener("mouseover", function () {
        console.log("test");
        buttons.style.backgroundColor = "blue";
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
        },
        legend: {
          labels: {
            boxWidth: 20,
            fontColor: "bisque",
            fontfamily: "'Fredoka One', cursive",
            fontSize: 10,
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
          fontsize: 24,
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

    // map chart
    Plotly.plot(
      "mapchart",
      [
        {
          type: "choropleth",
          // need to work on the data
          locations: [residence],
          z: [hours],
        },
      ],
      {
        geo: {
          // map view type
          projection: {
            type: "robinson",
          },
          width: 900,
          height: 500,
        },
      }
    );

    // scatterplot worldwide hours and lifesat
    // putting the data from different slices into coordinates for scatterplot
    const coords = swl.map((s, h) => ({ x: s, y: hours[h] }));

    let ctx = document.getElementById("scatter-plot");
    const scatterChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Scatter Dataset",
            data: coords,
          },
        ],
        options: {
          scales: {
            xAxes: [
              {
                // not sure why scaleLabel isn't working
                scaleLabel: {
                  labelString: "Life Satisfaction Score (out of 35)",
                  display: true,
                  fontColor: "bisque",
                },
                type: "linear",
                position: "bottom",
                ticks: {
                  // neither is fontColor working
                  fontColor: "bisque",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  // fontColor here isn't working either
                  fontColor: "bisque",
                  max: 120,
                },
              },
            ],
          },
        },
      },
    });
    // const wwscatterdata = {
    //   datasets: [
    //   {
    //   label: "Label",
    //   data: locations,
    //   pointRadius: .25,
    //   pointBackgroundColor: 'red'
    //   }]
    // };

    // const wwscatterchart = {
    //     type: "scatter",
    //     data: dataObj,
    //     options: {
    //     animation: { duration: 0 },
    //     title: { display: false },
    //     responsive: false,
    //     legend: { display: false },
    //     scales: {
    //     xAxes: [ { ticks: { min: -180, max: 180 } } ],
    //     yAxes: [ { ticks: { min: -90, max: 90 } } ]
    //     },
    //     tooltips: {
    //     callbacks: {
    //     title: (items,data) => locations[items[0].index].name
    //     }
    //     }
    //     }
    //     };
    //     new Chart("my-scatter-chart", chartObj);

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

    // event handler that changes chart view between regions when clicked
  });

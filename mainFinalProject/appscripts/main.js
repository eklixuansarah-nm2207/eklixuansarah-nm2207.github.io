// to replace greeting content with input name
document.getElementById("nameButton").addEventListener("click", function () {
  let name = document.getElementById("nameBox").value;
  document.getElementById("greeting").innerHTML =
    "Hello " + name + "!";
  // test
  console.log(name);
  // for loop to replace every <t class="name"></t> by the user input name
  let names = document.getElementsByClassName("name");
  for (i=0;i< names.length;i++)
  {names[i].innerHTML = name + "."};
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
 

// to rework the hover event listener

  document.getElementById("yes").addEventListener("hover",function(){
    document.getElementById("yes").style.backgroundColor = "darkgreen";
  });


  document.getElementById("yes").addEventListener("click", function () {
    document.location.href="#section2.1";
  });

// to add eventlistener for no button

// bar chart for region penetration %

const labelRegion = ["Africa", "Asia", "South America", "North America", "Europe", "Oceania"]
const percentage = ["86.6", "86.1", "85.3", "84.6", "77.5", "76.3"]

//Source of data: Statista 
// need to work on adding worldwide average % as a line to compare all the regions to
const dataObj = {
  labels: labelRegion,
  datasets:[
    {
      label:"Average % by Region",
      data: percentage,
      borderWidth:2,
      fill:false,
      backgroundColor:"rgba(255,228,196,0.7)",
      borderColor:"brown",
    }
  ]
}

new Chart("gaming-penetration-chart",
{
  type:"horizontalBar",
  data:dataObj,
  options:{
    maintainAspectRatio:false,
    legend:{
      display:false
    },
    title:{
      display:false,
    },
    scales:{
      xAxes:[{
          display:true,
          ticks:{
            // changing scale of x-axis
              suggestedMin:0,
              suggestedMax:100,
              fontColor:'bisque',
          }
      }],
        yAxes:[{
           display:true,
          ticks:{
              fontColor:'bisque',
          }
        }]
    }
  }
});

// map chart

// scatterplot worldwide hours and lifesat

// pie chart of regions

// scatterplot of different regions

// event handler that changes chart view between regions when clicked
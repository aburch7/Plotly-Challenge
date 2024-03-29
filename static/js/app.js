
function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
  var metadataurl = "/metadata/" + sample;
  d3.json(metadataurl).then(function(sample){
    // Use d3 to select the panel with id of `#sample-metadata`
    var sampledata = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    sampledata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(sample).forEach(function([key,value]){
      var row = sampledata.append("p");
      row.text(`${key}:${value}`)})
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  })
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var sampledata2 = `/samples/${sample}`;
  d3.json(sampledata2).then(function(data) {
    // @TODO: Build a Bubble Chart using the sample data
    var X1 = data.otu_ids;
    var Y1 = data.sample_values;
    var color1 = data.otu_ids; 
    var size1 = data.sample_values;
    var text1 = data.otu_labels;

    var bubble1 = {
      x: X1,
      y: Y1,
      text: text1,
      mode: 'markers',
      marker: {
        color: color1,
        size: size1
        
      }
    };
  
    var data = bubble1  
    var layout = { 
      title: "OTU ID"
      
    }
    Plotly.newPlot('bubble', data, layout);})
    // @TODO: Build a Pie Chart
    d3.json(sampledata2).then(function(data){
        var value1 = data.sample_values.slice(0,10);
        var label1 = data.otu_ids.slice(0,10);
        var hovertxt1 = data.otu_labels.slice(0,10);
  
        var chart2 = [{
          values: value1,
          lables: label1,
          hovertext: hovertxt1,
          type: "pie"
        }];
        Plotly.newPlot('pie',chart2);
      })
    }
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

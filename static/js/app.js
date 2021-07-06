
function init(){
    var selection = d3.select("#selDataset");

    d3.json("data/samples.json").then((data) =>{
        var subjectID = data.names;
        subjectID.forEach((IDnum) => {
            selection
            .append('option')
            .text(IDnum)
            .property('value', IDnum);
        });
    const defaultID = subjectID[0];
    updateVisuals(defaultID);
    updateData(defaultID);
    });
}

function updateData(sample) {
    d3.json("data/samples.json").then((data) =>{
        metadata= data.metadata;
        var filteredData = metadata.filter(metaObject => metaObject.id == sample);
        var result = filteredData[0]
        console.log(result)
        var metaDiv = d3.select('#sample-metadata');
        metaDiv.text('')
        metaDiv.append("h4").text('id: '+ result.id);
        metaDiv.append("h4").text('ethnicity: '+ result.ethnicity);
        metaDiv.append("h4").text('gender: '+ result.gender);
        metaDiv.append("h4").text('age: '+ result.age);
        metaDiv.append("h4").text('location: '+ result.location);
        metaDiv.append("h4").text('belly button type: '+ result.bbtype);
        metaDiv.append("h4").text('wfreq: '+ result.wfreq);
})
}

function updateVisuals(sample) {
    d3.json("data/samples.json").then((data) =>{
        samples = data.samples;
        var filteredID = samples.filter(sampleObject => sampleObject.id == sample);
        var result = filteredID[0]
        var otu_ids =  result.otu_ids
        var otu_labels = result.otu_labels
        var sample_values = result.sample_values

        var traceBar = [
            {
            x: sample_values.slice(0,10).reverse(),
            y : otu_ids.slice(0,10).map(otuID => `ID ${otuID}`).reverse(),
            type : 'bar',
            orientation: 'h',
            text: otu_labels.slice(0,10)     
        }
    ];

        var layoutBar = {
            title: 'Top Bacteria by ID and Type in bellybuttin',
            width: 700
        };

        var traceBubble = [
            {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
              }
        }
    ];

        var layoutBubble = {
            title: 'Bacteria by occurence and ID',
            showlegend: false,
            height: 500,
            width: 1100
        };

        Plotly.newPlot('bubble',traceBubble, layoutBubble)
        Plotly.newPlot("bar", traceBar, layoutBar);
})
}


function optionChanged(newData) {
    console.log(newData)
    updateVisuals(newData);
    updateData(newData);
  }
  

init()
  
// Code for generating a Chart.js scatter chart

const getData = async () =>{
    const response = await fetch('data/total-mean.csv') //.. used to move up one folder
    const data = await response.text();

    const xParticipant = []; //x axis label = Participant 
    const yBase = [] //y axis label = Baseline Amplitude
    const yExp = [] //y axis label = Experimental Amplitude

    // \n is new line caracter
    // split('\n') will separate table into an array of rows
    // slice(start, end) returns an array starting at start and ending at end

    const table = data.split('\n').slice(1); //split by line and remove first row (headers)
    //console.log(table);

    table.forEach(row =>{
        const columns = row.split(',');

        const participant = (columns[0]);
        xParticipant.push(participant);

        const baseline = parseFloat(columns[1]);
        yBase.push(baseline);

        const exp = parseFloat(columns[2]);
        yExp.push(exp);

        console.log(participant, baseline, exp);
    })
    return {xParticipant, yBase, yExp}
}

//getData();

async function createChart(){
   const data = await getData();    //call getData and wait for it to finish
   const scatterPlot=document.getElementById('scatter');

    const myChart = new Chart(scatterPlot,{  // Construct the chart    
        type: 'scatter',
        data: {                         // Define data
            labels: data.xParticipant,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                                    //  including display properties.  To add more datasets, 
                                    //  place a comma after the closing curly brace of the last
                                    //  data set object and add another dataset object. 
                {
                    label:    `Baseline Amplitude`,     // Dataset label for legend
                    data:     data.yBase,    // Reference to array of y-values
                    fill:     false,           // Fill area under the chart (true = yes, false = no)
                    backgroundColor:  'rgba(132, 0, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgba(132, 0, 255, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `Experimental Amplitude`,     // Dataset label for legend
                    data:     data.yExp,    // Reference to array of y-values
                    fill:     false,           // Fill area under the chart (true = yes, false = no)
                    backgroundColor:  'rgba(2, 62, 0`, 0.2)',    // Color for data marker
                    borderColor:      'rgba(2, 62, 0, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Participant ID',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                        min: 0,
                        display: true,
                        autoskip: false,
                    font: {
                        size: 14  
                    },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: 'Mean Theta Wave Amplitude (μV)',  // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,                   
                        maxTicksLimit: 20,        // Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: { 
                title: {
                    display: true,
                    text: 'Total Mean of Theta Wave Amplitude Per Recording Stage',
                    font: {
                        size: 32,
                    },
                    color: '#023E8A',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }
    });
}

 createChart();
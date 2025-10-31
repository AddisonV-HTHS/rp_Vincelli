// Code for generating a Chart.js line chart

async function getData(){
    const response = await fetch('../data/global-mean-temp.csv') //.. used to move up one folder
    const data = await response.text();

    const xYears = []; //x axis label = years 
    const yTemps = [] //y axis label = global temp
    const yNh = [] //y axis label = northern hemisphere temp
    const ySh = [] //y axis label = southern hemisphere temp

    // \n is new line caracter
    // split('\n') will separate table into an array of rows
    // slice(start, end) returns an array starting at start and ending at end

    const table = data.split('\n').slice(1); //split by line and remove first row (headers)
    //console.log(table);

    table.forEach(row =>{
        const columns = row.split(',');

        const year = parseFloat(columns[0]);
        xYears.push(year);

        const temp = parseFloat(columns[1]);
        yTemps.push(temp);

        const nh = parseFloat(columns[2]);
        yNh.push(nh);

        const sh = parseFloat(columns[3]);
        ySh.push(sh);

        console.log(year, temp, nh, sh);
    })
    return {xYears, yTemps, yNh, ySh}
}

getData();

async function createChart(){
   const data = await getData();    //call getData and wait for it to finish
   const lineChart=document.getElementById('lineChart');
    const degreeSymbol = String.fromCharCode(176);

    const myChart = new Chart(lineChart,{  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xYears,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                                    //  including display properties.  To add more datasets, 
                                    //  place a comma after the closing curly brace of the last
                                    //  data set object and add another dataset object. 
                {
                    label:    `Combined Global LSA and SSW Temp in ${degreeSymbol}`,     // Dataset label for legend
                    data:     data.yTemps,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 0, 132, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },

                {
                    label:    `Combined NH LSA and SSW Temp in ${degreeSymbol}`,     // Dataset label for legend
                    data:     data.yNh,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 102, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 102, 255, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },

                {
                    label:    `Combined SH LSA and SSW Temp in ${degreeSymbol}`,     // Dataset label for legend
                    data:     data.ySh,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 153, 51, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 153, 51, 1)',      // Color for data marker border
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
                        text: 'Year',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                        callback: function(val, index){ // setting tick marks at every 5 yrs      
                        return index%5 === 0 ? this.getLabelForValue(val) : '';
                        },
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
                        text: 'Global Mean Temperatures (°C)',  // y-axis title
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
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Global Mean Temperature vs. Year (since 1880)',
                    font: {
                        size: 24,
                    },
                    color: '#black',
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
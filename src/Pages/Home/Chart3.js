import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [80, 20],
      options: {
        chart: {
          width: 380,
          type: 'donut',
          dropShadow: {
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true
                }
              }
            }
          }
        },
        labels: ["الحضور", "الغياب"],
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        },
        fill: {
          type: 'pattern',
          opacity: 1,
          pattern: {
            enabled: true,
            style: [ 'squares', 'horizontalLines', 'circles','slantedLines'],
          },
        },
        states: {
          hover: {
            filter: 'none'
          }
        },
        theme: {
          palette: 'palette2'
        },
        title: {
          text: ""
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    };
  }

  render() {
    return (
      <div>
        <div id="chart" style={{display:"flex",justifyContent: "center",marginTop:"50px"}}>
          <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={380} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;

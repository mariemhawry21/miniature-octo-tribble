import React from 'react';
import ReactApexChart from 'react-apexcharts';


class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: ' العمل الأضافي',
                data: [44, 55, 41, 67, 22, 43,65]
            }, {
                name: 'الحضور المبكر',
                data: [13,91, 20, 50, 13, 27,91]
            }, {
                name: 'التأخير',
                data: [11, 17, 15, 15, 21, 14,30]
            }, {
                name: 'الانصراف المبكر',
                data: [21, 7, 25, 13, 22, 8,45]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        borderRadius: 10,
                        borderRadiusApplication: 'end', // 'around', 'end'
                        borderRadiusWhenStacked: 'last', // 'all', 'last'
                        dataLabels: {
                            total: {
                                enabled: true,
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900
                                }
                            }
                        }
                    },
                },
                xaxis: {
                    type: 'text',
                    categories: ['السبت', 'الاحد', 'الاثنين', 'الثلاثاء',
                        'الاربعاء', 'الخميس', 'الجمعه'
                    ],
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                }
            }
        };
    }

    render() {
        return (
            <div>

                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default ApexChart;

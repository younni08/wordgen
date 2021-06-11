import React, { useMemo, useState } from "react";
import { Bar,Pie  } from 'react-chartjs-2';

const MobileVote = (props) => {
    const [barchar,setBarchar] = useState(true)
    const [piechar,setPiechar] = useState(false)
    const [voteString1,setVoteString1] = useState("")
    const [voteString2,setVoteString2] = useState("")
    const [voteString3,setVoteString3] = useState("")
    const [voteString4,setVoteString4] = useState("")
    const [voteString5,setVoteString5] = useState("")
    const [chartData,setChartData] = useState("")
    const [options,setOptions] = useState("")

    const init = () => {
        if(props.voteString1!=="") {
            setVoteString1(props.voteString1)
        }
        if(props.voteString2!==""){
            setVoteString2(props.voteString2)
        }
        if(props.voteString3!==""){
            setVoteString3(props.voteString3)
        }
        if(props.voteString4!==""){
            setVoteString4(props.voteString4)
        }
        if(props.voteString5!=="") {
            setVoteString5(props.voteString5)
        }

        if(props.voteChartType==="chart_bar_verti"){
            setPiechar(false)
            setBarchar(true)
            setOptions({
                scales:{
                    yAxes:[
                        {
                            ticks: {
                            beginAtZero: true,
                            },
                        },
                    ],
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10
                    }
                },
                borderWidth: 1,
            })
        }
        if(props.voteChartType==="chart_bar_hori"){
            setPiechar(false)
            setBarchar(true)
            setOptions({
                indexAxis: 'y',
                scales:{
                    yAxes:[
                        {
                            ticks: {
                            beginAtZero: true,
                            },
                        },
                    ],
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10
                    }
                },
                borderWidth: 1,
            })
        }
        if(props.voteChartType==="chart_pie"){
            setPiechar(true)
            setBarchar(false)
            setOptions({
                layout: {
                    padding: {
                        left: 10,
                        right: 10
                    }
                },
                borderWidth: 1,
                plugins: {
                    legend: {
                      position: 'bottom',
                    }
                }
            })
        }

        // default
        if(props.voteString1===""){
            setChartData({
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                datasets: [
                  {
                    label: '#',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        '#173f5f',
                        '#20639b',
                        '#3caea3',
                        '#f6d55c',
                        '#ed553b',
                    ],
                    borderColor: [
                        '#173f5f',
                        '#20639b',
                        '#3caea3',
                        '#f6d55c',
                        '#ed553b',
                    ]
                  },
                ],
            })
            setOptions({
                scales:{
                    yAxes:[
                        {
                            ticks: {
                            beginAtZero: true,
                            },
                        },
                    ],
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10
                    }
                },
                borderWidth: 1,
            })
        }

        if(props.voteAddlevel===1){
            setChartData({
                labels: [props.voteString1],
                datasets: [
                  {
                    label: '#',
                    data: [12],
                    backgroundColor: [
                        '#173f5f',
                    ],
                    borderColor: [
                        '#173f5f',
                    ]
                  },
                ],
            })
        }

        if(props.voteAddlevel===2){
            setChartData({
                labels: [props.voteString1,props.voteString2],
                datasets: [
                  {
                    label: '#',
                    data: [12,5],
                    backgroundColor: [
                        '#173f5f',
                        '#ed553b',
                    ],
                    borderColor: [
                        '#173f5f',
                        '#ed553b',
                    ]
                  },
                ],
            })
        }

        if(props.voteAddlevel===3){
            setChartData({
                labels: [props.voteString1,props.voteString2,props.voteString3],
                datasets: [
                  {
                    label: '#',
                    data: [12, 19, 3, 5],
                    backgroundColor: [
                        '#173f5f',
                        '#3caea3',
                        '#ed553b',
                    ],
                    borderColor: [
                        '#173f5f',
                        '#3caea3',
                        '#ed553b',
                    ]
                  },
                ],
            })
        }

        if(props.voteAddlevel===4){
            setChartData({
                labels: [props.voteString1,props.voteString2,props.voteString3,props.voteString4],
                datasets: [
                  {
                    label: '#',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        '#173f5f',
                        '#20639b',
                        '#3caea3',
                        '#ed553b',
                    ],
                    borderColor: [
                        '#173f5f',
                        '#20639b',
                        '#3caea3',
                        '#ed553b',
                    ]
                  },
                ],
            })
        }

        if(props.voteAddlevel===5){
            setChartData({
                labels: [props.voteString1,props.voteString2,props.voteString3,props.voteString4,props.voteString5],
                datasets: [
                  {
                    label: '#',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        '#173f5f',
                        '#20639b',
                        '#3caea3',
                        '#f6d55c',
                        '#ed553b',
                    ],
                    borderColor: [
                        '#173f5f',
                        '#20639b',
                        '#3caea3',
                        '#f6d55c',
                        '#ed553b',
                    ]
                  },
                ],
            })
        }

    }

    useMemo(()=>{
        init();
    },[props])

    return (
        <div className="studio_mobile_body">
            <div className="mobilevote_chart">
                {
                    barchar?<Bar data={chartData} options={options} />:""
                }
                {
                    piechar?<Pie data={chartData} options={options} />:""
                }
                <span>실시간으로 반영됩니다.</span>
            </div>
            <div className="mobilevote_options">
                {
                    voteString1?<div>
                    <span>1.</span>
                    <span>{voteString1}</span>
                    </div>:""
                }
                {
                    voteString2?<div>
                    <span>2.</span>
                    <span>{voteString2}</span>
                    </div>:""
                }
                {
                    voteString3?<div>
                    <span>3.</span>
                    <span>{voteString3}</span>
                    </div>:""
                }
                {
                    voteString4?<div>
                    <span>4.</span>
                    <span>{voteString4}</span>
                    </div>:""
                }
                {
                    voteString5?<div>
                    <span>5.</span>
                    <span>{voteString5}</span>
                    </div>:""
                }
            </div>
        </div>
    )
}

export default MobileVote
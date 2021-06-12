import React, { useEffect, useState } from "react";
import { Bar,Pie  } from 'react-chartjs-2';

const MobileVote = (props) => {
    const [barchar,setBarchar] = useState(true)
    const [piechar,setPiechar] = useState(false)
    const [voteString1on,setVoteString1on] = useState(false)
    const [voteString2on,setVoteString2on] = useState(false)
    const [voteString3on,setVoteString3on] = useState(false)
    const [voteString4on,setVoteString4on] = useState(false)
    const [voteString5on,setVoteString5on] = useState(false)
    const [chartData,setChartData] = useState("")
    const [options,setOptions] = useState("")
    const [defaultOptions,setDefaultOptions] = useState(true)

    const init = () => {
        console.log(props)
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
                labels: ['남색', '파랑', '초록', '노랑', '주황'],
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

        if(props.voteString1===""&&props.voteChartType==="chart_bar_verti"){
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

        if(props.voteString1===""&&props.voteChartType==="chart_bar_hori"){
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
        if(props.voteAddlevel!==0){
            setDefaultOptions(false)
        }

        if(props.voteAddlevel===1){
            setVoteString1on(true)
            setVoteString2on(false)
            setVoteString3on(false)
            setVoteString4on(false)
            setVoteString5on(false)
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
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(false)
            setVoteString4on(false)
            setVoteString5on(false)
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
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(true)
            setVoteString4on(false)
            setVoteString5on(false)
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
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(true)
            setVoteString4on(true)
            setVoteString5on(false)
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
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(true)
            setVoteString4on(true)
            setVoteString5on(true)
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

    useEffect(()=>{
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
            {
                defaultOptions?<div className="mobilevote_options">
                <div>
                    <span>1.</span>
                    <span>남색</span>
                </div>
                <div>
                    <span>2.</span>
                    <span>파랑</span>
                </div>
                <div>
                    <span>3.</span>
                    <span>초록</span>
                </div>
                <div>
                    <span>4.</span>
                    <span>노랑</span>
                </div>
                <div>
                    <span>5.</span>
                    <span>주황</span>
                </div>
                </div>:""
            }
            <div className="mobilevote_options">
                
                {
                    voteString1on?<div>
                    <span>1.</span>
                    <span>{props.voteString1}</span>
                    </div>:""
                }
                {
                    voteString2on?<div>
                    <span>2.</span>
                    <span>{props.voteString2}</span>
                    </div>:""
                }
                {
                    voteString3on?<div>
                    <span>3.</span>
                    <span>{props.voteString3}</span>
                    </div>:""
                }
                {
                    voteString4on?<div>
                    <span>4.</span>
                    <span>{props.voteString4}</span>
                    </div>:""
                }
                {
                    voteString5on?<div>
                    <span>5.</span>
                    <span>{props.voteString5}</span>
                    </div>:""
                }
                
            </div>
        </div>
    )
}

export default MobileVote
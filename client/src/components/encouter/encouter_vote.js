import React, { useEffect, useState } from "react";
import { Bar,Pie  } from 'react-chartjs-2';

const EncouterVote = (props) => {
    const [barchar,setBarchar] = useState(true)
    const [piechar,setPiechar] = useState(false)
    const [chartData,setChartData] = useState("")
    const [options,setOptions] = useState("")

    const init = () => {
        if(props.data.question_chart_type==="chart_bar_verti"||props.data.question_chart_type===""){
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
        if(props.data.question_chart_type==="chart_bar_hori"){
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
        if(props.data.question_chart_type==="chart_pie"){
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
    }

    useEffect(()=>{
        init();
    },[props])

    return (
        <div className="encouter_general">
            <div>
                <div className="mobilevote_chart">
                    {
                        barchar?<Bar data={chartData} options={options} />:""
                    }
                    {
                        piechar?<Pie data={chartData} options={options} />:""
                    }
                    <span>실시간으로 반영됩니다.</span>
                </div>
            </div>
        </div>
    )
}

export default EncouterVote;
import React, { useContext, useEffect, useState } from 'react'
import { instance as configuredAxios } from '../../../../axiosConfig';
import RealTimeDataContext from '../../../../context providers/RealTimeData (presenter)/RealTimeDataContext';
import { Chart } from "react-google-charts";

function LeaderboardSlide() {

    const { quizSessionId } = useContext(RealTimeDataContext);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getLeaderBoardData = async () => {
            const results = await configuredAxios.get(`/${quizSessionId}/leaderboard`);
            setLeaderboardData([...results.data]);
        }
        getLeaderBoardData();
    }, []);

    useEffect(()=>{
        const convertData = () => {
            setChartData((currentChartData) => {
                let data = [["Username", "Points",
                    { role: "style" },
                    {
                        sourceColumn: 0, role: 'annotation',
                        type: 'string', calc: 'stringify'
                    }]];
                // sort by points in descending order
                leaderboardData.sort((a, b) => b.points - a.points);
                for (let item of leaderboardData) {
                    data.push([
                        item.username,
                        item.points,
                        `color: ${item.color}`,
                        `${item.points} points`,
                    ]);
                }
                return data;
            });
        }
        convertData();
    }, [chartData]);

    const options = {
        width: 600,
        height: 400,
        hAxis: {
            gridlines: {
                color: "none",
            },
            textPosition: "none",

        },
        bar: { groupWidth: "50%" },
        legend: { position: "none" },
        orientation: "vertical",
        annotations: {
            alwaysOutside: true,
            textStyle: {
                fontSize: 14,
                auraColor: 'none',
                color: '#555'
            },
            boxStyle: {
                stroke: '#ccc',
                strokeWidth: 1,
                gradient: {
                    color1: '#f3e5f5',
                    color2: '#f3e5f5',
                    x1: '0%', y1: '0%',
                    x2: '100%', y2: '100%',
                    useObjectBoundingBoxUnits: true
                }
            }
        }
    };

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <h1>Leaderboard</h1>
            {
                chartData &&
                <div>
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="400px"
                        data={chartData}
                        options={options}
                    />
                </div>
            }
        </div>
    );
}

export default LeaderboardSlide;


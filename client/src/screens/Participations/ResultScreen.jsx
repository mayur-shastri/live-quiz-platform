import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loading from '../Splash/Loading';
import { Chart } from "react-google-charts";
import Typography from '@mui/material/Typography'


function ResultScreen() {

    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState([
        ["Type", "Count"],
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const options = {
        title: "Accuracy",
        pieHole: 0.4,
        is3D: false,
        colors: ['#008000', '#FF0000'],
        
    };

    useEffect(() => {
        const { participationData } = location.state;
        setData(participationData);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const convertData = () => {
            console.log(data);
            if (data) {
                const correct = data.correctAnswers;
                const incorrect = data.totalAnswers - correct;
                setChartData((initData) => {
                    return [
                        ...initData,
                        ["Correct", correct],
                        ["Incorrect", incorrect],
                    ];
                });
            }
        }
        convertData();
    }, [data]);

    return (
        isLoading ? <Loading />
            : <div className='flex flex-col items-center w-full h-screen'>
                <Typography variant="h1" color="initial">
                    {data.username}'s Performance
                </Typography>
                <Typography variant="body1" color="initial">
                    Total Answers: {data.totalAnswers}
                </Typography>
                <Typography variant="body1" color="#008000">
                    Correct Answers: {data.totalAnswers}
                </Typography>
                <Typography variant="body1" color="#FF0000">
                    Incorrect Answers: {data.totalAnswers - data.correctAnswers}
                </Typography>
                <Typography variant="body1" color="initial">
                    Accuracy: {(data.correctAnswers/data.totalAnswers)*100}%
                </Typography>
                <div className='w-full'>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={chartData}
                        options={options}
                    />
                </div>
            </div>
    );
}

export default ResultScreen;

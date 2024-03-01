import { useContext, useEffect, useState } from "react";
import Chart from "react-google-charts";
import RealTimeDataContext from "../../../../context providers/RealTimeData (presenter)/RealTimeDataContext";

function ResultsChart({ results }) {

    const {currentSlideData} = useContext(RealTimeDataContext);

    const [chartData, setChartData] = useState([]);

    useEffect(()=>{
        const convertData = ()=>{
            setChartData((prevData)=>{
                const options = currentSlideData.options;
                const data = [["Options", "Count",
                    { role: "style" },
                    {
                        sourceColumn: 0, role: 'annotation',
                        type: 'string', calc: 'stringify'
                    }]];
                for (let option of options) {
                    let count = 0;
                    for (let result of results) {
                        if (option.id === result._id) {
                            count = result.count;
                            break;
                        }
                    }
                    data.push([
                        option.value,
                        count,
                        option.correct ? 'color: #87D37C' : 'color: #D14444',
                        count,
                    ]);
                }
                return data;
            });
        }
        convertData();
    }, []);

    const options = {
        width: 600,
        height: 400,
        hAxis: {
            gridlines: {
                color: "none",
            },
        },
        vAxis: {
            textPosition: "none",
            gridlines: {
                color: "none",
            }
        },
        bar: { groupWidth: "50%" },
        legend: { position: "none" },
        orientation: "horizontal",
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
        <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={chartData}
            options={options}
        />
    );
}

export default ResultsChart;

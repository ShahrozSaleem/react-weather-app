import React from 'react';
import "./WeatherReport.css";
import {
    Area,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ComposedChart,
    ResponsiveContainer
} from 'recharts';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@material-ui/core';
import { getWeatherIcon } from '../../utils/weatherConditions.util';
import { getMode } from '../../utils/helpers.util';

function CustomTooltip({ payload }) {
    const payloadObj = payload && payload.length > 0 ? payload[0].payload : {};
    return (
        <>
            <Card variant="outlined">
                <CardContent className="tooltip-card">
                    {
                        (Object.keys(payloadObj).length > 0) &&
                        <>
                            <Typography variant="body2" component="p" className="capitalized">
                                {payloadObj.weather_description}
                            </Typography>
                            <Typography variant="body2" component="p">
                                <b>Min: </b>{payloadObj.temp_min}&deg;
                            </Typography>
                            <Typography variant="body2" component="p">
                                <b>Max: </b>{payloadObj.temp_max}&deg;
                            </Typography>
                        </>
                    }
                </CardContent>
            </Card>
        </>
    );
}

function CustomizedDot(props) {
    const { cx, cy, payload } = props;
    const icon = getWeatherIcon(
        getMode(
            payload.current_time_s,
            payload.sunrise_s,
            payload.sunset_s
        ),
        payload.weather_id
    );

    return (
        <image
            x={cx - 25}
            y={cy - 25}
            width={50}
            height={50}
            xlinkHref={icon}
            alt="Weather Icon"
        />
    );
}

function CustomizedLabel(props) {
    const { x, y, value } = props;
    return (
        <text x={x} y={y} dy={-10} fill="#ffffff" fontSize={15} textAnchor="middle">
            {value}&deg;
        </text>
    );
}

export default function WeatherReport() {

    const hourlyForecast = useSelector(state => state.hourlyForecast);
    const selectedDay = useSelector(state => state.selectedDay);

    return (
        <>
            <div className="weather-report" data-testid="weather-report-test">
                {
                    (
                        selectedDay &&
                        hourlyForecast != null &&
                        typeof hourlyForecast === "object" &&
                        hourlyForecast.hasOwnProperty(selectedDay)
                    ) &&
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={500}
                            height={400}
                            data={hourlyForecast[selectedDay]}
                            margin={{
                                top: 10,
                                right: 35,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid opacity={0.5} />
                            <XAxis dataKey="time" tickLine={false} stroke="#ffffff" />
                            <YAxis
                                dataKey="temp"
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(val) => ""}
                            />
                            <Tooltip content={<CustomTooltip />} />

                            <Area
                                type="monotone"
                                dataKey="temp"
                                label="hello"
                                stackId="1"
                                stroke="#ffffff"
                                fill="#ffffff50"
                            />

                            <Line
                                type="monotone"
                                dataKey="temp"
                                stroke="#ffffff"
                                label={<CustomizedLabel />}
                                isAnimationActive={false}
                            />

                            <Line
                                type="monotone"
                                dataKey="position"
                                stroke="#ffffff"
                                strokeDasharray="5 5"
                                isAnimationActive={false}
                                dot={<CustomizedDot />}
                            />

                        </ComposedChart>
                    </ResponsiveContainer>
                }
            </div>
        </>
    )
}

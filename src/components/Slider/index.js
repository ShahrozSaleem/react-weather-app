import { IconButton } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import WeatherCard from '../WeatherCard';
import "./Slider.css";

export default function Slider() {

    const dailyForecast = useSelector(state => state.dailyForecast);

    let sliderContainer = useRef();
    let outer = useRef();
    const scrollStep = 230;
    const [leftDisabled, setLeftDisabled] = useState(true);
    const [rightDisabled, setRightDisabled] = useState(false);

    function prev() {
        let sl = outer.current.scrollLeft;
        let cw = outer.current.scrollWidth;
        let elWidth = outer.current.getClientRects();
        if (elWidth) elWidth = elWidth[0].width;
        else elWidth = 0;

        if ((sl + elWidth + scrollStep) >= cw) {
            outer.current.scrollTo({
                left: cw,
                behavior: 'smooth'
            });
            setRightDisabled(true);
        } else {
            outer.current.scrollTo({
                left: (sl + scrollStep),
                behavior: 'smooth'
            });
        }
        setLeftDisabled(false);
    }

    function next() {
        let sl = outer.current.scrollLeft;

        if ((sl - scrollStep) <= 0) {
            outer.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
            setLeftDisabled(true);
        } else {
            outer.current.scrollTo({
                left: (sl - scrollStep),
                behavior: 'smooth'
            });
        }
        setRightDisabled(false);
    }

    return (
        <>
            <div className="slider-wrapper" data-testid="slider-test">
                <IconButton
                    color="primary"
                    disabled={leftDisabled}
                    aria-label="Next" component="span"
                    onClick={next}
                    className={`left-navigator navigator ${leftDisabled ? 'disabled-action' : ''}`}
                >
                    &lt;
                </IconButton>
                <div className="slides-wrapper" ref={outer}>
                    <div className="slider-container" ref={sliderContainer}>
                        {
                            (dailyForecast instanceof Array && dailyForecast.length > 0) &&
                            (
                                dailyForecast.map(
                                    (forecast, index) =>
                                        <div key={index} className="slide">
                                            <WeatherCard forecast={forecast} />
                                        </div>
                                )
                            )
                        }
                    </div>
                </div>
                <IconButton
                    color="primary"
                    disabled={rightDisabled}
                    aria-label="Previous"
                    component="span"
                    onClick={prev}
                    className={`right-navigator navigator ${rightDisabled ? 'disabled-action' : ''}`}
                >
                    &gt;
                </IconButton>
            </div>
        </>
    )
}

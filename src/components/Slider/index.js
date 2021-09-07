import { IconButton, useMediaQuery } from '@material-ui/core';
import React, { useRef, useState, useEffect } from 'react';
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

    const [pageSize, setPageSize] = useState(3);
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [displayItems, setDisplayItems] = useState([]);

    const sm = useMediaQuery('(max-width:400px)'); // true
    const md = useMediaQuery('(max-width:700px)'); // true

    const [selectedItem, setSelectedItem] = useState("");

    useEffect(() => {
        if (displayItems.length)
            setSelectedItem(displayItems[0].date);
    }, [displayItems])

    useEffect(() => {
        if (sm) {
            console.log("sm");
            setPageSize(1);
        }
        else if (md) {
            setPageSize(2);
        }
        else {
            setPageSize(3);
        }

        setPage(0);

    }, [sm, md]);

    useEffect(() => {
        let max = Math.ceil(dailyForecast.length / pageSize);
        console.log("max :: ", max);
        setMaxPage(max);
        if (max <= 1) {
            setRightDisabled(true);
        }
        else
            setRightDisabled(false);

        setItems();
    }, [dailyForecast, pageSize]);

    useEffect(() => {
        if (page == 0) {
            setLeftDisabled(true);
        }
        else {
            setLeftDisabled(false);
        }

        if (page == maxPage) {
            setRightDisabled(true);
        }
        else {
            setRightDisabled(maxPage <= 1);
        }

        setItems();
    }, [page])

    function setItems() {
        if (maxPage > page) {
            let upper = pageSize * (page + 1);
            if (upper >= dailyForecast.length) {
                upper = dailyForecast.length;
            }

            setDisplayItems(dailyForecast.slice((page * pageSize), upper))
        }
    }

    function p() {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    function n() {
        if (page < maxPage) {
            setPage(page + 1);
        }
    }

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
                    onClick={p}
                    className={`left-navigator navigator ${leftDisabled ? 'disabled-action' : ''}`}
                >
                    &lt;
                </IconButton>
                <div className="slides-wrapper" ref={outer}>
                    <div className="slider-container" ref={sliderContainer}>
                        {
                            // (dailyForecast instanceof Array && dailyForecast.length > 0) &&
                            displayItems.length > 0 &&
                            (
                                displayItems.map(
                                    (forecast, index) =>
                                        <div key={index} className="slide">
                                            <WeatherCard forecast={forecast} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
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
                    onClick={n}
                    className={`right-navigator navigator ${rightDisabled ? 'disabled-action' : ''}`}
                >
                    &gt;
                </IconButton>
            </div>
        </>
    )
}

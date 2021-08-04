import React from 'react';
import "./SplashScreen.css";
import star from "../../assets/weatherIcons/star.svg";
import { Typography } from '@material-ui/core';

export default function SplashScreen() {
    return (
        <>
            <div className="splash-screen" data-testid="loading-test">
                <div className="splash-screen-content">
                    <img src={star} alt="Loading" className="splash-screen-img" />
                    <Typography variant="h5" gutterBottom>
                        Loading
                    </Typography>
                </div>
            </div>
        </>
    )
}

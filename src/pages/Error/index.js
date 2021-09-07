import React from 'react';
import "./Error.css";
import errorImg from "../../assets/images/errorImg.png";
import { Typography } from '@material-ui/core';

export default function Error({ msg }) {
    return (
        <>
            <div className="error-screen" data-testid="error-test">
                <div className="error-screen-content">
                    <img src={errorImg} alt="Loading" className="error-screen-img" />
                    <Typography variant="h5" gutterBottom>
                        {msg}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Try again later
                    </Typography>
                </div>
            </div>
        </>
    )
}

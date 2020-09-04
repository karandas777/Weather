import React, { Component } from 'react'

export default class LogoHolder extends Component {
    render() {
        let date = new Date(Date.now());
        let time = (date.getHours());
        return (
            <div className="p-3 rounded-lg">
                <div className={`h4 brand mt-1 mb-0 ${time >= 6 && time <=18 ? "text-dark" : "text-light"} `}>
                <img src={require('../assets/logo.gif')} 
                className="mb-1 mr-2 evening rounded-pill shadow-sm" 
                width="50"
                alt="logo"/>
                DarkSky
                </div>
            </div>
        )
    }
}

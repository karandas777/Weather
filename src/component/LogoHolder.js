import React, { Component } from 'react'

export default class LogoHolder extends Component {
    render() {
        return (
            <div className="p-3 rounded-lg">
                <div className="h2 brand text-muted mt-3 mb-0">
                <img src={require('../assets/logo.gif')} className="w-25 mb-2 mr-3 evening rounded-pill shadow" alt="logo"/>
                DarkSky
                </div>
            </div>
        )
    }
}

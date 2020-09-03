import React, { Component } from 'react'

export default class LogoHolder extends Component {
    render() {
        return (
            <div className="p-3 rounded-lg">
                <div className="h1 text-dark mt-3 mb-0">
                <img src={require('../assets/logo.gif')} className="w-25 mb-2 mr-3 evening rounded-pill shadow" alt="logo"/>
                Dark<span className="text-evening">Sky</span>
                </div>
            </div>
        )
    }
}

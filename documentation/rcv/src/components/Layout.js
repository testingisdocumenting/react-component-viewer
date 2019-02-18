import React from 'react'

import {zoomListeners} from "./ZoomListeners";

import './Layout.css';

export class Layout extends React.Component {
    state = {
        zoomedIn: undefined
    }

    render() {
        const {children} = this.props

        return (
            <div className="layout">
                <div className="top-panel">
                    <div className="top-panel-content">
                        <div className="tool-name">React Component Viewer</div>
                        <div className="guide-label">guide</div>
                    </div>
                </div>

                <div className="content-panel">
                    {children}
                </div>

                {this.renderZoomedIn()}
            </div>
        )
    }

    renderZoomedIn() {
        const {zoomedIn} = this.state

        if (!zoomedIn) {
            return null
        }

        return (
            <>
                <div className="zoomed-in-overlay" onClick={this.onZoomOverlayClick}/>
                <div className="zoomed-in-content" onClick={this.onZoomOverlayClick}>
                    {zoomedIn}
                </div>
            </>
        )
    }

    onZoomOverlayClick = (e) => {
        console.log('onZoomOverlayClick')

        e.preventDefault()
        this.removeZoom()
    }

    onZoomIn = (rendered) => {
        this.setState({zoomedIn: rendered})
    }

    onKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.removeZoom()
        }
    }

    removeZoom = () => {
        this.setState({zoomedIn: undefined})
    }

    componentDidMount() {
        zoomListeners.addListener(this.onZoomIn)
        document.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        zoomListeners.removeListener(this.onZoomIn)
        document.removeEventListener('keydown', this.onKeyDown)
    }
}
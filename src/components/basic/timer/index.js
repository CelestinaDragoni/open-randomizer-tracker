import React from "react";
import PropTypes from 'prop-types';
import "./index.sass";

export default class Timer extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        fontSize:PropTypes.integer,
        fontFamily:PropTypes.string,
        padding:PropTypes.integer,
        color:PropTypes.string,
        web:PropTypes.bool
    };

    /** React PropType Defaults **/
    static defaultProps = {
        fontSize:14,
        fontFamily:"Sans-Serif",
        padding:5,
        color:'',
        web:false
    };

    /** React state **/
    state = {
        timeFormat: '00:00:00.00'
    };

    /** Time in ms, when the timer started **/
    timeStart = null;

    /** When timer is paused, the offset to start counting **/
    timeDelta = 0;

    /** Javascript interval for onTimerInverval function **/
    interval = null;

    /**
     * Adds the event listern when mounted.
     * @return {void}
     **/
    UNSAFE_componentWillMount() {
        window.addEventListener('keyup', this.onKeyUp);
    }

    /**
     * Handles removing the event listerner when unmounted.
     * @return {void}
     **/
    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
        this.reset();
    }

    /**
     * The interval for the timer, happens every 1ms, fast enough and not a CPU hog.
     * @return {void}
     **/
    onTimerInterval = () => {

        // Don't like this, should be able to use % operator for this.
        let ms = Date.now() - this.timeStart + this.timeDelta;
        let h = Math.floor(ms/3600000);
        ms -= h*3600000;
        let m = Math.floor(ms/60000);
        ms -= m*60000;
        let s = Math.floor(ms/1000);
        ms -= s*1000;

        // Format
        h = h.toString().padStart(2, '0');
        m = m.toString().padStart(2, '0');
        s = s.toString().padStart(2, '0');
        ms = ms.toString();
        ms = ms.substring(0, ms.length -1).padStart(2, '0');

        // Update Time
        this.setState({
            timeFormat:`${h}:${m}:${s}.${ms}`
        });

    }

    /**
     * Handles starting and stopping of the timer.
     * @param {Event} e
     * @return {void}
     **/
    onKeyUp = (e) => {
        if (this.props.web) {
            if (e.key === "PageUp") {
                this.onStartTimer();
            } else if (e.key === "PageDown") {
                this.reset();
            }
        } else {
            if (e.key === "F1") {
                this.onStartTimer();
            } else if (e.key === "F8") {
                this.reset();
            }
        }
    }

    /**
     * Resets the timer and sets the state.
     * @return {void}
     **/
    reset() {
        this.onStopTimer();
        this.setState({
            timeFormat:'00:00:00.00'
        });
    }

    /**
     * Stops the timer for good, resets the time delta to 0.
     * @return {void}
     **/
    onStopTimer = () => {
        clearInterval(this.interval);
        this.interval = null;
        this.timeDelta = 0;
    }

    /**
     * Starts the timer, if the timer is started pause it.
     * @return {void}
     **/
    onStartTimer = () => {
        if (!this.interval) {
            this.timeStart = Date.now();
            this.interval = setInterval(this.onTimerInterval, 1);
        } else {
            clearInterval(this.interval);
            this.interval = null;
            this.timeDelta += Date.now() - this.timeStart;
        }
    }

    /**
     * Renders the timer
     * @return {ReactDOM}
     **/
    render() {
        const style = {
            'fontSize':`${this.props.fontSize}px`,
            'fontFamily':this.props.fontFamily,
            'marginBottom':`${this.props.padding}px`,
            'color':this.props.color
        };
        return <div className='ort-timer' style={style}>
            {this.state.timeFormat}
        </div>;
    }

}

import React from "react";
import "./index.sass";

export default class Timer extends React.Component {

    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    timeStart = null;
    interval = null;
    time = 0;

    state = {
        timeFormat: '00:00:00.00'
    };

    onTimerInterval = () => {

        this.time+=1000;

        // Don't like this, should be able to use % operator for this.
        let ms = Date.now() - this.timeStart;
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

    onKeyUp = (e) => {
        if (e.keyCode==112) {
            this.onStartTimer();
        } else if (e.keyCode==113) {
            this.onStopTimer();
        } else if (e.keyCode==114) {
            this.reset();
        }
    }

    reset() {
        this.onStopTimer();
        this.setState({
            timeFormat:'00:00:00.00'
        });
    }

    onStopTimer = () => {
        clearInterval(this.interval);
        this.interval = null;
    }

    onStartTimer = () => {
        if (!this.interval) {
            this.timeStart = Date.now();
            this.interval = setInterval(this.onTimerInterval, 1);
        }
    }

    UNSAFE_componentWillMount() {
        window.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
        this.reset();
    }

    render() {
        const style = {
            'fontSize':`${this.props.fontSize}px`,
            'fontFamily':this.props.fontFamily
        };
        return <div className='ort-timer' style={style}>
            {this.state.timeFormat}
        </div>;
    }

}

import React from 'react';
import ReactDOM from 'react-dom';
import RootViewController from './views/Root';
import WebController from './controllers/Web';

// Inject the correct controller depending on the view for webpack.
const controller = new WebController();
ReactDOM.render(
    <>
        <RootViewController controller={controller}/>
    </>,
    document.getElementById('root')
);

// Disable browser context menu globally because we use right clicks.
document.oncontextmenu = function() {
    return false;
};

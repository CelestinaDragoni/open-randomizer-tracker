import React from 'react';
import ReactDOM from 'react-dom';
import RootViewWebController from './views/RootWeb';
ReactDOM.render(
    <>
        <RootViewWebController/>
    </>,
    document.getElementById('root')
);

document.oncontextmenu = function() {
    return false;
};

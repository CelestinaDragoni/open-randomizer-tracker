import React from 'react';
import ReactDOM from 'react-dom';
import RootViewController from './views/Root';
import ElectronController from './controllers/Electron';

// Inject the correct controller depending on the view for webpack.
const controller = new ElectronController();
ReactDOM.render(
    <>
        <RootViewController controller={controller}/>
    </>,
    document.getElementById('root')
);

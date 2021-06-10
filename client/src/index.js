import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import './index.css';
import Root from "./root";

ReactDOM.render(
  <HashRouter>
    <Root />
  </HashRouter>,
  document.getElementById('root')
);

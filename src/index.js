import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Menue from './components/Menue';
import Processes from './components/Processes'
import System from './components/System'
import Perfgraph from './components/Perfgraph'
import Stocks from "./components/Stocks"
import StockList from "./components/StockList"
import StockNews from "./components/StockNews"
import { Router, Route} from 'react-router'
import { browserHistory } from 'react-router'
import './index.css'
import 'string'


ReactDOM.render((
    <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/menue" component={Menue}/>
    <Route path="/processes" component={Processes}/>
    <Route path="/stocks" component={Stocks}/>
    <Route path="/graph" component={Perfgraph}/>
    <Route path="/complist" component={StockList}/>
    <Route path="/stocks/*" component={Stocks}/>
    <Route path="/news/*" component={StockNews}/>
    <Route path="/system/*" component={System}/>
    </Router>
), document.getElementById('root'));

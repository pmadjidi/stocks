import React from 'react';
import {Link} from 'react-router'


export default class App extends React.Component {

  render() {
    console.log("rendring app Meneue")
    return (
      <div>
      <h1>System Performance Monitor</h1>
      <h3>Desgined by Payam Madjidi to learn React </h3>
      <ul>
      <li><Link activeClassName="nav-active" to={'/menue'}>Menue</Link></li>
      <li><Link activeClassName="nav-active" to={'/graph'}>Graph</Link></li>
        <li><Link activeClassName="nav-active" to={'/complist'}>Stock List</Link></li>
      </ul>
      </div>
    )

    }
  }

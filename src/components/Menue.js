import React from 'react';
import {Link } from 'react-router'

export default class Home extends React.Component {
  constructor( ) {
    super( );
    this.state = {
      items: [ ]
    };
  }

  uppdateState(data) {
    let items = JSON.parse(data)
    console.log("App, updatingState.....",typeof(items),items)
    this.setState({items})
  }

  componentWillMount() {
  let that = this
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('GET', 'http://localhost:4000/api/all', true)
  xhr.onload = function () {
  let data = this.responseText
  that.uppdateState(data)
   }
  xhr.send()
  }

  generateList() {
    console.log("generate list",this.state.items)
    console.log("type",typeof(this.state.items))
     return this.state.items.map(item=><li key={item.key}><Link activeClassName="nav-active" to={"/system/" + item.key}>{item.key}</Link></li>)
  }

  render() {
    return (
      <div>
      <h1> System </h1>
      <ul>{ this.generateList() }</ul>
      </div>
    )

    }
  }

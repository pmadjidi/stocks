import React from 'react';
import DisplayTable from './Displaytable'
var companyJson = require('./companylist.json')


export default class StockList extends React.Component {
  constructor(props) {
    super(props);
    let initalState =  {data: companyJson}
    console.log("Setting StockList default state to",initalState)
    this.state = initalState

  }

  componentDidMount( ) {
    if (this.state.data.length === 0 )
    {
  //let Route =   this.props.routes[0].path
  let Route =  this.props.router.location.pathname
  console.log("Route....",Route)
  let Url = "http://localhost:4000/api" + Route
  let that = this
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('GET', Url, true)
  xhr.onload = function () {
  let data = JSON.parse(this.responseText)
  console.log(Route + " updating state information.....",data.length);
  that.setState({data})
   }
  xhr.send()
  }
}

handleClick(e) {
  e.preventDefault();
  this.props.history.push('/stocks');
}

  render() {
    if (this.state.data.length === 0)
      return <h1>No Data</h1>
    let headerVector = Object.keys(this.state.data[0])
    let headers = headerVector.map(function(key, idx) {
        return <th key={idx}>{key}</th>
    })
    let func = this.handleClick
    console.log(func)
    return (
      <div>
      <h1>Company List </h1>
      {headers}
      {this.state.data.map(item=><DisplayTable key={item.Symbol} item={item} ></DisplayTable>)}
      </div>
    )

    }
  }

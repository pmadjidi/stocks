

import React from 'react';
import displayTable from './Displaytable'
import StockNews from './StockNews'
import CandleStickChartWithMACDIndicator from './StockGraph'



export default class Stocks extends React.Component {
  constructor(props) {
    super(props);
    let initalState =  {data:[]}
    console.log("Setting Stocks default state to",initalState)
    this.state = initalState
  }

    componentWillMount() {
    //let Route =   this.props.routes[0].path
    let Route =  this.props.router.location.pathname
    console.log("Route....",Route)
    let Url = "http://localhost:4000" + Route
    let that = this
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('GET', Url, true)
    xhr.onload = function () {
    let data = JSON.parse(this.responseText)
    console.log(Route + " updating state information.....",data.length);
    data.map(item=>{item.date = new Date(item.date)})
  //  data.map(item=>console.log(item))
    that.setState({data})
  }
    xhr.send()
    }



  render() {
    let NewsRoute = this.props.router.location.pathname.replace("stocks","news")
    console.log("News Route",NewsRoute)
    if (this.state.data.length === 0)
      return <h1>No Data</h1>
    return (
      <div>
      <CandleStickChartWithMACDIndicator data={this.state.data} width={1400} ratio={1} type="svg" />
      </div>
    )

    }
  }

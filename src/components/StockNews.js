import React from 'react';
import displayData from './Displaydata'


export default class StockNews extends React.Component {
  constructor(props) {
    super(props);
    let initalState =  {data:[]}
    console.log("Setting Stock News default state to",initalState)
    this.state = initalState
  }

  componentWillMount( ) {
  //let Route =   this.props.routes[0].path
//  let Url = "http://localhost:4000" + this.props.NewsRoute
  //console.log("Route URL....",URL)

  let Route =  this.props.router.location.pathname
  console.log("Route....",Route)
  let Url = "http://localhost:4000" + Route
  let that = this
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('GET', Url, true)
  xhr.onload = function () {
  console.log("***********",this.responseText)
  let data = JSON.parse(this.responseText)
  console.log(Symbol + " updating News information.....",data.length);
  that.setState({data})
   }
  xhr.send()
  }

  render() {
    if (this.state.data.length === 0 )
      return null
    return (
      <div>
      {this.state.data.slice(0).reverse().map((item,index)=>displayData(item,index))}
      </div>
    )

    }
  }

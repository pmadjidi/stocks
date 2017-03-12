import React from 'react';
import displayData from './Displaydata'


export default class System extends React.Component {
  constructor(props) {
    super(props);
    let initalState =  {key: "System", data:{}}
    console.log("Setting System default state to",initalState)
    this.state = initalState
  }

  componentWillMount( ) {
  //let Route =   this.props.routes[0].path
  let Route =  this.props.router.location.pathname
  console.log("Route....",Route)
  let Url = "http://localhost:4000/api" + Route
  let that = this
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('GET', Url, true)
  xhr.onload = function () {
  console.log("***********",this.responseText)
  let {key,data} = JSON.parse(this.responseText)[0][0]
  console.log(Route + " updating state information.....",key,data);
  that.setState({key,data})
   }
  xhr.send()
  }

  render() {
    return (
      <div>
      <h1>{this.state.key} </h1>
      {displayData(this.state.data)}
      </div>
    )

    }
  }

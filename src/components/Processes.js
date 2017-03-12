import React from 'react';
import displayTable from './Displaytable'

export default class Processes extends React.Component {
  constructor( ) {
    super( );
    let initalState =  {key: "Processes", data:{}}
    console.log("Setting Processes default state to",initalState)
    this.state = initalState
  }

  componentWillMount( ) {
  let that = this
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('GET', 'http://localhost:4000/api/processes/', true)
  xhr.onload = function () {
  let {key,data} = JSON.parse(this.responseText)[0][0]
  console.log("System updating state information.....",key,data);
  that.setState({key,data})
   }
  xhr.send()
  }

  render() {
    if (Object.keys(this.state.data).length === 0)
      return null
    else {
    console.log("drawing")
    let headerVector = Object.keys(this.state.data.list[0])
    let headers = headerVector.map(function(key, idx) {
        return <th key={idx}>{key}</th>
    })
    return (
      <div style={{"overflowX": "auto"}}>
      <h1>{this.state.key} </h1>
      <h3>All {this.state.data.all}</h3>
      <h3>Running {this.state.data.running}</h3>
      <h3>Blocked {this.state.data.blocked}</h3>
      <h3>Sleep {this.state.data.sleeping}</h3>
      <table>
      <tbody>
      <tr>
      {headers}
      </tr>
      {this.state.data.list.map((item,index)=>displayTable(item,index))}
     </tbody>
      </table>
    </div>
    )

    }
  }
}

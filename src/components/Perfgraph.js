import React from 'react'
import {LineChart} from 'react-d3-basic'
import {LineZoom} from 'react-d3-zoom'

let Colors = {};
Colors.names = {
    aqua: "#00ffff",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    black: "#000000",
    blue: "#0000ff",
    brown: "#a52a2a",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgrey: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    khaki: "#f0e68c",
    lightblue: "#add8e6",
    lightcyan: "#e0ffff",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    purple: "#800080",
    violet: "#800080",
    red: "#ff0000",
    silver: "#c0c0c0",
    white: "#ffffff",
    yellow: "#ffff00"
};

let colorIndex = []
 Object.keys(Colors.names).map((key,index)=>colorIndex[index] = key)


Colors.random = function() {
    var result;
    var count = 0;
    for (var prop in this.names)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
};


 export default class PerfGraph extends React.Component {
  constructor( ) {
    console.log(3);
    super( );
    let initalState =  {chartData: []}
    console.log("Setting Graph default state to",initalState)
    this.state = initalState
  }

  componentWillMount( ) {
  let that = this
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('GET', 'http://localhost:4000/api/currentLoad', true)

  xhr.onload = function () {
  let chartdata = JSON.parse(this.responseText)
  let chartData = [].concat.apply([], chartdata).map((item,index)=>{
    let data = item.data
    let cpus = data.cpus
    cpus.map((cpu,index)=>data["cpu" + index] = cpu.load)
    data.cpus = cpus.length
    data.index = index
    return data})
  console.log(JSON.stringify(chartData[0],null,4))
  console.log("System updating state information.....",chartData.length);
  that.setState({chartData})
   }

  xhr.send()
  }


render (){
console.log("in render graph....")
  let data = this.state.chartData
  if (data.length === 0)
    return (<h1>No Data.....</h1>)

  let width = 900,
    height = 600,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    title = "Performance Graph",
    dataFormat =  this.state.chartData[0],
    // your x accessor
    x = function(d) {
      return d.index;
    },
    chartSeries = Object.keys(dataFormat)
    .filter(item=> item !== "index" && item !== "cpus")
    .map((key,index)=>{return {field: key, name: key, color: colorIndex[index+10]}})

    return (
      <div>
      <LineChart
        showXGrid={true}
        showYGrid={true}
        margins={margins}
        title={title}
        data={data}
        width={width}
        height={height}
        chartSeries={chartSeries}
        x={x}
      />
      <LineZoom
          width= {width}
          height= {height}
          data= {data}
          chartSeries= {chartSeries}
          x= {x}
          zoomX={false}
          zoomY={true}
        />
    </div>
  )
}
}

console.log("2")

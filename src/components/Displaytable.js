import React from 'react'
import {browserHistory} from 'react-router'


export default class DisplayTable extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    e.preventDefault();
    browserHistory.push('/stocks/' + this.props.item.Symbol);
  }

  handleNewsClick(e) {
    e.preventDefault();
    browserHistory.push('/news/' + this.props.item.Symbol);
  }


  render() {
    let item = this.props.item
    return (
        <tr key={item.Symbol} >
            {Object.keys(item).map(function(key, idx) {
                if (key === "Summary Quote")
                  return <td key={idx}> <a href={item[key]}>{item[key]}</a> </td>
                  if (key === "Name")
                  return <td key={idx} onClick={this.handleNewsClick.bind(this)} > {item[key]}</td>
                return <td key={idx} onClick={this.handleClick.bind(this)} > {item[key]}</td>
            },this)}
          </tr>
    )
  }
}

/*
const displayTable = (props,index) => {
  return (
      <tr key={index} >
          {Object.keys(props).map(function(key, idx) {
              if (key === "Summary Quote")
                return <td key={idx}> <a href={props[key]}>{props[key]}</a> </td>
              return <td key={idx}> {props[key]}</td>
          })}
        </tr>
      )
}

export default displayTable
*/

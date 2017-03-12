import React from 'react'
import '../index.css'


const displayData = (props,index) => {
  return (
           <ul key={index}>
          {props && Object.keys(props).map(function(key, idx) {
            if (Array.isArray(props[key]))
              return props[key].map((item,index)=>displayData(item,index))
            if (typeof (props[key]) === 'object')
              return displayData(props[key],index * 2)
            if (key === "link")
              return <li key={idx}> <a href={props[key]}>{props[key]}</a> </li>
            return <li key={idx}><b>{key}:</b>  {props[key]}</li>
          })}
        </ul>
      )
}

export default displayData

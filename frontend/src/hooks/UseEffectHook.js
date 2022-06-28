import React, {useEffect} from 'react'
import axios from 'axios'

function UseEffectHook() {
    useEffect(()=>{
        axios
        .get("http://jsonplaceholder.typicode.com/comments")
        .then((response)=>{
            console.log(response.data)
            console.log("api was running")
        });
    },[])
  return (
    <div>UseEffectHook</div>
  )
}

export default UseEffectHook
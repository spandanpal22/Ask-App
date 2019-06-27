import React from 'react'
import {createStore} from 'redux';


//store -> globalised state

//action
const firstLaunchCheck=()=>{
    return {
        type: "FirstLaunchCheck"
    }
}

//reducer
const LaunchCheck=(state=0,action)=>{
    switch(action.type)
    {
        case "FirstLaunchCheck":
            state=1;
            return state;
        break;
    }
}

let store=createStore(LaunchCheck);


//display it in the console
store.subscribe(()=>console.log(store.getState()));


//dispatch
store.dispatch(firstLaunchCheck());

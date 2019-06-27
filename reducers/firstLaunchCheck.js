const LaunchCheck=(state=0,action)=>{
    switch(action.type)
    {
        case "FirstLaunchCheck":
            state=1;
            return state;
        break;
        default:
            return state;
    }
}

export default LaunchCheck;
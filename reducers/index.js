import LaunchCheck from './firstLaunchCheck';
import {combineReducers} from 'redux';

const allReducers=combineReducers({
    FirstLaunchCheck : LaunchCheck,
})

export default allReducers;
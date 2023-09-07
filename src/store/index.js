import { combineReducers, createStore } from 'redux'
import cartitemsreducer from './cartitemsreducer'
import reducer from './reducer'

//const store=createStore(reducer)
//export default store;

const combreducer=combineReducers({loggedin:reducer,cart:cartitemsreducer});
const store=createStore(combreducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store;

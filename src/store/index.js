import { createStore } from "redux";
import appReducers from "./reducers";


const appStore = createStore(appReducers, {});


export default appStore;
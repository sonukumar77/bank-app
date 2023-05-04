import { legacy_createStore } from "redux";
import userReducer from "./reducer";

const myStore = legacy_createStore(userReducer);

export default myStore;

import { combineReducers } from "redux";
import friends from "./friends";
import search from "./search";

const appReducers = combineReducers({
  friends,
  search
});

export default appReducers;
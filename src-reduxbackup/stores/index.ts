import {createStore, combineReducers} from "redux";
import marketReducer from "./market";

const rootReducer = combineReducers({marketReducer});
const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;

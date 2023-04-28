import { combineReducers } from "redux";
import { sessionErrorsReducer } from './session';
import { testErrorsReducer } from "./tests";

export default combineReducers({
    session: sessionErrorsReducer,
    test: testErrorsReducer
})
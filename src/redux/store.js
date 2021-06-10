import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

import { PatientReducer } from "./PatientReducer";
import { ServicesReducer } from "./ServicesReducer";

const rootReducer = combineReducers({
  patient: PatientReducer,
  services: ServicesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };

const initState = {
  list: [],

  refemp: {},
  error: false,
};

// ACTION TYPES
const SERVICES_CREATE = "SERVICES_CREATE";
const SERVICES_UPDATE = "SERVICES_UPDATE";
const SERVICES_DELETE = "SERVICES_DELETE";
const SERVICES_GET_ALL = "SERVICES_GET_ALL";
const SERVICES_GET_BY_ID = "SERVICES_GET_BY_ID";

const REF_SERVICES = "REF_SERVICES";
const SERVER_ERROR = "SERVER_ERROR";

// ACTIONS :: COmponents are interacting with this action
export function createServicesAction(payload) {
  // return { type: EMPLOYEE_CREATE, payload: payload };

  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/services/";
    const requestBody = { ...payload };

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: SERVICES_CREATE, payload: payload });
  };
}

export function updateServicesAction(payload) {
  // return { type: EMPLOYEE_UPDATE, payload: payload };
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/services/updateService/updateAllFields/${payload.serviceId}`;
    const requestBody = { ...payload };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // update the ui.
    dispatch(updateRefServices({}));
  };
}
export function deleteServicesAction(payload) {
  // return { type: EMPLOYEE_DELETE, payload: payload };

  // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/services/delete/${payload.serviceId}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllServicesAction());
  };
}

export function getAllServicesAction(payload) {
  // return { type: EMPLOYEE_GET_ALL, payload: payload };

  // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    try {
      // WE HV TO CALL THE SPRINT1 / SPRING BOOT
      const url = "http://localhost:8080/api/services/allServices";

      // HTTP Client / POSTMAN / SWAGGER
      const response = await fetch(url);
      const servicesList = await response.json();

      // Update the UI
      dispatch({ type: SERVICES_GET_ALL, payload: servicesList });
    } catch (error) {
      console.log(error);
      dispatch({ type: SERVER_ERROR, payload: true });

      const localServicesStringList = localStorage.getItem("servicesList");
      const localServicesList = JSON.parse(localServicesStringList);
      dispatch({ type: SERVICES_GET_ALL, payload: localServicesList });
    }
  };
}

export function getByIdServicesAction(payload) {
  // return { type: EMPLOYEE_GET_BY_ID, payload: payload };
  return async (dispatch) => {
    const url = `http://localhost:8080/api/services/get/${payload.serviceId}`;
    const response = await fetch(url);
    const servicesObj = await response.json();

    // this wil update the refemp
    dispatch(updateRefServices(servicesObj));
  };
}

export function updateRefServices(payload) {
  return { type: REF_SERVICES, payload: payload };
}

// REDUCER LOGIC
export function ServicesReducer(state = initState, action) {
  switch (action.type) {
    case SERVICES_CREATE:
      return { ...state, list: [action.payload, ...state.list] };
    case SERVICES_UPDATE:
      return state;
    case SERVICES_DELETE:
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case SERVICES_GET_ALL:
      return { ...state, list: action.payload };
    case SERVICES_GET_BY_ID:
      // TODO
      return state;

    case REF_SERVICES:
      return { ...state, refemp: action.payload };

    case SERVER_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

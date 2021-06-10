const initState = {
  list: [],

  refemp: {},
  error: false,
};

// ACTION TYPES
const PATIENT_CREATE = "PATIENT_CREATE";
const PATIENT_UPDATE = "PATIENT_UPDATE";
const PATIENT_DELETE = "PATIENT_DELETE";
const PATIENT_GET_ALL = "PATIENT_GET_ALL";
const PATIENT_GET_BY_ID = "PATIENT_GET_BY_ID";

const REF_PATIENT = "REF_PATIENT";
const SERVER_ERROR = "SERVER_ERROR";

// ACTIONS :: COmponents are interacting with this action
export function createPatientAction(payload) {
  // return { type: EMPLOYEE_CREATE, payload: payload };

  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/patient/";
    const requestBody = { ...payload };

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: PATIENT_CREATE, payload: payload });
  };
}

export function updatePatientAction(payload) {
  // return { type: EMPLOYEE_UPDATE, payload: payload };
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/patient/updatePatient/updateAllFields/${payload.id}`;
    const requestBody = { ...payload };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // update the ui.
    dispatch(updateRefPatient({}));
  };
}

export function deletePatientAction(payload) {
  // return { type: EMPLOYEE_DELETE, payload: payload };

  // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/patient/delete/${payload.id}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllPatientAction());
  };
}

export function getAllPatientAction(payload) {
  // return { type: EMPLOYEE_GET_ALL, payload: payload };

  // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    try {
      // WE HV TO CALL THE SPRINT1 / SPRING BOOT
      const url = "http://localhost:8080/api/patient/allPatients";

      // HTTP Client / POSTMAN / SWAGGER
      const response = await fetch(url);
      const patientList = await response.json();

      // Update the UI
      dispatch({ type: PATIENT_GET_ALL, payload: patientList });
    } catch (error) {
      console.log(error);
      dispatch({ type: SERVER_ERROR, payload: true });

      const localPatientStringList = localStorage.getItem("patientList");
      const localPatientList = JSON.parse(localPatientStringList);
      dispatch({ type: PATIENT_GET_ALL, payload: localPatientList });
    }
  };
}

export function getByIdPatientAction(payload) {
  // return { type: EMPLOYEE_GET_BY_ID, payload: payload };
  return async (dispatch) => {
    const url = `http://localhost:8080/api/patient/get/${payload.id}`;
    const response = await fetch(url);
    const patientObj = await response.json();

    // this wil update the refemp
    dispatch(updateRefPatient(patientObj));
  };
}

export function updateRefPatient(payload) {
  return { type: REF_PATIENT, payload: payload };
}

// REDUCER LOGIC
export function PatientReducer(state = initState, action) {
  switch (action.type) {
    case PATIENT_CREATE:
      return { ...state, list: [action.payload, ...state.list] };
    case PATIENT_UPDATE:
      // TODO
      return state;
    case PATIENT_DELETE:
      // TODO
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case PATIENT_GET_ALL:
      // TODO
      return { ...state, list: action.payload };
    case PATIENT_GET_BY_ID:
      // TODO
      return state;

    case REF_PATIENT:
      return { ...state, refemp: action.payload };

    case SERVER_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

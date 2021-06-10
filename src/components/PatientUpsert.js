import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createPatientAction,
  updatePatientAction,
} from "../redux/PatientReducer";

export function PatientUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
  const state = useSelector((state) => state);

  const [firstName, setFirstName] = useState(state.patient.refemp.firstName);
  const [lastName, setLastName] = useState(state.patient.refemp.lastName);
  const [userName, setUserName] = useState(state.patient.refemp.userName);
  const [password, setPassword] = useState(state.patient.refemp.password);
  const [email, setEmail] = useState(state.patient.refemp.email);
  const [mobile, setMobile] = useState(state.patient.refemp.mobile);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updateMobile = (e) => setMobile(e.target.value);

  const addPatient = (e) => {
    e.preventDefault();

    // THIS IS REDUX ACTION CALLING
    dispatch(
      createPatientAction({
        firstName,
        lastName,
        userName,
        email,
        password,
        mobile,
      })
    );

    // A1 sucess
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // reset the form
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    setEmail("");
    setMobile("");
  };

  const updatePatient = () => {
    dispatch(
      updatePatientAction({
        id: state.patient.refemp.id,
        firstName,
        lastName,
        userName,
        email,
        mobile,
        password,
      })
    );

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // reset the form
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    setEmail("");
    setMobile("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-info">
          {state.patient.refemp.firstName ? "Update Patient" : "Create Patient"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Patient Added</div>
        )}

        <div className="mb-1">
          <input
            type="text"
            value={firstName}
            required="required"
            onChange={(e) => updateFirstName(e)}
            className="form-control"
            placeholder="Enter First name"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={lastName}
            required="required"
            onChange={(e) => updateLastName(e)}
            className="form-control"
            placeholder="Enter Lastname"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={userName}
            required="required"
            onChange={(e) => updateUserName(e)}
            className="form-control"
            placeholder="Enter Username"
          />
        </div>

        <div className="mb-1">
          <input
            type="password"
            value={password}
            required="required"
            onChange={(e) => updatePassword(e)}
            className="form-control"
            placeholder="Enter Password"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={email}
            required="required"
            onChange={(e) => updateEmail(e)}
            className="form-control"
            placeholder="Enter Email"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={mobile}
            required="required"
            onChange={(e) => updateMobile(e)}
            className="form-control"
            placeholder="Enter Mobile"
          />
        </div>

        <div className="mb-1">
          {state.patient.refemp.id ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Patient"
              onClick={() => updatePatient()}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Add Patient"
              onClick={(e) => addPatient(e)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}

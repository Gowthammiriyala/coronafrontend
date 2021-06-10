import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deletePatientAction,
  getAllPatientAction,
  getByIdPatientAction,
  updateRefPatient,
} from "../redux/PatientReducer";
import { PatientModal } from "./PatientModal";

export function PatientList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllPatientAction());
  }, []);

  const [successOperation, setSuccessOperation] = useState(false);

  const deletePatient = (item, index) => {
    dispatch(deletePatientAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 2000);
  };

  const updatePatient = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefPatient(item));

    // form page
    history.push("/create-patient");
  };
  const getPatientById = (item) => {
    dispatch(getByIdPatientAction(item));
  };

  return (
    <>
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-secondary">Patient List</h3>

          {state.patient.error && (
            <div className="alert alert-danger">Can't connect error</div>
          )}
          {successOperation && (
            <div className="alert alert-success">Opeation Success</div>
          )}

          <table className="table">
            <thead className="thead-dark sticky-top">
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">USERNAME</th>
                <th scope="col">PASSWORD</th>
                <th scope="col">EMAIL</th>
                <th scope="col">MOBILE</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...state.patient.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.userName}</td>
                  <td>{"****"}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <input
                      type="button"
                      onClick={() => getPatientById(item)}
                      value="Detail"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      onClick={() => updatePatient(item)}
                      value="Edit"
                      className="btn btn-link"
                    />{" "}
                    /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deletePatient(item, index)}
                      className="btn btn-link text-danger"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-3 col-md-2 d-none d-md-block"></div>
      </div>

      <PatientModal />
    </>
  );
}

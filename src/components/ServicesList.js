import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteServicesAction,
  getAllServicesAction,
  getByIdServicesAction,
  updateRefServices,
} from "../redux/ServicesReducer";
import { ServicesModal } from "./ServicesModal";

export function ServicesList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllServicesAction());
  }, []);

  const [successOperation, setSuccessOperation] = useState(false);

  const deleteServices = (item, index) => {
    dispatch(deleteServicesAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 2000);
  };

  const updateServices = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefServices(item));

    // form page
    history.push("/create-services");
  };
  const getServicesById = (item) => {
    dispatch(getByIdServicesAction(item));
  };

  return (
    <>
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-secondary">Services List</h3>
          {state.services.error && (
            <div className="alert alert-danger">Can't connect error</div>
          )}

          {successOperation && (
            <div className="alert alert-success">Opeation Success</div>
          )}

          <table className="table">
            <thead className="thead-dark sticky-top">
              <tr>
                <th scope="col">#SERVICESID</th>
                <th scope="col">IPD</th>
                <th scope="col">OPD</th>
                <th scope="col">ADDITIONALSERVICES</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[...state.services.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.serviceId}</th>
                  <td>{item.ipd}</td>
                  <td>{item.opd}</td>
                  <td>{item.additionalServices}</td>
                  <td>
                    <input
                      type="button"
                      onClick={() => getServicesById(item)}
                      value="Detail"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      onClick={() => updateServices(item)}
                      value="Edit"
                      className="btn btn-link"
                    />{" "}
                    /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deleteServices(item, index)}
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
      <ServicesModal />
    </>
  );
}

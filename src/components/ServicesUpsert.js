import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createServicesAction,
  updateServicesAction,
} from "../redux/ServicesReducer";

export function ServicesUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
  const state = useSelector((state) => state);

  const [ipd, setIpd] = useState(state.services.refemp.ipd);
  const [opd, setOpd] = useState(state.services.refemp.opd);
  const [additionalServices, setAdditionalServices] = useState(
    state.services.refemp.additionalServices
  );

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateIpd = (e) => setIpd(e.target.value);
  const updateOpd = (e) => setOpd(e.target.value);
  const updateAdditionalServices = (e) => setAdditionalServices(e.target.value);

  const addServices = (e) => {
    e.preventDefault();

    // THIS IS REDUX ACTION CALLING
    dispatch(
      createServicesAction({
        ipd,
        opd,
        additionalServices,
      })
    );

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);
    setIpd("");
    setOpd("");
    setAdditionalServices("");
  };

  const updateServices = () => {
    dispatch(
      updateServicesAction({
        serviceId: state.services.refemp.serviceId,
        ipd,
        opd,
        additionalServices,
      })
    );

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // reset the form
    setIpd("");
    setOpd("");
    setAdditionalServices("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-info">
          {state.services.refemp.ipd ? "Update Services" : "Create Services"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Services added</div>
        )}

        <div className="mb-1">
          <input
            type="text"
            value={ipd}
            required="required"
            onChange={(e) => updateIpd(e)}
            className="form-control"
            placeholder="Enter Ipd is true or false"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={opd}
            required="required"
            onChange={(e) => updateOpd(e)}
            className="form-control"
            placeholder="Enter Opd is true or not"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={additionalServices}
            required="required"
            onChange={(e) => updateAdditionalServices(e)}
            className="form-control"
            placeholder="Enter AdditionalServices"
          />
        </div>

        <div className="mb-1">
          {state.services.refemp.serviceId ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Services"
              onClick={() => updateServices()}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Add Services"
              onClick={(e) => addServices(e)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}

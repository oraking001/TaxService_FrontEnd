import api from "../utils/api";
import { toast } from "react-toastify";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/register", formData);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    }
    dispatch({
      type: "REGISTER_FAIL",
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/login", formData);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }

    dispatch({
      type: "LOGIN_FAIL",
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
  dispatch({
    type: "BLOCK_CLEAR",
  });
};

export const reqConsult = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/reqconsult", formData);

    toast.success("success", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  }
};

export const setAuthFlag = () => ({ type: "SET_AUTH_FLAG" });

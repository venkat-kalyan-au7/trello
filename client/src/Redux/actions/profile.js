import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE_ERROR,
  PROFILE_ERROR,
} from "./types.js";

export const getProfile = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${userId}`);

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};

export const updateProfile = (profileData, userId, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(profileData);

  try {
    const res = await axios.put(`/api/profile/${userId}`, body, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });

    dispatch(setAlert("success", res.data.msg));

    history.push(`/profile/${userId}`);
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert("warning", error)));
    }

    dispatch({ type: UPDATE_PROFILE_ERROR });
  }
};

export const clearProfile = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};
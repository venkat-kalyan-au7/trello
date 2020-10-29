import {
    GET_PROFILE,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    UPDATE_PROFILE_ERROR,
    PROFILE_ERROR,
  } from "../actions/types";
  
  const initialState = {
    profile: null,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PROFILE:
      case UPDATE_PROFILE:
        return {
          ...state,
          profile: payload,
          loading: false,
        };
  
      case CLEAR_PROFILE:
        return {
          ...state,
          profile: null,
          loading: true,
        };
  
      case UPDATE_PROFILE_ERROR:
        return {
          ...state,
          loading: false,
        };
  
      case PROFILE_ERROR:
        return {
          ...state,
          profile: null,
          loading: false,
        };
  
      default:
        return state;
    }
  }
  
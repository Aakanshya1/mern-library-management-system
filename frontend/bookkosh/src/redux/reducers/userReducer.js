// import {
//   USER_DETAILS_FAIL,
//   USER_DETAILS_REQUEST,
//   USER_DETAILS_SUCCESS,
//   USER_UPDATE_PROFILE_FAIL,
//   USER_UPDATE_PROFILE_REQUEST,
//   USER_UPDATE_PROFILE_SUCCESS,
// } from "../../constants/UserConstants";

// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// // Reducer for fetching user details
// export const userDetailsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_DETAILS_REQUEST:
//       return { ...state, loading: true };
//     case USER_DETAILS_SUCCESS:
//       return { ...state, loading: false, user: action.payload };
//     case USER_DETAILS_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// // Reducer for updating user profile
// export const userUpdateProfileReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_UPDATE_PROFILE_REQUEST:
//       return { ...state, loading: true };
//     case USER_UPDATE_PROFILE_SUCCESS:
//       return { ...state, loading: false, success: true, user: action.payload };
//     case USER_UPDATE_PROFILE_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

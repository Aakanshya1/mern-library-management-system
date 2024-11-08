// // src/actions/userActions.js
// import axios from 'axios';
// import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from '../../constants/UserConstants';

// export const fetchUserDetails = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: USER_DETAILS_REQUEST });
//     const { data } = await axios.get('/api/user', {
//       headers: {
//         Authorization: `Bearer ${getState().userDetails.token}`,
//       },
//     });
//     dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: USER_DETAILS_FAIL,
//       payload: error.response?.data.message || error.message,
//     });
//   }
// };

// export const updateUserDetails = (user) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
//     const { data } = await axios.put('/api/user', user, {
//       headers: {
//         Authorization: `Bearer ${getState().userDetails.token}`,
//       },
//     });
//     dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: USER_UPDATE_PROFILE_FAIL,
//       payload: error.response?.data.message || error.message,
//     });
//   }
// };

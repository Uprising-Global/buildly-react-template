// Auth action types
export const LOGIN = 'AUTH/LOGIN';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'AUTH/LOGIN_FAIL';

export const LOGOUT = 'AUTH/LOGOUT';
export const LOGOUT_SUCCESS = 'AUTH/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'AUTH/LOGOUT_FAIL';

export const REGISTER = 'AUTH/REGISTER';
export const REGISTER_SUCCESS = 'AUTH/REGISTER_SUCCESS';
export const REGISTER_FAIL = 'AUTH/REGISTER_FAIL';

export const SEND_PASSWORD_RESET_LINK = 'AUTH/SEND_PASSWORD_RESET_LINK';
export const SEND_PASSWORD_RESET_LINK_SUCCESS = 'AUTH/SEND_PASSWORD_RESET_LINK_SUCCESS';
export const SEND_PASSWORD_RESET_LINK_FAIL = 'AUTH/SEND_PASSWORD_RESET_LINK_FAIL';

export const VALIDATE_RESET_PASSWORD_TOKEN = 'AUTH/VALIDATE_RESET_PASSWORD_TOKEN';
export const VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS = 'AUTH/VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS';
export const VALIDATE_RESET_PASSWORD_TOKEN_FAIL = 'AUTH/VALIDATE_RESET_PASSWORD_TOKEN_FAIL';

export const RESET_PASSWORD = 'AUTH/RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'AUTH/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'AUTH/RESET_PASSWORD_FAIL';

export const UPDATE_USER = 'AUTH/USER';
export const UPDATE_USER_SUCCESS = 'AUTH/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'AUTH/UPDATE_USER_FAIL';

export const GET_USER = 'AUTH/GET_USER';
export const GET_USER_SUCCESS = 'AUTH/GET_USER_SUCCESS';
export const GET_USER_FAIL = 'AUTH/GET_USER_FAIL';

export const INVITE = 'AUTH/INVITE';
export const INVITE_SUCCESS = 'AUTH/INVITE_SUCCESS';
export const INVITE_FAIL = 'AUTH/INVITE_FAIL';

export const GET_ORGANIZATION = 'AUTH/GET_ORGANIZATION';
export const GET_ORGANIZATION_SUCCESS = 'AUTH/GET_ORGANIZATION_SUCCESS';
export const GET_ORGANIZATION_FAILURE = 'AUTH/GET_ORGANIZATION_FAILURE';

export const UPDATE_ORGANIZATION = 'AUTH/UPDATE_ORGANIZATION';
export const UPDATE_ORGANIZATION_SUCCESS = 'AUTH/UPDATE_ORGANIZATION_SUCCESS';
export const UPDATE_ORGANIZATION_FAILURE = 'AUTH/UPDATE_ORGANIZATION_FAILURE';

export const ADD_SUBSCRIBER = 'AUTH/ADD_SUBSCRIBER';
export const ADD_SUBSCRIBER_SUCCESS = 'AUTH/ADD_SUBSCRIBER_SUCCESS';
export const ADD_SUBSCRIBER_FAILURE = 'AUTH/ADD_SUBSCRIBER_FAILURE';

export const UPDATE_PROFILE = 'AUTH/UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'AUTH/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL = 'AUTH/UPDATE_PROFILE_FAIL';

/**
 * Login action
 * @param {{ username, password }} credentials
 */
export const login = (credentials, history) => ({
  type: LOGIN,
  credentials,
  history,
});

/**
 * Logout action
 */
export const logout = () => ({ type: LOGOUT });

/**
 * Register action
 * @param {{ username, password, email, organization_name, first_name, last_name }} data
 */
export const register = (data, history) => ({ type: REGISTER, data, history });

/**
 * Send password reset link action
 * @param {{ email }} data
 */
export const sendPasswordResetLink = (data, history) => (
  { type: SEND_PASSWORD_RESET_LINK, data, history }
);

/**
 * Validate reset password token action
 * @param {{ uid, token }} data
 * @param {*} history
 */
export const validateResetPasswordToken = (data, history) => (
  { type: VALIDATE_RESET_PASSWORD_TOKEN, data, history }
);

/**
 * Reset password action
 * @param {{ new_password1, new_password2, uid, token }} data
 */
export const resetPassword = (data, history) => ({ type: RESET_PASSWORD, data, history });

/**
 * Update user action
 * @param {{ first_name, last_name }} data
 */
export const updateUser = (data) => ({ type: UPDATE_USER, data });

/**
 * Update user action
 * @param {{ first_name, last_name }} data
 */
export const getUser = () => ({ type: GET_USER });

/**
 * Invite user action
 * @param {{ first_name, last_name }} data
 */
export const invite = (data) => ({ type: INVITE, data });

export const getOrganization = (uuid) => ({
  type: GET_ORGANIZATION,
  uuid,
});

export const updateOrganization = (uuid) => ({
  type: UPDATE_ORGANIZATION,
  uuid,
});

/**
 * Add subscriber action
 * @param {{ email }} data
 */
export const addSubscriber = (data) => ({ type: ADD_SUBSCRIBER, data });

/**
 * Update user action
 * @param userId
 * @param data
 */
export const updateProfile = (userId, data) => ({
  type: UPDATE_PROFILE,
  userId,
  data,
});

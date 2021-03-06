import axios from 'axios';

import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_POPULAR_PROFILES, POPULAR_PROFILES_LOADING } from './types';
import { API_PATH } from '../../constants/environment'

import { getCurrent } from './auth.actions'
import { getParams } from '../../utils/query-params'

// Get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile')
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

// Get profile by id
export const getProfileByUsername = username => dispatch => {
	dispatch(setProfileLoading())
	axios
		.get(`${API_PATH}/profile/${username}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: null
			})
		)
}

// Get all profiles
export const getProfiles = (filters) => dispatch => {
	dispatch(setProfileLoading())
	axios
		.get(`${API_PATH}/profile${getParams(filters)}`)
		.then(res =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILES,
				payload: null
			})
		)
}

export const getPopularProfiles = (filters) => dispatch => {
	dispatch(setPopularProfilesLoading())
	axios
		.get(`${API_PATH}/profile/popular${getParams(filters)}`)
		.then(res =>
			dispatch({
				type: GET_POPULAR_PROFILES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POPULAR_PROFILES,
				payload: null
			})
		)
}

// Follow user
export const toggleFollow = id => dispatch => {
	//dispatch(setProfileLoading())
	axios
		.post(`${API_PATH}/profile/follow/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: null
			})
		)
}


// Update profile
export const updateProfile = (id, profile) => dispatch => {
	dispatch(setProfileLoading())
	axios
		.put(`${API_PATH}/profile/${id}`, profile)
		.then(res => {
			dispatch(getCurrent())
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		})
		.catch(err => 
			dispatch({
				type: GET_PROFILE,
				payload: null
			})
		)
}

// Delete account & profile
export const deleteAccount = () => dispatch => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		axios
			.delete('/api/profile')
			.then(res =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			)
	}
}

// Profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	}
}

export const setPopularProfilesLoading = () => {
	return {
		type: POPULAR_PROFILES_LOADING
	}
}

// Clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	}
}
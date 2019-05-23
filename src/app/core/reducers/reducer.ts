import { StateActions, UserActionsTypes } from '../actions/actions';




// This is the initial state
export let initialState = {
    userData: sessionStorage.getItem('user') ? sessionStorage.getItem('session') : 'User not logged',
};

/**
 * Update date for userData
 * @param userData
 * @param userInfo
 */
function setData(userData, userInfo) {
    return  Object.assign(userData, userInfo);
}

export function reducer(state = initialState, action: StateActions) {
    switch (action.type) {
        case UserActionsTypes.LOGIN:
            return { ...state, userData: action.payload };
        case UserActionsTypes.LOGOUT:
            return {userData: 'User not logged'};
        case UserActionsTypes.GET_USER:
            return { ...state, userData: action.payload };
    }
}

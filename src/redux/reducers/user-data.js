import { ADD_USERDATA, REMOVE_USERDATA } from '../actions';

const userData = {
    name: '',
    token: '',
    email: '',
    picture: '',
    googleId: ''
}

export const userDataReducer = (
    state = userData,
    action
) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_USERDATA: {
            newState = {
                name: action.payload.user.name,
                token: action.payload.user.token,
                email: action.payload.user.email,
                picture: action.payload.user.picture,
                googleId: action.payload.user.googleId
            }
            break;
        }
        case REMOVE_USERDATA: {
            newState = {
                name: '',
                token: '',
                email: '',
                picture: '',
                googleId: ''
            }
            break;
        }
        default: {
        }
    }
    return newState;
}
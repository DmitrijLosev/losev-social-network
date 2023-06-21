import {getAuth} from "./Auth-reducer";

const SET_INITIALIZATION_COMPLETE = 'App/SET_INITIALIZATION_COMPLETE';


let initialState = {
    InitializationComplete: false,
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZATION_COMPLETE:
            return {
                ...state,
                InitializationComplete: true,
            };

        default:
            return state;

    }
};
export const initializationComplete = () => ({type: SET_INITIALIZATION_COMPLETE});

export const initializeApp = () => (dispatch) => {
        let promise=dispatch(getAuth());
        Promise.all([promise]).then(()=>{dispatch(initializationComplete());})
}


export default AppReducer;
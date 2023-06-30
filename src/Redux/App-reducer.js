import {getAuth} from "./Auth-reducer";

const SET_INITIALIZATION_COMPLETE = 'App/SET_INITIALIZATION_COMPLETE';
const SET_GLOBAL_ERROR = 'App/SET_GLOBAL_ERROR';


let initialState = {
    InitializationComplete: false,
    globalErrorText:null
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZATION_COMPLETE:
            return {
                ...state,
                InitializationComplete: true,
            };
        case SET_GLOBAL_ERROR:
            return {
                ...state,
                globalErrorText: action.errorText,
            };

        default:
            return state;

    }
};
export const initializationComplete = () => ({type: SET_INITIALIZATION_COMPLETE});
export const setGlobalError = (errorText) => ({type: SET_GLOBAL_ERROR,errorText});

export const initializeApp = () => (dispatch) => {
        let promise=dispatch(getAuth());
        Promise.all([promise]).then(()=>{dispatch(initializationComplete());})

}

export const globalError = (errorText) => (dispatch) => {
    dispatch(setGlobalError(errorText));
    setTimeout(() => {
        dispatch(setGlobalError(null));
    }, 5000);
}


export default AppReducer;
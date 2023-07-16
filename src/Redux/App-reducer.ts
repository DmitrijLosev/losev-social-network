import {getAuth} from "./Auth-reducer";
import {InferActionType, ThunkCommonType} from "./redux-store";


let initialState = {
    InitializationComplete: false,
    globalErrorText: null as GlobalErrorType | null
};

const AppReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'App/SET_INITIALIZATION_COMPLETE':
            return {
                ...state,
                InitializationComplete: true,
            };
        case 'App/SET_GLOBAL_ERROR':
            return {
                ...state,
                globalErrorText: action.errorText,
            };

        default:
            return state;

    }
};


const actions = {
    initializationComplete: () => ({type: 'App/SET_INITIALIZATION_COMPLETE'} as const),
    setGlobalError: (errorText: GlobalErrorType | null) =>
        ({type: 'App/SET_GLOBAL_ERROR', errorText} as const)
}


export const initializeApp = (): ThunkCommonType<ActionsType> => (dispatch) => {
    let promise = dispatch(getAuth());
    Promise.all([promise]).then(() => {
        dispatch(actions.initializationComplete());
    })
}

export const globalError = (errorText: GlobalErrorType | null): ThunkCommonType<ActionsType> =>
    (dispatch) => {
        dispatch(actions.setGlobalError(errorText));
        setTimeout(() => {
            dispatch(actions.setGlobalError(null));
        }, 5000);
    }


export default AppReducer;

export type InitialStateType = typeof initialState
export type ActionsType = InferActionType<typeof actions>
export type GlobalErrorType = {
    code: string
    message: string
    name: string
}
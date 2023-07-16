let initialState={
friends: [
        {id: 1, name: 'Maksim'},
        {id: 2, name: 'Igor'},
        {id: 3, name: 'Sasha'}],
}
type InitialStateType=typeof initialState
const navbarReducer = (state=initialState):InitialStateType => {



    return state;
}
export default navbarReducer;
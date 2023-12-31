import usersReducer, {actions, InitialStateType} from "./Users-reducer";

let state: InitialStateType;
beforeEach(()=>{state={
    users: [{id:0,name:"Dima 0",followed:false,status:'0',photos:{large:null,small:null}},
        {id:1,name:"Dima 1",followed:false,status:'1',photos:{large:null,small:null}},
        {id:2,name:"Dima 2",followed:true,status:'2',photos:{large:null,small:null}},
        {id:3,name:"Dima 3",followed:true,status:'3',photos:{large:null,small:null}}],
    pageSize: 30,

    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter:{term:"",
    friend:null}
}});

describe("usersReducer Test", () => {
    test('follow user success', () => {
        const newState = usersReducer(state, actions.follow(1))
        expect(newState.users[0].followed).toBeFalsy();
        expect(newState.users[1].followed).toBeTruthy();

    });

    test('unfollow user success', () => {
        const newState = usersReducer(state, actions.unfollow(3))
        expect(newState.users[0].followed).toBeFalsy();
        expect(newState.users[1].followed).toBeFalsy();
        expect(newState.users[2].followed).toBeTruthy();
        expect(newState.users[3].followed).toBeFalsy();
    });
});
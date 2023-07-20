import {actions, followUser, unfollowUser} from "./Users-reducer";
import {UsersAPI} from "../api/users-api"
import {CommonResponseType, ResultCodeEnum} from "../api/api";
import {beforeEach} from "@jest/globals";


jest.mock("./../api/users-api")
const dispatchMock = jest.fn();
const getStateMock=jest.fn();
const UsersAPIMock = UsersAPI as jest.Mocked<typeof UsersAPI>
beforeEach(()=>{
    dispatchMock.mockClear();
    getStateMock.mockClear();
    UsersAPIMock.deleteFollow.mockClear();
    UsersAPIMock.postFollow.mockClear();
})


const result: CommonResponseType<{}> = {
    data: "",
    resultCode: ResultCodeEnum.Success,
    messages: [""]
}
describe("usersReducer Test", () => {
test('follow user success', async () => {

    const thunk = followUser(1)
    UsersAPIMock.deleteFollow.mockReturnValue(Promise.resolve(result))
    await thunk(dispatchMock,getStateMock,{})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.unfollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 1))
});
test('unfollow user success', async () => {

    const thunk = unfollowUser(1)
    UsersAPIMock.postFollow.mockReturnValue(Promise.resolve(result))
    await thunk(dispatchMock,getStateMock,{})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.follow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 1))
});
});

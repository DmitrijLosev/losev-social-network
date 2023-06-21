import React from "react";
import {create} from "react-test-renderer";
import ProfileStatusWithClass from "./ProfileStatusWithClass";

describe("ProfileStatusWithClass Component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatusWithClass status='Dimasta'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Dimasta");
    });
    test("after creation span should be on display", () => {
        const component = create(<ProfileStatusWithClass status='Dimasta'/>);
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });
    test("after creation input should not be on display", () => {
        const component = create(<ProfileStatusWithClass status='Dimasta'/>);
        const root = component.root;
        expect(()=>{let input = root.findByType('input')}).toThrow();
    });
    test("after creation in span should be correct status", () => {
        const component = create(<ProfileStatusWithClass status='Dimasta'/>);
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let span = root.findByType('span');
        expect(span.children[0]).toBe('Dimasta');
    });
    test("input should be displayed in EditMode instead of span with correct status", () => {
        const component = create(<ProfileStatusWithClass status='Dimasta'/>);
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('Dimasta');
    });
    test("callback updateUserStatus should be called", () => {
        let MockCallBack=jest.fn();
        const component = create(<ProfileStatusWithClass status='Dimasta' updateUserStatus={MockCallBack}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(MockCallBack.mock.calls.length).toBe(1);
    });
});
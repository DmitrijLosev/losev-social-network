import React from "react";
import {create} from "react-test-renderer";
import Paginator from "/Paginator.js";

describe("Paginator Component Test", () => {
    test("pages count 11,but should be 10", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.length).toBe(10);
    });
});
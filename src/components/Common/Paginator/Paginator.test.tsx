import React from "react";
import {create} from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator Component Test", () => {
    test("pages count 11,but should be 10", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}
                                            onPageChanged={(pageNumber)=>{}}  currentPage={1} />);
        const root:any = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let span = root.findAllByType('span');
        expect(span.length).toBe(10);
    });
});
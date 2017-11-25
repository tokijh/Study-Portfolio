import React from "react";
import { Carousel } from "./Carousel";
import "jest-styled-components";
import ReactTestRenderer from "react-test-renderer";

it("Card render correctly", () => {
    const tree = ReactTestRenderer.create(
        <Carousel />
    );
    expect(tree.toJSON()).toMatchSnapshot();
});
import React from "react";
import { ErrorBoundaryContainer } from "./ErrorBoundary";
import { shallow } from "enzyme";

const params = {
  children: <div>Child</div>,
  error: "I am an error"
};

it("renders correctly", () => {
  const wrapper = shallow(<ErrorBoundaryContainer {...params} />);
  expect(wrapper).toMatchSnapshot();
});

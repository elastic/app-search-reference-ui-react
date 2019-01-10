import React from "react";
import Body from "./Body";
import { shallow } from "enzyme";

it("renders correctly with sidebar", () => {
  const wrapper = shallow(<Body hasSidebar={true}/>);
  expect(wrapper).toMatchSnapshot();
});

it("renders correctly without the sidebar", () => {
  const wrapper = shallow(<Body hasSidebar={false} />);
  expect(wrapper).toMatchSnapshot();
});

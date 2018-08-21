import React from "react";
import Result from "./Result";
import { shallow } from "enzyme";

const requiredProps = {
  fields: { field: "value" },
  title: "Title"
};

it("renders correctly when there is a URL", () => {
  const wrapper = shallow(
    <Result {...requiredProps} url="http://www.example.com" />
  );
  expect(wrapper).toMatchSnapshot();
});

it("renders correctly when there is not a URL", () => {
  const wrapper = shallow(<Result {...requiredProps} />);
  expect(wrapper).toMatchSnapshot();
});

import React from "react";
import Result from "./Result";
import { shallow } from "enzyme";

it("renders correctly when there is a URL", () => {
  const wrapper = shallow(
    <Result
      fields={{ field: "value" }}
      title="Title"
      url="http://www.example.com"
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it("renders correctly when there is not a URL", () => {
  const wrapper = shallow(<Result fields={{ field: "value" }} title="Title" />);
  expect(wrapper).toMatchSnapshot();
});

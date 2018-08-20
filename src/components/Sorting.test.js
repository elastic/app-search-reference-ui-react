import React from "react";
import Sorting from "./Sorting";
import { shallow } from "enzyme";

it("renders correctly when there is a value", () => {
  const wrapper = shallow(
    <Sorting
      onChange={() => {}}
      options={[
        { name: "Name ASC", value: "name|||asc" },
        { name: "Name DESC", value: "name|||desc" }
      ]}
      value={"name|||desc"}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it("renders correctly when there is not a value", () => {
  const wrapper = shallow(
    <Sorting
      onChange={() => {}}
      options={[
        { name: "Name ASC", value: "name|||asc" },
        { name: "Name DESC", value: "name|||desc" }
      ]}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

import React from "react";
import Facet from "./Facet";
import { shallow } from "enzyme";

it("renders correctly when a value is selected", () => {
  const wrapper = shallow(
    <Facet
      name="Facet"
      onRemove={() => {}}
      onSelect={() => {}}
      options={[{ value: "1", count: 1 }, { value: "2", count: 1 }]}
      value="value"
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it("renders correctly when a value is not selected", () => {
  const wrapper = shallow(
    <Facet
      name="Facet"
      onRemove={() => {}}
      onSelect={() => {}}
      options={[{ value: "1", count: 1 }, { value: "2", count: 1 }]}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

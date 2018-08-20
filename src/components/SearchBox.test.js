import React from "react";
import SearchBox from "./SearchBox";
import { shallow } from "enzyme";

it("renders correctly when `isFocused` is true", () => {
  const wrapper = shallow(
    <SearchBox
      onChange={() => {}}
      onSubmit={() => {}}
      value={"test"}
      isFocused={true}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it("renders correctly when `isFocused` is false", () => {
  const wrapper = shallow(
    <SearchBox onChange={() => {}} onSubmit={() => {}} value={"test"} />
  );
  expect(wrapper).toMatchSnapshot();
});

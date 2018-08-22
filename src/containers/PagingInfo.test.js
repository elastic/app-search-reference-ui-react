import React from "react";
import { PagingInfoContainer } from "./PagingInfo";
import { shallow } from "enzyme";

const params = {
  current: 1,
  results: [{}, {}],
  resultsPerPage: 20,
  searchTerm: "test",
  totalResults: 100
};

it("renders correctly", () => {
  const wrapper = shallow(<PagingInfoContainer {...params} />);
  expect(wrapper).toMatchSnapshot();
});

it("renders empty when it doesn't have enough data", () => {
  const wrapper = shallow(
    <PagingInfoContainer
      {...{
        ...params,
        searchTerm: "",
        results: []
      }}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

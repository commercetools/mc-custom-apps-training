import React from "react";
import { shallow } from "enzyme";
import ExternalServer from "./ExternalServer";

describe("ExternalServer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ExternalServer />);
    expect(wrapper).toMatchSnapshot();
  });
});

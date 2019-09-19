import React from "react";
import { expect } from "chai";

import DescriptionField from "../src/components/fields/DescriptionField";
import { createSandbox, createComponent } from "./test_utils";

import { Text, View } from "react-native";

describe("DescriptionField", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // For some reason, stateless components needs to be wrapped into a stateful
  // one to be rendered into the document.
  class DescriptionFieldWrapper extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <DescriptionField {...this.props} />;
    }
  }

  it("should return a div for a custom component", () => {
    const props = {
      description: <Text style={{fontStyle: "italic"}}>description</Text>,
    };
    const { node } = createComponent(DescriptionFieldWrapper, props);

    const descriptionNode = node.querySelector("view");

    expect(descriptionNode).to.not.eql(null);
    expect(descriptionNode.props.className).to.equal("field-description");
  });

  it("should return a p for a description text", () => {
    const props = {
      description: "description",
    };
    const { node } = createComponent(DescriptionFieldWrapper, props);

    const descriptionNode = node.querySelector("text");

    expect(descriptionNode).to.not.eql(null);
    expect(descriptionNode.props.className).to.equal("field-description");
  });

  it("should have the expected id", () => {
    const props = {
      description: "Field description",
      id: "sample_id",
    };
    const { node } = createComponent(DescriptionFieldWrapper, props);

    const descriptionNode = node.querySelector("text");

    expect(descriptionNode).to.not.eql(null);
    expect(descriptionNode.props.id).to.equal("sample_id");
  });
});

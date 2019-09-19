import { expect } from "chai";

import { createFormComponent, createSandbox, findDOMNode } from "./test_utils";

import { Button } from "react-native";

describe("NullField", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("No widget", () => {
    it("should render a null field", () => {
      const { node } = createFormComponent({
        schema: {
          type: "null",
        },
      });

      expect(node.querySelectorAllByClassName("field")).to.have.lengthOf(1);
    });

    it("should render a null field with a label", () => {
      const { node } = createFormComponent({
        schema: {
          type: "null",
          title: "foo",
        },
      });

      const field = findDOMNode(node.querySelectorAllByClassName("field")[0], false);
      const textComponent = field.querySelectorAll("text")[0];
      const textContent = textComponent.props.children[0];

      expect(node.querySelectorAllByClassName("field")).to.have.lengthOf(1);
      expect(field.querySelectorAll("label")).to.have.lengthOf(1);
      expect(textContent).eql("foo");
    });

    it("should assign a default value", () => {
      const { comp } = createFormComponent({
        schema: {
          type: "null",
          default: null,
        },
      });

      expect(comp.state.formData).eql(null);
    });

    it("should not overwrite existing data", () => {
      const { comp } = createFormComponent({
        schema: {
          type: "null",
        },
        formData: 3,
      });

      expect(comp.state.formData).eql(3);
    });
  });
});

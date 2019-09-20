import React from "react";
import { expect } from "chai";
import sinon from "sinon";

import {
  createFormComponent,
  createSandbox,
  findDOMNode,
  Simulate
} from "./test_utils";

import { View } from "react-native";

describe("BooleanField", () => {
  let sandbox;

  const CustomWidget = () => <View id="custom" />;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should render a boolean field", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
      },
    });

    expect(
      node.querySelectorAll("checkbox")
    ).to.have.lengthOf(1);
  });

  it("should render a boolean field with the expected id", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
      },
    });

    // expect(node.querySelector("checkbox").props.id).eql("root");
  });

  it("should render a boolean field with a label", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        title: "foo",
      },
    });
    const checkboxParentNode = findDOMNode(node.querySelector("checkbox").parent, false);
    expect(checkboxParentNode.querySelector("text").props.children).eql("foo");
  });

  describe("HTML5 required attribute", () => {
    it("should not render a required attribute for simple required fields", () => {
      const { node } = createFormComponent({
        schema: {
          type: "object",
          properties: {
            foo: {
              type: "boolean",
            },
          },
          required: ["foo"],
        },
      });

      expect(node.querySelector("checkbox").props.required).eql(undefined);
    });

    it("should add a required attribute if the schema uses const with a true value", () => {
      const { node } = createFormComponent({
        schema: {
          type: "object",
          properties: {
            foo: {
              type: "boolean",
              const: true,
            },
          },
        },
      });

      expect(node.querySelector("checkbox").props.required).eql(true);
    });

    it("should add a required attribute if the schema uses an enum with a single value of true", () => {
      const { node } = createFormComponent({
        schema: {
          type: "object",
          properties: {
            foo: {
              type: "boolean",
              enum: [true],
            },
          },
        },
      });

      expect(node.querySelector("checkbox").props.required).eql(true);
    });

    it("should add a required attribute if the schema uses an anyOf with a single value of true", () => {
      const { node } = createFormComponent({
        schema: {
          type: "object",
          properties: {
            foo: {
              type: "boolean",
              anyOf: [
                {
                  const: true,
                },
              ],
            },
          },
        },
      });

      expect(node.querySelector("checkbox").props.required).eql(true);
    });

    it("should add a required attribute if the schema uses a oneOf with a single value of true", () => {
      const { node } = createFormComponent({
        schema: {
          type: "object",
          properties: {
            foo: {
              type: "boolean",
              oneOf: [
                {
                  const: true,
                },
              ],
            },
          },
        },
      });

      expect(node.querySelector("checkbox").props.required).eql(true);
    });

    it("should add a required attribute if the schema uses an allOf with a value of true", () => {
      const { node } = createFormComponent({
        schema: {
          type: "object",
          properties: {
            foo: {
              type: "boolean",
              allOf: [
                {
                  const: true,
                },
              ],
            },
          },
        },
      });

      expect(node.querySelector("checkbox").props.required).eql(true);
    });
  });

  it("should render a single label", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        title: "foo",
      },
    });

    const checkboxParentNode = findDOMNode(node.querySelector("checkbox").parent, false);
    expect(checkboxParentNode.querySelectorAll("text")).to.have.lengthOf(1);
  });

  it("should render a description", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        description: "my description",
      },
    });

    const description = node.querySelectorByClassName("field-description");
    expect(description.props.children).eql("my description");
  });

  it("should assign a default value", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        default: true,
      },
    });

    expect(node.querySelector("checkbox").props.value).eql(true);
  });

  it("should default state value to undefined", () => {
    const { comp } = createFormComponent({ schema: { type: "boolean" } });

    expect(comp.state.formData).eql(undefined);
  });

  it("should handle a change event", () => {
    const { comp, node } = createFormComponent({
      schema: {
        type: "boolean",
        default: false,
      },
    });

    Simulate.changeValue(node.querySelector("checkbox"), true);

    expect(node.instance.state.formData).eql(true);
  });

  it("should fill field with data", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
      },
      formData: true,
    });

    expect(node.querySelector("checkbox").props.value).eql(true);
  });

  it("should render radio widgets with the expected id", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
      },
      uiSchema: { "ui:widget": "radio" },
    });

    expect(node.querySelector("radio-form").props.id).eql("root");
  });

  const getRadioButtonLabelsNodes = node => {
    const fieldRadioGroupNode = findDOMNode(node.querySelector("radio-form"), false);
    return fieldRadioGroupNode.querySelectorAll("radio-button-label");
  }

  const getRadioButtonLabels = node => {
    return [].map.call(
      getRadioButtonLabelsNodes(node),
      label => label.props.children
    );
  }

  it("should have default enum option labels for radio widgets", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
      },
      formData: true,
      uiSchema: { "ui:widget": "radio" },
    });

    expect(getRadioButtonLabels(node)).eql(["yes", "no"]);
  });

  it("should support enum option ordering for radio widgets", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        enum: [false, true],
      },
      formData: true,
      uiSchema: { "ui:widget": "radio" },
    });

    expect(getRadioButtonLabels(node)).eql(["no", "yes"]);
  });

  it("should support enumNames for radio widgets", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        enumNames: ["Yes", "No"],
      },
      formData: true,
      uiSchema: { "ui:widget": "radio" },
    });

    expect(getRadioButtonLabels(node)).eql(["Yes", "No"]);
  });

  it("should support oneOf titles for radio widgets", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        oneOf: [
          {
            const: true,
            title: "Yes",
          },
          {
            const: false,
            title: "No",
          },
        ],
      },
      formData: true,
      uiSchema: { "ui:widget": "radio" },
    });

    expect(getRadioButtonLabels(node)).eql(["Yes", "No"]);
  });

  it("should preserve oneOf option ordering for radio widgets", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        oneOf: [
          {
            const: false,
            title: "No",
          },
          {
            const: true,
            title: "Yes",
          },
        ],
      },
      formData: true,
      uiSchema: { "ui:widget": "radio" },
    });

    expect(getRadioButtonLabels(node)).eql(["No", "Yes"]);
  });

  it("should support inline radio widgets", () => {
    const { node } = createFormComponent({
      schema: { type: "boolean" },
      formData: true,
      uiSchema: {
        "ui:widget": "radio",
        "ui:options": {
          inline: true,
        },
      },
    });

    expect(
      getRadioButtonLabelsNodes(node).filter(label => label.props.labelHorizontal === true)
    ).to.have.lengthOf(2);
  });

  it("should handle a press event for radio widgets", () => {
    const onChange = sandbox.spy();
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        default: false,
      },
      uiSchema: {
        "ui:widget": "radio",
      },
      onChange,
    });

    const fieldRadioGroupNode = findDOMNode(node.querySelector("radio-form"), false);
    const trueRadioButtonInput = fieldRadioGroupNode.querySelectorAll("radio-button-input")[0];
    
    Simulate.press(trueRadioButtonInput, null);

    expect(trueRadioButtonInput.props.isSelected).to.be.true
    expect(onChange.called).to.be.true;
  });

  const getSelectLabelsNodes = node => {
    const fieldSelectNode = findDOMNode(node.querySelector("select"), false);
    return fieldSelectNode.props.children;
  }

  const getSelectLabels = node => {
    return [].map.call(
      getSelectLabelsNodes(node),
      item => item.props.label
    );
  }

  it("should support enumNames for select", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        enumNames: ["Yes", "No"],
      },
      formData: true,
      uiSchema: { "ui:widget": "select" },
    });

    expect(getSelectLabels(node)).eql(["", "Yes", "No"]);
  });

  // Select widget does not have focus event
  it("should handle a focus event with checkbox", () => {
    const onChange = sandbox.spy();
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        default: false,
      },
      uiSchema: {
        "ui:widget": "select",
      },
      onChange,
    });

    const selectNode = node.querySelector("select");
    expect(selectNode.props.selectedValue).to.be.false

    Simulate.changeValue(selectNode, true);

    expect(selectNode.props.selectedValue).to.be.true
    expect(onChange.called).to.be.true;
  });

  it("should render the widget with the expected id", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
      },
    });

    expect(node.querySelector("checkbox").props.id).eql("root");
  });

  it("should render customized checkbox", () => {
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
      },
      widgets: {
        CheckboxWidget: CustomWidget,
      },
    });

    expect(node.querySelectorById("custom")).to.exist;
  });

  it("should handle a focus event with checkbox", () => {
    const onChange = sandbox.spy();
    const { node } = createFormComponent({
      schema: {
        type: "boolean",
        default: false,
      },
      uiSchema: {
        "ui:widget": "checkbox",
      },
      onChange,
    });

    const checkboxNode = node.querySelector("checkbox");
    expect(checkboxNode.props.value).to.be.false

    Simulate.changeValue(checkboxNode, true);

    expect(checkboxNode.props.value).to.be.true
    expect(onChange.called).to.be.true;
  });

  describe("Label", () => {
    const Widget = props => <View id={`label-${props.label}`} />;

    const widgets = { Widget };

    it("should pass field name to widget if there is no title", () => {
      const schema = {
        type: "object",
        properties: {
          boolean: {
            type: "boolean",
          },
        },
      };
      const uiSchema = {
        boolean: {
          "ui:widget": "Widget",
        },
      };

      const { node } = createFormComponent({ schema, widgets, uiSchema });
      expect(node.querySelectorById("label-boolean")).to.not.be.null;
    });

    it("should pass schema title to widget", () => {
      const schema = {
        type: "boolean",
        title: "test",
      };
      const uiSchema = {
        "ui:widget": "Widget",
      };

      const { node } = createFormComponent({ schema, widgets, uiSchema });
      expect(node.querySelectorById("label-test")).to.not.be.null;
    });

    it("should pass empty schema title to widget", () => {
      const schema = {
        type: "boolean",
        title: "",
      };
      const uiSchema = {
        "ui:widget": "Widget",
      };
      const { node } = createFormComponent({ schema, widgets, uiSchema });
      expect(node.querySelectorById("label-")).to.not.be.null;
    });
  });

  describe("SelectWidget", () => {
    it("should render a field that contains an enum of booleans", () => {
      const { node } = createFormComponent({
        schema: {
          enum: [true, false],
        },
      });

      expect(node.querySelectorAll("select")).to.have.lengthOf(1);
    });

    it("should infer the value from an enum on change", () => {
      const spy = sinon.spy();
      const { node } = createFormComponent({
        schema: {
          enum: [true, false],
        },
        onChange: spy,
      });

      expect(node.querySelectorAll("select")).to.have.lengthOf(1);
      const $select = node.querySelector("select");
      expect($select.instance.props.selectedValue).eql("");

      Simulate.changeValue($select, true);
      expect($select.instance.props.selectedValue).eql(true);
      expect(spy.lastCall.args[0].formData).eql(true);
    });

    it("should render a string field with a label", () => {
      const { node } = createFormComponent({
        schema: {
          enum: [true, false],
          title: "foo",
        },
      });

      const fieldNode = findDOMNode(node.querySelectorByClassName("field"), false);
      expect(fieldNode.querySelector("text").props.children[0]).eql("foo");
    });

    it("should assign a default value", () => {
      const { comp } = createFormComponent({
        schema: {
          enum: [true, false],
          default: true,
        },
      });

      expect(comp.state.formData).eql(true);
    });

    it("should handle a change event", () => {
      const { comp, node } = createFormComponent({
        schema: {
          enum: [true, false],
        },
      });

      Simulate.changeValue(node.querySelector("select"), {
        target: { value: "false" },
      });

      expect(node.instance.state.formData).eql(false);
    });

    it("should render the widget with the expected id", () => {
      const { node } = createFormComponent({
        schema: {
          enum: [true, false],
        },
      });

      expect(node.querySelector("select").props.id).eql("root");
    });
  });
});

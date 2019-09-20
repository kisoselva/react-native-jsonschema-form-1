import React from "react";
import { expect } from "chai";
import sinon from "sinon";

import {
  createFormComponent,
  createSandbox,
  setProps,
  findDOMNode,
  Simulate
} from "./test_utils";

describe("NumberField", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  const getFieldComponentFromNode = (node, componentTag) => {
    const fieldNode = findDOMNode(node.querySelectorByClassName("field"), false);
    return fieldNode.querySelector(componentTag);
  }

  const getFieldAllComponentsFromNode = (node, componentTag) => {
    const fieldNode = findDOMNode(node.querySelectorByClassName("field"), false);
    return fieldNode.querySelectorAll(componentTag);
  }

  const getFieldInputValueFromNode = node => getFieldComponentFromNode(node, "input").props.value;

  const getFieldLabelFromNode = node => getFieldComponentFromNode(node, "label");

  const getFieldSelectFromNode = node => getFieldComponentFromNode(node, "select");

  const getFieldSelectValueFromNode = node => getFieldSelectFromNode().props.value;

  const getFieldAllSelectsFromNode = node => getFieldAllComponentsFromNode(node, "select");

  describe("Number widget", () => {
    it("should use step to represent the multipleOf keyword", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          multipleOf: 5,
        },
      });

      expect(node.querySelector("input").props.step).to.eql(5);
    });

    it("should use min to represent the minimum keyword", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          minimum: 0,
        },
      });

      expect(node.querySelector("input").props.min).to.eql(0);
    });

    it("should use max to represent the maximum keyword", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          maximum: 100,
        },
      });

      expect(node.querySelector("input").props.max).to.eql(100);
    });

    it("should use step to represent the multipleOf keyword", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          multipleOf: 5,
        },
      });

      expect(node.querySelector("input").props.step).to.eql(5);
    });

    it("should use min to represent the minimum keyword", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          minimum: 0,
        },
      });

      expect(node.querySelector("input").props.min).to.eql(0);
    });

    it("should use max to represent the maximum keyword", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          maximum: 100,
        },
      });

      expect(node.querySelector("input").props.max).to.eql(100);
    });
  });
  describe("Number and text widget", () => {
    let uiSchemas = [
      {},
      {
        "ui:options": {
          inputType: "text",
        },
      },
    ];
    for (let uiSchema of uiSchemas) {
      it("should render a string field with a label", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
            title: "foo",
          },
          uiSchema,
        });

        const fieldNode = findDOMNode(node.querySelectorByClassName("field"), false);
        expect(fieldNode.querySelector("text").props.children[0]).eql("foo");
      });

      it("should render a string field with a description", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
            description: "bar",
          },
          uiSchema,
        });

        expect(node.querySelectorByClassName("field-description").props.children).eql("bar");
      });

      it("should default state value to undefined", () => {
        const { comp } = createFormComponent({
          schema: { type: "number" },
          uiSchema,
        });

        expect(comp.state.formData).eql(undefined);
      });

      it("should assign a default value", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
            default: 2,
          },
          uiSchema,
        });

        expect(getFieldInputValueFromNode(node)).eql(2);
      });

      it("should handle a change event", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
        });

        Simulate.change(node.querySelector("input"), {
          target: { value: "2" },
        });

        expect(node.instance.state.formData).eql(2);
      });

      it("should handle a blur event", () => {
        const onBlur = sandbox.spy();
        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
          onBlur,
        });

        const input = node.querySelector("input");
        Simulate.blur(input, {
          target: { value: "2" },
        });

        expect(onBlur.calledWith(input.props.id, 2));
      });

      it("should handle a focus event", () => {
        const onFocus = sandbox.spy();
        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
          onFocus,
        });

        const input = node.querySelector("input");
        Simulate.focus(input, {
          target: { value: "2" },
        });

        expect(onFocus.calledWith(input.id, 2));
      });

      it("should fill field with data", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
          formData: 2,
        });

        expect(getFieldInputValueFromNode(node)).eql(2);
      });

      describe("when inputting a number that ends with a dot and/or zero it should normalize it, without changing the input value", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
        });

        const $input = node.querySelector("input");

        const tests = [
          {
            input: "2.",
            output: 2,
          },
          {
            input: "2.0",
            output: 2,
          },
          {
            input: "2.3",
            output: 2.3,
          },
          {
            input: "2.30",
            output: 2.3,
          },
          {
            input: "2.300",
            output: 2.3,
          },
          {
            input: "2.3001",
            output: 2.3001,
          },
          {
            input: "2.03",
            output: 2.03,
          },
          {
            input: "2.003",
            output: 2.003,
          },
          {
            input: "2.00300",
            output: 2.003,
          },
          {
            input: "200300",
            output: 200300,
          },
        ];

        tests.forEach(test => {
          it(`should work with an input value of ${test.input}`, () => {
            Simulate.change($input, {
              target: { value: test.input },
            });

            expect(node.instance.state.formData).eql(test.output);
            expect($input.props.value).eql(test.input);
          });
        });
      });

      it("should normalize values beginning with a decimal point", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
        });

        const $input = node.querySelector("input");

        Simulate.change($input, {
          target: { value: ".00" },
        });

        expect(node.instance.state.formData).eql(0);
        expect($input.props.value).eql(".00");
      });

      it("should update input values correctly when formData prop changes", () => {
        const schema = {
          type: "number",
        };

        const { comp, node } = createFormComponent({
          schema,
          uiSchema,
          formData: 2.03,
        });

        expect(node.querySelector("input").props.value).eql(2.03);

        const newComp = setProps(comp, {
          schema,
          formData: 203,
        });
        expect(newComp.node.querySelector("input").props.value).eql(203);
      });

      it("should render the widget with the expected id", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
        });

        expect(node.querySelector("input").props.id).eql("root");
      });

      it("should render with trailing zeroes", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
        });

        Simulate.change(node.querySelector("input"), {
          target: { value: "2." },
        });
        expect(getFieldInputValueFromNode(node)).eql("2.");

        Simulate.change(node.querySelector("input"), {
          target: { value: "2.0" },
        });
        expect(getFieldInputValueFromNode(node)).eql("2.0");

        Simulate.change(node.querySelector("input"), {
          target: { value: "2.00" },
        });
        expect(getFieldInputValueFromNode(node)).eql("2.00");

        Simulate.change(node.querySelector("input"), {
          target: { value: "2.000" },
        });
        expect(getFieldInputValueFromNode(node)).eql("2.000");
      });

      it("should allow a zero to be input", () => {
        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
        });

        Simulate.change(node.querySelector("input"), {
          target: { value: "0" },
        });
        expect(getFieldInputValueFromNode(node)).eql("0");
      });

      it("should render customized StringField", () => {
        const CustomStringField = () => <div id="custom" />;

        const { node } = createFormComponent({
          schema: {
            type: "number",
          },
          uiSchema,
          fields: {
            StringField: CustomStringField,
          },
        });

        expect(node.querySelectorById("custom")).to.exist;
      });
    }
  });

  describe("SelectWidget", () => {
    it("should render a number field", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          enum: [1, 2],
        },
      });

      expect(getFieldAllSelectsFromNode(node)).to.have.lengthOf(1);
    });

    it("should infer the value from an enum on change", () => {
      const spy = sinon.spy();
      const { node } = createFormComponent({
        schema: {
          enum: [1, 2],
        },
        onChange: spy,
      });

      expect(getFieldAllSelectsFromNode(node)).to.have.lengthOf(1);
      const selectNode = getFieldSelectFromNode(node);
      expect(selectNode.props.selectedValue).eql("");

      Simulate.valueChange(selectNode, {
        target: { value: "1" },
      });
      expect(selectNode.props.selectedValue).eql(1);
      expect(spy.lastCall.args[0].formData).eql(1);
    });

    it("should render a string field with a label", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          enum: [1, 2],
          title: "foo",
        },
      });

      expect(getFieldLabelFromNode(node).props.label).eql("foo");
    });

    it("should assign a default value", () => {
      const { comp } = createFormComponent({
        schema: {
          type: "number",
          enum: [1, 2],
          default: 1,
        },
      });

      expect(comp.state.formData).eql(1);
    });

    it("should handle a change event", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          enum: [1, 2],
        },
      });

      Simulate.valueChange(getFieldSelectFromNode(node), {
        target: { value: "2" },
      });

      expect(node.instance.state.formData).eql(2);
    });

    it("should fill field with data", () => {
      const { comp } = createFormComponent({
        schema: {
          type: "number",
          enum: [1, 2],
        },
        formData: 2,
      });

      expect(comp.state.formData).eql(2);
    });

    it("should render the widget with the expected id", () => {
      const { node } = createFormComponent({
        schema: {
          type: "number",
          enum: [1, 2],
        },
      });

      expect(getFieldSelectFromNode(node).props.id).eql("root");
    });

    it("should render a select element with a blank option, when default value is not set.", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "number",
            enum: [0],
          },
        },
      };

      const { node } = createFormComponent({
        schema,
      });

      const selects = getFieldAllSelectsFromNode(node);
      expect(selects[0].props.selectedValue).eql("");

      const options = selects[0].children[0].props.children;
      expect(options.length).eql(2);
      expect(options[0].props.label).eql("");
    });

    it("should render a select element without a blank option, if a default value is set.", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "number",
            enum: [2],
            default: 2,
          },
        },
      };

      const { node } = createFormComponent({
        schema,
      });

      const selects = getFieldAllSelectsFromNode(node);
      expect(selects[0].props.selectedValue).eql(2);

      const options = selects[0].children[0].props.children;
      expect(options.length).eql(2);
      expect(options[1].props.label).eql("2");
    });

    it("should render a select element without a blank option, if the default value is 0.", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "number",
            enum: [0],
            default: 0,
          },
        },
      };

      const { node } = createFormComponent({
        schema,
      });

      const selects = getFieldAllSelectsFromNode(node);
      expect(selects[0].props.selectedValue).eql(0);

      const options = selects[0].children[0].props.children;
      expect(options.length).eql(2);
      expect(options[1].props.label).eql("0");
    });
  });
});

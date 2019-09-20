import React from "react";
import { expect } from "chai";

import SchemaField from "../src/components/fields/SchemaField";
import TitleField from "../src/components/fields/TitleField";
import DescriptionField from "../src/components/fields/DescriptionField";

import {
  createFormComponent,
  createSandbox,
  findDOMNode,
  getChildrenJoinedString,
  Simulate
} from "./test_utils";
import { getDefaultRegistry } from "../src/utils";

import { View } from "react-native";

describe("SchemaField", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Unsupported field", () => {
    it("should warn on invalid field type", () => {
      const { node } = createFormComponent({
        schema: { type: "invalid" },
      });
      const unsupportedFieldNode = node.querySelectorByClassName("unsupported-field");
      const textNode = unsupportedFieldNode.querySelectorAll("text")[0];
      const textContent = getChildrenJoinedString(textNode.props.children);

      expect(textContent).to.contain(
        "Unknown field type invalid"
      );
    });
  });

  describe("Custom SchemaField component", () => {
    const CustomSchemaField = function(props) {
      return (
        <View id="custom">
          <SchemaField {...props} />
        </View>
      );
    };

    it("should use the specified custom SchemaType property", () => {
      const fields = { SchemaField: CustomSchemaField };
      const { node } = createFormComponent({
        schema: { type: "string" },
        fields,
      });
      const customNode = findDOMNode(node.findByProps({id: "custom"}), false);

      expect(
        customNode.findAllByPropsExcludeFunctions({type: "text"})
      ).to.have.lengthOf(1);
    });
  });

  describe("ui:field support", () => {
    class MyObject extends React.Component {
      constructor(props) {
        super(props);
      }

      render() {
        return <View id="custom" />;
      }
    }

    const schema = {
      type: "object",
      properties: {
        foo: { type: "string" },
        bar: { type: "string" },
      },
    };

    it("should use provided direct custom component for object", () => {
      const uiSchema = { "ui:field": MyObject };

      const { node } = createFormComponent({ schema, uiSchema });

      expect(node.querySelectorAllById("custom")).to.have.lengthOf(1);

      expect(node.querySelectorAll("label")).to.have.lengthOf(0);
    });

    it("should use provided direct custom component for specific property", () => {
      const uiSchema = {
        foo: { "ui:field": MyObject },
      };

      const { node } = createFormComponent({ schema, uiSchema });

      expect(node.querySelectorAllById("custom")).to.have.lengthOf(1);

      expect(node.findAllByType(MyObject)).to.have.lengthOf(1);

      expect(node.querySelectorAll("label")).to.have.lengthOf(1);
    });

    it("should provide custom field the expected fields", () => {
      let receivedProps;
      createFormComponent({
        schema,
        uiSchema: {
          "ui:field": class extends React.Component {
            constructor(props) {
              super(props);
              receivedProps = props;
            }
            render() {
              return null;
            }
          },
        },
      });

      const { registry } = receivedProps;
      expect(registry.widgets).eql(getDefaultRegistry().widgets);
      expect(registry.definitions).eql({});
      expect(registry.fields).to.be.an("object");
      expect(registry.fields.SchemaField).eql(SchemaField);
      expect(registry.fields.TitleField).eql(TitleField);
      expect(registry.fields.DescriptionField).eql(DescriptionField);
    });

    it("should use registered custom component for object", () => {
      const uiSchema = { "ui:field": "myobject" };
      const fields = { myobject: MyObject };

      const { node } = createFormComponent({ schema, uiSchema, fields });

      expect(node.querySelectorAllById("custom")).to.have.lengthOf(1);
    });

    it("should handle referenced schema definitions", () => {
      const schema = {
        definitions: {
          foobar: {
            type: "object",
            properties: {
              foo: { type: "string" },
              bar: { type: "string" },
            },
          },
        },
        $ref: "#/definitions/foobar",
      };
      const uiSchema = { "ui:field": "myobject" };
      const fields = { myobject: MyObject };

      const { node } = createFormComponent({ schema, uiSchema, fields });

      expect(node.querySelectorAllById("custom")).to.have.lengthOf(1);
    });

    it("should not pass classNames to child component", () => {
      const CustomSchemaField = function(props) {
        return (
          <SchemaField
            {...props}
            uiSchema={{ ...props.uiSchema, "ui:field": undefined }}
          />
        );
      };

      const schema = {
        type: "string",
      };
      const uiSchema = {
        "ui:field": "customSchemaField",
        classNames: "foo",
      };
      const fields = { customSchemaField: CustomSchemaField };

      const { node } = createFormComponent({ schema, uiSchema, fields });

      expect(node.querySelectorAllByClassName("foo")).to.have.lengthOf(1);
    });
  });

  describe("label support", () => {
    const schema = {
      type: "object",
      properties: {
        foo: { type: "string" },
      },
    };

    it("should render label by default", () => {
      const { node } = createFormComponent({ schema });
      expect(node.querySelectorAll("label")).to.have.lengthOf(1);
    });

    it("should render label if ui:options label is set to true", () => {
      const uiSchema = {
        foo: { "ui:options": { label: true } },
      };

      const { node } = createFormComponent({ schema, uiSchema });
      expect(node.querySelectorAll("label")).to.have.lengthOf(1);
    });

    it("should not render label if ui:options label is set to false", () => {
      const uiSchema = {
        foo: { "ui:options": { label: false } },
      };

      const { node } = createFormComponent({ schema, uiSchema });
      expect(node.querySelectorAll("label")).to.have.lengthOf(0);
    });
  });

  describe("description support", () => {
    const schema = {
      type: "object",
      properties: {
        foo: { type: "string", description: "A Foo field" },
        bar: { type: "string" },
      },
    };

    it("should render description if available from the schema", () => {
      const { node } = createFormComponent({ schema });

      expect(node.querySelectorAllById("root_foo__description")).to.have.lengthOf(
        1
      );
    });

    it("should render description if available from a referenced schema", () => {
      // Overriding.
      const schemaWithReference = {
        type: "object",
        properties: {
          foo: { $ref: "#/definitions/foo" },
          bar: { type: "string" },
        },
        definitions: {
          foo: {
            type: "string",
            description: "A Foo field",
          },
        },
      };
      const { node } = createFormComponent({
        schema: schemaWithReference,
      });

      const matches = node.querySelectorAllById("root_foo__description");
      const textContent = getChildrenJoinedString(matches[0].props.children);
      expect(matches).to.have.lengthOf(1);
      expect(textContent).to.equal("A Foo field");
    });

    it("should not render description if not available from schema", () => {
      const { node } = createFormComponent({ schema });

      expect(node.querySelectorAllById("root_bar__description")).to.have.lengthOf(
        0
      );
    });

    it("should render a customized description field", () => {
      const CustomDescriptionField = ({ description }) => (
        <View id="custom">{description}</View>
      );

      const { node } = createFormComponent({
        schema,
        fields: {
          DescriptionField: CustomDescriptionField,
        },
      });

      const customNode = node.querySelectorById("custom")
      const textContent = getChildrenJoinedString(customNode.props.children);
      expect(textContent).to.eql("A Foo field");
    });
  });

  describe("errors", () => {
    const schema = {
      type: "object",
      properties: {
        foo: { type: "string" },
      },
    };

    const uiSchema = {
      "ui:field": props => {
        const { uiSchema, ...fieldProps } = props; //eslint-disable-line
        return <SchemaField {...fieldProps} />;
      },
    };

    function validate(formData, errors) {
      errors.addError("container");
      errors.foo.addError("test");
      return errors;
    }

    it("should render its own errors", () => {
      const { node } = createFormComponent({
        schema,
        uiSchema,
        validate,
      });
      Simulate.submit(node);

      const expected = { className: "text-danger", children: "container" }
      const matches = node.querySelectorAllByClassName("text-danger");
      expect(matches.map(match => match.parent.props)).to.deep.include(expected);
    });

    it("should pass errors to child component", () => {
      const { node } = createFormComponent({
        schema,
        uiSchema,
        validate,
      });
      Simulate.submit(node);

      const expected = { className: "text-danger", children: "test" }
      const matches = node.querySelectorAllByClassName("text-danger");
      expect(matches.map(match => match.parent.props)).to.deep.include(expected);
    });

    describe("Custom error rendering", () => {
      const customStringWidget = props => {
        return <View className="custom-text-widget">{props.rawErrors}</View>;
      };

      it("should pass rawErrors down to custom widgets", () => {
        const { node } = createFormComponent({
          schema,
          uiSchema,
          validate,
          widgets: { BaseInput: customStringWidget },
        });
        Simulate.submit(node);

        const expected = { className: "custom-text-widget", children: ["test"] }
        const matches = node.querySelectorAllByClassName("custom-text-widget");
        expect(matches.map(match => match.parent.props)).to.deep.include(expected);
      });
    });
  });
});

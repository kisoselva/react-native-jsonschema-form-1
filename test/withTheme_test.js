import { expect } from "chai";
import React from "react";

import { withTheme } from "../src";
import { createComponent, createSandbox, findDOMNode } from "./test_utils";

import { View } from "react-native";

describe("withTheme", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("With fields", () => {
    it("should use the withTheme field", () => {
      const fields = {
        StringField() {
          return <View className="string-field" />;
        },
      };
      const schema = {
        type: "object",
        properties: {
          fieldA: {
            type: "string",
          },
          fieldB: {
            type: "string",
          },
        },
      };
      const uiSchema = {};
      let { node } = createComponent(withTheme({ fields }), {
        schema,
        uiSchema,
      });
      expect(node.querySelectorAllByClassName("string-field")).to.have.lengthOf(2);
    });

    it("should use withTheme field and the user defined field", () => {
      const themeFields = {
        StringField() {
          return <View className="string-field" />;
        },
      };
      const userFields = {
        NumberField() {
          return <View className="number-field" />;
        },
      };
      const schema = {
        type: "object",
        properties: {
          fieldA: {
            type: "string",
          },
          fieldB: {
            type: "number",
          },
        },
      };
      const uiSchema = {};
      let { node } = createComponent(withTheme({ fields: themeFields }), {
        schema,
        uiSchema,
        fields: userFields,
      });
      expect(node.querySelectorAllByClassName("string-field")).to.have.lengthOf(1);
      expect(node.querySelectorAllByClassName("number-field")).to.have.lengthOf(1);
    });

    it("should use only the user defined field", () => {
      const themeFields = {
        StringField() {
          return <View className="string-field" />;
        },
      };
      const userFields = {
        StringField() {
          return <View className="form-control" />;
        },
      };
      const schema = {
        type: "object",
        properties: {
          fieldA: {
            type: "string",
          },
          fieldB: {
            type: "string",
          },
        },
      };
      const uiSchema = {};
      let { node } = createComponent(withTheme({ fields: themeFields }), {
        schema,
        uiSchema,
        fields: userFields,
      });
      expect(node.querySelectorAllByClassName("string-field")).to.have.lengthOf(0);
      expect(node.querySelectorAllByClassName("form-control")).to.have.lengthOf(2);
    });
  });

  describe("With widgets", () => {
    it("should use the withTheme widget", () => {
      const widgets = {
        TextWidget: () => <View id="test" />,
      };
      const schema = {
        type: "string",
      };
      const uiSchema = {};
      let { comp, node } = createComponent(withTheme({ widgets }), {
        schema,
        uiSchema,
      });

      expect(node.querySelectorAllById("test")).to.have.lengthOf(1);
    });

    it("should use the withTheme widget as well as user defined widget", () => {
      const themeWidgets = {
        TextWidget: () => <View id="test-theme-widget" />,
      };
      const userWidgets = {
        DateWidget: () => <View id="test-user-widget" />,
      };
      const schema = {
        type: "object",
        properties: {
          fieldA: {
            type: "string",
          },
          fieldB: {
            format: "date",
            type: "string",
          },
        },
      };
      const uiSchema = {};
      let { node } = createComponent(withTheme({ widgets: themeWidgets }), {
        schema,
        uiSchema,
        widgets: userWidgets,
      });
      expect(node.querySelectorAllById("test-theme-widget")).to.have.lengthOf(1);
      expect(node.querySelectorAllById("test-user-widget")).to.have.lengthOf(1);
    });

    it("should use only the user defined widget", () => {
      const themeWidgets = {
        TextWidget: () => <View id="test-theme-widget" />,
      };
      const userWidgets = {
        TextWidget: () => <View id="test-user-widget" />,
      };
      const schema = {
        type: "object",
        properties: {
          fieldA: {
            type: "string",
          },
        },
      };
      const uiSchema = {};
      let { node } = createComponent(withTheme({ widgets: themeWidgets }), {
        schema,
        uiSchema,
        widgets: userWidgets,
      });
      expect(node.querySelectorAllById("test-theme-widget")).to.have.lengthOf(0);
      expect(node.querySelectorAllById("test-user-widget")).to.have.lengthOf(1);
    });
  });

  describe("With templates", () => {
    it("should use the withTheme template", () => {
      const themeTemplates = {
        FieldTemplate() {
          return <View className="with-theme-field-template" />;
        },
      };
      const schema = {
        type: "object",
        properties: {
          fieldA: {
            type: "string",
          },
          fieldB: {
            type: "string",
          },
        },
      };
      const uiSchema = {};
      let { node } = createComponent(withTheme({ ...themeTemplates }), {
        schema,
        uiSchema,
      });
      expect(
        node.querySelectorAllByClassName("with-theme-field-template")
      ).to.have.lengthOf(1);
    });

    it("should use only the user defined template", () => {
      const themeTemplates = {
        FieldTemplate() {
          return <View className="with-theme-field-template" />;
        },
      };
      const userTemplates = {
        FieldTemplate() {
          return <View className="user-field-template" />;
        },
      };

      const schema = {
        type: "object",
        properties: { foo: { type: "string" }, bar: { type: "string" } },
      };
      let { node } = createComponent(withTheme({ ...themeTemplates }), {
        schema,
        ...userTemplates,
      });
      expect(
        node.querySelectorAllByClassName("with-theme-field-template")
      ).to.have.lengthOf(0);
      expect(node.querySelectorAllByClassName("user-field-template")).to.have.lengthOf(
        1
      );
    });
  });
});

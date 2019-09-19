import React, { PureComponent } from "react";

import { expect } from "chai";
import { createFormComponent, createSandbox } from "./test_utils";

import { View } from "react-native";

describe("ObjectFieldTemplate", () => {
  let sandbox;

  const formData = { foo: "bar", bar: "foo" };

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  class ObjectFieldTemplate extends PureComponent {
    render() {
      const {
        TitleField,
        DescriptionField,
        properties,
        title,
        description,
      } = this.props;
      return (
        <View className="root">
          <TitleField title={title} />
          <DescriptionField description={description} />
          <View>
            {properties.map(({ content }, index) => (
              <View key={index} className="property">
                {content}
              </View>
            ))}
          </View>
        </View>
      );
    }
  }

  const TitleField = () => <View className="title-field" />;
  const DescriptionField = ({ description }) =>
    description ? <View className="description-field" /> : null;

  let node;
  describe("with template globally configured", () => {
    node = createFormComponent({
      schema: {
        type: "object",
        properties: { foo: { type: "string" }, bar: { type: "string" } },
      },
      uiSchema: { "ui:description": "foobar" },
      formData,
      ObjectFieldTemplate,
      fields: {
        TitleField,
        DescriptionField,
      },
    }).node;
    sharedIts();
  });
  describe("with template configured in ui:ObjectFieldTemplate", () => {
    node = createFormComponent({
      schema: {
        type: "object",
        properties: { foo: { type: "string" }, bar: { type: "string" } },
      },
      uiSchema: {
        "ui:description": "foobar",
        "ui:ObjectFieldTemplate": ObjectFieldTemplate,
      },
      formData,
      fields: {
        TitleField,
        DescriptionField,
      },
    }).node;
    sharedIts();
  });
  describe("with template configured globally overridden by ui:ObjectFieldTemplate", () => {
    node = createFormComponent({
      schema: {
        type: "object",
        properties: { foo: { type: "string" }, bar: { type: "string" } },
      },
      uiSchema: {
        "ui:description": "foobar",
        "ui:ObjectFieldTemplate": ObjectFieldTemplate,
      },
      formData,
      ObjectFieldTemplate: () => <View />, // Empty object field template, proof that it's overridden
      fields: {
        TitleField,
        DescriptionField,
      },
    }).node;
    sharedIts();
  });

  function sharedIts() {
    it("should render one root element", () => {
      expect(node.querySelectorAllByClassName("root")).to.have.lengthOf(1);
    });

    it("should render one title", () => {
      expect(node.querySelectorAllByClassName("title-field")).to.have.lengthOf(1);
    });

    it("should render one description", () => {
      expect(node.querySelectorAllByClassName("description-field")).to.have.lengthOf(1);
    });

    it("should render two property containers", () => {
      expect(node.querySelectorAllByClassName("property")).to.have.lengthOf(2);
    });
  }
});

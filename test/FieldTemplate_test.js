import React from "react";

import { expect } from "chai";
import { createFormComponent, createSandbox } from "./test_utils";

import { View } from "react-native";

describe("FieldTemplate", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Custom FieldTemplate for disabled property", () => {
    function FieldTemplate(props) {
      return <View className={props.disabled ? "disabled" : "foo"} />;
    }

    describe("with template globally configured", () => {
      it("should render with disabled when ui:disabled is truthy", () => {
        const { node } = createFormComponent({
          schema: { type: "string" },
          uiSchema: { "ui:disabled": true },
          FieldTemplate,
        });
        expect(node.querySelectorAllByClassName("disabled")).to.have.lengthOf(1);
      });

      it("should render with disabled when ui:disabled is falsey", () => {
        const { node } = createFormComponent({
          schema: { type: "string" },
          uiSchema: { "ui:disabled": false },
          FieldTemplate,
        });
        expect(node.querySelectorAllByClassName("disabled")).to.have.lengthOf(0);
      });
    });
    describe("with template configured in ui:FieldTemplate", () => {
      it("should render with disabled when ui:disabled is truthy", () => {
        const { node } = createFormComponent({
          schema: { type: "string" },
          uiSchema: { "ui:disabled": true, "ui:FieldTemplate": FieldTemplate },
        });
        expect(node.querySelectorAllByClassName("disabled")).to.have.lengthOf(1);
      });

      it("should render with disabled when ui:disabled is falsey", () => {
        const { node } = createFormComponent({
          schema: { type: "string" },
          uiSchema: { "ui:disabled": false, "ui:FieldTemplate": FieldTemplate },
        });
        expect(node.querySelectorAllByClassName("disabled")).to.have.lengthOf(0);
      });
    });
    describe("with template configured globally being overriden in ui:FieldTemplate", () => {
      it("should render with disabled when ui:disabled is truthy", () => {
        const { node } = createFormComponent({
          schema: { type: "string" },
          uiSchema: { "ui:disabled": true, "ui:FieldTemplate": FieldTemplate },
          // Empty field template to prove that overides work
          FieldTemplate: () => <View />,
        });
        expect(node.querySelectorAllByClassName("disabled")).to.have.lengthOf(1);
      });

      it("should render with disabled when ui:disabled is falsey", () => {
        const { node } = createFormComponent({
          schema: { type: "string" },
          uiSchema: { "ui:disabled": false, "ui:FieldTemplate": FieldTemplate },
          // Empty field template to prove that overides work
          FieldTemplate: () => <View />,
        });
        expect(node.querySelectorAllByClassName("disabled")).to.have.lengthOf(0);
      });
    });
  });
});

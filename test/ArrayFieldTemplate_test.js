import React, { PureComponent } from "react";
import { expect } from "chai";
import { createFormComponent, createSandbox, findDOMNode } from "./test_utils";

import { Button, View } from "react-native";

describe("ArrayFieldTemplate", () => {
  let sandbox;

  const formData = ["one", "two", "three"];

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Custom ArrayFieldTemplate of string array", () => {
    function ArrayFieldTemplate(props) {
      return (
        <View className={props.uiSchema.classNames}>
          {props.canAdd && <Button title="custom-array-add" />}
          {props.items.map(element => {
            return (
              <View className="custom-array-item" key={element.index}>
                {element.hasMoveUp && (
                  <Button title="custom-array-item-move-up" />
                )}
                {element.hasMoveDown && (
                  <Button title="custom-array-item-move-down" />
                )}

                {element.children}
              </View>
            );
          })}
        </View>
      );
    }

    describe("Stateful ArrayFieldTemplate", () => {
      class ArrayFieldTemplate extends PureComponent {
        render() {
          return (
            <View className="field-content">
              {this.props.items.map((item, i) => (
                <View key={i}>item.children</View>
              ))}
            </View>
          );
        }
      }

      describe("with template globally configured", () => {
        it("should render a stateful custom component", () => {
          const { node } = createFormComponent({
            schema: { type: "array", items: { type: "string" } },
            formData,
            ArrayFieldTemplate,
          });

          expect(
            findDOMNode(node.querySelectorByClassName("field-content"), false).querySelectorAll("view")
          ).to.have.lengthOf(3);
        });
      });
      describe("with template configured in ui:ArrayFieldTemplate", () => {
        it("should render a stateful custom component", () => {
          const { node } = createFormComponent({
            schema: { type: "array", items: { type: "string" } },
            formData,
            uiSchema: {
              "ui:ArrayFieldTemplate": ArrayFieldTemplate,
            },
          });

          expect(
            findDOMNode(node.querySelectorByClassName("field-content"), false).querySelectorAll("view")
          ).to.have.lengthOf(3);
        });
      });
      describe("with template configured globally being overriden in ui:ArrayFieldTemplate", () => {
        it("should render a stateful custom component", () => {
          const { node } = createFormComponent({
            schema: { type: "array", items: { type: "string" } },
            formData,
            uiSchema: {
              "ui:ArrayFieldTemplate": ArrayFieldTemplate,
            },
            // Empty field template for proof that we're doing overrides
            ArrayFieldTemplate: () => <View />,
          });

          expect(
            findDOMNode(node.querySelectorByClassName("field-content"), false).querySelectorAll("view")
          ).to.have.lengthOf(3);
        });
      });
    });

    describe("not fixed items", () => {
      const schema = {
        type: "array",
        title: "my list",
        description: "my description",
        items: { type: "string" },
      };

      let node;

      describe("with template globally configured", () => {
        const uiSchema = {
          classNames: "custom-array",
        };

        beforeEach(() => {
          node = createFormComponent({
            ArrayFieldTemplate,
            formData,
            schema,
            uiSchema,
          }).node;
        });

        sharedIts();
      });
      describe("with template configured in ui:ArrayFieldTemplate", () => {
        const uiSchema = {
          classNames: "custom-array",
          "ui:ArrayFieldTemplate": ArrayFieldTemplate,
        };

        beforeEach(() => {
          node = createFormComponent({
            formData,
            schema,
            uiSchema,
          }).node;
        });
        sharedIts();
      });
      describe("with template configured globally being overriden in ui:ArrayFieldTemplate", () => {
        const uiSchema = {
          classNames: "custom-array",
          "ui:ArrayFieldTemplate": ArrayFieldTemplate,
        };

        beforeEach(() => {
          node = createFormComponent({
            formData,
            schema,
            uiSchema,
            // Empty field template for proof that we're doing overrides
            ArrayFieldTemplate: () => <View />,
          }).node;
        });
        sharedIts();
      });
      function sharedIts() {
        it("should render one root element for the array", () => {
          expect(node.querySelectorAllByClassName("custom-array")).to.have.lengthOf(1);
        });

        it("should render one add button", () => {
          expect(node.findAllByProps({title: "custom-array-add"})).to.have.lengthOf(
            1
          );
        });

        it("should render one child for each array item", () => {
          expect(node.querySelectorAllByClassName("custom-array-item")).to.have.lengthOf(
            formData.length
          );
        });

        it("should render text input for each array item", () => {
          const customArrayItemNodes = node.querySelectorAllByClassName("custom-array-item");
          const customArrayItemInputNodes = customArrayItemNodes.reduce((acc, node) => {
            return acc.concat(findDOMNode(node, false).findAllByPropsExcludeFunctions({type: "text"}))
          }, []);
          expect(customArrayItemInputNodes).to.have.lengthOf(formData.length);
        });

        it("should render move up button for all but one array items", () => {
          expect(
            node.findAllByProps({title: "custom-array-item-move-up"})
          ).to.have.lengthOf(formData.length - 1);
        });

        it("should render move down button for all but one array items", () => {
          expect(
            node.findAllByProps({title: "custom-array-item-move-down"})
          ).to.have.lengthOf(formData.length - 1);
        });
      }
    });

    describe("fixed items", () => {
      const schema = {
        type: "array",
        title: "my list",
        description: "my description",
        items: [{ type: "string" }, { type: "string" }, { type: "string" }],
      };

      let node;

      describe("with template globally configured", () => {
        const uiSchema = {
          classNames: "custom-array",
        };
        beforeEach(() => {
          node = createFormComponent({
            formData,
            schema,
            uiSchema,
            ArrayFieldTemplate,
          }).node;
        });
        sharedIts();
      });

      describe("with template configured in ui:ArrayFieldTemplate", () => {
        const uiSchema = {
          classNames: "custom-array",
          "ui:ArrayFieldTemplate": ArrayFieldTemplate,
        };
        beforeEach(() => {
          node = createFormComponent({
            formData,
            schema,
            uiSchema,
          }).node;
        });
        sharedIts();
      });
      describe("with template configured globally being overriden in ui:ArrayFieldTemplate", () => {
        const uiSchema = {
          classNames: "custom-array",
          "ui:ArrayFieldTemplate": ArrayFieldTemplate,
        };
        beforeEach(() => {
          node = createFormComponent({
            formData,
            schema,
            uiSchema,
            // Empty field template for proof that we're doing overrides
            ArrayFieldTemplate: () => <View />,
          }).node;
        });
        sharedIts();
      });
      function sharedIts() {
        it("should render one root element for the array", () => {
          expect(node.querySelectorAllByClassName("custom-array")).to.have.lengthOf(1);
        });

        it("should not render an add button", () => {
          expect(node.findAllByProps({title: "custom-array-add"})).to.have.lengthOf(
            0
          );
        });

        it("should render one child for each array item", () => {
          expect(node.querySelectorAllByClassName("custom-array-item")).to.have.lengthOf(
            formData.length
          );
        });

        it("should render text input for each array item", () => {
          const customArrayItemNodes = node.querySelectorAllByClassName("custom-array-item");
          const customArrayItemInputNodes = customArrayItemNodes.reduce((acc, node) => {
            return acc.concat(findDOMNode(node, false).findAllByPropsExcludeFunctions({type: "text"}))
          }, []);
          expect(customArrayItemInputNodes).to.have.lengthOf(formData.length);
        });

        it("should not render any move up buttons", () => {
          expect(
            node.findAllByProps({title: "custom-array-item-move-up"})
          ).to.have.lengthOf(0);
        });

        it("should not render any move down buttons", () => {
          expect(
            node.findAllByProps({title: "custom-array-item-move-down"})
          ).to.have.lengthOf(0);
        });
      }
    });
  });

  describe("Stateful ArrayFieldTemplate", () => {
    class ArrayFieldTemplate extends PureComponent {
      render() {
        return (
          <View className="field-content">
            {this.props.items.map((item, i) => (
              <View key={i}>item.children</View>
            ))}
          </View>
        );
      }
    }

    it("should render a stateful custom component", () => {
      const { node } = createFormComponent({
        schema: { type: "array", items: { type: "string" } },
        formData,
        ArrayFieldTemplate,
      });
      expect(
        findDOMNode(node.querySelectorByClassName("field-content"), false).querySelectorAll("view")
      ).to.have.lengthOf(3);
    });
  });

  describe("pass right props to ArrayFieldTemplate", () => {
    it("should pass registry prop", () => {
      const ArrayFieldTemplate = ({ registry }) => {
        if (!registry) {
          throw "Error";
        }
        return null;
      };
      createFormComponent({
        schema: { type: "array", items: { type: "string" } },
        formData,
        ArrayFieldTemplate,
      });
    });
  });
});

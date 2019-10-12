import { expect } from "chai";
import sinon from "sinon";
import React from "react";
// import { renderIntoDocument, Simulate } from "react-dom/test-utils";
import { View } from "react-native";
import { Button } from "react-native-paper";
import renderer from "react-test-renderer";

import Form from '../src';
import {
  createComponent,
  createFormComponent,
  createSandbox,
  // setProps,
  describeRepeated,
  renderIntoDocument,
  findDOMNode
} from "./test_utils";

describeRepeated("Form common", createFormComponent => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Empty schema", () => {
    it("should render a form tag", () => {
      const { node } = createFormComponent({ schema: {} });

      expect(node.tagName).eql("FORM");
    });

    it("should render a submit button", () => {
      const { node } = createFormComponent({ schema: {} });

      expect(node.querySelectorAll("button")).to.have.lengthOf(1);
    });

    it("should render children buttons", () => {
      const props = { schema: {} };
      const comp = renderIntoDocument(
        <Form {...props}>
          <Button>Submit</Button>
          <Button>Another submit</Button>
        </Form>
      );
      const node = findDOMNode(comp);
      expect(node.querySelectorAll("button")).to.have.lengthOf(2);
    });
  });

  describe("on component creation", () => {
    let comp;
    let onChangeProp;
    let formData;
    let schema;

    function createComponent() {
      comp = renderIntoDocument(
        <Form schema={schema} onChange={onChangeProp} formData={formData}>
          <Button>Submit</Button>
          <Button>Another submit</Button>
        </Form>
      );
    }

    beforeEach(() => {
      onChangeProp = sinon.spy();
      schema = {
        type: "object",
        title: "root object",
        required: ["count"],
        properties: {
          count: {
            type: "number",
            default: 789,
          },
        },
      };
    });

    describe("when props.formData does not equal the default values", () => {
      beforeEach(() => {
        formData = {
          foo: 123,
        };
        createComponent();
      });

      it("should call props.onChange with current state", () => {
        sinon.assert.calledOnce(onChangeProp);
        sinon.assert.calledWith(onChangeProp, comp.state);
      });
    });

    describe("when props.formData equals the default values", () => {
      beforeEach(() => {
        formData = {
          count: 789,
        };
        createComponent();
      });

      it("should not call props.onChange", () => {
        sinon.assert.notCalled(onChangeProp);
      });
    });
  });
  
  describe("Option idPrefix", function() {
    it("should change the rendered ids", function() {
      const schema = {
        type: "object",
        title: "root object",
        required: ["foo"],
        properties: {
          count: {
            type: "number",
          },
        },
      };
      const comp = renderIntoDocument(<Form schema={schema} idPrefix="rjsf" />);
      const node = findDOMNode(comp);
      const inputs = node.querySelectorAll("input");
      // TODO finish
      // console.log(inputs);
      // const ids = [];
      // for (var i = 0, len = inputs.length; i < len; i++) {
      //   const input = inputs[i];
      //   console.log(input);
      //   // ids.push(input.getAttribute("id"));
      // }
      // expect(ids).to.eql(["rjsf_count"]);
      // expect(node.querySelector("fieldset").id).to.eql("rjsf");
    });
  });

  // describe("Changing idPrefix", function() {
  //   it("should work with simple example", function() {
  //     const schema = {
  //       type: "object",
  //       title: "root object",
  //       required: ["foo"],
  //       properties: {
  //         count: {
  //           type: "number",
  //         },
  //       },
  //     };
  //     const comp = renderIntoDocument(<Form schema={schema} idPrefix="rjsf" />);
  //     const node = findDOMNode(comp);
  //     const inputs = node.querySelectorAll("input");
  //     const ids = [];
  //     for (var i = 0, len = inputs.length; i < len; i++) {
  //       const input = inputs[i];
  //       ids.push(input.getAttribute("id"));
  //     }
  //     expect(ids).to.eql(["rjsf_count"]);
  //     expect(node.querySelector("fieldset").id).to.eql("rjsf");
  //   });

  //   it("should work with oneOf", function() {
  //     const schema = {
  //       $schema: "http://json-schema.org/draft-06/schema#",
  //       type: "object",
  //       properties: {
  //         connector: {
  //           type: "string",
  //           enum: ["aws", "gcp"],
  //           title: "Provider",
  //           default: "aws",
  //         },
  //       },
  //       dependencies: {
  //         connector: {
  //           oneOf: [
  //             {
  //               type: "object",
  //               properties: {
  //                 connector: {
  //                   type: "string",
  //                   enum: ["aws"],
  //                 },
  //                 key_aws: {
  //                   type: "string",
  //                 },
  //               },
  //             },
  //             {
  //               type: "object",
  //               properties: {
  //                 connector: {
  //                   type: "string",
  //                   enum: ["gcp"],
  //                 },
  //                 key_gcp: {
  //                   type: "string",
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     };

  //     const comp = renderIntoDocument(<Form schema={schema} idPrefix="rjsf" />);
  //     const node = findDOMNode(comp);
  //     const inputs = node.querySelectorAll("input");
  //     const ids = [];
  //     for (var i = 0, len = inputs.length; i < len; i++) {
  //       const input = inputs[i];
  //       ids.push(input.getAttribute("id"));
  //     }
  //     expect(ids).to.eql(["rjsf_key_aws"]);
  //   });
  // });
  
  describe("Custom field template", () => {
    const schema = {
      type: "object",
      title: "root object",
      required: ["foo"],
      properties: {
        foo: {
          type: "string",
          description: "this is description",
          minLength: 32,
        },
      },
    };

    const uiSchema = {
      foo: {
        "ui:help": "this is help",
      },
    };

    const formData = { foo: "invalid" };

    function FieldTemplate(props) {
      const {
        id,
        classNames,
        label,
        help,
        rawHelp,
        required,
        description,
        rawDescription,
        errors,
        rawErrors,
        children,
      } = props;
      return (
        <View className={"my-template " + classNames}>
          {description}
          {children}
          {errors}
          {help}
        </View>
      );
    }

    let node;

    beforeEach(() => {
      node = createFormComponent({
        schema,
        uiSchema,
        formData,
        FieldTemplate,
        liveValidate: true,
      }).node;
    });

    it("should use the provided field template", () => {
      // console.log(node);
      // console.log(node.findByProps({className: "my-template"}));
      // expect(node.findByProps({className: "my-template"})).to.exist;
    });

    // it("should use the provided template for labels", () => {
    //   expect(node.querySelector(".my-template > label").textContent).eql(
    //     "root object"
    //   );
    //   expect(
    //     node.querySelector(".my-template .field-string > label").textContent
    //   ).eql("foo*");
    // });

    // it("should pass description as the provided React element", () => {
    //   expect(node.querySelector("#root_foo__description").textContent).eql(
    //     "this is description"
    //   );
    // });

    // it("should pass rawDescription as a string", () => {
    //   expect(node.querySelector(".raw-description").textContent).eql(
    //     "this is description rendered from the raw format"
    //   );
    // });

    // it("should pass errors as the provided React component", () => {
    //   expect(node.querySelectorAll(".error-detail li")).to.have.lengthOf(1);
    // });

    // it("should pass rawErrors as an array of strings", () => {
    //   expect(node.querySelectorAll(".raw-error")).to.have.lengthOf(1);
    // });

    // it("should pass help as a the provided React element", () => {
    //   expect(node.querySelector(".help-block").textContent).eql("this is help");
    // });

    // it("should pass rawHelp as a string", () => {
    //   expect(node.querySelector(".raw-help").textContent).eql(
    //     "this is help rendered from the raw format"
    //   );
    // });
  });

});
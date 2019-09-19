// Utils for tests.

import React from "react";
import sinon from "sinon";
import renderer from "react-test-renderer";
import _ from "lodash";

import Form from "../src";
import tagToComponentMap from './tag_to_component_map';

export function createComponent(Component, props) {
  const comp = renderIntoDocument(<Component {...props} />);
  const node = findDOMNode(comp);
  return { comp, node };
}

export function createFormComponent(props) {
  return createComponent(Form, { ...props, safeRenderCompletion: true });
}

export function createSandbox() {
  const sandbox = sinon.createSandbox();
  return sandbox;
}

// export function setProps(comp, newProps) {
//   const node = findDOMNode(comp);
//   render(React.createElement(comp.constructor, newProps), node.parentNode);
// }

/* Run a group of tests with different combinations of omitExtraData and liveOmit as form props.
 */
export function describeRepeated(title, fn) {
  const formExtraPropsList = [
    { omitExtraData: false },
    { omitExtraData: true },
    { omitExtraData: true, liveOmit: true },
  ];
  for (let formExtraProps of formExtraPropsList) {
    const createFormComponentFn = props =>
      createFormComponent({ ...props, ...formExtraProps });
    describe(title + " " + JSON.stringify(formExtraProps), () =>
      fn(createFormComponentFn)
    );
  }
}

export function renderIntoDocument(component) {
  const renderedComponent = renderer.create(component);
  renderedComponent.state = renderedComponent.root.instance.state;
  return renderedComponent;
}

export function findDOMNode(componentOrNode, isComponent = true) {
  const node = isComponent ? componentOrNode.root : componentOrNode;
  
  node.tagName = (isComponent ? node.type.name : node.type).toUpperCase();
  
  node.querySelectorAll = tag => node.findAllByType(tagToComponentMap[tag]);

  node.querySelector = tag => node.findByType(tagToComponentMap[tag]);
  
  node.querySelectorAllByClassName = className => _findAll(node,
    instance => !_.isFunction(instance.type)
      && instance.props.className ? instance.props.className.indexOf(className) !== -1 : false,
    { deep: true }
  )

  return node;
}

// Source: react-test-renderer
function _findAll(root, predicate, options) {
  var deep = options ? options.deep : true;
  var results = [];

  if (predicate(root)) {
    results.push(root);
    if (!deep) {
      return results;
    }
  }

  root.children.forEach(function (child) {
    if (typeof child === 'string') {
      return;
    }
    results.push.apply(results, _findAll(child, predicate, options));
  });

  return results;
}
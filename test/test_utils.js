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

export function setProps(comp, newProps) {
  const node = findDOMNode(comp);
  const props = {...node.props, ...newProps};
  return createFormComponent(props);
}

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
  
  try {
    node.tagName = (isComponent ? node.type.name : node.type).toUpperCase();
  } catch(e) {
    node.tagName = null;
  }

  node.querySelector = tag => node.findByType(getComponentByTag(tag));
  
  node.querySelectorAll = tag => node.findAllByType(getComponentByTag(tag));

  node.querySelectorAllExcludeFunctions = tag => node.querySelectorAll(tag)
    .filter(instance => !_.isFunction(instance.type));

  node.querySelectorByClassName = className => findDOMNode(node.querySelectorAllByClassName(className)[0], false);
  
  node.querySelectorAllByClassName = className => _findAll(node,
    instance => !_.isFunction(instance.type)
      && instance.props.className ? instance.props.className.split(" ").indexOf(className) !== -1 : false,
    { deep: true }
  )

  node.querySelectorAllById = id => node.findAllByPropsExcludeFunctions({id: id});

  node.querySelectorById = id => node.querySelectorAllById(id)[0];

  node.findAllByPropsExcludeFunctions = props => node.findAllByProps(props)
    .filter(instance => !_.isFunction(instance.type));

  return node;
}

export const getChildrenJoinedString = children => Array.isArray(children)
  ? children.map(
      child => typeof child === "string" ? child : getChildrenJoinedString(child.props.children)
    ).join("")
  : children;

export const Simulate = {
  submit: node => node._fiber.stateNode.onSubmit(),
  
  change: (node, data) => node._fiber.stateNode.props.onChange(data),
  changeValue: (node, data) => node._fiber.stateNode.props.onValueChange(data),
  changeText: (node, data) => node._fiber.stateNode.props.onChangeText(data),
  endEditing: (node) => node._fiber.stateNode.props.onEndEditing(),
  
  focus: (node) => node._fiber.stateNode.props.onFocus(),
  blur: (node) => node._fiber.stateNode.props.onBlur(),
  press: (node) => node._fiber.stateNode.props.onPress(),
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

function getComponentByTag(tag) {
  return tagToComponentMap[tag] ? tagToComponentMap[tag] : tag; 
}
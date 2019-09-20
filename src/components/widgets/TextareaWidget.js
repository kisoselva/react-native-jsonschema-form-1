import React from "react";
import PropTypes from "prop-types";

import { TextInput } from "react-native";

function TextareaWidget(props) {
  const {
    id,
    options,
    placeholder,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    ...textareaProps
  } = props;
  const _onChange = ({ target: { value } }) => {
    return onChange(value === "" ? options.emptyValue : value);
  };
  return (
    <TextInput
      id={id}
      multiline={true}
      className="form-control"
      value={typeof value === "undefined" ? "" : value}
      placeholder={placeholder}
      required={required}
      contextMenuHidden={disabled}
      editable={!readonly}
      autoFocus={autofocus}
      numberOfLines={options.rows}
      {...textareaProps}
      onBlur={onBlur && (event => onBlur(id, event.target.value))}
      onFocus={onFocus && (event => onFocus(id, event.target.value))}
      onChange={_onChange}
    />
  );
}

TextareaWidget.defaultProps = {
  autofocus: false,
  options: {},
};

if (process.env.NODE_ENV !== "production") {
  TextareaWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.shape({
      rows: PropTypes.number,
    }),
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default TextareaWidget;

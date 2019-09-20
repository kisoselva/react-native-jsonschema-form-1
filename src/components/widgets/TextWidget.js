import React from "react";
import PropTypes from "prop-types";

function TextWidget(props) {
  const { BaseInput } = props.registry.widgets;
  const { style, ...textProps } = props;
  return <BaseInput style={style.TextInput} {...textProps} />;
}

if (process.env.NODE_ENV !== "production") {
  TextWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
}

export default TextWidget;

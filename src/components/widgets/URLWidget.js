import React from "react";
import PropTypes from "prop-types";

function URLWidget(props) {
  const { BaseInput } = props.registry.widgets;
  const { style, ...urlProps } = props;
  return <BaseInput type="url" style={style.TextInput} {...urlProps} />;
}

if (process.env.NODE_ENV !== "production") {
  URLWidget.propTypes = {
    value: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
}

export default URLWidget;

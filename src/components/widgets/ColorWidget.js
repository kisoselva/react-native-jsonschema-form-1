import React from "react";
import PropTypes from "prop-types";

function ColorWidget(props) {
  const {
    disabled,
    readonly,
    registry: {
      widgets: { BaseInput },
    },
    style
  } = props;
  return (
    <BaseInput
      type="color"
      {...props}
      disabled={disabled || readonly}
      style={style.TextInput}
    />
    );
}

if (process.env.NODE_ENV !== "production") {
  ColorWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
}

export default ColorWidget;

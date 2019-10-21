import React from "react";
import PropTypes from "prop-types";

function EmailWidget(props) {
  const { BaseInput } = props.registry.widgets;
  const { style , ...emailProps } = props;
  return (
    <BaseInput
      type="email"
      keyboardType="email-address"
      autoCompleteType="email"
      textContentType="emailAddress"
      style={style.TextInput}
      {...emailProps}
    />
  );
}

if (process.env.NODE_ENV !== "production") {
  EmailWidget.propTypes = {
    value: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
}

export default EmailWidget;

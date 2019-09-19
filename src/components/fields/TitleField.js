import React from "react";
import PropTypes from "prop-types";

import { Text } from "react-native";

const REQUIRED_FIELD_SYMBOL = "*";

function TitleField(props) {
  const { id, title, required } = props;
  return (
    <Text id={id}>
      {title}
      {required && <Text className="required">{REQUIRED_FIELD_SYMBOL}</Text>}
    </Text>
  );
}

if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
  };
}

export default TitleField;

import React from "react";
import PropTypes from "prop-types";

import { Text, View } from "react-native";

// TODO add pre style
function UnsupportedField({ schema, idSchema, reason }) {
  return (
    <View className="unsupported-field">
      <Text>
        Unsupported field schema
        {idSchema && idSchema.$id && (
          <Text>
            {" for"} field <Text style={{fontStyle: "italic"}}>{idSchema.$id}</Text>
          </Text>
        )}
        {reason && <Text style={{fontStyle: "italic"}}>: {reason}</Text>}.
      </Text>
      {schema && <Text pre={true}>{JSON.stringify(schema, null, 2)}</Text>}
    </View>
  );
}

if (process.env.NODE_ENV !== "production") {
  UnsupportedField.propTypes = {
    schema: PropTypes.object.isRequired,
    idSchema: PropTypes.object,
    reason: PropTypes.string,
  };
}

export default UnsupportedField;

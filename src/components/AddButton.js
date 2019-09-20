import React from "react";
import IconButton from "./IconButton";

import { View } from "react-native";

// TODO style
export default function AddButton({ className, onClick, disabled }) {
  return (
    <View className="row">
      <View className={`col-xs-3 col-xs-offset-9 text-right ${className}`}>
        <IconButton
          type="info"
          icon="plus"
          className="btn-add col-xs-12"
          tabIndex="0"
          onClick={onClick}
          disabled={disabled}
        />
      </View>
    </View>
  );
}

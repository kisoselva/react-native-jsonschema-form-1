import React from "react";
import IconButton from "./IconButton";

import { View } from "react-native";

export default function AddButton({ className, onClick, disabled, style }) {
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
          style={style}
        />
      </View>
    </View>
  );
}

import React from "react";

import { FlatList, Text, View } from "react-native";

export default function ErrorList(props) {
  const { errors, style, textStyle, headerStyle } = props;
  return (
    <View>
      <View style={headerStyle}>
        <Text>Errors</Text>
      </View>
      <FlatList
        data={errors.map((error, i) => ({key: error.stack}))}
        renderItem={({item}) =>
          <Text style={textStyle}>{item.key}</Text>
        }
        style={style}
      />
    </View>
  );
}

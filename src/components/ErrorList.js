import React from "react";

import { FlatList, Text, View } from "react-native";

export default function ErrorList(props) {
  const { errors } = props;
  return (
    <View className="panel panel-danger errors">
      <View className="panel-heading">
        <Text className="panel-title">Errors</Text>
      </View>
      <FlatList
        data={errors.map((error, i) => ({key: error.stack}))}
        renderItem={({item}) =>
          <Text className="list-group-item text-danger">{item.key}</Text>
        }
      />
    </View>
  );
}

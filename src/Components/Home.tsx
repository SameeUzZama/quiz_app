import React from "react";
import axios from "axios";
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";

export const Home = () => {
  const [state, setState] = useState<any[]>([]);

  const getApi = async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
    console.log("response", res.data.results);
    setState([...state, ...res.data.results]);
  };
  console.log("state", state);

  useEffect(() => {
    getApi();
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            getApi();
          }
        }}
        scrollEventThrottle={16}
      >
        <View>
          {state.map((e: any, i: any) => {
            return (
              <View style={styles.View} key={i}>
                <Text>Name: {e.name}</Text>
                <Text>URL: {e.url}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  View: {
    height: 100,
    justifyContent: "space-around",
  },
});

export default Home;

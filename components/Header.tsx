import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Header extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.title}>T3</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      marginTop: 40,
      backgroundColor: "black",
      flexDirection: "row"
   },
   title: {
      color: "#fff",
      fontWeight: "bold",
      flex: 1,
      fontSize: 25,
      textAlign: "center",
      margin: 20
   }
});

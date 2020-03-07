import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import {
   RESULT_NO,
   RESULT_USER,
   RESULT_CPU,
   RESULT_TIE
} from "../constants/consts";

export default class Header extends Component {
   generateResultText(result: number) {
      switch (result) {
         case RESULT_USER:
            return "You won the game!";
         case RESULT_CPU:
            return "CPU won the game!";
         case RESULT_TIE:
            return "Tie!";
         default:
            return "";
      }
   }

   render() {
      const { result, onRestart } = this.props;
      return (
         <View>
            <Text style={styles.text}>{this.generateResultText(result)}</Text>
            {result !== RESULT_NO && (
               <TouchableOpacity onPress={() => onRestart()}>
                  <Text style={styles.instructions}>
                     Touch here to play again
                  </Text>
               </TouchableOpacity>
            )}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   text: {
      marginTop: 20,
      fontSize: 19,
      fontWeight: "bold",
      textAlign: "center"
   },
   instructions: {
      marginTop: 20,
      color: "#555",
      marginBottom: 5,
      textAlign: "center"
   }
});

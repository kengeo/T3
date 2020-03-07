/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Header from "./components/Header";
import Board from "./components/Board";

interface MyProps {

}

interface MyState {
  gameStarted: boolean
}

export default class App extends Component<MyProps, MyState> {
  state: MyState;

  constructor(props: MyProps) {
    super(props)

    this.state = { gameStarted: false }
  }

  startGame() {
    this.setState({ gameStarted: true });
  }

  render() {
    const { gameStarted } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        {gameStarted ? (
          <Board />
        ) : (
            <View>
              <Text style={styles.welcome}>Welcome to the game!</Text>
              <TouchableOpacity onPress={() => this.startGame()}>
                <Text style={styles.instructions}>
                  Touch here to start
                    </Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 20,
    marginTop: 50
  },
  instructions: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
    marginBottom: 5
  }
});

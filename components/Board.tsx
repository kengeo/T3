import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import {
   CENTER_POINTS,
   AREAS,
   CONDITIONS,
   RESULT_NO,
   RESULT_USER,
   RESULT_CPU,
   RESULT_TIE
} from "../constants/consts";
import Circle from "./Circle";
import Cross from "./Cross";
import styles from "../styles/board";
import PromptArea from "./PromptArea";

interface MyProps {

}

interface MyState {
   CPUInputs: Array<any>,
   userInputs: Array<any>,
   result: number,
   round: number
}

export default class Board extends Component<MyProps, MyState> {
   state: MyState;

   constructor(props: MyProps) {
      super(props);
      this.state = {
         CPUInputs: [],
         userInputs: [],
         result: RESULT_NO,
         round: 0
      };
   }

   restart() {
      const { round } = this.state;
      this.setState({
         userInputs: [],
         CPUInputs: [],
         result: RESULT_NO,
         round: round + 1
      });
      setTimeout(() => {
         if (round % 2 === 0) {
            this.CPUAction();
         }
      }, 5);
   }

   boardClickHandler(e: Object) {
      const { locationX, locationY } = e.nativeEvent;
      const { userInputs, CPUInputs, result } = this.state;
      if (result !== -1) {
         return;
      }
      const inputs = userInputs.concat(CPUInputs);

      const area = AREAS.find(
         d =>
            locationX >= d.startX &&
            locationX <= d.endX &&
            locationY >= d.startY &&
            locationY <= d.endY
      );

      if (area && inputs.every(d => d !== area.id)) {
         this.setState({ userInputs: userInputs.concat(area.id) });
         setTimeout(() => {
            this.judgeWinner();
            this.CPUAction();
         }, 5);
      }
   }

   componentDidMount() {
      this.restart();
   }

   isWinner(inputs: number[]) {
      return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1));
   }

   judgeWinner() {
      const { userInputs, CPUInputs, result } = this.state;
      const inputs = userInputs.concat(CPUInputs);

      if (inputs.length >= 5) {
         let res = this.isWinner(userInputs);
         if (res && result !== RESULT_USER) {
            return this.setState({ result: RESULT_USER });
         }
         res = this.isWinner(CPUInputs);
         if (res && result !== RESULT_CPU) {
            return this.setState({ result: RESULT_CPU });
         }
      }

      if (
         inputs.length === 9 &&
         result === RESULT_NO &&
         result !== RESULT_TIE
      ) {
         this.setState({ result: RESULT_TIE });
      }
   }

   CPUAction() {
      const { userInputs, CPUInputs, result } = this.state;
      if (result !== -1) {
         return;
      }
      while (true) {
         const inputs = userInputs.concat(CPUInputs);

         const randomNumber = Math.round(Math.random() * 8.3);
         if (inputs.every(d => d !== randomNumber)) {
            this.setState({ CPUInputs: CPUInputs.concat(randomNumber) });
            this.judgeWinner();
            break;
         }
      }
   }


   render() {
      const { userInputs, CPUInputs, result } = this.state;
      return (
         <View style={styles.container}>
            <TouchableWithoutFeedback onPress={e => this.boardClickHandler(e)}>
               <View style={styles.board}>
                  <View style={styles.line} />
                  <View
                     style={[
                        styles.line,
                        {
                           width: 3,
                           height: 306,
                           transform: [{ translateX: 200 }]
                        }
                     ]}
                  />
                  <View
                     style={[
                        styles.line,
                        {
                           width: 306,
                           height: 3,
                           transform: [{ translateY: 100 }]
                        }
                     ]}
                  />
                  <View
                     style={[
                        styles.line,
                        {
                           width: 306,
                           height: 3,
                           transform: [{ translateY: 200 }]
                        }
                     ]}
                  />
                  {userInputs.map((d, i) => (
                     <Circle
                        key={i}
                        xTranslate={CENTER_POINTS[d].x}
                        yTranslate={CENTER_POINTS[d].y}
                        color="black"
                     />
                  ))}
                  {CPUInputs.map((d, i) => (
                     <Cross
                        key={i}
                        xTranslate={CENTER_POINTS[d].x}
                        yTranslate={CENTER_POINTS[d].y}
                     />
                  ))}
               </View>
            </TouchableWithoutFeedback>
            <PromptArea result={result} onRestart={() => this.restart()} />
         </View>
      );
   }
}

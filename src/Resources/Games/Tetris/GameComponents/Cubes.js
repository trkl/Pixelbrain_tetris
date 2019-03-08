import GameComponent from "../../../../GameObject/GameComponent";
import React from "react";
import Cube from "./Cube";
import Vector from "../../../../Vector/Vector";
import { WithWorld } from "../../../../World/HOC/WithWorld";
import RigidBody from "../../../../GameObject/RigidBody";
import VectorUtilities from "../../../../VectorUtilities/VectorUtilities";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Cubes extends GameComponent {
  constructor(props) {
    super(props);
    this.children = [React.createElement(RigidBody, { weight: 10, drag: 0.5 })];

    for (let i = 0; i < 4; ++i) {}
  }

  componentWillMount() {
    this.children.push(
      React.createElement(Cube, {
        offset: new Vector(),
        name: "Cube"
      })
    );
    for (let i = 0, length = 3; i < length; ++i) {
      const randomCube = this.components[
        randomIntFromInterval(1, this.components.length)
      ];

      let offset;

      switch (randomIntFromInterval(0, 3)) {
        case 0:
          offset = new Vector([10, 0]);
          break;
        case 1:
          offset = new Vector([-10, 0]);
          break;
        case 2:
          offset = new Vector([0, 10]);
          break;
        case 3:
          offset = new Vector([0, 10]);
          break;
        default:
          throw "shit";
      }
    }
    super.componentWillMount();
  }
}

export default WithWorld(Cubes);

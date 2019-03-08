import GameComponent from "../../../../GameObject/GameComponent";
import Cubes from "./Cubes";
import React from "react";
import Timer from "../../../../Timer/Timer";
import { WithWorld } from "../../../../World/HOC/WithWorld";
import Vector from "../../../../Vector/Vector";

class Tetris extends GameComponent {
  constructor(props) {
    super(props);
    this.children = [];

    this.addCubes();
  }

  componentDidMount() {
    super.componentDidMount();
    console.log(this.components);
    // this.downCube();
  }

  names = "0";

  addCubes = () => {
    this.children.push(
      React.createElement(Cubes, {
        parent: this,
        gravity: 1,
        position: new Vector([40, 0]),
        name: "" + this.names++
      })
    );
    this.update();
  };
}

export default WithWorld(Tetris);

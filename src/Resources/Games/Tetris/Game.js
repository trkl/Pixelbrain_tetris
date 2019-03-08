import React, { Component } from "react";
import Cube from "./GameComponents/Cube";
import Cubes from "./GameComponents/Cubes";
import Floor from "./GameComponents/Floor";
import Vector from "../../../Vector/Vector";

export default class Game extends Component {
  render = () =>
    Game.gameComponents.map((child, idx) => ({ ...child, key: idx }));
  shouldComponentUpdate = () => false;
}

Game.instance = {
  gameName: "Tetris",
  pause: false,
  gameOver: false,
  start: true
};

Game.gameComponents = [
  <Cubes name="Cubes" />,
  <Floor
    name="floor"
    dimensions={new Vector([100, 30])}
    position={new Vector([0, 70])}
  />
];

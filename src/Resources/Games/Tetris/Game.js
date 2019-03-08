import React, { Component } from "react";
import Cube from "./GameComponents/Cube";
import Cubes from "./GameComponents/Cubes";
import Floor from "./GameComponents/Floor";
import Vector from "../../../Vector/Vector";
import Tetris from "./GameComponents/Tetris";

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
  <Tetris name="Tetris" />,
  <Floor
    name="floor"
    dimensions={new Vector([100, 5])}
    position={new Vector([0, 101])}
  />,
  <Floor
    name="floor"
    dimensions={new Vector([-5, 100])}
    position={new Vector([-30, 0])}
  />,
  <Floor
    name="floor"
    dimensions={new Vector([5, 100])}
    position={new Vector([101, 0])}
  />
];

import GameComponent from "../../../../GameObject/GameComponent";
import React from "react";
import Cube from "./Cube";
import Vector from "../../../../Vector/Vector";
import { WithWorld } from "../../../../World/HOC/WithWorld";
import RigidBody from "../../../../GameObject/RigidBody";
import VectorUtilities from "../../../../VectorUtilities/VectorUtilities";
import CollisionManger from "../../../../CollisionManager/CollisionManager";
import WithKeyboardSubscribe from "../../../../InputManager/HOC/WithKeyboardSubscribe";
import { isRegExp } from "util";
import KeyboardObservable from "../../../../InputManager/KeyboardObservable";
import { FloorCollision } from "./Floor";
import PhysicsEngine from "../../../../PhysicsEngine/PhysicsEngine";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Cubes extends GameComponent {
  constructor(props) {
    super(props);
    this.children = [React.createElement(RigidBody, { weight: 10, drag: 0.5 })];
    this.parent = this.props.parent;
    this.props.parent.add(this);
  }

  offsetArray = [];

  rotate = () => {
    const rest = [...this.offsetArray];
    this.offsetArray = [];
    for (const offset of rest) {
      this.offsetArray.push(offset.hat());
    }

    for (let i = 1; i < this.components.length; ++i) {
      this.components[i].offset = this.offsetArray[i - 1];
    }
  };

  componentWillMount() {
    this.props.keyboard.subscribe(this, "d", {
      callback: () => (this.position = this.position.plus(new Vector([10, 0])))
    });
    this.props.keyboard.subscribe(this, "a", {
      callback: () => (this.position = this.position.plus(new Vector([-10, 0])))
    });
    this.props.keyboard.subscribe(this, "w", {
      callback: this.rotate
    });

    this.offsetArray.push(new Vector());
    this.children.push(
      React.createElement(Cube, {
        offset: this.offsetArray[this.offsetArray.length - 1],
        name: this.props.name
      })
    );
    for (let i = 0, length = 3; i < length; ++i) {
      const randomOffset = this.offsetArray[
        randomIntFromInterval(0, this.offsetArray.length - 1)
      ];

      while (true) {
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
            offset = new Vector([0, -10]);
            break;
          default:
            throw new Error("shit");
        }

        offset = randomOffset.plus(offset);
        if (!this.collision(offset)) {
          this.children.push(
            React.createElement(Cube, {
              offset: offset,
              name: this.props.name
            })
          );
          this.offsetArray.push(offset);
          break;
        }
      }
    }
    super.componentWillMount();
  }

  get headToBottom() {
    let m = 0;
    this.components.forEach(component => (m = Math.max(m, component.offset)));
    return m;
  }

  handled = false;
  handleCollision = collider => {
    if (this.handled || collider.object.name === this.name) return;
    this.handled = true;
    this.props.parent.addCubes();
    this.props.keyboard.unsubscribe(this);
    PhysicsEngine.instance.remove(this.rigidBody);
    PhysicsEngine.instance.remove(collider.object.rigidBody);
    if (collider.object.name !== "floor")
      collider.object.position.y = this.position.y + this.headToBottom;
    collider.object.collisionZones.forEach(collisionZone =>
      CollisionManger.instance.remove(collisionZone)
    );
    // FloorCollision.bind(this, collider)();
  };

  componentDidMount() {
    super.componentDidMount();
  }
  collision(offset2) {
    for (let i = 0; i < this.offsetArray.length; ++i) {
      const offset1 = this.offsetArray[i];
      const topLeft1 = this.position.plus(offset1);
      const topLeft2 = this.position.plus(offset2);
      if (topLeft1.y === topLeft2.y && topLeft2.x === topLeft1.x) return true;
    }
    return false;
  }
}

export default WithKeyboardSubscribe(WithWorld(Cubes));

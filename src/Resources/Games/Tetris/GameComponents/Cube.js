import GameComponent from "../../../../GameObject/GameComponent";
import CollisionZone from "../../../../GameObject/CollisionZone";
import React from "react";
import Vector from "../../../../Vector/Vector";
import Sprite from "../../../../GameComponents/Sprite";
import { WithWorld } from "../../../../World/HOC/WithWorld";
import RigidBody from "../../../../GameObject/RigidBody";

class Cube extends GameComponent {
  constructor(props) {
    super(props);
    this.rigidBody = this.props.parent.rigidBody;

    this.props.parent.add(this);
    this.offset = this.props.offset ? this.props.offset : new Vector();
    this.children = [
      <Sprite imagesource="merki.png" size={this.size} />,
      <CollisionZone offset={this.offset} dimensions={this.size} />
    ];
  }
  size = new Vector([10, 10]);

  handleCollision = this.props.parent.handleCollision;
}

export default WithWorld(Cube);

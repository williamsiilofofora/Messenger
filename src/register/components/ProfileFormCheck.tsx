import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

interface ProfileFormCheckProps {
  check: boolean; 
}

class ProfileFormCheck extends React.Component<ProfileFormCheckProps> {
  render() {
    const text = "Le format de l'email doit être valide";
    return this.props.check ? (
      <Fragment>
        <Typography
          style={{
            marginLeft: "0.2rem",
            fontSize: "0.8rem",
            color: "red"
          }}
        >
          {text}
        </Typography>
      </Fragment>
    ) : (
      <Fragment>
        <Typography
            style={{
              marginLeft: "0.2rem",
              fontSize: "0.8rem",
              color: "green"
            }}
        >
          {text}
        </Typography>
      </Fragment>
    );
  }
}

export default ProfileFormCheck;

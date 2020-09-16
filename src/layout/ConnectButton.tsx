import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import React from "react";
import { Link } from "react-router-dom";

export function ConnectButton() {
  return (
    <Link  to="/login">
      <IconButton color="default" aria-label="profile">
        <PowerSettingsNewIcon fontSize="large" />
      </IconButton>
    </Link>
  );
}




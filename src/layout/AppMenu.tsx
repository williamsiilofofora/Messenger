import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Forum from "@material-ui/icons/Forum";
import ContactsIcon from "@material-ui/icons/Contacts";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import { ProfileButton } from "./ProfileButton";

import { ConnectButton } from "./ConnectButton";
import { IDrawerContent } from "./types";

import {IconButton, Tooltip } from "@material-ui/core";



// const useStyles = makeStyles({
 
//   root: {
//     color: "#FFFFFF",
//     textDecoration: "none"

//   },
// });

interface AppMenuProps {
  changeDrawerContent: (content: IDrawerContent) => void;
}
export function AppMenu({ changeDrawerContent } : AppMenuProps) {

  return (
    <Fragment>
      <AppBar position="static" style={{ height: "10vh" }}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <Toolbar>
              <Forum fontSize="large" />
              <Typography variant="h3">flint.</Typography>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <h1>Nom de l'utilisateur</h1>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
           <Tooltip title="Conversations">
                <IconButton
                  color="default"
                  aria-label="contacts"
                  onClick={() => changeDrawerContent("contacts")}
                >
                  <ContactsIcon fontSize="large" />
                </IconButton>
            </Tooltip>
              <Tooltip title="Conversations">
                <IconButton
                  color="default"
                  aria-label="conversations"
                  onClick={() => changeDrawerContent("conversations")}
                >
                  <Forum fontSize="large" />
                </IconButton>
              </Tooltip>
              <ConnectButton />
              <ProfileButton />
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </Fragment>
  );
}

export default AppMenu;

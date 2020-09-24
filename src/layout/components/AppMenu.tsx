import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Forum from "@material-ui/icons/Forum";
import ContactsIcon from "@material-ui/icons/Contacts";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import { ProfileButton } from "./ProfileButton";

import { ConnectButton } from "./ConnectButton";
import { IDrawerContent } from "../types";

import {IconButton, Tooltip } from "@material-ui/core";
import { IProfile } from "../../profile/types";
import { IAppState } from "../../appReducer";
import { connect } from "react-redux";
import { changeDrawerContent } from "../actions/changeDrawerContentAction";



// const useStyles = makeStyles({
 
//   root: {
//     color: "#FFFFFF",
//     textDecoration: "none"

//   },
// });

interface AppMenuProps {
  changeDrawerContent: (content: IDrawerContent) => void;
  profile?: IProfile
}
export function AppMenu({ changeDrawerContent, profile } : AppMenuProps) {

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
          { profile ? <Grid item>
            <Toolbar>
              <h1>{profile.firstname} {profile.lastname}</h1>
            </Toolbar>
          </Grid> : null }
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

const mapStateToProps = ({ profile }: IAppState) => ({
  profile: profile.connectedProfile
})
const mapDispatchToProps = (dispatch: any) => ({
  changeDrawerContent: (content: IDrawerContent) =>
    dispatch(changeDrawerContent(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);

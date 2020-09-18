import {
  Box,
  createStyles,
  Drawer,
  IconButton,
  Theme,
  withStyles,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React from "react";
import ConversationList from "../../conversation/components/ConversationList";
import ContactList from "../../users/components/ContactList";
import { User } from "../../users/types";
import { IDrawerContent } from "../types";
import { IConversation } from '../../conversation/types';
import { connect } from "react-redux";
import { IAppState } from "../../appReducer";
import { changeDrawerContent } from "../actions/changeDrawerContentAction";

interface AppDrawerProps {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  hideDrawer: () => void;
  classes: any;
  users: User[];
  connectedUser?: User;
  conversations: IConversation[];
}

const styles = (theme: Theme) =>
  createStyles({
    drawerHeader: {
      height: "50px",
      textAlign: "right",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    paper: {
      width: drawerWidth,
    },
    drawerContent: {
      height: "calc(100% - 50px)",
    },
  });

class AppDrawer extends React.Component<AppDrawerProps> {
  render() {
    const { users } = this.props;
    const content = this.props.drawerContent === 'contacts' ?
      <ContactList connectedUser={this.props.connectedUser} users={users} />
      : <ConversationList conversations={this.props.conversations} users={users} />
    return this.props.showDrawer ? (
      <Drawer
        variant="persistent"
        anchor="left"
        open={this.props.showDrawer}
        classes={{
          paper: this.props.classes.paper,
        }}
      >
        <Box className={this.props.classes.drawerHeader}>
          <IconButton aria-label="collapse" onClick={this.props.hideDrawer}>
            <ArrowBackIos />
          </IconButton>
        </Box>
        <Box className={this.props.classes.drawerContent}>{content}</Box>
      </Drawer>
    ) : null;
  }
}
export const drawerWidth = 500;
const mapStateToProps = ({ layout }: IAppState) => ({
  showDrawer: layout.showDrawer,
  drawerContent: layout.drawerContent,
});

const mapDispatchToProps = (dispatch: any) => ({
  hideDrawer: () => dispatch(changeDrawerContent(undefined, false)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppDrawer)); 




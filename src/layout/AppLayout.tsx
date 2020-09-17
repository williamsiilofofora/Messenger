import { createStyles, Theme, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import AppContent from "./AppContent";
import AppDrawer, { drawerWidth } from "./Drawer";
import AppMenu from "./AppMenu";
import { IDrawerContent } from "./types";
import { User } from "../users/types";
import { getConnectedProfile, getConversations, getUsers } from '../api/methods';
import { IConversation } from '../conversation/types';

interface AppLayoutProps {
  classes: any;
}

interface AppLayoutState {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  users: User[];
  profile?: User;
  conversations: IConversation[];
}

const styles = (theme: Theme) =>
  createStyles({
    content: {
      width: "100%",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
    },
  });

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState> {
  constructor(props: AppLayoutProps) {
    super(props);
    this.state = {
      showDrawer: false,
      users: [],
      conversations: []
    };
  }

  changeDrawerContent = (content: IDrawerContent) => {
    this.setState({ showDrawer: true, drawerContent: content });
  }
  hideDrawer = () => {
    this.setState({ showDrawer: false });
  }

  async componentDidMount() {
    getUsers().then((fetchedUsers) => {
      this.setState({ users: fetchedUsers })
    })
    try {
      const profile = await getConnectedProfile()
      this.setState({ profile });
      const conversations = await getConversations(profile)
      this.setState({ conversations })
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const { classes } = this.props;
    const filteredClasses = [
      classes.content,
      this.state.showDrawer && classes.contentShift,
    ]
      .filter(Boolean)
      .join(" ");
    // [ true && 'classe2' ] => [ 'classe2' ].filter(Boolean) => [ 'classe2 ']
    // [ false && 'classe2' ] => [ false ].filter(Boolean) => []

    return (
      <Fragment>
        <div className={filteredClasses}>
          <AppMenu changeDrawerContent={this.changeDrawerContent} />
          <AppContent
            conversations={this.state.conversations}
            connectedUser={this.state.profile}
            users={this.state.users}
          />
        </div>
        <AppDrawer
          conversations={this.state.conversations}
          connectedUser={this.state.profile}
          users={this.state.users}
          drawerContent={this.state.drawerContent}
          showDrawer={this.state.showDrawer}
          hideDrawer={this.hideDrawer}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(AppLayout);

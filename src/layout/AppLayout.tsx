import { createStyles, Theme, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import AppContent from "./AppContent";
import AppDrawer, { drawerWidth } from "./Drawer";
import AppMenu from "./AppMenu";
import { IDrawerContent } from "./types";
import { User } from "../users/types";
import { getUsers } from "../api/methods";

interface AppLayoutProps {
  classes: any;
}

interface AppLayoutState {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  users: User[];
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
    };
  }

  changeDrawerContent = (content: IDrawerContent) => {
    this.setState({
      showDrawer: !this.state.showDrawer,
      drawerContent: content,
    });

    // TODO Indiquer le contenu au drawer
  };

  componentDidMount() {
    getUsers().then((fetchedUsers) => {
      this.setState({ users: fetchedUsers });
    });
  }

  hideDrawer = () => {
    this.setState({ showDrawer: false });
  };

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
          <AppContent users={this.state.users} />
        </div>
        <AppDrawer
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

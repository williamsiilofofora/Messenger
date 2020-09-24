import { createStyles, Theme, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import AppContent from "./AppContent";
import AppDrawer, { drawerWidth } from "./Drawer";
import AppMenu from "./AppMenu";
import { IAppState } from "../../appReducer";
import { connect } from "react-redux";

interface AppLayoutProps {
  classes: any;
  showDrawer: boolean;
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

class AppLayout extends React.Component<AppLayoutProps> {
  render() {
        const { classes, showDrawer } = this.props;
        const filteredClasses = [
          classes.content,
          showDrawer && classes.contentShift,
        ]
          .filter(Boolean)
          .join(" ");
    // [ true && 'classe2' ] => [ 'classe2' ].filter(Boolean) => [ 'classe2 ']
    // [ false && 'classe2' ] => [ false ].filter(Boolean) => []

    return (
      <Fragment>
        <div className={filteredClasses}>
          <AppMenu />
          <AppContent />
        </div>
        <AppDrawer/>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ layout , conversation, profile}: IAppState) => ({
  showDrawer: layout.showDrawer,
  conversations: conversation.list
  
});

export default connect(mapStateToProps)(withStyles(styles)(AppLayout));
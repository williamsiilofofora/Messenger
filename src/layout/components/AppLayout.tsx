import { createStyles, Theme, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import AppContent from "./AppContent";
import AppDrawer, { drawerWidth } from "./Drawer";
import AppMenu from "./AppMenu";
import { IAppState } from "../../appReducer";
import { connect } from "react-redux";
import { makeFetchUsers } from "../../profile/actions/makeFetchUsers";
import { makeFetchConversation } from "../../conversation/actions/makeFetchConversations";
import { makeStartSocket} from '../../socket/actions/makeStartSocket'




interface AppLayoutProps {
  classes: any;
  showDrawer: boolean;
  makeFetchUser: () => void;
  makeFetchConversation: () => void;
  makeStartSocket: () => void;
}

interface AppLayoutState {
 
  polling?: NodeJS.Timeout;
  
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
    };
  }

// dispatch conversations
  // fetchConversations = async (profile?: User) => {
  //   if (!profile) return;

  //   const conversations = await getConversations(profile)
  //   this.props.setConversationState(conversations)
  // }

  async componentDidMount() {
    this.props.makeFetchUser();
    this.props.makeFetchConversation();
    this.props.makeStartSocket();
    this.setState({
      polling: setInterval(() => {
        this.props.makeFetchConversation();
      }, 10000)
    })
  }

  componentWillUnmount() {
    const { polling } = this.state;
    if (polling) clearInterval(polling);
  }
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

const mapDispatchToProps = (dispatch: any) => ({
  makeFetchUser: () => dispatch(makeFetchUsers()),
  makeFetchConversation: () => dispatch(makeFetchConversation()),
  makeStartSocket: () => dispatch(makeStartSocket())
  // setConversationState: (conversations: IConversation[]) =>
  //   dispatch(setConversationStateAction(conversations)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppLayout)); 

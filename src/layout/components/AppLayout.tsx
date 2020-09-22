import { createStyles, Theme, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import AppContent from "./AppContent";
import AppDrawer, { drawerWidth } from "./Drawer";
import AppMenu from "./AppMenu";
import { User } from "../../users/types";
import { getConnectedProfile, getConversations} from '../../api/methods';
import { IConversation } from '../../conversation/types';
import { IAppState } from "../../appReducer";
import { connect } from "react-redux";
import { makeFetchUsers } from "../../profile/actions/makeFetchUsers";
import { setConversationStateAction } from "../../conversation/actions/setConversationStateAction";




interface AppLayoutProps {
  classes: any;
  showDrawer: boolean;
  makeFetchUser: () => void;
  setConversationState: (conversations: IConversation[]) => void;
  conversations: IConversation[];
}

interface AppLayoutState {
  profile?: User;
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
  fetchConversations = async (profile?: User) => {
    if (!profile) return;

    const conversations = await getConversations(profile)
    this.props.setConversationState(conversations)
  }

  async componentDidMount() {
    // getUsers()
    //   .then(fetchedUsers => { this.setState({ users: fetchedUsers }) })
    //   .catch(error => console.error(error));
    this.props.makeFetchUser();
    try {
      const profile = await getConnectedProfile()
      this.setState({ profile });
      await this.fetchConversations(profile);
    } catch (error) {
      console.error(error);
    }
   
    this.setState({
      polling: setInterval(() => {
        try {
          this.fetchConversations(this.state.profile)
        } catch (error) {
          console.error(error);
        }
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
          <AppContent
            conversations={this.props.conversations}
            connectedUser={this.state.profile}
          />
        </div>
        <AppDrawer
          conversations={this.props.conversations}     
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ layout , conversations}: IAppState) => ({
  showDrawer: layout.showDrawer,
  conversations : conversations.conversations
});

const mapDispatchToProps = (dispatch: any) => ({
  makeFetchUser: () => dispatch(makeFetchUsers()),
  // makeFetchConversation: () => dispatch(makeFetchConversationAction()),
  setConversationState: (conversations: IConversation[]) =>
    dispatch(setConversationStateAction(conversations)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppLayout)); 

import React from "react";
import { Switch, Route } from "react-router-dom";
import MyProfile from "../profile/components/MyProfile";
import LoginScreen from "../Login/components/LoginScreen";
// import ContactList from "../users/components/MyContacts";
import { HomeScreen } from "./HomeScreen";
import ChatUI from "../conversation/components/ChatUI";
import { IConversation } from "../conversation/types";
import { User } from "../users/types";
import { IProfile } from "../profile/types";


interface AppContentProps {
  users: User[],
  connectedUser?: User
  
}
class AppContent extends React.Component<AppContentProps> {
  render() {
    return (
      <Switch>
        <Route path='/conversation/:conversationId' component={() => <ChatUI connectedUser={this.props.connectedUser} users={this.props.users} />} />
        <Route path='/profile' component={() => <MyProfile connectedUser={this.props.connectedUser} />} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/" component={HomeScreen} />
      </Switch>
    );
  }
}

export default AppContent;

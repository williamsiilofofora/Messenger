import React from "react";
import { Switch, Route } from "react-router-dom";
import MyProfile from "../../profile/components/MyProfile";
import LoginScreen from "../../Login/components/LoginScreen";
import { HomeScreen } from "./HomeScreen";
import ChatUI from "../../conversation/components/ChatUI";
import { IConversation } from "../../conversation/types";
import { User } from "../../users/types";



interface AppContentProps {

  connectedUser?: User,
  conversations: IConversation[];  
}
class AppContent extends React.Component<AppContentProps> {
  render() {
    return (
      <Switch>
        <Route
          path='/conversation/:conversationId'
          component={() => <ChatUI
            conversations={this.props.conversations}
            connectedUser={this.props.connectedUser}/>} />
        <Route
          path='/profile'
          component={() => <MyProfile
           />} />
        <Route
          path="/login"
          component={LoginScreen} />
        <Route
          path="/"
          component={HomeScreen} />
      </Switch>
    );
  }
}

export default AppContent;

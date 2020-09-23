import React from "react";
import { Switch, Route } from "react-router-dom";
import MyProfile from "../../profile/components/MyProfile";
import LoginScreen from "../../Login/components/LoginScreen";
import { HomeScreen } from "./HomeScreen";
import ChatUI from "../../conversation/components/ChatUI";





class AppContent extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path='/conversation/:conversationId'
          component={ChatUI} />
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

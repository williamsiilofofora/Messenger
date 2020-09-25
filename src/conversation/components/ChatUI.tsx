import React, { Fragment } from "react";
import { match, withRouter } from "react-router-dom";
import { patchConversationSeen, sendMessage } from "../../api/methods";
import { Loader } from "../../layout/utils/loader";
import { IConversation } from "../types";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { IAppState } from "../../appReducer";
import { connect } from "react-redux";
import {IConversationMessage } from "../types";
import { updateConversationWithNewMessage } from "../actions/updateConversationWithNewMessage";
import AttendeesList from "./AttendeesList";


// interface ChatUIState {
//  conversation?: IConversation; 
// }

interface ChatUIProps {
  match: match<{ conversationId: string }>;
  location: any;
  history: any;
  conversation?: IConversation;
  updateConversationMessage: (message: IConversationMessage) => void;
}

class ChatUI extends React.Component<ChatUIProps> {
  // connectedUser = this.state.conversation?._id
  constructor(props: ChatUIProps) {
    super(props);
    this.state = {};
  }

  conversationSeen = () => {
        if (this.props.conversation) {
          patchConversationSeen(this.props.conversation._id);
        }
  }
  doSendMessage = async (message: string) => {
    const { conversation } = this.props;
    if (conversation) {
      const sentMessage = await sendMessage(
        conversation._id,
        conversation.targets,
        message
      );
            this.props.updateConversationMessage(sentMessage);
    }
  };
  render() {
    const conversation = this.props;
    if (!conversation) { return <Loader />; }
    else {
    return (
      <div className="chatbox">
        <Fragment>
          <h1>Chat</h1>
          {this.props.conversation ? (
            <div className="chatbox-container">
              <Fragment>
                <ChatMessages
                  conversationSeen={this.conversationSeen}
                  messages={this.props.conversation.messages}
                  // users={this.props.users}
                />
                <ChatInput
                  doSendMessage={this.doSendMessage}
                  conversationId={this.props.match.params.conversationId}
                />
                <div style={{ height: "100%", flexGrow: 0, width: "15%" }}>
                  <AttendeesList targets={this.props.conversation?.targets} />
                </div>
              </Fragment>
            </div>
          ) : (
            <h1>Impossible de trouver la conversation</h1>
          )}
        </Fragment>
      </div>
    );
  }
}
}
const mapStateToProps = (
  { conversation }: IAppState,
  { match }: ChatUIProps
) => ({
  conversation: conversation.list.find(
    (conversation) => conversation._id === match.params.conversationId
  ),
});
const mapDispatchToProps = (dispatch: any) => ({
  updateConversationMessage: (message: IConversationMessage) =>
    dispatch(updateConversationWithNewMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatUI));

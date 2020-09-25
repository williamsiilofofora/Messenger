import React, { Fragment } from "react";
import { match, withRouter } from "react-router-dom";
import { patchConversationSeen, sendMessage } from "../../api/methods";
import { Loader } from "../../layout/utils/loader";
import { IConversation } from "../types";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import history from '../../history';
import { IAppState } from "../../appReducer";
import { connect } from "react-redux";


interface ChatUIState {
 conversation?: IConversation; 
}

interface ChatUIProps {
  match: match<{ conversationId: string }>;
  location: any;
  history: any;
  conversations: IConversation[];
}

class ChatUI extends React.Component<ChatUIProps, ChatUIState> {
  // connectedUser = this.state.conversation?._id
  constructor(props: ChatUIProps) {
    super(props);
    this.state = {};
  }

  conversationSeen = () => {
    if (this.state.conversation) {
      patchConversationSeen(this.state.conversation._id);
    }
  };

  componentDidMount() {
    const conversations = this.props.conversations;
    const conversationId = this.props.match.params.conversationId;
    let conversation = conversations.find(
      (conv) => conv._id === conversationId
    );
    if (!conversation) {
      const target = new URLSearchParams(this.props.location.search).get(
        "target"
      );
      if (!target) {
        return history.push("/");
      }
      conversation = {
        _id: conversationId,
        messages: [],
        unseenMessages: 0,
        updatedAt: new Date(),
        targets: [target],
      };
    }
    this.setState({ conversation: conversation });
  }
  doSendMessage = async (message: string) => {
    const { conversation } = this.state;
    if (conversation) {
      const sentMessage = await sendMessage(
        conversation._id,
        conversation.targets,
        message
      );
      this.setState({
        conversation: {
          ...conversation,
          messages: [...conversation.messages, sentMessage],
        },
      });
    }
  };
  render() {
    const conversation = this.props;
    if (!conversation) return <Loader />;
    return (
      <div className="chatbox">
        <Fragment>
          <h1>Chat</h1>
          {this.state.conversation ? (
            <div className="chatbox-container">
              <Fragment>
                <ChatMessages
                  conversationSeen={this.conversationSeen}
                  messages={this.state.conversation.messages}
                  // users={this.props.users}
                />
                <ChatInput
                  doSendMessage={this.doSendMessage}
                  conversationId={this.props.match.params.conversationId}
                />
                {/* <AttendeesList
              attendees={this.props.users.filter((user) =>
                this.state.conversation?.targets.includes(user._id)
              )}
            /> */}
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

const mapStateToProps = ({ conversation }: IAppState) => ({
  conversations: conversation.list,
});
export default connect(mapStateToProps)(withRouter(ChatUI));

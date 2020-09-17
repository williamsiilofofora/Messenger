import { List } from "@material-ui/core";
import React from "react";
import { getConversations } from "../../api/methods";
import { IProfile } from "../../profile/types";
import { User } from "../../users/types";
import { IConversation } from "../types";
import ConversationListItem from "./ConversationListItem";


interface ConversationListProps {
  users: User[];
  
}

interface ConversationListState {
  conversations: IConversation[];
  connectedUser: IProfile

}


class ConversationList extends React.Component<
  ConversationListProps,
  ConversationListState
> {
  constructor(props: ConversationListProps) {
    super(props);
    this.state = {
      conversations: [],
      connectedUser: this.state.connectedUser
      
    };
  }
  componentDidMount() {
    getConversations(this.state.connectedUser)
      .then((conversations) => this.setState({ conversations: conversations }))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <List>
        {this.state.conversations.map((conversation, index) => (
          <ConversationListItem
            users={this.props.users}
            conversation={conversation}
            key={index}
          />
        ))}
      </List>
    );
  }
}
export default ConversationList;
import * as React from "react";
import { User } from "../../users/types";
import { IConversationMessage } from "../types";

export interface IChatMessageProps {
  message: IConversationMessage;
  users: User[]
}

export default class ChatMessage extends React.Component<IChatMessageProps> {
  users = this.props.users.find(user => user._id === this.props.message.emitter)
 
  public render() {
    return (
      <div> 
      <div className="msg">
        {console.log(this.props.message.emitter)}
        {console.log(this.props.message.targets)}
        <div>
          {this.users?.lastname} {this.users?.firstname}
        </div>
        <div>{this.props.message.content}</div>
        </div>
      </div>
    );
  }
}

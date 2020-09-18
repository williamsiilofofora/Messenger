import * as React from "react";
import { User } from "../../users/types";
import { IConversationMessage } from "../types";

export interface IChatMessageProps {
  message: IConversationMessage;
  users: User[];
  connectedUser?: User;
}

export default class ChatMessage extends React.Component<IChatMessageProps> {
  users = this.props.users.find(user => user._id === this.props.message.emitter)

 
  public render() {
    let div;
    
    if (this.props.connectedUser) {
      if (this.props.message.emitter === this.props.connectedUser?._id) {
        div = <div className="blue">{this.props.message.content}</div>;
      } else {
        div = <div className="green">{this.props.message.content}</div>;
      }
   }
      return (
        <div>
          <div className="msg">
            {/* {console.log(this.props.message)} */}
            {console.log(this.props.message.emitter)}
            {console.log(this.props.message.targets)}
            <div>
              {this.users?.lastname} {this.users?.firstname}
              <span>{this.props?.message.createdAt}</span>
            </div>
            {div}
            {/* <div>{this.props.message.content}</div> */}
          </div>
        </div>
      )
  }
}

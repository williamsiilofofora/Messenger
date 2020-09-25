import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../../appReducer";
import { IProfile } from "../../profile/types";
import { User } from "../../users/types";
import { IConversationMessage } from "../types";


export interface IChatMessageProps {
  message: IConversationMessage;
  users: IProfile[];
  connectedUser?: User;
}

class ChatMessage extends React.Component<IChatMessageProps> {
  users = this.props.users.find(user => user._id === this.props.message.emitter)

 
  public render() {
    let div;
    
    if (this.props.connectedUser) {
      if (this.props.message.emitter === this.props.connectedUser?._id) {
        div = (
          <div className="blue">
            {this.users?.firstname} dit :<br />
            {this.props.message.content}
            <br />
            <div>
              <span>{this.props?.message.createdAt}</span>
            </div>
          </div>
        );
      } else {
        div = (
          <div className="green">
            {this.users?.firstname} dit :<br />
            {this.props.message.content}
            <br />
            <div>
              <span>{this.props?.message.createdAt}</span>
            </div>
          </div>
        );
      }
    }
    
      return (
        <div className="">
        
          <div className="msg">
            <div>
              {div}
            </div>
          </div>
        </div>
      )
  }
}

const mapStateToProps = ({ profile }: IAppState) => ({
  users: profile.list,
  connectedUser : profile.connectedProfile
});

export default connect(mapStateToProps)(ChatMessage);
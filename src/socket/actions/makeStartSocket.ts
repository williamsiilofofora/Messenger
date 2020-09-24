import { connect } from "../../api/socket_methods";
import { IAppState } from "../../appReducer";
import { updateConversationWithNewMessage } from "../../conversation/actions/updateConversationWithNewMessage";

import { IConversationMessage } from "../../conversation/types";

export function makeStartSocket() {
  return (dispatch: any, getState: () => IAppState) => {
    const socket = connect();

    socket.on("connect", () => {
      console.log("Received user connection");
    });

    socket.on("chat-message", (message: IConversationMessage) => {
      dispatch(updateConversationWithNewMessage(message));
    });
  };
} 
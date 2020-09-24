import { IConversationMessage,  UpdateConversationWithNewMessageAction,  UPDATE_CONVERSATION_WITH_MESSAGE } from "../types";

export function updateConversationWithNewMessage(
  message: IConversationMessage
): UpdateConversationWithNewMessageAction {
  return {
    type: UPDATE_CONVERSATION_WITH_MESSAGE,
    message: message,
  };
}
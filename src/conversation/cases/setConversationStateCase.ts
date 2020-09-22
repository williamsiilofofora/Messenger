import { IConversationAction, IConversationState } from "../types";

export function setConversationStateCase(
  state: IConversationState,
  action: IConversationAction
): IConversationState {
  return {
      ...state,
      conversations : action.conversations
  };
}

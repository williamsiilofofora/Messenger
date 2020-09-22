import { setConversationStateCase } from "./cases/setConversationStateCase";
import { IConversationAction, IConversationState, SET_CONVERSATION_STATE_ACTION } from "./types";
import { defaultConversationState } from "./utils/defaultConversationState";


export function conversations(
  state: IConversationState = defaultConversationState(),
  action: IConversationAction
): IConversationState {
  switch (action.type) {
    case SET_CONVERSATION_STATE_ACTION:
      return setConversationStateCase(state, action);

    default:
      return state;
  }
}

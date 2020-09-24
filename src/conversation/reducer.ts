
import { updateConversationListCase } from "./cases/updateConversationListCase";
import { updateConversationWithNewMessageCase } from "./cases/updateConversationWithNewMessageCase";
import { IConversationAction, IConversationState, UPDATE_CONVERSATION_LIST, UPDATE_CONVERSATION_WITH_MESSAGE} from "./types";
import { defaultConversationState } from "./utils/defaultConversationState";

export function conversation(state: IConversationState = defaultConversationState(), action: IConversationAction) : IConversationState{
  switch(action.type){
    case UPDATE_CONVERSATION_LIST:
          return updateConversationListCase(state, action);
    case UPDATE_CONVERSATION_WITH_MESSAGE:
          return updateConversationWithNewMessageCase(state, action);
    default:
      return state;
  }
}

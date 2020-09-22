import { IConversation, ISetConversationStateAction, SET_CONVERSATION_STATE_ACTION } from "../types";
import {} from "../../layout/types";

// -- Définition de l'action --
export function setConversationStateAction(
    conversations: IConversation[]
): ISetConversationStateAction {
    return {
        type: SET_CONVERSATION_STATE_ACTION,
        conversations : conversations,

    };
}
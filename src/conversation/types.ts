export interface IConversationState {
  list: IConversation[];
}


export const UPDATE_CONVERSATION_LIST = "UPDATE_CONVERSATION_LIST";
export interface UpdateConversationListAction {
  type: typeof UPDATE_CONVERSATION_LIST;
  conversations: IConversation[];
}

export interface IConversationMessage {
  _id: string;
  conversationId: string;
  createdAt: Date;
  emitter: string;
  targets: string[];
  content: string;
}

export interface IConversation {
  _id: string;
  targets: string[];
  updatedAt: Date;
  unseenMessages: number;
  messages: IConversationMessage[];
}

export const UPDATE_CONVERSATION_WITH_MESSAGE = "UPDATE_CONVERSATION_WITH_MESSAGE";
export interface UpdateConversationWithNewMessageAction {
  // conversation: IConversation[];
  type: typeof UPDATE_CONVERSATION_WITH_MESSAGE;
  message: IConversationMessage;
}
export type IConversationAction =
  | UpdateConversationListAction
  | UpdateConversationWithNewMessageAction;
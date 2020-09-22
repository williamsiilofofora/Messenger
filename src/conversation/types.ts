export const SET_CONVERSATION_STATE_ACTION = "SET_CONVERSATION_STATE_ACTION";

export interface ISetConversationStateAction {
  type: typeof SET_CONVERSATION_STATE_ACTION;
  conversations: IConversation[];
}

export interface IConversationState {
  conversations: IConversation[];
}
export type IConversationAction = ISetConversationStateAction;
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

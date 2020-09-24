import { IConversationState, UpdateConversationWithNewMessageAction } from "../types";

export function updateConversationWithNewMessageCase(
  state: IConversationState,
  action: UpdateConversationWithNewMessageAction
): IConversationState {
  const message = action.message
  const conversation = state.list.find(conv => conv._id !== message._id)
  if (conversation === undefined) {
    return {
      ...state, 
      list: [
        ...state.list,
        {
          _id: message.conversationId,
          targets: [
            ...message.targets,
            message.emitter
          ],
          unseenMessages: 1,
          updatedAt: message.createdAt,
          messages: [message]
        }
      ]
     }
   } else {

    return {
      ...state,
      list: [
        ...state.list.filter((conv) => conv._id !== message._id),
        {
          ...conversation,
          updatedAt: message.createdAt,
          messages: [...conversation.messages, message],
        },
      ],
    };
}}

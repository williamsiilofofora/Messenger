export interface IProfile {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    conversationsSeen?: {
        [conversationId: string] :string
    }
}


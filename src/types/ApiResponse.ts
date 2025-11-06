//:11
//src/types/ApiResponse.ts
// This defines a TypeScript interface to describe the shape of your API responses.

export interface ApiResponse {
    success: boolean;           // Indicates if the API call was successful
    message: string;            // A human-readable message from the API
    isAcceptingMessages?: boolean; // Optional field - whether user can receive messages
    messages: Array<Message>    // Array of message objects from your User model, from user.ts
}







// Field-by-field explanation:
// 1.success: boolean

//      true = API call worked as expected

//      false = Something went wrong

// 2.message: string

//      Contains status messages like "Messages fetched successfully" or "User not found"

// 3.isAcceptingMessages?: boolean (optional)

//      The ? makes this field optional

//      Might indicate if a user is currently accepting new messages

// 4.messages: Array<Message>

//      Contains actual message data

//      Message comes from your User model (likely defines message structure like id, content, timestamp, etc.)





// Why use this interface?
// Type Safety: Ensures your API responses always have the expected structure

// Auto-completion: Your code editor will suggest these fields

// Error Prevention: TypeScript will warn you if you try to access non-existent properties

// This interface helps maintain consistency across all your API responses in the project!
import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {  //an interface mande for "Message"
    content: string; //string in small for typescript
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({   // so if we have an interface designed for "schema" as defined in line 3, we have used this as: "Schema<Message>" as the Schema in line 3 was interface for messageschema, but here inthe same place if this would have be interface String, here it will be this: Schema<String>
    content: {
        type: String, //String in Capital letter for mongoose
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
})

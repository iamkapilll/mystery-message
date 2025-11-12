//model
//:1
import mongoose, { Schema, Document } from 'mongoose';

//defining interface for "Message":
export interface Message extends Document {  //an interface mande for "Message"
    content: string; //string in small for typescript
    createdAt: Date;
}

//schema for Message:
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



//defining interface for "User":
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];  //special type of array with haveing all the "messages" with defined type earlier as "MessageSchema"
}

//schema for User
const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'], // if no tyoed uernamed then shown as "Username is required"
        trim: true, // if user have more spaces
        unique: true, // name should be unique
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'], // u can use regrex for email from chatgpt or google
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify Code is required'],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema], //so the type for the 'messages' is array of kinda like custom data so this is "MessageSchema" from line 3, as there is defined the types for that
});




const UserModel = 
    (mongoose.models.User as mongoose.Model<User>) ||  // this line for, "if the UserModel is already existing and running the server"
    mongoose.model<User>('User', UserSchema);          // this line for, "if the UserModel is firstly making and running the server"
    //this will work as typescript as there is used type as "<User>"

    export default UserModel;
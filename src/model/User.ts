import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {  //an interface mande for "Message"
    content: string;
    createdAt: Date;
}

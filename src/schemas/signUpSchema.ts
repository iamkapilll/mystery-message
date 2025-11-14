//:2
import { email, z } from 'zod';

//username validation check from zod
export const usernameValidation = z  //only one value so we did not include the z.object
    .string()  //check if the username is string
    .min(2, 'Username must be atleast 2 characters')
    .max(20, 'Username must be no more than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');
    
    

//A sign up schema for signup
export const signUpSchema = z.object({
    username: usernameValidation, //from line 5

    email: z
    .string()
    .email({message: 'Invalid email address'}),
    password: z
    .string()
    .min(6, {message: 'Password must be at least 6 characters'}),

});

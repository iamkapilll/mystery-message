//:9
//src/helpers/sendVerificationEmails.ts

// This is the backend function that actually sends the email.
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";


import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(  //This async function takes three arguments:
    email: string,
    username: string,
    verifyCode: string  //OTP code
    //returns an object that matches ApiResponse.
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystery message | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        return {
            success: true,
            message: 'Verification email send successfully'
        }  //the "success" and "message" fields are already defined in ApiResponse.

    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return {
            success: false,
            message: 'Failed to send verification email'
        }

    }
}







// | File                            | Purpose                                                                                |
// | ------------------------------- | -------------------------------------------------------------------------------------- |
// | **`VerificationEmail.tsx`**     | React component to create a styled HTML verification email.                            |
// | **`ApiResponse.ts`**            | Defines a type for consistent API responses across your app.                           |
// | **`sendVerificationEmails.ts`** | Helper function that sends the verification email via Resend using the above template. |

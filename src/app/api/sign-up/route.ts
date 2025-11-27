//:12
//src/app/api/sign-up/route.ts
// 📦 Importing required modules
import dbConnect from '@/lib/dbConnect';               // Function to connect MongoDB
import UserModel from '@/model/User';                  // User model (schema for MongoDB)
import bcrypt from 'bcryptjs';                         // Library for password hashing (for security)
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail'; // Helper to send OTP email

// 🚀 This is the POST request handler for "/api/sign-up"
export async function POST(request: Request) {
  // ✅ Step 1: Connect to the MongoDB database
  await dbConnect();

  try {
    // 🧾 Step 2: Extract data (username, email, password) sent from the frontend (signup form)
    const { username, email, password } = await request.json();

    // 🔍 Step 3: Check if a verified user with this username already exists
    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,  // Only check among already verified users
    });

    // ⚠️ If username is already used by a verified user, return an error
    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 400 } // Bad request
      );
    }

    // 🔍 Step 4: Check if a user already exists with this email
    const existingUserByEmail = await UserModel.findOne({ email });

    // 🎲 Step 5: Generate a random 6-digit verification code (OTP)
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Example: if random = 0.4789 → 100000 + 478900 = 578900 → "578900"

    // 🧠 Step 6: Handle case where user with this email already exists
    if (existingUserByEmail) {

      // ✅ Case 1: The existing user is already verified → don't allow re-signup
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'User already exists with this email',
          },
          { status: 400 }
        );
      } 
      // 🛠️ Case 2: User exists but is not verified → update their old record
      else {
        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the old document fields
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour = 3600000 ms

        // Save updated user data to database
        await existingUserByEmail.save();
      }

    } 
    // 🆕 Step 7: If no user found by email → create a new one
    else {
      // Hash the password (for security)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Calculate OTP expiry time (1 hour from now)
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      // Create new user document using the Mongoose model
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,    // Store hashed password instead of plain text
        verifyCode,                  // The generated OTP
        verifyCodeExpiry: expiryDate,
        isVerified: false,           // Initially user is not verified
        isAcceptingMessages: true,   // Default value
        messages: [],                // Empty message array initially
      });

      // Save the new user document to the database
      await newUser.save();
    }

    // ✉️ Step 8: Send verification email (using the helper)
    const emailResponse = await sendVerificationEmail(
      email,        // recipient email
      username,     // for personalization
      verifyCode    // 6-digit OTP
    );

    // 🚫 If sending email fails → return error response
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 } // Internal server error
      );
    }

    // ✅ Step 9: Everything successful → send success response to frontend
    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 } // Created successfully
    );

  } catch (error) {
    // ❌ Step 10: If any error happens during the process
    console.error('Error registering user:', error);

    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      
      { status: 500 }
    );
  }
}










// Common Use Cases:

    // New User: Creates account → gets verification email → verifies → can receive messages

    // Existing Unverified User: Can update credentials and get new verification code

    // Verified User: Cannot register with same username/email
































// import dbConnect from "@/lib/dbConnect";  //database connection harek route ma lagxa
// import UserModel from "@/model/User";

// import bcrypt from "bcryptjs";
// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
// // import { date, success } from "zod";
// // import { da } from "zod/locales";


// export async function POST(request: Request) {
//     await dbConnect()

//     try {
//         const { username, email, password } = await request.json()

//         const existingUserVerifiedByUsername = await UserModel.findOne({
//             username,
//             isVerified: true
//         })

//         if (existingUserVerifiedByUsername) {
//             return Response.json({
//                 success: false, //user found so registration is not required or cannot be done(signup)
//                     message: 'Username is already taken'
//             },
//                 {
//                     status: 400
//                 })
//         }

//         const existingUserByEmail = await UserModel.findOne({email})

//         const verifyCode = Math.floor(100000 + Math.random()* 900000).toString()

//         if(existingUserByEmail){
//             if(existingUserByEmail.isVerified){
//                 return Response.json({
//                     success: false,
//                     message: "User already exist with this email"
//                 }, {status: 400})
//             }else{
//                 const hasedPassword = await bcrypt.hash(password, 10)

//                 existingUserByEmail.password = hasedPassword;
//                 existingUserByEmail.verifyCode = verifyCode;
//                 existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

//                 await existingUserByEmail.save()
//             }
//         }else{
//             const hasedPassword = await bcrypt.hash(password, 10)

//             const expiryDate = new Date()
//             expiryDate.setHours(expiryDate.getHours() + 1)

//             const newUser = new UserModel({
//                  username,
//                     email,
//                     password: hasedPassword,
//                     verifyCode,
//                     verifyCodeExpiry: expiryDate,
//                     isVerified: false,
//                     isAcceptingMessages: true,
//                     messages: [],
//             })
//             await newUser.save()
//         }
//         //send verificaion email
//         const emailResponse = await sendVerificationEmail(
//             email,
//             password,
//             verifyCode
//         )

//         if (!emailResponse.success){
//             return Response.json({
//                 success: false,
//                 message: emailResponse.message
//             }, {status: 500})
//         }
//         return Response.json({
//             success: true,
//             message: "User registered successfully, Please verify your email"
//         }, {status: 201})
        



//     } catch (error) {
//         console.error("Error registering user", error) //show in terminal
//         return Response.json( //show in browser
//             {
//                 success: false,
//                 message: 'Error registering user'
//             },
//             {
//                 status: 500
//             }
//         )
//     }

// }
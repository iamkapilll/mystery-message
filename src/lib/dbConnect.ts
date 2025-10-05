//7: src/lib/dbConnect

import mongoose from "mongoose";

// Define a TypeScript type to store the connection status
type ConnectionObject = {
  isConnected?: number; // Optional because it may not be set initially
};

// This object will keep track of our MongoDB connection
const connection: ConnectionObject = {};

/**
 * Connect to MongoDB using Mongoose
 * This function ensures we connect only once (singleton pattern)
 */
async function dbConnect(): Promise<void> {
  // If already connected, skip creating a new connection
  if (connection.isConnected) {
    console.log("✅ Already connected to the database");
    return;
  }

  try {
    // Try connecting using the MongoDB URI from environment variables
    // The second argument {} can contain connection options if needed
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    // Save the connection state (1 = connected)
    connection.isConnected = db.connections[0].readyState;

    console.log("🚀 Database connected successfully");
  } catch (error) {
    // If any error occurs, log it and stop the process
    console.error("❌ Database connection failed:", error);

    // Exit the Node.js process with an error code
    process.exit(1);
  }
}

// Export the function to use it in other files
export default dbConnect;




// Extra Tips
// Common readyState values:
//      0 = disconnected
//      1 = connected
//      2 = connecting
//      3 = disconnecting






// For Next.js, place this in /lib/mongodb.ts or /lib/dbConnect.ts, then import it in your API routes.


// Example usage:

// import dbConnect from "@/lib/dbConnect";

// export async function GET() {
//   await dbConnect();
//   // your DB operations here
// }
import User from "../../../../models/user.model";
import connectDB from "../../../../utils/db";

connectDB();

export async function POST(req) {
  try {
    const reqbody = await req.json();
    const { token } = reqbody;

    console.log("Received token:", token);

    const user = await User.findOne({
      verifytoken: token,
      verifytokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(user._id, {
      $set: { isVerified: true },
      $unset: { verifytoken: "", verifytokenExpiry: "" },
    });

    return new Response(
      JSON.stringify({ message: "Email verified successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during verification:", error.message);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error while verifying email",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// import connectDB from "../../../../../utils/db";
// import User from "../../../../../models/user.model";
// import bcryptjs from "bcryptjs";
// import sendEmail from "../../../../../utils/mailer";
// // import { NextResponse,NextRequest } from "next/server";
// connectDB();
// export async function POST(req, res) {
//   try {
//     const reqbody = await req.json();
//     const { username, email, password } = reqbody;
//     console.log(reqbody);
//     const user1 = await User.findOne({ email });
//     if (user1) {
//       return res.status(400).json({ message: "Email already exists" });
//     }
//     const salt = await bcryptjs.genSalt(10);
//     const hashedpasssword = await bcryptjs.hash(password, salt);
//     const user = await User.create({
//       username,
//       email,
//       password: hashedpasssword,
//     });
//     console.log(user);
//     await sendEmail({ email, emailtype: "Verify", userid: user._id });
//     return res
//       .status(200)
//       .json({ message: "User registered successfully", success: true, user });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal Server Error", error });
//   }
// }
import connectDB from "../../../../../utils/db";
import User from "../../../../../models/user.model";
import bcryptjs from "bcryptjs";
import sendEmail from "../../../../../utils/mailer";

connectDB();

export async function POST(req) {
  try {
    const reqbody = await req.json();
    const { username, email, password } = reqbody;

    console.log(reqbody);

    const user1 = await User.findOne({ email });
    if (user1) {
      return new Response(
        JSON.stringify({ message: "Email already exists" }),
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const usershow = await User.findOne({ email }).select("-password -__v  -verifytoken -verifytokenExpiry -forgotpasswordtoken -forgotpasswordtokenExpiry -createdAt -updatedAt");
    console.log(usershow);

    await sendEmail({ email, emailtype: "Verify", userid: user._id });

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        success: true,
        user:usershow,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}

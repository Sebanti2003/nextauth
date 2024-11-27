import connectDB from "../../../../../utils/db";
import User from "../../../../../models/user.model";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
connectDB();

export async function POST(req) {
  try {
    const reqbody = await req.json();
    const { email, password } = reqbody;
    console.log(reqbody);
    const user = await User.findOne({ email }).select("username email password _id");
    console.log(user);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 400,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 400,
      });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        maxAge: 24 * 60 * 60, // 1 day in seconds
        path: "/",
    })
    return new Response(
      JSON.stringify({ message: "Login successful", success: true }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

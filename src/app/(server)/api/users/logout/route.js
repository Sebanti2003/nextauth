import { cookies } from "next/headers";
import connectDB from "../../../../../utils/db";
connectDB();
export async function GET() {
  try {
    const response = new Response(
      JSON.stringify({ message: "Logout successful" }),
      {
        status: 200,
      }
    );
    cookies().set("token", "", {
      httpOnly: true,
      maxAge: 0,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

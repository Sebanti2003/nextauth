import connectDB from "../../../../../utils/db";
import jwt from "jsonwebtoken";
import User from "../../../../../models/user.model";

connectDB();

const getDatafromToken = async (req) => {
    try {
        const tokenCookie = req.cookies.get("token");
        if (!tokenCookie) {
            throw new Error("Token not found in cookies");
        }

        const token = tokenCookie.value;
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        const user = await User.findById(decoded.id).select(
            "-password -__v -verifytoken -verifytokenExpiry -forgotpasswordtoken -forgotpasswordtokenExpiry -createdAt -updatedAt"
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.error("Error in getDatafromToken:", error.message);
        throw error; // Propagate error to be handled by the caller
    }
};

export async function GET(req) {
    try {
        const user = await getDatafromToken(req);

        if (!user) {
            return new Response(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ user }),
            { status: 200 }
        );
    } catch (error) {
        console.error("GET / Error:", error.message);

        const statusCode = error.message.includes("Token")
            ? 401 
            : 500; 

        return new Response(
            JSON.stringify({ message: error.message || "Internal Server Error" }),
            { status: statusCode }
        );
    }
}

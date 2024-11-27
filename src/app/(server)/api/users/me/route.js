import connectDB from "../../../../../utils/db";
import jwt from "jsonwebtoken";
import User from "../../../../../models/user.model";
connectDB();

const getDatafromToken = async (req) => {
    try {
        const token = req.cookies.get("token").value;
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select("-password -__v -verifytoken -verifytokenExpiry -forgotpasswordtoken -forgotpasswordtokenExpiry -createdAt -updatedAt");
        return user;
    } catch (error) {
        console.log(error);
    }
};

export async function GET(req) {
    try {
        const user = await getDatafromToken(req);
        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}


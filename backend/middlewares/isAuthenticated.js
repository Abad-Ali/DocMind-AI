import jwt from "jsonwebtoken";

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;

        // If token is not present
        if(!token){
            return res.status(401).json({
                message:"Unauthenticated user",
                success: false
            });
        }

        // Decoding the token for verification
        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            });
        }

        // req.id = decode.userId;
        req.user = {
            id: decode.userId,
            role: decode.role
        };

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
          message: "Authentication failed",
          success: false,
        });
    }
}
export default isAuthenticated;
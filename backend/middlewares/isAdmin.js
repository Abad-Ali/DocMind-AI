const isAdmin = async(req,res,next)=>{
    try {
        if(req.user && req.user.role === "admin"){
            return next();
        }else{
            return res.status(403).json({
                message: "Access denied. Only Admin allowed",
                success: false
            });
        }
    } catch (error) {
        console.error("Admin check error:", error);
        return res.status(500).json({
          message: "Something went wrong in admin check",
          success: false,
        });
    }
}
export default isAdmin;
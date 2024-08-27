import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import UserModel from "../models/userModel.js"
dotenv.config()
// export const protectRoute = {
//     verifyToken: async (req, res, next) => {
//         try {
//             // leeys token JWT từ cookie và kiểm tra token có tồn tại không
//             const token = req.headers.token
//             console.log(token)
//             if (!token) {
//                 return res.status(401).json({ error: "Token không tồn tại" })
//             }

//             const decoded = jwt.verify(token, process.env.JWT_TOKEN_ACC)
//             console.log(decoded)
//             // Xác thực token bằng cách sử dụng khóa bí mật từ biến môi trường.
//             if (!decoded) {
//                 return res.status(401).json({ error: "Mã không hợp lệ" })
//             }
//             // tìm kiếm thông tin ng dùng sau khi token đc giải mã
//             const user = await UserModel.findById(decoded.id).select("-password") //Tìm người dùng trong cơ sở dữ liệu bằng ID đã được giải mã từ token và loại bỏ trường password khỏi kết quả trả về.
//             if (!user) {
//                 return res.status(404).json({ error: "không tim thấy người dùng" })
//             }
//             req.user = user
//             next()
//         } catch (error) {
//             console.log("lỗi middlware.", error.message)
//             res.status(500).json({ error: "lỗi máy chủ middleware" })
//         }
//     },

//     verifyTokenAndAdminAuth: (req, res, next) => {
//             protectRoute.verifyToken(req,res, ()=>{

//                  if(req.user.id== req.params.id || req.user.admin){
//                     next()
//                  }else{
//                     res.status(403).json("Bạn khhông phải admin ko thể xóa chính bạn hoặc ng khác")
//                  }
//             })
//     }   

// }

export const checkAuth = async(req,res,next) =>{
    try {
        if(req?.headers?.authorization?.split(" ")?.[1]){
            const token = req?.headers?.authorization?.split(" ")?.[1]
            if(!token){
                return res.status(403).json(
                   {
                     message:"Token không tồn tại "
                   }
                )
            }
            try {
                const decoded = await jwt.verify(token,process.env.JWT_TOKEN_ACC)
                const user = await UserModel.findOne({_id:decoded.id})
                req.user = user
                if(user.role == 'admin'){
                    next()
                }else{
                    return res.status(403).json({message:"Bạn không có quyền"})
                }
            } catch (error) {
                return res.status(403).json({message:"Token hết hạn / không hợp lệ "})
            }
        }else{
            return res.status(401).json({
                message:"Token không tồn tại"
            })
        }
    } catch (error) {
        return res.status(403).json({message:"Token hết hạn / không hợp lệ "})
    }
}

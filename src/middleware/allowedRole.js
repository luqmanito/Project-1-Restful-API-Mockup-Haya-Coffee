// misal ingin hanya role tertentu yg bisa create product (diperbolehkan)

// module.exports = (...allowedRole) => {
//     return (req, res, next) => {
//         const payload = req.userPayload
//         let isAllowedRole = false
//         for (let role of allowedRole) {
//             if (role !== payload.role) continue 
//             isAllowedRole = true
//             break
//         }
//         if(!isAllowedRole) return res.status(403).json({
//             msg: "Forbidden", data: null
//         })
//         next()
//     }
// }
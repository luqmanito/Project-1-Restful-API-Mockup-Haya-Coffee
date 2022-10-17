const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/images")
    },
    filename: (req, file, cb) => {
        const suffix = `${Date.now()}-${Math.round(Math.random()* 2e3)}`
        const ext = path.extname(file.originalname)
        const fileName = `${file.fieldname}-${suffix}${ext}`
        cb(null, fileName)
        
    }
})
const upload = multer({
    storage,
})

module.exports = upload
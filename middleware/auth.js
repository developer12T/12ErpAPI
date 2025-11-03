// middleware/auth.js
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/index')

// ✅ ใส่ path แบบเต็ม หรือแค่ prefix ก็ได้
const openPaths = ['/loginNew', '/erp/users/loginNew']

module.exports = function (req, res, next) {
  // ✅ ถ้า path เริ่มด้วย path ที่ยกเว้น → ข้ามได้
  if (openPaths.some(p => req.path.startsWith(p))) {
    return next()
  }

  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    console.error('❌ Invalid token:', err.message)
    res.status(403).json({ message: 'Invalid or expired token' })
  }
}

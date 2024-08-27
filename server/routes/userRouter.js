import express from 'express'
import { add, deleteUser, getAccount, getAllUser, getByIdUser, login, logout, register, requestRefreshToken, updateUser, updateUserStatus } from '../controllers/userController.js'
import { checkAuth } from '../middleware/checkAuth.js'

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getByIdUser)
router.get('/getaccount/user',checkAuth,getAccount)
router.delete('/delete/:id',  deleteUser)
router.put('/update/status/:id', updateUserStatus)
router.post('/add', add)
router.put('/update/:id', updateUser)
router.post('/register', register)
router.post('/login', login)
router.post('/logout',  logout)
router.post('/refresh', requestRefreshToken)

export default router
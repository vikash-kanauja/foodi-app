import express from 'express'
import { deleteUser, getuser } from '../controllers/Admin.js'
import isAdmin from '../middleware/verifyToken.js'

const AdminRoutes = express.Router()
AdminRoutes.get('/getuser', isAdmin , getuser)
AdminRoutes.post('/delete/:id', isAdmin , deleteUser)


export default AdminRoutes;
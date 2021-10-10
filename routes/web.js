const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')


const AdminOrderController = require('../app/http/controllers/admin/orderController')


//Middlewares
const auth = require('../app/http/middleware/auth')
const guest = require('../app/http/middleware/guest')
const admin = require('../app/http/middleware/admin')

function initRoutes(app) {
    
    app.get('/',homeController().index)
    
//app.get('/',(req,res)=>{
//    res.render('home')
//})

app.get('/cart', cartController().index)
//app.get('/cart',(req,res)=>{
   // res.render('customers/cart')
//})

app.get('/login',guest, authController().login)
app.post('/login', authController().postLogin)
//app.get('/login',(req,res)=>{
  //  res.render('auth/login')
//})

app.get('/register',guest, authController().register)
app.post('/register', authController().postRegister)
//app.get('/register',(req,res)=>{
//    res.render('auth/register')
//})

app.post('/logout', authController().logout)

app.post('/update-cart', cartController().update)

// customer routes
app.post('/orders',auth, orderController().store)
app.get('/customer/orders',auth, orderController().index)

// Admin routes
app.get('/admin/orders',admin, AdminOrderController().index)

}

module.exports = initRoutes
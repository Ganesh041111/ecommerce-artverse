const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const menuDatabase = require("../app/models/item");


const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')


//Middlewares
const auth = require('../app/http/middleware/auth')
const guest = require('../app/http/middleware/guest')
const admin = require('../app/http/middleware/admin')

function initRoutes(app) {
    
    app.get('/',homeController().index)
    


app.get('/cart', cartController().index)


app.get('/login',guest, authController().login)
app.post('/login', authController().postLogin)


app.get('/register',guest, authController().register)
app.post('/register', authController().postRegister)


app.post('/logout', authController().logout)

app.post('/update-cart', cartController().update)

// customer routes
app.post('/orders',auth, orderController().store)
app.get('/customer/orders',auth, orderController().index)
app.get('/customer/orders/:id',auth, orderController().show)

// Admin routes
app.get('/admin/orders',admin, adminOrderController().index)
app.post('/admin/order/status',admin, statusController().update)

  
app.get("/autocomplete/", function (req, res, next) {
  var regex = new RegExp(req.query["term"], "i");

  var a = menuDatabase
    .find({ name: regex }, { name: 1 })
    .sort({ updated_at: -1 })
    .sort({ created_at: -1 })
    .limit(20);
  a.exec(function (err, data) {
    // console.log(data);
    var result = [];

    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach((user) => {
          let obj = {
            id: user._id,
            label: user.name,
          };
          result.push(obj);
        });
      }
      // console.log(result)
      res.jsonp(result);
    }
  });
});

  app.get("/getData/:home", (req, res) => {
     menuDatabase.find({ name: req.params.home }, (err, data) => {
      res.render("search/searchPage", {
        dataList: data,
      });
      
    });
  }); 
  


   app.post("/adminUpdategetData", (req, res) => {
     let newForm = new menuDatabase({
       name: req.body.adminName,
       image: req.body.adminFile,
       price: req.body.adminPrice,
       code: req.body.adminCode,         //admin update size--code
       description: req.body.adminCode,
     });

     newForm.save();

     res.redirect("http://localhost:4900/admin/orders");
   });
}

module.exports = initRoutes
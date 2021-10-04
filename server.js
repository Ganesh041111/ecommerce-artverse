require('dotenv').config()
const express =  require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 4900
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDbStore = require('connect-mongo')
const flash = require('express-flash')



// Database connection
// const url = 'mongodb://localhost/store';
// mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('Database connected...');
// }).catch(err => {
//     console.log('Connection failed...')
// });

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
const connection = mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

//--//


// Or:

// mongoose.connect('mongodb://localhost:27017/store');
// try {
//   await mongoose.connect('mongodb://localhost:27017/store');
// } catch (error) {
//   handleError(error);
// }

// mongoose.connection.on('error', err => {
//     logError(err);
//   });
//--//

// Session store
// let mongoStore = new MongoDbStore({
//   mongooseConnection: connection,
//   collection: 'sessions'
// })


// session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoDbStore.create({
    mongoUrl: process.env.MONGO_CONNECTION_URL
  }),
  saveUninitialized:false,
  cookie:{maxAge: 1000 * 60 * 60 * 24}   // 24 hours
}))


app.use(flash())

//Assets
app.use(express.static('public'))
app.use(express.json())

//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine','ejs')



require('./routes/web')(app)


 



app.listen(PORT , () =>{
    console.log(`Listening on port ${PORT}`)
})
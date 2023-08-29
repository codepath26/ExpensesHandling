const express = require('express')
const fs =require('fs')
const path = require('path')
const userRoutes = require('./routes/expense')
const sequelize = require('./utils/database');
const helmet = require('helmet');
const compression = require('compression')
 const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const User = require('./models/user');
const DowHistory = require('./models/historyDowload')
const ForgotPassword = require('./models/forgotpass');
const ForgotPasswordRoutes = require('./routes/changePass');
const Order = require('./models/order');
const Expense = require('./models/appo-Details');
 
 const accessLogStream =  fs.createWriteStream(
  path.join(__dirname ,'access.log'),
  {flags : 'a'}
 );

const app = express()
app.use(bodyParser.json());   
const port = 9000 
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream : accessLogStream}))
app.use(userRoutes);
app.use(loginRoutes);
app.use('/password', ForgotPasswordRoutes);
User.hasMany(Expense)
Expense.belongsTo(User , { onDelete: 'CASCADE'})
User.hasMany(Order)
Order.belongsTo(User , { onDelete: 'CASCADE'});
User.hasMany(ForgotPassword);
User.hasMany( DowHistory),
DowHistory.belongsTo(User , {onDelete : 'CASCADE'});
ForgotPassword.belongsTo(User ,{ onDelete: 'CASCADE'});
sequelize.sync();
app.listen(process.env.PORT || port)
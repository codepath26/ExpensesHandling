const express = require('express')
const userRoutes = require('./routes/expense')
const sequelize = require('./utils/database');
const cors = require('cors')
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const User = require('./models/user');
const DowHistory = require('./models/historyDowload')
const ForgotPassword = require('./models/forgotpass');
const ForgotPasswordRoutes = require('./routes/changePass');
const Order = require('./models/order');
const Expense = require('./models/appo-Details');

const app = express()
app.use(bodyParser.json());   
const port = 9000 
app.use(cors());
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
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
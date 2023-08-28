require('dotenv').config(); 
const Expenses = require("../models/appo-Details");
const User = require("../models/user");
const sequelize = require('../utils/database');





exports.getDetails = async (req, res, next) => {
  try {
    // console.log(req.user.userId , "this");
    let data = await Expenses.findAll({ where: { userId: req.user.userId } });
   
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "user not able to create" });
  }
};



exports.postDetail = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const id = req.user.userId
    const user = await User.findByPk(id);
    const { amount, description, category } = req.body;
    console.log(`this is the adding amount ==> ${amount}`)
    console.log(`this is TotalExpenses amount ==> ${user.totalExpenses}`)
    
     let total = user.totalExpenses + parseInt(amount);
     console.log(`this is the total wnated to add ==>${total}`);
     await  user.update({totalExpenses : total },{
        transaction : t
      });
 
    const newUser = await Expenses.create({
      amount: amount,
      description: description,
      category: category,
      userId: user.id,
    },{ transaction: t });
    await t.commit();
    res.status(201).json(newUser); // Assuming you want to send the created user back
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: "internal server error" });
  }
};




exports.deletDetail = async (req, res, next) => {

  const listId = req.params.id;
 
  try {
    const expense = await Expenses.findOne({ where: { id: listId } });
     const id = expense.userId;
    const user =  await User.findByPk(id);
    // console.log(user.totalExpenses)
    // console.log(parseInt(expense.amount))
    const expenseAmount = parseInt(expense.amount)
    let total = user.totalExpenses - expenseAmount ;
    // console.log(total)
    // console.log(typeof(total))
    user.update({totalExpenses : total})
    expense.destroy();
    return res.status(200).json({ message: "data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error Deleting data" });
   }
};
exports.updateDetail = async (req, res, next) => {
  try {
 
  const listtId = req.params.id;
  let expense = await Expenses.updateByPk(listtId);
  const id = expense.userId;
  const user = User.findByPk(id);
  const expenseAmount = parseInt(expense.amount)
  let total = user.totalExpenses - expenseAmount ;
  user.update({totalExpenses : total})
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ err: "Error Updating data" });
  }
};

exports.getDetailsbyId = async (req, res) => {
  try {
    let getId = req.params.id;
    let expense = await Expenses.findOne({ where: { id: getId } });
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ err: "Error getting data" });
  }
};

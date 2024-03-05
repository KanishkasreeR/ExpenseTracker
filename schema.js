const mongoose = require('mongoose')
const expenseTrackerSchema =  mongoose.Schema({
      amount : {
        type : Number
      },
      category : {
        type : String
      },
      date : {
        type : String
      }
})

const Expense = mongoose.model('ExpenseDetails',expenseTrackerSchema) //1st parameter - collection name 2nd parameter - schema name

//Exporting
module.exports = {Expense}
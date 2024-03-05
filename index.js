/**
 * Expense tracker
 * 
 * Adding a new expense/income : /add-expens [Post]
 * Displaying existing expenses : /get-expense [Get]
 * Editing existing entries : /edit-expense [Patch/Put] we can edit/delete using post,to be more specific we are using put/patch
 * Deleting exenses : /delete-expense [Delete]
 * 
 * Budget reporting
 * Login/SignUp
 */

const express = require('express')
const mongoos = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const {Expense} =  require('./schema.js')
const app = express()
app.use(bodyparser.json())
app.use(cors())

async function connectDB(){
try{
        await mongoos.connect('mongodb+srv://kanishka:Aqpfk15rpTGS578W@cluster05.pgwmpx4.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster05')
        const port = process.env.PORT || 8000
        console.log('DB Connection Established :)')
        app.listen(port,function(){
            console.log(`Listening on port ${port}`)
        })
    }
catch(error){
   console.log(error)
   console.log("Can't Establish Connection")
}
}
connectDB()

app.post('/addexpense',async function(request,response){
    // console.log(request.body)
    // response.json({
    //     "Status" : "Inserting Data"
    // })
    //Queries are async functions
    try{
        await Expense.create({
            'amount' : request.body.amount,
            'category' : request.body.category,
            'date' : request.body.date
        })
        response.status(201).json({'status' : 'inserted successfully','message' : 'one entry created'})
    }
    catch(error){
        response.status(500).json({'status' : 'Failure','message' : 'entry not created','error' : error})
    }
    
})

app.get('/getexpense',async function(request,response){
   try{
      const data = await Expense.find()
       response.status(200).json(data)
   }
   catch(error){
       response.status(500).json({'status' : 'failure','message' : 'entry not found','error' : error})
   }
})

app.delete('/deleteexpense/:id',async function(request,response){
    try{
       const data = await Expense.findById(request.params.id)
       if(data){
        await Expense.findByIdAndDelete(request.params.id)
        response.status(200).json({'status' : 'success','message' : 'entry deleted'})
       }
       else{
        response.status(404).json({'status' : 'failure','message' : 'file not found'})
       }
    }
    catch(error){
        response.status(500).json({'status' : 'failure','message' : 'could not delete entry','error' : error})
    }
})

app.patch('/editexpense/:id',async function(request,response){
    try{
      const data = await Expense.findById(request.params.id)
      if(data){
        await data.updateOne({
         'amount' : request.body.amount,
         'category' : request.body.category,
         'date' : request.body.date
        })
        response.status(404).json({'status' : 'success','message' : 'entry updated'})
      }
      else{
        response.status(404).json({'status' : 'failure','message' : 'file not found'})
      }
    }
    catch(error){
        response.status(500).json({'status' : 'failure','message' : 'could not update entry','error' : error})
    }
})
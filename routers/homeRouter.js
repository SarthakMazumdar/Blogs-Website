const express = require('express');
const Router = express.Router();
const homeSchema = require('../models/homeSchema'); 


Router.get('/',(error,response)=>{
    response.render('register',{title:'Fill Form',password:'',email:''})
})

Router.post('/register',async(request,response)=>{
    try{
        const {
            name,
            email,
            password,
            phone
        } = request.body;

        const userData = new homeSchema({
            name,
            email,
            password,
            phone
        })
        userData.save()
          
    }catch(error){
        response.render('new',{title:'Error in code',password:'',email:''})
    }
})

module.exports = Router;
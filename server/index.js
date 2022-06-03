const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({

    host: "localhost",
    user: "root",
    password: "RootRoot123",
    database: "learncrud_contact"
});



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));



//get All Data
app.get('/get/customer',(req,res)=>{

    const SqlgetContact = "select * from contact";
    
    db.query(SqlgetContact,(error,result)=>{

        res.send(result);


    })
})

//get Data with specific id
app.get('/get/customer/:id',(req,res)=>{
    const{id} = req.params;
    const SqlgetContact = "select * from contact where id = ?";
    db.query(SqlgetContact, id, (error,result)=>{
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})

//insert Data
app.post('/api/post/customer',(req,res)=>{

    const {name, lastname, phone_num} = req.body
    const SqlCreateCustomer= "insert into contact (name, lastname, phone_num, reg_date) values (?, ?, ?, now())";
 
    db.query(SqlCreateCustomer,[name, lastname, phone_num],(error,result)=>{
        if (error) {

            console.log(error);
            
        }
    })
})


//Update Data
app.put('/put/customer/:id',(req,res)=>{
    const{id} = req.params;
    const {name, lastname, phone_num} = req.body
    const SqlUpdate = "update contact set name = ?, lastname = ?, phone_num = ?  where id = ?";
    db.query(SqlUpdate, [name, lastname, phone_num,id], (error,result)=>{
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})

app.delete('/delete/customer/:id',(req,res)=>{
    const{id} = req.params;
    const SqlDeleteContact = "delete from contact where id = ?";
    db.query(SqlDeleteContact, id, (error,result)=>{
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})

app.listen(5000, ()=>{

    console.log('Server is Running on port 5000 test');

})
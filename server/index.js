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

app.get("/",(req,res)=>{

    const sqlInsert = "INSERT INTO contact (name, lastname, phone_num, reg_date) values ('Peter','Griffin','087662312',now())"
    
    db.query(sqlInsert,(error,result)=>{

        console.log("error",error);
        console.log('result',result);
        res.send('success')

    })

})


app.get('/customer',(req,res)=>{

    const SqlgetContact = "select * from contact";
    
    db.query(SqlgetContact,(error,result)=>{

        res.send(result);


    })



})

app.post('/post/customer',(req,res)=>{

    const {name, lastname, phone_num} = req.body
    const SqlCreateCustomer= "insert into contact (name, lastname, phone_num, reg_date) values (?, ?, ?, now())";
    
    db.query(SqlCreateCustomer,[name, lastname, phone_num],(error,result)=>{
        if (error) {

            console.log(error);
            
        }
    })
})


app.listen(5000, ()=>{

    console.log('Server is Running on port 5000 test');

})
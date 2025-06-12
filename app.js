const express = require('express');
const mongoose = require('mongoose');
const bodypraser = require('body-parser');

const app = express();


const PORT = 5000;

app.use(bodypraser.json())

mongoose.connect('mongodb+srv://jayanthjh2004:NfVawFHNVxNJ0w04@cluster0.8cjl7ba.mongodb.net/cotactDB')
   .then(() =>{
console.log('Connected to mongo db');
   })
.catch(err =>{
    console.error('Mongodb connection error:', err);
})
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
})
const Contact = mongoose.model('Contact',contactSchema)

app.get('/api/contacts', async(req,res) => {
try{
    const contacts = await Contact.find();
    res.json(contacts);
}catch(err) {
    res.status(500).json({ error: 'Server error' });
}
})

app.post('/api/contacts',async(req,res) =>{
     try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json('Sucessfully connected');
     } catch (err) {
        res.status(500).json({ error: 'Server error' });
     }
})

//app.delete(() =>{})

app.get('/api', (req,res) => {
    res.json({
        message:'Hello from the Thru App!'
    });
})

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
;})
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI


mongoose.connect(url)
    .then(result =>{
        console.log("Connected to mongoDB")
    })
    .catch(error => {
        console.log("Error while connecting to mongoDB", error.message)
    })


const PersonSchema = new mongoose.Schema({
    name : {
        type: String,
        minLength: 3,
        required : true
    }, 
    number: {
        type: String, 
        validate : function(v) {
            return /^\d{2,3}-\d{5,}$/.test(v);
        }, 
        message: props => `${props.value} is not a valid phone number!`
    }
})


PersonSchema.set('toJSON', {
    transform : (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})



module.exports = mongoose.model('Person', PersonSchema)

const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log("Insert password")
    process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String, 
    number: String
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length == 5){
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const person = new Person({
        name : newName,
        number: newNumber
    })

    person.save().then(result =>{
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
    })
}

else if(process.argv.length === 3){
    Person.find({}).then(result =>{
        result.forEach(element => {
            console.log(element)
        });
        mongoose.connection.close()
    })
}

else{
    console.log('Invalid number of arguments')
    mongoose.connection.close()
}
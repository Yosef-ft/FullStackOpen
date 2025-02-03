require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/persons')
var morgan = require('morgan')

const app = express()


const unknownEndpoint = (request, response ) =>{
    response.status(404).send({
        error : 'Unknown endpoint'
    })
}

const errorHandler = (error, request, response, next) =>{
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      } 
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }

    next(error)

}

// Middlewares
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', function (req, res) { 
    if (req.method === 'POST'){
        return JSON.stringify(req.body)
    }
    return ;
})
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['body'](req, res)
    ].join(' ')
  }))



const generateID = (min=1, max=9999) => {
    return Math.floor(Math.random() * (max-min) + min);
}


app.get('/api/persons', (req, res) =>{
    Person.find({}).then(person =>{
        res.json(person)
    })
})


app.get('/api/info', (req, res) =>{

    Person.find({}).then(persons =>{
        const size = persons.length

        res.send(
            `
            <div>
                <p>Phonebook has info for ${size} people</p>
                <p>${Date().toString()}</p>
            </div>
            `
        )
    })
})
 

app.get('/api/persons/:id', (req, res, next) =>{
    Person.findById(req.params.id).then(person =>{
        if (person){
            res.json(person)
        }else{
            res.status(404).end()
        }
    })
    .catch(error =>{
        console.log(error)
        next(error)
    })
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
});


app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'content missing' });
    }

    // const existing = persons.find(person => person.name === body.name);
    // if (existing) {
    //     return res.status(409).json({ error: 'name must be unique' }); 
    // }

    // const person = {
    //     name: body.name,
    //     number: body.number,
    //     id: generateID()
    // };

    // persons = persons.concat(person); 

    // res.json(person);

    const person = new Person({
        name : body.name,
        number : body.number
    })

    person.save().then(savedPerson =>{
        res.json(savedPerson)
    })
    .catch(error => next(error))
}) 


app.put('/api/persons/:id', (req,res, next) => {

    const body = req.body

    const person = {
        name : body.name,
        number : body.number
    }


    Person.findByIdAndUpdate(req.params.id, person, {new:true})
        .then(updatedNote =>{
            res.json(updatedNote)
        })
        .catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`App running on port ${PORT}`)
})
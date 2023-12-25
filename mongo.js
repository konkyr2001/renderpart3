const mongoose = require('mongoose')

const url = process.env.URL
console.log('url = ',url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to database ',result)
    })
    .catch((result) => {
        console.log('error: ',result.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate : {
            validator: function(v) {
                return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Pesons', personSchema, 'person')
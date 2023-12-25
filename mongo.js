const mongoose = require('mongoose')

const url2 = process.env.URL
console.log('url = ',url2)
const url = 'mongodb+srv://konkyr2001:101draziw@cluster0.0jwdmbj.mongodb.net/Persons?retryWrites=true&w=majority'
console.log('url = ',url)
mongoose.connect(url)
    .then(() => {
        console.log('connected to database ',url)
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
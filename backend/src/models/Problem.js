import mongoose from 'mongoose'

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    code: {
        type: String,
        default: ''
    },
    // test_cases: {}
})

const Problem = mongoose.model('Problem', problemSchema)

export default Problem
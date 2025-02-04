import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    jobID: {
        type: String,
        required: true,
        ref: 'Job'
    },
    candidateID: {
        type: String,
        required: true,
        ref: 'User'
    },
    username: { // New field for storing username
        type: String
    },
    applicationStatus: {
        type: String,
        required: true,
    },
    applicationForm: [{ 
        question: { type: String }, 
        answer: { type: String } 
    }],
    candidateFeedback: [{ 
        question: { type: String }, 
        answer: { type: String } 
    }],
});

const Application = mongoose.model('Application', ApplicationSchema);

export default Application;

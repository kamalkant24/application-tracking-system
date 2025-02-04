import Application from '../../models/Application.js';
import User from '../../models/User.js';
import mongoose from 'mongoose';

const addApplication = async (req, res) => {
    const { _id, jobID, candidateID, applicationStatus, applicationForm, candidateFeedback } = req.body;

    try {
        let username = '';

        // Fetch username based on candidateID
        if (candidateID) {
            const user = await User.findById(candidateID);
            if (user) {
                username = user.userName; // Ensure this matches the field in your User model
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        }

        if (!_id) {
            // Create a new application
            const newApplication = new Application({
                jobID,
                candidateID,
                username, // Save username
                applicationStatus: applicationStatus || "new",
                applicationForm: applicationForm || [],
                candidateFeedback: candidateFeedback || []
            });

            await newApplication.save();
            return res.status(201).json(newApplication);
        }

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid application ID" });
        }

        const existingApplication = await Application.findById(_id);
        if (!existingApplication) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Update application fields
        if (jobID) existingApplication.jobID = jobID;
        if (candidateID) {
            existingApplication.candidateID = candidateID;
            existingApplication.username = username; // Use the correct variable
        }
        if (applicationStatus) existingApplication.applicationStatus = applicationStatus;
        if (applicationForm) existingApplication.applicationForm = applicationForm;
        if (candidateFeedback) existingApplication.candidateFeedback = candidateFeedback;

        await existingApplication.save();
        res.status(200).json(existingApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addApplication };

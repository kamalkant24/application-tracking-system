// import Application from '../../models/Application.js'
// import uniqid from 'uniqid';

// const addApplication = async (req, res) => {
//     const { _id, jobID, candidateID, applicationStatus, applicationForm, candidateFeedback } = req.body;

//     try {
//         const existingApplication = await Application.findById(_id);
//         if (!existingApplication) {
//             return res.status(404).json({ message: "Application not found" });
//         }
        
//         if (jobID) {
//             existingApplication.jobID = jobID;
//         }
//         if (candidateID) {
//             existingApplication.candidateID = candidateID;
//         }
//         if (applicationStatus) {
//             existingApplication.applicationStatus = applicationStatus;
//         }
//         if (applicationForm) {
//             existingApplication.applicationForm = applicationForm;
//         }
//         if (candidateFeedback) {
//             existingApplication.candidateFeedback = candidateFeedback;
//         }

//         await existingApplication.save();
//         res.status(200).json(existingApplication);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export {addApplication};

import Application from '../../models/Application.js';
import mongoose from 'mongoose';

const addApplication = async (req, res) => {
    const { _id, jobID, candidateID, applicationStatus, applicationForm, candidateFeedback } = req.body;

    try {
        // If no _id is provided, assume this is a new application
        if (!_id) {
            const newApplication = new Application({
                jobID,
                candidateID,
                applicationStatus: applicationStatus || "new", // Default to "new" status if not provided
                applicationForm: applicationForm || [],
                candidateFeedback: candidateFeedback || []
            });

            await newApplication.save();
            return res.status(201).json(newApplication);
        }

        // Validate the provided _id if present
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid application ID" });
        }

        // Find the application by ID
        const existingApplication = await Application.findById(_id);
        if (!existingApplication) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Update the application fields if provided
        if (jobID) {
            existingApplication.jobID = jobID;
        }
        if (candidateID) {
            existingApplication.candidateID = candidateID;
        }
        if (applicationStatus) {
            existingApplication.applicationStatus = applicationStatus;
        }
        if (applicationForm) {
            existingApplication.applicationForm = applicationForm;
        }
        if (candidateFeedback) {
            existingApplication.candidateFeedback = candidateFeedback;
        }

        // Save the updated application
        await existingApplication.save();
        res.status(200).json(existingApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addApplication };

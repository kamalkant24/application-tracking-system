// import Job from '../../models/Job.js'

// const updateJob = async (req, res) => {
//     try {
//         const { jobId, jobTitle, employmentType, location, salary, description, applicationForm, applicants } = req.body;

//         const updatedJob = await Job.findByIdAndUpdate(jobId, {
//             jobTitle,
//             employmentType,
//             location,
//             salary,
//             description,
//             applicationForm,
//             applicants
//         }, { new: true });

//         res.status(200).json(updatedJob);
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

// export { updateJob };
import Job from '../../models/Job.js';

const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id; // This is the custom jobID, not the MongoDB _id
        const { jobTitle, employmentType, location, salary, description, applicationForm, applicants } = req.body;

        const updatedJob = await Job.findOneAndUpdate(
            { jobID: jobId }, // Find job by custom jobID
            {
                jobTitle,
                employmentType,
                location,
                salary,
                description,
                applicationForm,
                applicants
            },
            { new: true } // Return the updated document
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { updateJob };

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

export const ApplicationForm = () => {
    const { id } = useParams();
    const [job, setJob] = useState({ jobTitle: "", applicationForm: [] });
    const [candidateID, setCandidateID] = useState("");
    const [redirect, setRedirect] = useState(false);

    // Fetching all users to set candidateID (assuming the first user is the candidate)
    useEffect(() => {
        fetch("http://localhost:8000/users/all-users")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setCandidateID(data[0]._id); // Assuming first user is the candidate
                }
            })
            .catch((error) => console.log("Error fetching users:", error));
    }, []);

    // Fetching job data including applicationForm
    useEffect(() => {
        fetch(`http://localhost:8000/jobs/current-job/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched job data:", data); // Log the full job data to debug
                if (data && typeof data === "object") {
                    // Check if applicationForm is populated and handle edge cases
                    const applicationForm = Array.isArray(data.applicationForm) ? data.applicationForm : [];
                    if (applicationForm.length === 0) {
                        console.warn("No questions in applicationForm.");
                    }
                    setJob({
                        jobTitle: data.jobTitle || "No Title Available",
                        applicationForm: applicationForm.map(q => ({ question: q.question || "No question provided", answer: "" }))
                    });
                } else {
                    console.error("Invalid job data:", data);
                }
            })
            .catch((error) => console.log("Error fetching job data:", error));
    }, [id]);

    // Setting up the form with react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            candidateID: "",
            jobID: "",
            applicationStatus: "active",
            applicationForm: [],
            candidateFeedback: []
        }
    });

    // Redirect after form submission
    useEffect(() => {
        if (redirect) {
            setTimeout(() => {
                window.location.href = "/"; // Redirect after 2 seconds
            }, 2000);
        }
    }, [redirect]);

    // Handle form submission
    const onSubmit = async (data) => {
        const newData = { ...data, jobID: id, candidateID };

        // Send the application data
        await fetch("http://localhost:8000/application/post-application", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        });

        // Update job status
        await fetch("http://localhost:8000/jobs/update-job-by-candidate", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobID: id, candidateID, status: "active" }),
        });

        // Update user status
        await fetch("http://localhost:8000/users/update-user-by-candidate", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobID: id, candidateID, status: "active" }),
        });

        // Redirect after all operations are completed
        setRedirect(true);
    };

    return (
        <div className="container mt-2 mx-auto">
            <div className="bg-gray-200 p-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-xl font-bold text-center">Application Form</h1>
                    <h1 className="text-md font-bold text-center text-gray-700">{job.jobTitle} Role</h1>
                    <h1 className="text-sm italic mt-4">Answer below questions to proceed</h1>

                    {Array.isArray(job.applicationForm) && job.applicationForm.length > 0 ? (
                        job.applicationForm.map((q, index) => (
                            <RenderQuestion
                                key={index}
                                index={index}
                                question={q.question}
                                register={register}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No questions available for this job.</p>
                    )}

                    <div className="flex justify-center my-8">
                        <button type="submit" className="bg-primary text-white py-3 px-16 rounded-md">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function RenderQuestion({ index, question, register }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 pt-2">
            <label className="block mt-2">
                {index + 1}. {question || "No question provided"}
            </label>
            <div className="flex gap-4">
                <label>
                    <input {...register(`applicationForm.${index}.answer`, { required: true })} type="radio" value="Yes" />
                    Yes
                </label>
                <label>
                    <input {...register(`applicationForm.${index}.answer`, { required: true })} type="radio" value="No" />
                    No
                </label>
            </div>
        </div>
    );
}

export default ApplicationForm;

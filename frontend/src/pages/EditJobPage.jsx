import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${id}`);
      if (response.ok) {
        const job = await response.json();
        setJobTitle(job.title);
        setJobType(job.type);
        setJobDescription(job.description);
        setCompanyName(job.company.name);
        setContactEmail(job.company.contactEmail);
        setContactPhone(job.company.contactPhone);
      }
    } catch (error) {
      console.error("Failed to fetch job");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const updatedJob = {
      title: jobTitle,
      type: jobType,
      description: jobDescription,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };

    updateJob(updatedJob);
    navigate(`/jobs/${id}`);
  };

  const updateJob = async (job) => {
    let user = localStorage.getItem("user");
    const token = await JSON.parse(user).token;

    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        console.error("Failed to update job");
      }
    } catch (error) {
      console.error("Failed to update job");
    }
  };

  return (
    <div className="create">
      <h2>Update Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <label>Job type:</label>
        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <button>Update Job</button>
      </form>
    </div>
  );
};

export default EditJobPage;

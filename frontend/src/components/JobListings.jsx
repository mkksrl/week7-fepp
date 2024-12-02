import { useState, useEffect } from "react";
import JobListing from "./JobListing";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobListing
          key={job.id}
          id={job.id}
          title={job.title}
          type={job.type}
          description={job.description}
          company={job.company.name}
        />
      ))}
    </div>
  );
};

export default JobListings;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function JobPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('Full-Time');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

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
      console.error('Failed to fetch job');
    }
  };

  const deleteJob = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Job deleted');
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to delete job');
    }
  };

  return (
    <div className='create'>
      <h2>{jobTitle}</h2>
      <br />
      <p>Job type: {jobType}</p>
      <br />
      <p>Job Description: {jobDescription}</p>
      <br />
      <p>Company Name: {companyName}</p>
      <br />
      <p>Contact Email: {contactEmail}</p>
      <br />
      <p>Contact Phone: {contactPhone}</p>
      <br />
      <button onClick={() => navigate(`/edit-job/${id}`)}>Update job</button>
      <button onClick={deleteJob}>Delete job</button>
    </div>
  );
}
export default JobPage;

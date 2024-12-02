import { useState } from 'react';

const AddJobPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('Full-Time');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    const newJob = {
      title: jobTitle,
      type: jobType,
      description: jobDescription,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };

    addJob(newJob);
    console.log('submitForm called');
    setJobTitle('');
    setJobType('Full-Time');
    setJobDescription('');
    setCompanyName('');
    setContactEmail('');
    setContactPhone('');
  };

  const addJob = async (job) => {
    try {
      const response = await fetch('http://localhost:4000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        console.error('Failed to add job');
      }
    } catch (error) {
      console.error('Failed to add job');
    }
  };

  return (
    <div className='create'>
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type='text'
          required
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <label>Job type:</label>
        <select onChange={(e) => setJobType(e.target.value)}>
          <option value='Full-Time'>Full-Time</option>
          <option value='Part-Time'>Part-Time</option>
          <option value='Remote'>Remote</option>
          <option value='Internship'>Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
        <label>Company Name:</label>
        <input
          type='text'
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type='text'
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          type='text'
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;

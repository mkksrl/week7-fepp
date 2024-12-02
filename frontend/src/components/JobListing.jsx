const JobListing = ({ title, type, description, company }) => {
  return (
    <div className='job-preview'>
      <h2>{title}</h2>
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      <p>Company: {company}</p>
    </div>
  );
};

export default JobListing;

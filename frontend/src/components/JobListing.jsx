import { Link } from "react-router-dom";

const JobListing = ({ id, title, type, description, company }) => {
  return (
    <div className="job-preview">
      <Link to={`/jobs/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      <p>Company: {company}</p>
    </div>
  );
};

export default JobListing;

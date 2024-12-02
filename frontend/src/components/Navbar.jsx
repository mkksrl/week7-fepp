const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <a href="/">Home</a>
        {isAuthenticated && <a href="/add-job">Add Job</a>}
        {isAuthenticated && (
          <a
            href="/"
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem("user");
            }}
          >
            Logout
          </a>
        )}
        {!isAuthenticated && <a href="/signup">Signup</a>}
        {!isAuthenticated && <a href="/login">Login</a>}
      </div>
    </nav>
  );
};

export default Navbar;

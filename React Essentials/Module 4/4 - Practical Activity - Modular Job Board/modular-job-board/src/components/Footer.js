import React from 'react';

function Footer({ jobCount }) {
  return (
    <footer className="footer">
      <p>{jobCount} {jobCount === 1 ? 'job' : 'jobs'} on the board · Built with React</p>
    </footer>
  );
}

export default Footer;

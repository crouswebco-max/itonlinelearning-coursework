import React from 'react';

// Task 7: shows one job's activity and categories
function JobCard({ job, onEdit, isEditing }) {
  // Bonus 2: remember which job is being dragged
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', String(job.id));
  };

  return (
    <div className={isEditing ? 'job-card job-card--editing' : 'job-card'} draggable onDragStart={handleDragStart}>
      <h3>{job.activity}</h3>
      <div className="categories">
        {job.categories.map((category) => (
          <span key={category} className="category">
            {category}
          </span>
        ))}
      </div>
      {/* Bonus 1: edit this job */}
      <button type="button" className="job-card__button" onClick={() => onEdit(job)} aria-label={`Edit ${job.activity}`}>
        Edit
      </button>
    </div>
  );
}

export default JobCard;

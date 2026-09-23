import React from 'react';

// Task 7: shows one job's activity and categories
function JobCard({ job, deleteJob, onEdit, isEditing }) {
  // Drag and drop, from the last activity: remember which job is being dragged
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
      <div className="job-card__buttons">
        {/* Bonus 1: edit this job */}
        <button type="button" className="job-card__button" onClick={() => onEdit(job)} aria-label={`Edit ${job.activity}`}>
          Edit
        </button>
        {/* Task 5: the delete button calls the function passed down from JobManager */}
        <button type="button" className="job-card__button job-card__button--delete" onClick={() => deleteJob(job.id)} aria-label={`Delete ${job.activity}`}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;

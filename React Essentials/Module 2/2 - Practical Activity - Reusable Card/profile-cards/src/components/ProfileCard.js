import React, { useState } from 'react';
import './ProfileCard.css';

// A reusable card that shows one person's profile.
// Everything it shows comes in through props, so the same component works for anyone
function ProfileCard({ image, name, jobTitle, bio, skills = [] }) {
  // If the photo fails to load, show the person's initials instead
  const [imageFailed, setImageFailed] = useState(false);

  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="profile-card">
      <div className="profile-card__banner" aria-hidden="true"></div>

      {imageFailed ? (
        <div className="profile-card__image profile-card__initials" role="img" aria-label={name}>
          {initials}
        </div>
      ) : (
        <img
          className="profile-card__image"
          src={image}
          alt={`Portrait of ${name}`}
          onError={() => setImageFailed(true)}
        />
      )}

      <div className="profile-card__body">
        <h2 className="profile-card__name">{name}</h2>
        <p className="profile-card__job">{jobTitle}</p>
        <p className="profile-card__bio">{bio}</p>

        {/* Bonus: skills shown as tags, only if there are any */}
        {skills.length > 0 && (
          <ul className="profile-card__skills" aria-label={`${name}'s skills`}>
            {skills.map((skill) => (
              <li key={skill} className="profile-card__skill">
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default ProfileCard;

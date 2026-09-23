import React, { useState } from 'react';

const StyledButton = () => {
  // 4. The variable that decides if the button starts disabled.
  // Change this to true to see the button disabled when the page loads
  const startsDisabled = false;

  // Bonus 1: isDisabled is state, so a click can change it and the page updates
  const [isDisabled, setIsDisabled] = useState(startsDisabled);

  // Bonus 2: inline styles can't use :hover, so hovering is tracked with events and state
  const [isHovered, setIsHovered] = useState(false);

  // Task 1: the heading's style object (camelCase property names)
  const headingStyle = {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#087ea4',
    padding: '20px',
    borderRadius: '12px',
    margin: '0 0 24px',
  };

  // Task 2: the button's style object
  const buttonStyle = {
    padding: '14px 28px',
    backgroundColor: '#58c4dc',
    color: '#0b3d4f',
    border: '2px solid #087ea4',
    borderRadius: '999px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.2s',
  };

  // Bonus 3: extra style objects, combined with the one above using the spread operator
  const hoverStyle = {
    backgroundColor: '#087ea4',
    color: '#ffffff',
    transform: 'scale(1.05)',
  };

  const disabledStyle = {
    backgroundColor: '#e2e8f0',
    color: '#94a3b8',
    border: '2px solid #cbd5e1',
    cursor: 'not-allowed',
    transform: 'none',
  };

  // Later objects win, so the disabled look beats the hover look
  const combinedButtonStyle = {
    ...buttonStyle,
    ...(isHovered ? hoverStyle : {}),
    ...(isDisabled ? disabledStyle : {}),
  };

  const wrapperStyle = {
    maxWidth: '520px',
    margin: '60px auto',
    padding: '0 16px',
    textAlign: 'center',
    fontFamily: 'system-ui, sans-serif',
  };

  const noteStyle = { color: '#64748b', marginTop: '16px' };

  const linkButtonStyle = {
    marginTop: '12px',
    padding: '8px 16px',
    background: 'none',
    border: '1px solid #087ea4',
    borderRadius: '6px',
    color: '#087ea4',
    cursor: 'pointer',
  };

  // Bonus 1: a function that changes isDisabled. Clicking the main button disables it
  const handleClick = () => {
    setIsDisabled(true);
    setIsHovered(false);
  };

  return (
    <div style={wrapperStyle}>
      {/* Task 3: the styled heading */}
      <h1 style={headingStyle}>Inline Styles in React</h1>

      {/* Tasks 3–5: the styled button, disabled from a variable, with a className */}
      <button
        type="button"
        className="styled-button"
        style={combinedButtonStyle}
        disabled={isDisabled}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isDisabled ? 'Button disabled' : 'Click to disable me'}
      </button>

      <p style={noteStyle}>
        The button is <strong>{isDisabled ? 'disabled' : 'enabled'}</strong>.
      </p>

      {/* A disabled button can't be clicked, so this one turns it back on */}
      {isDisabled && (
        <button type="button" style={linkButtonStyle} onClick={() => setIsDisabled(false)}>
          Enable it again
        </button>
      )}
    </div>
  );
};

export default StyledButton;

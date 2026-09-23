import React, { useState } from 'react';
import './BotListManager.css';

const STATUSES = ['Running', 'Completed', 'Stopped'];

const BotListManager = () => {
  // State: the list of bots (an array of objects)
  const [bots, setBots] = useState([
    { id: 1, name: 'Email Extractor', status: 'Running', task: 'Extracting emails' },
    { id: 2, name: 'Notification Sender', status: 'Completed', task: 'Sending notifications' },
    { id: 3, name: 'Data Analyzer', status: 'Stopped', task: 'Analyzing data' },
  ]);

  // Bonus 1: state for the add-bot form
  const [newName, setNewName] = useState('');
  const [newTask, setNewTask] = useState('');
  const [formError, setFormError] = useState('');

  // Bonus 2: state for the status filter
  const [filter, setFilter] = useState('All');

  // Task 4: set a bot's status. .map() makes a new array, so state is never changed directly
  const setBotStatus = (id, status) => {
    setBots(bots.map((bot) => (bot.id === id ? { ...bot, status } : bot)));
  };

  const triggerJob = (id) => setBotStatus(id, 'Running');
  const stopJob = (id) => setBotStatus(id, 'Stopped');

  // Bonus 3: remove a bot. .filter() keeps every bot except this one
  const deleteBot = (id) => {
    setBots(bots.filter((bot) => bot.id !== id));
  };

  // Bonus 1: add a new bot from the form
  const addBot = (event) => {
    event.preventDefault();
    if (newName.trim() === '' || newTask.trim() === '') {
      setFormError('Please enter a name and a task.');
      return;
    }
    const nextId = bots.length > 0 ? Math.max(...bots.map((bot) => bot.id)) + 1 : 1;
    setBots([...bots, { id: nextId, name: newName.trim(), status: 'Stopped', task: newTask.trim() }]);
    setNewName('');
    setNewTask('');
    setFormError('');
  };

  const visibleBots = filter === 'All' ? bots : bots.filter((bot) => bot.status === filter);

  return (
    <div className="bot-list-manager">
      <h1>Bot List Manager</h1>

      {/* Bonus 2: filter buttons */}
      <div className="filters" role="group" aria-label="Filter bots by status">
        {['All', ...STATUSES].map((option) => (
          <button
            key={option}
            type="button"
            className="filter"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option} ({option === 'All' ? bots.length : bots.filter((bot) => bot.status === option).length})
          </button>
        ))}
      </div>

      {visibleBots.length === 0 ? (
        <p className="empty">No bots to show.</p>
      ) : (
        <ul className="bot-list">
          {/* Tasks 1–3: map the bots, with a unique key for each */}
          {visibleBots.map((bot) => (
            <li key={bot.id} className="bot">
              <div className="bot__info">
                <p className="bot__id">Bot #{bot.id}</p>
                <h2 className="bot__name">{bot.name}</h2>
                <p className="bot__task">{bot.task}</p>
              </div>

              {/* Task 5: the status class sets the colour */}
              <span className={`status status--${bot.status.toLowerCase()}`}>{bot.status}</span>

              <div className="bot__actions">
                <button
                  type="button"
                  className="trigger"
                  onClick={() => triggerJob(bot.id)}
                  disabled={bot.status === 'Running'}
                >
                  Trigger Job
                </button>
                {bot.status === 'Running' && (
                  <button type="button" className="stop" onClick={() => stopJob(bot.id)}>
                    Stop
                  </button>
                )}
                <button
                  type="button"
                  className="delete"
                  onClick={() => deleteBot(bot.id)}
                  aria-label={`Delete ${bot.name}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Bonus 1: add a new bot */}
      <form className="add-bot" onSubmit={addBot} noValidate>
        <h2>Add a Bot</h2>
        <div className="add-bot__fields">
          <label>
            Name
            <input value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="e.g. Report Builder" />
          </label>
          <label>
            Task
            <input value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="e.g. Building reports" />
          </label>
        </div>
        {formError && (
          <p className="form-error" role="alert">
            {formError}
          </p>
        )}
        <button type="submit" className="trigger">
          Add Bot
        </button>
      </form>
    </div>
  );
};

export default BotListManager;

import React, { useState } from 'react';
import './DynamicBotManager.css';

const EMPTY_BOT = { id: '', name: '', status: '' };

const DynamicBotManager = () => {
  // The list of bots
  const [bots, setBots] = useState([
    { id: '1', name: 'Email Bot', status: 'Active' },
    { id: '2', name: 'Data Bot', status: 'Inactive' },
  ]);

  // The new bot being typed into the form
  const [newBot, setNewBot] = useState(EMPTY_BOT);
  const [error, setError] = useState('');

  // Bonus 2: which bot is being edited, and its edited values
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState(EMPTY_BOT);

  // Bonus 3: the search text
  const [search, setSearch] = useState('');

  // Task 1: one handler for all three inputs. Each input's name says which property to change,
  // and the spread operator copies the rest of newBot
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBot({ ...newBot, [name]: value });
  };

  // Tasks 3 and 7: validate, add the bot with the spread operator, then clear the inputs
  const addBotToList = () => {
    const bot = { id: newBot.id.trim(), name: newBot.name.trim(), status: newBot.status };

    // Bonus 1: every field must be filled in
    if (!bot.id || !bot.name || !bot.status) {
      setError('Please fill in the ID, name and status.');
      return;
    }
    // IDs are used as React keys, so they must be unique
    if (bots.some((existing) => existing.id === bot.id)) {
      setError(`There is already a bot with ID ${bot.id}.`);
      return;
    }

    setBots([...bots, bot]);
    setNewBot(EMPTY_BOT);
    setError('');
  };

  // Tasks 4 and 6: delete with filter, keeping every bot except this one
  const deleteBot = (id) => {
    setBots(bots.filter((bot) => bot.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  // Bonus 2: start editing, save, or cancel
  const startEdit = (bot) => {
    setEditingId(bot.id);
    setEditValues(bot);
  };

  const saveEdit = () => {
    if (!editValues.name.trim()) {
      return;
    }
    setBots(bots.map((bot) => (bot.id === editingId ? { ...editValues, name: editValues.name.trim() } : bot)));
    setEditingId(null);
  };

  const visibleBots = bots.filter((bot) => bot.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className="dynamic-bot-manager">
      <h1>Dynamic Bot Manager</h1>

      {/* Task 2: input fields for the new bot */}
      <form
        className="add-form"
        onSubmit={(e) => {
          e.preventDefault();
          addBotToList();
        }}
        noValidate
      >
        <label>
          ID
          <input name="id" value={newBot.id} onChange={handleInputChange} placeholder="e.g. 3" />
        </label>
        <label>
          Name
          <input name="name" value={newBot.name} onChange={handleInputChange} placeholder="e.g. Report Bot" />
        </label>
        <label>
          Status
          <select name="status" value={newBot.status} onChange={handleInputChange}>
            <option value="">Choose…</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        {/* Add button */}
        <button type="submit" className="add-button">
          Add Bot
        </button>
      </form>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {/* Bonus 3: search */}
      <label className="search">
        <span className="visually-hidden">Search bots by name</span>
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bots by name…" />
      </label>

      {/* Task 5: the list of bots, each with a delete button */}
      <ul className="bot-list">
        {visibleBots.map((bot) => (
          <li key={bot.id} className="bot">
            {editingId === bot.id ? (
              <>
                <span className="bot__id">#{bot.id}</span>
                <input
                  aria-label="Bot name"
                  value={editValues.name}
                  onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                />
                <select
                  aria-label="Bot status"
                  value={editValues.status}
                  onChange={(e) => setEditValues({ ...editValues, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="bot__actions">
                  <button type="button" className="save" onClick={saveEdit}>
                    Save
                  </button>
                  <button type="button" className="cancel" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="bot__id">#{bot.id}</span>
                <span className="bot__name">{bot.name}</span>
                <span className={`status status--${bot.status.toLowerCase()}`}>{bot.status}</span>
                <div className="bot__actions">
                  <button type="button" className="edit" onClick={() => startEdit(bot)} aria-label={`Edit ${bot.name}`}>
                    Edit
                  </button>
                  <button type="button" className="delete" onClick={() => deleteBot(bot.id)} aria-label={`Delete ${bot.name}`}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {bots.length === 0 && <p className="empty">No bots yet. Add one above.</p>}
      {bots.length > 0 && visibleBots.length === 0 && <p className="empty">No bots match "{search}".</p>}
    </div>
  );
};

export default DynamicBotManager;

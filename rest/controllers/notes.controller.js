const {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../../src/models/noteModel");

exports.getNotes = (req, res) => {
  const notes = listNotes(req.apiKey);
  res.json(notes);
};

exports.postNote = (req, res) => {
  const { title, content } = req.body || {};
  if (!title) return res.status(400).json({ error: "title_required" });
  const note = createNote(req.apiKey, { title, content });
  res.status(201).json(note);
};

exports.patchNote = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body || {};
  const updated = updateNote(req.apiKey, id, { title, content });
  if (!updated) return res.status(404).json({ error: "not_found" });
  res.json(updated);
};

exports.deleteNote = (req, res) => {
  const { id } = req.params;
  const ok = deleteNote(req.apiKey, id);
  if (!ok) return res.status(404).json({ error: "not_found" });
  res.status(204).send();
};

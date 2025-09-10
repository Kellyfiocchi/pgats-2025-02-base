// Armazenamento em memória por apiKey -> array de notes
// Cada note: { id, title, content, createdAt, updatedAt }
const store = new Map(); // key: apiKey, value: Array<Note>
let autoId = 1;

function getBucket(apiKey) {
  if (!store.has(apiKey)) store.set(apiKey, []);
  return store.get(apiKey);
}

exports.listNotes = (apiKey) => {
  return getBucket(apiKey);
};

exports.createNote = (apiKey, { title, content }) => {
  const note = {
    id: String(autoId++),
    title,
    content: content || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const bucket = getBucket(apiKey);
  bucket.push(note);
  return note;
};

exports.updateNote = (apiKey, id, { title, content }) => {
  const bucket = getBucket(apiKey);
  const idx = bucket.findIndex((n) => n.id === String(id));
  if (idx === -1) return null;
  const prev = bucket[idx];
  const next = {
    ...prev,
    title: title ?? prev.title,
    content: content ?? prev.content,
    updatedAt: new Date().toISOString(),
  };
  bucket[idx] = next;
  return next;
};

exports.deleteNote = (apiKey, id) => {
  const bucket = getBucket(apiKey);
  const idx = bucket.findIndex((n) => n.id === String(id));
  if (idx === -1) return false;
  bucket.splice(idx, 1);
  return true;
};

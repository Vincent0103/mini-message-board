import pool from "./pool";

const insertMessage = async ({ authorName, creationDate, bio }) => {
  await pool.query(`
    INSERT INTO messages (authorName, creationDate, bio)
      VALUES ($1, $2, $3)`, [authorName, creationDate, bio]);
}

const getMessagesByAuthor = async (authorName) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE authorName = $1", [authorName]);
  return rows[0];
}

const getMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

export { insertMessage, getMessagesByAuthor, getMessages };

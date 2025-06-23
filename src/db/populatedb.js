import "dotenv/config"
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  authorName VARCHAR ( 255 ),
  creationDate TIMESTAMP,
  bio VARCHAR ( 800 )
);

INSERT INTO messages (authorName, creationDate, bio)
VALUES
  ('Amando', NOW()::TIMESTAMP, 'Hi there!'),
  ('Charles', NOW()::TIMESTAMP, 'Hello, world!'),
  ('Salomon', NOW()::TIMESTAMP, 'If I could, I would.')
`;

const main = async () => {
  console.log("seeding..");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

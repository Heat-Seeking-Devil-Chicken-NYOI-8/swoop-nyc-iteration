const db = require('./model.js');

const reset = async () => {
  await db.query(`
  --Drop existing tables if they exist
  DROP TABLE IF EXISTS listings CASCADE;
  DROP TABLE IF EXISTS tags CASCADE;

  -- Create tables
  CREATE TABLE listings (
    _id SERIAL PRIMARY KEY,
    creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    url VARCHAR(255) NOT NULL,
    lat VARCHAR(255) NOT NULL,
    lng VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    flag BOOLEAN NOT NULL DEFAULT FALSE
  );

  CREATE TABLE tags (
    _id SERIAL PRIMARY KEY,
    tag VARCHAR(255) NOT NULL,
    listing_id INT NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(_id)
  );

  -- Insert initial data
  INSERT INTO listings (url, lat, lng, description, flag) VALUES 
  ('https://i.imgur.com/jYK9TPZ.png', 40.7128, -74.0060, 'A gently used console table for the kitchen', false),
  ('https://i.imgur.com/oZyevFg.png', 40.7306, -73.9352, 'Adjustable height office chair with a clean, modern design', false),
  ('https://i.imgur.com/JhZhiLB.png', 40.7589, -73.9352, 'High-backed chairs with bright and cheerful colors to spruce up your dining room', false),
  ('https://i.imgur.com/yn7ylQa.png', 40.7589, -73.9851, 'Pre-war antique cabinet. Porcelain not included.', false),
  ('https://i.imgur.com/kHxlJvK.png', 40.7931, -73.9712, 'Ikea dresser with 6 drawers in a natural wood finish', false);

  INSERT INTO tags (tag, listing_id) VALUES
  ('table', 1),
  ('console', 1),
  ('vintage', 1),
  ('antique', 1),
  ('chair', 2),
  ('modern', 2),
  ('movable', 2),
  ('office', 2),
  ('rolling', 2),
  ('chairs', 3),
  ('set', 3),
  ('modern', 3),
  ('orange', 3),
  ('dining', 3),
  ('antique', 4),
  ('vintage', 4),
  ('cabinet', 4),
  ('large', 4),
  ('dresser', 5),
  ('large', 5),
  ('storage', 5),
  ('natural', 5),
  ('wood', 5);
`);
}

reset();
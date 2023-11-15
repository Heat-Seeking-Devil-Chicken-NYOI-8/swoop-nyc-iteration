-- Drop existing tables if they exist
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
  user_id INT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listings(_id)
);

-- Insert initial data
-- INSERT INTO listings () VALUES ();
-- INSERT INTO tags () VALUES ();
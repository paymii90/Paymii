CREATE TABLE chat_messages (
                               id SERIAL PRIMARY KEY,
                               sender VARCHAR(255) NOT NULL,
                               content TEXT NOT NULL,
                               timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               room VARCHAR(100) -- Optional: for group/room support
);

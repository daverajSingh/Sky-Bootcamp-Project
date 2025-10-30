CREATE TABLE IF NOT EXISTS simulator_details (
    detail_id int PRIMARY KEY NOT NULL auto_increment,
    topic_id int NOT NULL UNIQUE,
    title varchar(255) NOT NULL,
    intro_text TEXT NOT NULL,
    context TEXT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE
);
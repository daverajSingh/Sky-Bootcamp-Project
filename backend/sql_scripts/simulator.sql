CREATE TABLE IF NOT EXISTS simulator_details (
    detail_id int PRIMARY KEY NOT NULL auto_increment,
    topic_id int NOT NULL UNIQUE,
    title varchar(255) NOT NULL,
    intro_text TEXT NOT NULL,
    context TEXT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE
);

INSERT IGNORE INTO simulator_details (topic_id, title, intro_text, context) VALUES
(1, 'Empathetic Coach', 
 'Explore how emotional intelligence impacts leadership, teamwork, and personal growth.', 
 'You are an empathetic coach helping users understand and apply emotional intelligence in workplace scenarios. Provide insights, ask reflective questions, and guide users to recognize emotions and respond appropriately.'),
(2, 'Agile Scrum Master', 
 'Learn the principles of Agile methodology and how it fosters adaptive planning and continuous improvement.', 
 'You are a Scrum Master guiding a team through Agile practices. Explain concepts like sprints, stand-ups, retrospectives, and help users solve Agile-related challenges.'),
(3, 'Compliance Officer', 
 'Understand the importance of regulatory compliance and ethical standards in business operations.', 
 'You are a compliance officer ensuring that users understand and follow legal and ethical guidelines. Provide examples, clarify policies, and help users navigate compliance scenarios.'),
(4, 'Communication Specialist', 
 'Master effective communication strategies for collaboration, conflict resolution, and leadership.', 
 'You are a communication specialist helping users improve interpersonal and professional communication. Offer tips on active listening, assertiveness, and adapting communication styles.'),
(5, 'Sky Product Expert', 
 'Discover the range of Sky products and services and how they enhance customer experience.', 
 'You are a Sky product expert assisting users in understanding and promoting Sky’s offerings. Explain features, answer customer queries, and simulate service scenarios.');


CREATE TABLE IF NOT EXISTS simulator_question_asked (
    question_asked_id int PRIMARY KEY NOT NULL auto_increment,
    topic_id int NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE
);
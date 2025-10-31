CREATE TABLE IF NOT EXISTS topic (
    topic_id int PRIMARY KEY NOT NULL auto_increment,
    topic_name varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS question (
    question_id int PRIMARY KEY NOT NULL auto_increment,
    topic_id int NOT NULL,
    question_text varchar(255) NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS options (
    option_id int PRIMARY KEY NOT NULL auto_increment,
    question_id int NOT NULL,
    option_text varchar(255) NOT NULL,
    is_correct boolean NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question (question_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_session (
    session_id int PRIMARY KEY NOT NULL auto_increment,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_diff TIME GENERATED ALWAYS AS (SEC_TO_TIME(TIMESTAMPDIFF(SECOND, start_time, end_time))) STORED
);

CREATE TABLE IF NOT EXISTS score (
    score_id int PRIMARY KEY NOT NULL auto_increment,
    topic_id int NOT NULL,
    session_id int NOT NULL,
    score_value int NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES quiz_session (session_id) ON DELETE CASCADE
);

INSERT IGNORE INTO topic (topic_name) VALUES
('Emotional Intelligence'),
('Agile'),
('Compliance'),
('Communication'),
('Sky products and services');

INSERT IGNORE INTO question (question_id, topic_id, question_text) VALUES
(1, 1, "Which of the following best describes emotional intelligence (EI) in a professional telecom environment?"),
(2, 1, "You're a Sky graduate engineer working in a cross-functional team. During a sprint review, a colleague criticizes your work harshly in front of others. What's the most emotionally intelligent way to handle it?"),
(3, 2, "In an Agile development environment at Sky, what is the primary purpose of a daily stand-up?"),
(4, 2, "You're part of a scrum team developing a new customer self-service feature. Mid-sprint, marketing requests a new functionality that could improve engagement. What's the best Agile response?"),
(5, 3, "Which of the following best aligns with GDPR compliance within a telecom company?"),
(6, 3, "You're building an internal analytics dashboard using customer viewing data. A teammate suggests including names and email addresses to make debugging easier. What's the most compliant approach?"),
(7, 4, "Which of the following is a hallmark of effective communication in a hybrid telecom workplace?"),
(8, 4, "You're presenting a technical network solution to a non-technical operations manager. Halfway through, they seem confused. What should you do?"),
(9, 5, "Which of the following is not typically part of a telecom company's core service offering like Sky's?"),
(10, 5, "You're working on improving customer experience for Sky's broadband product. Data shows customers frequently experience connection drops during peak hours. What’s the most effective product improvement approach?");

INSERT IGNORE INTO options (option_id, question_id, option_text, is_correct) VALUES
(1, 1, 'Understanding and managing one’s emotions, and recognizing those of others to improve collaboration', TRUE),
(2, 1, 'Using emotional appeals to persuade customers during calls', FALSE),
(3, 1, 'Avoiding emotional discussions in team meetings', FALSE),
(4, 1, 'Reacting quickly and instinctively without overthinking situations', FALSE),
(5, 2, 'Stay silent, but later complain to your manager about the colleague', FALSE),
(6, 2, 'Acknowledge their feedback calmly, thank them, and suggest discussing improvements privately after the meeting', TRUE),
(7, 2, 'Ignore the comment and continue the discussion as if nothing happened', FALSE),
(8, 2, 'Respond with sarcasm to lighten the mood', FALSE),
(9, 3, 'To present completed deliverables to stakeholders', FALSE),
(10, 3, 'To discuss company-wide strategic goals', FALSE),
(11, 3, 'To ensure every team member updates others on progress, blockers, and next steps', TRUE),
(12, 3, 'To assign tasks to team members for the day', FALSE),
(13, 4, 'Immediately stop current work and implement the new feature', FALSE),
(14, 4, 'Log the request in the product backlog, discuss with the Product Owner, and prioritize it for the next sprint', TRUE),
(15, 4, 'Add the task to the sprint quietly if time allows', FALSE),
(16, 4, 'Ask the Scrum Master to decide unilaterally whether to add it', FALSE),
(17, 5, 'Sharing customer data across departments without consent for "internal use"', FALSE),
(18, 5, 'Encrypting customer data, minimizing its collection, and processing it only for legitimate purposes', TRUE),
(19, 5, 'Retaining all customer call data indefinitely for analytics', FALSE),
(20, 5, 'Selling anonymized data to third parties without disclosure', FALSE),
(21, 6, 'Accept the suggestion, debugging convenience outweighs privacy', FALSE),
(22, 6, 'Use only anonymized or pseudonymized data in the dashboard', TRUE),
(23, 6, 'Include full personal data but restrict access to managers only', FALSE),
(24, 6, 'Proceed since the dashboard is for internal use only', FALSE),
(25, 7, 'Sending long, detailed emails to ensure no information is missed', FALSE),
(26, 7, 'Adapting tone, medium, and detail based on the audience and purpose', TRUE),
(27, 7, 'Avoiding video calls to save bandwidth', FALSE),
(28, 7, 'Using technical jargon consistently across all messages', FALSE),
(29, 8, 'Continue the presentation, they’ll understand when they see the results', FALSE),
(30, 8, 'Pause, ask what part was unclear, and re-explain using analogies or simpler terms', TRUE),
(31, 8, 'End the meeting and send them detailed documentation later', FALSE),
(32, 8, 'Apologize and ask them to read up on the topic beforehand', FALSE),
(33, 9, 'Broadband internet', FALSE),
(34, 9, 'Satellite television', FALSE),
(35, 9, 'Cloud-based data analytics solutions for customers', TRUE),
(36, 9, 'On-demand video streaming', FALSE),
(37, 10, 'Launch a marketing campaign explaining that peak congestion is normal', FALSE),
(38, 10, 'Investigate infrastructure bottlenecks and test optimized load balancing or capacity upgrades', TRUE),
(39, 10, 'Reduce connection speeds temporarily to stabilize performance', FALSE),
(40, 10, 'Increase subscription prices to reduce customer load', FALSE);

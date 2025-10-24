INSERT INTO topic (topic_name) VALUES 
('Emotional Intelligence'),
('Agile'),
('Compliance'),
('Communication'),
('Sky products and services');

INSERT INTO question (topic_id, question_text) VALUES
(1, "Which of the following best describes emotional intelligence (EI) in a professional telecom environment?"),
(1, "You're a Sky graduate engineer working in a cross-functional team. During a sprint review, a colleague criticizes your work harshly in front of others. What's the most emotionally intelligent way to handle it?"),
(2, "In an Agile development environment at Sky, what is the primary purpose of a daily stand-up?"),
(2, "You're part of a scrum team developing a new customer self-service feature. Mid-sprint, marketing requests a new functionality that could improve engagement. What's the best Agile response?"),
(3, "Which of the following best aligns with GDPR compliance within a telecom company?"),
(3, "You're building an internal analytics dashboard using customer viewing data. A teammate suggests including names and email addresses to make debugging easier. What's the most compliant approach?"),
(4, "Which of the following is a hallmark of effective communication in a hybrid telecom workplace?"),
(4, "You're presenting a technical network solution to a non-technical operations manager. Halfway through, they seem confused. What should you do?"),
(5, "Which of the following is not typically part of a telecom company's core service offering like Sky's?"),
(5, "You're working on improving customer experience for Sky's broadband product. Data shows customers frequently experience connection drops during peak hours. What’s the most effective product improvement approach?");


INSERT INTO options (question_id, option_text, is_correct) VALUES
(1, 'Understanding and managing one’s emotions, and recognizing those of others to improve collaboration', TRUE),
(1, 'Using emotional appeals to persuade customers during calls', FALSE),
(1, 'Avoiding emotional discussions in team meetings', FALSE),
(1, 'Reacting quickly and instinctively without overthinking situations', FALSE),
(2, 'Stay silent, but later complain to your manager about the colleague', FALSE),
(2, 'Acknowledge their feedback calmly, thank them, and suggest discussing improvements privately after the meeting', TRUE),
(2, 'Ignore the comment and continue the discussion as if nothing happened', FALSE),
(2, 'Respond with sarcasm to lighten the mood', FALSE);


INSERT INTO options (question_id, option_text, is_correct) VALUES
(3, 'To present completed deliverables to stakeholders', FALSE),
(3, 'To discuss company-wide strategic goals', FALSE),
(3, 'To ensure every team member updates others on progress, blockers, and next steps', TRUE),
(3, 'To assign tasks to team members for the day', FALSE),
(4, 'Immediately stop current work and implement the new feature', FALSE),
(4, 'Log the request in the product backlog, discuss with the Product Owner, and prioritize it for the next sprint', TRUE),
(4, 'Add the task to the sprint quietly if time allows', FALSE),
(4, 'Ask the Scrum Master to decide unilaterally whether to add it', FALSE);


INSERT INTO options (question_id, option_text, is_correct) VALUES
(5, 'Sharing customer data across departments without consent for "internal use"', FALSE),
(5, 'Encrypting customer data, minimizing its collection, and processing it only for legitimate purposes', TRUE),
(5, 'Retaining all customer call data indefinitely for analytics', FALSE),
(5, 'Selling anonymized data to third parties without disclosure', FALSE),
(6, 'Accept the suggestion; debugging convenience outweighs privacy', FALSE),
(6, 'Use only anonymized or pseudonymized data in the dashboard', TRUE),
(6, 'Include full personal data but restrict access to managers only', FALSE),
(6, 'Proceed since the dashboard is for internal use only', FALSE);


INSERT INTO options (question_id, option_text, is_correct) VALUES
(7, 'Sending long, detailed emails to ensure no information is missed', FALSE),
(7, 'Adapting tone, medium, and detail based on the audience and purpose', TRUE),
(7, 'Avoiding video calls to save bandwidth', FALSE),
(7, 'Using technical jargon consistently across all messages', FALSE),
(8, 'Continue the presentation; they’ll understand when they see the results', FALSE),
(8, 'Pause, ask what part was unclear, and re-explain using analogies or simpler terms', TRUE),
(8, 'End the meeting and send them detailed documentation later', FALSE),
(8, 'Apologize and ask them to read up on the topic beforehand', FALSE);


INSERT INTO options (question_id, option_text, is_correct) VALUES
(9, 'Broadband internet', FALSE),
(9, 'Satellite television', FALSE),
(9, 'Cloud-based data analytics solutions for customers', TRUE),
(9, 'On-demand video streaming', FALSE),
(10, 'Launch a marketing campaign explaining that peak congestion is normal', FALSE),
(10, 'Investigate infrastructure bottlenecks and test optimized load balancing or capacity upgrades', TRUE),
(10, 'Reduce connection speeds temporarily to stabilize performance', FALSE),
(10, 'Increase subscription prices to reduce customer load', FALSE);

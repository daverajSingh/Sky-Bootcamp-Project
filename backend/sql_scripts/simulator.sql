CREATE TABLE IF NOT EXISTS simulator_details (
    detail_id int PRIMARY KEY NOT NULL auto_increment,
    topic_id int NOT NULL UNIQUE,
    title varchar(255) NOT NULL,
    intro_text TEXT NOT NULL,
    context TEXT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE
);

-- title: name of the person
-- intro_text: what the person says at the beginning of the conversation
-- context: contextual information about the topic that the llm uses to generate relevant answers. should be roughly a paragraph or two. it is not in any perspective, just information.

INSERT IGNORE INTO simulator_details (topic_id, title, intro_text, context) VALUES
(1, 'Empathetic Coach', 
 'Hi, I am your emotional coach! I am here to help you learn about emotional intelligence at the workplace, and why it matters.', 
 'Emotional intelligence at the workplace is all about understanding and managing your own emotions, as well as recognizing and influencing the emotions of others. It involves skills like empathy, self-regulation, and effective communication, which are crucial for building strong relationships, resolving conflicts, and fostering a positive work environment. By developing emotional intelligence, individuals can enhance their teamwork, leadership abilities, and overall job performance. It is important because it helps create a more collaborative and supportive workplace culture, leading to increased productivity and job satisfaction.'),
(2, 'Agile Scrum Master', 
 'Hi, I am your Agile Scrum Master! I am here to help you learn about Agile methodology and how it fosters adaptive planning and continuous improvement.', 
 'Agile methodology is an iterative approach to project management and software development that emphasizes flexibility, collaboration, and customer satisfaction. It promotes adaptive planning, evolutionary development, early delivery, and continuous improvement. Agile encourages teams to work in small, manageable increments called sprints, allowing for frequent reassessment and adaptation of plans based on feedback and changing requirements. Key principles of Agile include valuing individuals and interactions over processes and tools, working solutions over comprehensive documentation, customer collaboration over contract negotiation, and responding to change over following a fixed plan. This approach helps teams deliver high-quality products more efficiently while being responsive to customer needs.'),
(3, 'Compliance Officer', 
 'Understand the importance of regulatory compliance and ethical standards in business operations.', 
 'Copmliance and ethical standards are essential components of responsible business operations. Regulatory compliance involves adhering to laws, regulations, guidelines, and specifications relevant to the business, which helps prevent legal issues and penalties. Ethical standards refer to the moral principles that guide behavior within an organization, promoting integrity, fairness, and transparency. Together, compliance and ethics foster trust among stakeholders, enhance the company’s reputation, and contribute to long-term success. They ensure that businesses operate in a manner that is not only legally sound but also socially responsible, ultimately benefiting employees, customers, and the broader community.'),
(4, 'Communication Specialist', 
 'Master effective communication strategies for collaboration, conflict resolution, and leadership.', 
 'Effective communication is the cornerstone of successful collaboration, conflict resolution, and leadership. It involves the clear and concise exchange of information, active listening, and the ability to adapt messages for different audiences. Strong communication skills enable individuals to build rapport, foster teamwork, and create an open environment where ideas can be shared freely. In conflict resolution, effective communication helps identify underlying issues, facilitates understanding, and promotes mutually beneficial solutions. For leaders, the ability to communicate vision, expectations, and feedback is crucial for inspiring and guiding teams toward achieving common goals. Overall, mastering communication strategies enhances relationships and drives organizational success.'),
(5, 'Sky Product Expert', 
 'Discover the range of Sky products and services and how they enhance customer experience.', 
 'Sky offers a diverse range of products and services designed to enhance the customer experience in entertainment, communication, and connectivity. Their offerings include television packages with a variety of channels, on-demand content, and streaming services that cater to different interests and preferences. Sky also provides broadband internet services, mobile plans, and home phone solutions, ensuring customers stay connected at all times. Additionally, Sky focuses on delivering high-quality customer service and innovative technology, such as 4K Ultra HD and voice-controlled remote controls, to improve user convenience and satisfaction. By continuously evolving their product lineup and services, Sky aims to meet the changing needs of its customers and provide an exceptional entertainment experience. Current products include: Sky TV, Sky Glass, Sky Broadband, Sky Mobile, Sky Q, Sky Go, Sky Bet, Sky Sports, and Sky Cinema.');


-- CREATE TABLE IF NOT EXISTS simulator_question_asked (
--     question_id int PRIMARY KEY NOT NULL auto_increment,
--     topic_id int NOT NULL,
--     FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE
-- );
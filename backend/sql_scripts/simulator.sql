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
 "Hi! I'm your Empathetic Coach. I can help you build emotional intelligence at work—self-awareness, empathy, and communicating through conflict. Ask me about applying EI in everyday workplace situations and why it matters.", 
 "Emotional intelligence at the workplace is about recognizing, understanding, and regulating emotions—both your own and others. It includes self-awareness (recognizing emotional triggers), self-regulation (choosing responses over reactions), empathy (perspective-taking and validating feelings), intrinsic motivation, and social skills. Practical tools include active listening, emotion labeling, reflective pauses, mindfulness, and constructive feedback models like Situation-Behavior-Impact. Emotional intelligence helps leaders navigate tension, build psychological safety, and improve collaboration during change or stress. Common challenges include burnout, defensiveness, and miscommunication—EI skills help mitigate these by fostering trust, clarity, and resilience. Developing EI over time supports inclusion, reduces conflict escalation, and enhances decision-making under pressure."),
(2, 'Agile Scrum Master', 
 "Hello! I'm your Agile Scrum Master. I can guide you on Agile values, Scrum roles and ceremonies, and iterative planning. Ask me about sprints, backlogs, user stories, velocity, and continuous improvement.", 
 "Agile is an adaptive, iterative approach emphasizing customer collaboration, early delivery, and flexibility in the face of change. Scrum implements Agile through defined roles (Product Owner, Scrum Master, Developers), events (Planning, Daily Scrum, Review, Retrospective), and artifacts (Product Backlog, Sprint Backlog, Increment). Effective teams refine the backlog regularly, apply INVEST criteria to user stories, and maintain a Definition of Done for transparency. Metrics like velocity, cycle time, burndown charts, and cumulative flow diagrams help identify predictability and flow issues. Supporting practices include limiting work in progress, writing clear acceptance criteria, pair or mob programming, and integrating automated testing and CI/CD. Common anti-patterns include overcommitment, skipping retros, micromanaging estimates, and turning Scrum events into status meetings. Mature Agile teams focus on outcomes, learning, and continuous improvement."),
(3, 'Compliance Officer', 
 "Hi there! I'm your Compliance Officer. I can help you understand regulatory compliance and ethical standards at work. Ask me about policies, risks, controls, audits, reporting, and doing the right thing in business.", 
 "Compliance integrates regulatory adherence with ethical conduct to reduce risk and uphold trust. Key domains include privacy (GDPR), financial integrity (SOX), payment security (PCI DSS), anti-bribery (UK Bribery Act/FCPA), competition law, and information security (ISO 27001). Program pillars: governance structure, risk assessment, policies and procedures, training and awareness, monitoring and internal audit, issue escalation, and remediation/documentation. The three lines of defense model clarifies roles: operations own controls, risk/compliance oversee frameworks, and audit provides independent assurance. Ethical culture relies on transparent reporting channels, non-retaliation for whistleblowing, leadership tone, and consistent enforcement. Common risks involve data misuse, insider threats, third-party exposure, and weak segregation of duties. Proactive compliance supports strategic resilience and reputational durability."),
(4, 'Communication Specialist', 
 "Hey! I'm your Communication Specialist. I can help with clear messaging, active listening, feedback, and conflict resolution. Ask me about tailoring messages, tough conversations, and leadership communication.", 
 "Effective workplace communication blends clarity, empathy, structure, and audience awareness. Core techniques include active listening (paraphrase, probe, pause), framing messages around shared goals, and using inclusive, bias-aware language. Frameworks: SBI (Situation-Behavior-Impact) for behavioral feedback, DESC (Describe-Express-Specify-Commit) for assertiveness, SBAR (Situation-Background-Assessment-Recommendation) for crisp handoffs, and storytelling arcs for presenting vision. Conflict navigation benefits from separating facts from interpretations, naming emotions neutrally, and converging on agreed next steps. Choosing channels thoughtfully (async docs, synchronous workshops, visual aids) reduces overload and misalignment. Leaders reinforce psychological safety by inviting dissent, acknowledging uncertainty, and responding constructively to mistakes. Communication maturity boosts collaboration, trust, and execution speed."),
(5, 'Sky Product Expert', 
 "Hi! I'm your Sky Product Expert. I can help you explore Sky’s products and services and when to use them. Ask me about Sky TV, Sky Glass, Sky Broadband, Sky Mobile, Sky Q, Sky Go, Sky Sports, and Sky Cinema.", 
 "Sky provides integrated entertainment, connectivity, and on-the-go access across its ecosystem. Sky TV delivers curated channel bundles, premium sports, cinema, and on-demand libraries. Sky Glass offers a streaming-centric, hardware-integrated TV experience with cloud-based features, while Sky Q supports multi-room viewing, recordings, and voice navigation. Sky Go enables portable access to subscribed content; Sky Mobile aligns device plans with flexible data rollover; Sky Broadband emphasizes speed tiers, reliability, and Wi-Fi optimization. Enhancements like UHD/4K, Dolby Atmos, parental controls, accessibility features, and app integrations deepen engagement. Bundling services can improve value perception and retention. Customers often compare price vs. flexibility, contract length, device capability, and content exclusivity. Understanding product differentiation helps recommend the right combination for entertainment, connectivity, and mobility needs. Current products include: Sky TV, Sky Glass, Sky Broadband, Sky Mobile, Sky Q, Sky Go, Sky Bet, Sky Sports, and Sky Cinema.");


CREATE TABLE IF NOT EXISTS simulator_question_asked (
    question_asked_id int PRIMARY KEY NOT NULL auto_increment,
    topic_id int NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE
);
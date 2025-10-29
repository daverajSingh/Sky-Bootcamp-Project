CREATE TABLE IF NOT EXISTS faqs(
    id INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0
);

INSERT IGNORE INTO faqs (id, question, answer, display_order) VALUES
(1, 'What is the purpose of this web application?', 'This web application is designed to help students and graduates learn about corporate life, not only at Sky, but in the wider tech industry.', 1),
(2, 'How will this web application help me?', 'This web application can be used to simulate real-world scenarios, allowing you to develop an understanding of corporate culture, teamwork, and problem-solving skills.', 2),
(3, 'What does this web application have to do with Sky?', 'This web application was developed by graduates as part of the Sky Tech Bootcamp, to improve the transition from education to the workplace.', 3),
(4, 'Where can I learn more about the culture at Sky?', 'You can learn more about the culture at Sky by visiting the Life at Sky page: https://careers.sky.com/lifeatsky', 4),
(5, 'Do I need an account to use the app?', 'No - you can browse and use most features as a guest. Creating an account (if available) may let you save progress across devices and unlock extra features. Check the README or the app UI for account/signup options.', 5),
(6, 'How is my progress saved?', 'Progress is automatically saved per session in the day in the life simulation as well as the quiz. Progress resets at the end of the day in the life simulation and when you exit the quiz. If you want to reset your progress manually, you can do so by refreshing the page or clicking the reset button if available.', 6),
(7, 'Is my personal data collected or shared?', 'This application does not collect personal data unless you explicitly provide it (for example by creating an account). For details about what is collected and how it''s used, please refer to the project''s privacy policy or contact the maintainers listed in the README.', 7),
(8, 'Is the app accessible?', 'Accessibility is a priority and we try to follow common accessibility guidelines (keyboard navigation, semantic HTML). If you find accessibility issues, please report them so we can improve the experience.', 8);
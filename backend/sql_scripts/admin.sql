CREATE TABLE IF NOT EXISTS admin (
    `admin_id` int PRIMARY KEY NOT NULL auto_increment, 
    `admin_email` varchar(255) NOT NULL, 
    `admin_password` varchar(255) NOT NULL, 
    `admin_name` varchar(50) NOT NULL
);

DELIMITER $$

CREATE PROCEDURE AddQuestionOptions(
    IN p_question_id INT,
    IN p_option1 VARCHAR(255),
    IN p_option2 VARCHAR(255),
    IN p_option3 VARCHAR(255),
    IN p_option4 VARCHAR(255),
    IN p_correct_option boolean
)
BEGIN
    INSERT INTO options (question_id, option_text, is_correct)
    VALUES (p_question_id, p_option1, p_correct_option);

    INSERT INTO options (question_id, option_text, is_correct)
    VALUES (p_question_id, p_option2, p_correct_option);

    INSERT INTO options (question_id, option_text, is_correct)
    VALUES (p_question_id, p_option3, p_correct_option);

    INSERT INTO options (question_id, option_text, is_correct)
    VALUES (p_question_id, p_option4, p_correct_option);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_time_spent_stats()
BEGIN
    SELECT 
        DATE(start_time) AS date,
        SEC_TO_TIME(SUM(TIME_TO_SEC(time_diff))) AS total_time_spent
    FROM quiz_session
    WHERE start_time >= CURDATE() - INTERVAL 5 DAY
    GROUP BY DATE(start_time)
    ORDER BY DATE(start_time);

    SELECT 
        YEARWEEK(start_time, 1) AS year_week,
        SEC_TO_TIME(SUM(TIME_TO_SEC(time_diff))) AS total_time_spent
    FROM quiz_session
    WHERE start_time >= CURDATE() - INTERVAL 4 WEEK
    GROUP BY YEARWEEK(start_time, 1)
    ORDER BY YEARWEEK(start_time, 1);

    SELECT 
        DATE_FORMAT(start_time, '%Y-%m') AS year_month,
        SEC_TO_TIME(SUM(TIME_TO_SEC(time_diff))) AS total_time_spent
    FROM quiz_session
    WHERE start_time >= CURDATE() - INTERVAL 4 MONTH
    GROUP BY YEAR(start_time), MONTH(start_time)
    ORDER BY YEAR(start_time), MONTH(start_time);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_user_engagement()
BEGIN
    SELECT 
        DATE(start_time) AS date,
        COUNT(*) AS sessions_count
    FROM quiz_session
    WHERE start_time >= CURDATE() - INTERVAL 5 DAY
    GROUP BY DATE(start_time)
    ORDER BY DATE(start_time);

    SELECT 
        YEARWEEK(start_time, 1) AS year_week,
        COUNT(*) AS sessions_count
    FROM quiz_session
    WHERE start_time >= CURDATE() - INTERVAL 4 WEEK
    GROUP BY YEARWEEK(start_time, 1)
    ORDER BY YEARWEEK(start_time, 1);

    SELECT 
        DATE_FORMAT(start_time, '%Y-%m') AS year_month,
        COUNT(*) AS sessions_count
    FROM quiz_session
    WHERE start_time >= CURDATE() - INTERVAL 4 MONTH
    GROUP BY YEAR(start_time), MONTH(start_time)
    ORDER BY YEAR(start_time), MONTH(start_time);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_quiz_performance_by_topic()
BEGIN
    SELECT 
        t.topic_name,
        DATE(q.start_time) AS date,
        AVG(s.score_value) AS avg_score
    FROM score s
    JOIN topic t ON s.topic_id = t.topic_id
    JOIN quiz_session q ON s.session_id = q.session_id
    WHERE q.start_time >= CURDATE() - INTERVAL 5 DAY
    GROUP BY t.topic_name, DATE(q.start_time)
    ORDER BY t.topic_name, DATE(q.start_time);

    SELECT 
        t.topic_name,
        YEARWEEK(q.start_time, 1) AS year_week,
        AVG(s.score_value) AS avg_score
    FROM score s
    JOIN topic t ON s.topic_id = t.topic_id
    JOIN quiz_session q ON s.session_id = q.session_id
    WHERE q.start_time >= CURDATE() - INTERVAL 4 WEEK
    GROUP BY t.topic_name, YEARWEEK(q.start_time, 1)
    ORDER BY t.topic_name, YEARWEEK(q.start_time, 1);

    SELECT 
        t.topic_name,
        DATE_FORMAT(q.start_time, '%Y-%m') AS year_month,
        AVG(s.score_value) AS avg_score
    FROM score s
    JOIN topic t ON s.topic_id = t.topic_id
    JOIN quiz_session q ON s.session_id = q.session_id
    WHERE q.start_time >= CURDATE() - INTERVAL 4 MONTH
    GROUP BY t.topic_name, YEAR(q.start_time), MONTH(q.start_time)
    ORDER BY t.topic_name, YEAR(q.start_time), MONTH(q.start_time);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_simulator_activity_by_topic()
BEGIN
    SELECT 
        t.topic_name,
        COUNT(sq.question_asked_id) AS questions_asked
    FROM simulator_question_asked sq
    JOIN topic t ON sq.topic_id = t.topic_id
    GROUP BY t.topic_name
    ORDER BY t.topic_name;
END $$

DELIMITER ;



DELIMITER //
DROP PROCEDURE IF EXISTS AddQuestionOptions//
CREATE PROCEDURE AddQuestionOptions(
    IN p_question_id INT,
    IN p_option1_text VARCHAR(255),
    IN p_option2_text VARCHAR(255),
    IN p_option3_text VARCHAR(255),
    IN p_option4_text VARCHAR(255),
    IN p_correct_option_number INT
)
BEGIN
    -- Validate that correct_option_number is between 1 and 4
    IF p_correct_option_number NOT IN (1, 2, 3, 4) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'correct_option_number must be between 1 and 4';
    END IF;
    
    -- Insert option 1
    INSERT INTO options (question_id, option_text, is_correct)
    VALUES (p_question_id, p_option1_text, p_correct_option_number = 1);
    
    -- Insert option 2
    INSERT INTO options (question_id, option_text, is_correct)
    VALUES (p_question_id, p_option2_text, p_correct_option_number = 2);
    
    -- Insert option 3
    INSERT INTO options (question_id, option_text, is_correct)
    VALUES (p_question_id, p_option3_text, p_correct_option_number = 3);
    
    -- Insert option 4
    INSERT INTO options (question_id, option_text, is_correct)
    VALUES (p_question_id, p_option4_text, p_correct_option_number = 4);
END//
DROP PROCEDURE IF EXISTS GetSimulationQuestionCount//
CREATE PROCEDURE GetSimulationQuestionCount()
BEGIN
    SELECT 
        t.topic_id,
        t.topic_name,
        COUNT(sqa.question_asked_id) AS questions_asked_count
    FROM 
        topic t
    LEFT JOIN 
        simulator_question_asked sqa ON t.topic_id = sqa.topic_id
    GROUP BY 
        t.topic_id, t.topic_name
    ORDER BY 
        t.topic_id ASC;
END//
DROP PROCEDURE IF EXISTS GetCorrectAnswersGraph//
CREATE PROCEDURE GetCorrectAnswersGraph()
BEGIN
    SELECT t.topic_id, t.topic_name, SUM(s.score_value) as total_correct_answers FROM score s INNER JOIN topic t ON s.topic_id = t.topic_id GROUP BY t.topic_id, t.topic_name ORDER BY t.topic_id ASC;
END//
DROP PROCEDURE IF EXISTS GetQuizTrendDaily//
CREATE PROCEDURE GetQuizTrendDaily(
    IN p_days INT
)
BEGIN
    -- Generate daily counts for the past N days
    WITH RECURSIVE date_range AS (
        SELECT DATE_SUB(CURDATE(), INTERVAL p_days DAY) AS date
        UNION ALL
        SELECT DATE_ADD(date, INTERVAL 1 DAY)
        FROM date_range
        WHERE date < CURDATE()
    )
    SELECT 
        dr.date,
        COALESCE(COUNT(qs.session_id), 0) AS quiz_count
    FROM 
        date_range dr
    LEFT JOIN 
        quiz_session qs ON DATE(qs.start_time) = dr.date
    GROUP BY 
        dr.date
    ORDER BY 
        dr.date ASC;
END//
DROP PROCEDURE IF EXISTS GetQuizTrendWeekly//
CREATE PROCEDURE GetQuizTrendWeekly(
    IN p_weeks INT
)
BEGIN
    WITH RECURSIVE week_range AS (
        SELECT 
            DATE_SUB(CURDATE(), INTERVAL p_weeks WEEK) AS week_start
        UNION ALL
        SELECT 
            DATE_ADD(week_start, INTERVAL 1 WEEK)
        FROM 
            week_range
        WHERE 
            week_start < CURDATE()
    )
    SELECT 
        wr.week_start AS week_start_date,
        DATE_FORMAT(wr.week_start, '%Y-%U') AS week_label,
        COALESCE(COUNT(qs.session_id), 0) AS quiz_count
    FROM 
        week_range wr
    LEFT JOIN 
        quiz_session qs ON DATE(DATE_SUB(qs.start_time, INTERVAL WEEKDAY(qs.start_time) DAY)) = wr.week_start
    GROUP BY 
        wr.week_start,
        week_label
    ORDER BY 
        wr.week_start ASC;
END//
DROP PROCEDURE IF EXISTS GetQuizTrendMonthly//
CREATE PROCEDURE GetQuizTrendMonthly(
    IN p_months INT
)
BEGIN
    WITH RECURSIVE month_range AS (
        SELECT 
            DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL p_months MONTH), '%Y-%m-01') AS month_start
        UNION ALL
        SELECT 
            DATE_FORMAT(DATE_ADD(month_start, INTERVAL 1 MONTH), '%Y-%m-01')
        FROM 
            month_range
        WHERE 
            month_start < DATE_FORMAT(CURDATE(), '%Y-%m-01')
    )
    SELECT 
        mr.month_start AS month_start_date,
        DATE_FORMAT(mr.month_start, '%Y-%m') AS month_label,
        COALESCE(COUNT(qs.session_id), 0) AS quiz_count
    FROM 
        month_range mr
    LEFT JOIN 
        quiz_session qs ON DATE_FORMAT(qs.start_time, '%Y-%m-01') = mr.month_start
    GROUP BY 
        mr.month_start,
        month_label
    ORDER BY 
        mr.month_start ASC;
END//
DROP PROCEDURE IF EXISTS GetOverallKPIs//
CREATE PROCEDURE GetOverallKPIs()
BEGIN
    SELECT
        ROUND(AVG(s.score_value * 100), 1) as averageScore,
        COUNT(DISTINCT q.session_id) as totalSessions,
        ROUND(SUM(q.time_diff), 0) as timeSpent,
        COUNT(DISTINCT sim.question_asked_id) as totalSimulatorQuestions
    FROM
        score s,
        quiz_session q,
        simulator_question_asked sim;
END//
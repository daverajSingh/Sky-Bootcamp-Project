CREATE TABLE IF NOT EXISTS admin (
    `admin_id` int PRIMARY KEY NOT NULL auto_increment, 
    `admin_email` varchar(255) NOT NULL, 
    `admin_password` varchar(255) NOT NULL, 
    `admin_name` varchar(50) NOT NULL
);
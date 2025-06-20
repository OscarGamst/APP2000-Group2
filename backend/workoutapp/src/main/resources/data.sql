/*
-- First, clean up existing data (if any) in reverse order of dependencies
TRUNCATE TABLE users;

-- Sample data for User entity
INSERT INTO users ( id, username, email, birthday, visibility) VALUES
    ('1', 'malinator', 'malin@mail.com', '1999-03-13','1'),
    ('2', 'oscarinho', 'oscar@mail.com', '2000-07-03','0'),
    ('3', 'sarasaurus', 'sara@mail.com', '2001-06-17','0'),
    ('4', 'bertimusprime', 'albert@mail.com', '2002-07-28','1'),
    ('5', 'testotestman', 'test@mail.com', '2001-01-01','1');


-- New table definitions for creating all the tables in the database

-- Users table w. information about the user and their account
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
   user_id INT PRIMARY KEY,
   username VARCHAR(255),
   email_address VARCHAR(100),
   user_password VARCHAR(100),
   date_of_birth VARCHAR(100)

);

-- Activity table w. information about the activity the user has done
DROP TABLE IF EXISTS activity CASCADE;

TRUNCATE TABLE activity;
CREATE TABLE activity (
    activity_id INT PRIMARY KEY,
    description VARCHAR(255),
    duration INT,
    accessibility VARCHAR(5),
    published DATE,
    publisher INT,
    combined VARCHAR(5),
    timestamp TIMESTAMPZ,
    CONSTRAINT fk_activity FOREIGN KEY(publisher) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Run table w. information about the run
DROP TABLE IF EXISTS run CASCADE;

CREATE TABLE run (
    distance DECIMAL,
    time INT,
    timestamp TIMESTAMPZ,
    activity_id INT,
    PRIMARY KEY(distance,activity_id),
    CONSTRAINT fk_run FOREIGN KEY(activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE

);

-- Exercise table w. information about the exercises done
DROP TABLE IF EXISTS exercise CASCADE;

CREATE TABLE exercise (
						exercise_name VARCHAR(50),
						exercise_sets INT,
						exercise_reps INT,
						exercise_weight DECIMAL,
						activity_id INT,
						PRIMARY KEY(exercise_name,activity_id),
						CONSTRAINT fk_exercise FOREIGN KEY(activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE
);
					
-- Comment table w. information about comments users may have posted on others' activities
DROP TABLE IF EXISTS activity_comments CASCADE;

CREATE TABLE activity_comments (
						activity_id INT,
						comment_owner INT,
						timestamp TIMESTAMP,
						comment_content VARCHAR(200),
						PRIMARY KEY(activity_id,comment_owner,timestamp),
						CONSTRAINT fk_comment_activity FOREIGN KEY(activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE,
						CONSTRAINT fk_comment_owner FOREIGN KEY(comment_owner) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Like table w. information about an activity's likes
DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE likes (
					activity_id INT,
					like_owner INT,
					timestamp TIMESTAMP,
					PRIMARY KEY(activity_id, like_owner),
					CONSTRAINT fk_likes_activity_id FOREIGN KEY(activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE,
					CONSTRAINT fk_likes_owner FOREIGN KEY(like_owner) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Goal table w. information about the user's general fitness goal (this one needs rework:3)
DROP TABLE IF EXISTS goal CASCADE;

CREATE TABLE goal (
					goal_id INT PRIMARY KEY,
					user_id INT,
					repeating VARCHAR(5),
					repeating_days INT,
					timestamp TIMESTAMP,
					CONSTRAINT fk_goal FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Run goal table w. information about user's goal with running
DROP TABLE IF EXISTS run_goal CASCADE;

CREATE TABLE run_goal (
					goal_id INT PRIMARY KEY,
					distance DECIMAL,
					time DECIMAL,
					timestamp TIMESTAMP,
					CONSTRAINT fk_run_goal FOREIGN KEY(goal_id) REFERENCES goal(goal_id) ON DELETE CASCADE
);

-- Exercise table w. information about user's goal with weightlifting
DROP TABLE IF EXISTS exercise_goal CASCADE;

CREATE TABLE exercise_goal (
							goal_id INT PRIMARY KEY,
							exercise_name VARCHAR(50),
							exercise_sets INT,
							exercise_reps INT,
							exercise_weight DECIMAL,
							CONSTRAINT fk_exercise_goal FOREIGN KEY(goal_id) REFERENCES goal(goal_id) ON DELETE CASCADE
);

-- Following table showing which users the user follows
DROP TABLE IF EXISTS following_user CASCADE;

CREATE TABLE following_user (
								following_user_id INT,
								follower_user_id INT,
								timetamp TIMESTAMP,
								PRIMARY KEY(following_user_id, follower_user_id),
								CONSTRAINT fk_following_user_following FOREIGN KEY(following_user_id) REFERENCES users(user_id),
								CONSTRAINT fk_following_user_follower FOREIGN KEY(follower_user_id) REFERENCES users(user_id)
);

-- follower table showing which users follow the user
DROP TABLE IF EXISTS user_follower CASCADE;

CREATE TABLE user_follower (
								following_user_id INT,
								follower_user_id INT,
								timetamp TIMESTAMP,
								PRIMARY KEY(following_user_id, follower_user_id),
								CONSTRAINT fk_user_follower_following FOREIGN KEY(following_user_id) REFERENCES users(user_id),
								CONSTRAINT fk_user_follower_follower FOREIGN KEY(follower_user_id) REFERENCES users(user_id)
);
*/
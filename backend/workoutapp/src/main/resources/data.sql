-- First, clean up existing data (if any) in reverse order of dependencies
DELETE FROM users;

-- Sample data for User entity
INSERT INTO users ( id, firstName, lastName, email, birthday, visibility) VALUES
    ('1', 'malin','ator', 'malin@mail.com', '1999-03-13','1'),
    ('2', 'oscar', 'inho', 'oscar@mail.com', '2000-07-03','0'),
    ('3', 'sara', 'saurus','sara@mail.com', '2001-06-17','0'),
    ('4', 'bert', 'imusprime','albert@mail.com', '2002-07-28','1');
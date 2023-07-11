CREATE TABLE `user` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `email` VARCHAR(100) NOT NULL,
   `name` VARCHAR(30) NOT NULL,
   `username` VARCHAR(30) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `status` ENUM('master', 'user', 'client') NOT NULL,
   `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   UNIQUE (`email`),
   UNIQUE (`username`)
);

CREATE TABLE `hashtags` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `tagged_users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `content` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user_id` INT NOT NULL,
   `platform` ENUM('Instagram', 'TikTok', 'Pinterest', 'Facebook', 'Twitter') NOT NULL,
   `title` VARCHAR(200) NOT NULL,
   `caption` LONGTEXT DEFAULT NULL,
   `description` LONGTEXT DEFAULT NULL,
   `type` VARCHAR(50) NOT NULL,
   `mediaURL` LONGTEXT DEFAULT NULL,
   `postDate` TIMESTAMP DEFAULT NULL,
   `likes` SMALLINT DEFAULT NULL,
   `comments` SMALLINT DEFAULT NULL,
   `location` VARCHAR(255) DEFAULT NULL,
   `audio` VARCHAR(255) DEFAULT NULL,
   `brand` VARCHAR(255) DEFAULT NULL,
   `timestamp` TIMESTAMP NOT NULL,
   -- `script_id` INT DEFAULT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `content_hashtags` (
   `content_id` INT,
   `hashtag_id` INT,
   FOREIGN KEY (`content_id`) REFERENCES `content`(`id`),
   FOREIGN KEY (`hashtag_id`) REFERENCES `hashtags`(`id`)
);

CREATE TABLE `content_tagged_users` (
   `content_id` INT,
   `tagged_user_id` INT,
   FOREIGN KEY (`content_id`) REFERENCES `content`(`id`),
   FOREIGN KEY (`tagged_user_id`) REFERENCES `tagged_users`(`id`)
);

-- Creating users
INSERT INTO `user` (`name`, `username`, `password`, `status`) VALUES
   ('Master User', 'john', '123', 'master'),
   ('User User', 'jane', '123', 'user'),
   ('Client User', 'client', '123', 'client');

-- Creating content entries
INSERT INTO `content` (`user_id`, `platform`, `title`, `caption`, `type`, `timestamp`)
VALUES
   -- TikTok entries
   (1, 'TikTok', 'TikTok Entry 1', 'Check out my TikTok video!', 'video', NOW()),
   (2, 'TikTok', 'TikTok Entry 2', 'Another TikTok video!', 'video', NOW()),
   -- Instagram entries
   (1, 'Instagram', 'Instagram Post', 'This is my awesome post!', 'photo', NOW()),
   (1, 'Instagram', 'Instagram Story', 'Having a great day!', 'story', NOW()),
   -- Pinterest entries
   (2, 'Pinterest', 'Pinterest Entry 1', 'Discover new ideas!', 'pin', NOW()),
   (2, 'Pinterest', 'Pinterest Entry 2', 'Pin it!', 'pin', NOW()),
   -- Facebook entries
   (3, 'Facebook', 'Facebook Post', 'Exciting news!', 'post', NOW()),
   (3, 'Facebook', 'Facebook Story', 'Check out my story!', 'story', NOW());

-- Creating hashtags for Instagram post
INSERT INTO `hashtags` (`name`) VALUES
   ('hashtag1'),
   ('hashtag2'),
   ('hashtag3');

-- Creating content-hashtags relationship for Instagram post
INSERT INTO `content_hashtags` (`content_id`, `hashtag_id`)
VALUES
   (3, 1),
   (3, 2),
   (3, 3);

SELECT *
FROM `content`
WHERE `platform` = 'Instagram';

SELECT DISTINCT `type`
FROM `content`;
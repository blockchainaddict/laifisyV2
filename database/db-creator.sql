CREATE TABLE `user` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(30) NOT NULL,
   `username` VARCHAR(30) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `status` ENUM('master', 'user', 'client') NOT NULL,
   PRIMARY KEY (`id`),
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

-- CREATE TABLE `scripts` (
--    `id` INT NOT NULL AUTO_INCREMENT,
--    -- add columns for the 'scripts' table here
--    PRIMARY KEY (`id`)
-- );

-- ALTER TABLE `content` ADD FOREIGN KEY (`script_id`) REFERENCES `scripts`(`id`);

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
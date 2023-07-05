CREATE TABLE `User` (
   `id` VARCHAR(120) NOT NULL,
   `name` VARCHAR(30) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Message` (
   `id` INT NOT NULL,
   `user_id` VARCHAR(120) NOT NULL,
   `message` MEDIUMTEXT,
   `timestamp` TIMESTAMP,
   `msg_to` VARCHAR(30)
   PRIMARY KEY (`id`)
);

ALTER TABLE `Message` ADD CONSTRAINT `FK_bd66bebc-ceed-47e6-b2b6-8eacb6cf4975` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`);
ALTER TABLE `Message` MODIFY COLUMN id int auto_increment NOT NULL;


-- Populating the DB
INSERT INTO `User` (`id`, `name`) VALUES (0, 'Gpt');
INSERT INTO `User` (`id`, `name`) VALUES (1, 'User');

INSERT INTO `Message` (`user_id`, `message`, `msg_to` ) VALUES (1, 'First message into DB', 'Gpt');
INSERT INTO `Message` (`user_id`, `message`, `msg_to` ) VALUES (1, 'First message into DB', 'Gpt');
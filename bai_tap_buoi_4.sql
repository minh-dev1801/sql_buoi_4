CREATE DATABASE IF NOT EXISTS db_exercise;

USE db_exercise;

DROP DATABASE db_exercise;

ALTER TABLE `like_res` ADD CONSTRAINT `unique_user_res` UNIQUE (`user_id`, `res_id`);

ALTER TABLE `rate_res` ADD CONSTRAINT UNIQUE (`user_id`, `res_id`);

ALTER TABLE `sub_food` ADD CONSTRAINT UNIQUE (`sub_name`, `food_id`);

ALTER TABLE `rate_res` MODIFY `date_rate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE `like_res` MODIFY `date_like` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

SELECT `date_rate` FROM `rate_res` WHERE `date_rate` IS NOT NULL;

DESCRIBE `rate_res`;

SELECT * FROM `orders` WHERE `user_id` = 1;


CREATE TABLE IF NOT EXISTS `users` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    
    `full_name` VARCHAR(255),
    `email` VARCHAR(255),
    `password` VARCHAR(255)
    
    -- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `restaurants` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    
    `res_name` VARCHAR(255),
    `image` VARCHAR(255),
    `desc` VARCHAR(255)
    
    -- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `food_type` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    
    `type_name` VARCHAR(255)
    
    -- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `foods` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    
    `food_name` VARCHAR(255),
    `image` VARCHAR(255),
    `price` FLOAT,
    `desc` VARCHAR(255),
    `type_id` INT,
    
    -- ràng buộc
    FOREIGN KEY (`type_id`) REFERENCES `food_type`(`food_type_id`)
    
    -- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `sub_food` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    
    `sub_name` VARCHAR(255),
    `sub_price` FLOAT,
    `food_id` INT,
    
    -- ràng buộc
    FOREIGN KEY (`food_id`) REFERENCES `foods`(`food_id`)
    
    -- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `orders` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    
    `user_id` INT,
    `food_id` INT,
    `amount` INT,
    `code` VARCHAR(255),
    `arr_sub_id` VARCHAR(255),
    
    -- ràng buộc
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`food_id`) REFERENCES `foods`(`food_id`)
    
    -- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `rate_res` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    
    `user_id` INT,
    `res_id` INT,
    `amount` INT,
    `date_rate` DATETIME,
    
    -- ràng buộc
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`res_id`) REFERENCES `restaurants`(`res_id`)
    
    -- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `like_res` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    
    `user_id` INT,
    `res_id` INT,
    `is_like` BOOLEAN DEFAULT 1 CHECK (`is_like` IN (0, 1)),

    `date_like` DATETIME,
    
    -- ràng buộc
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`res_id`) REFERENCES `restaurants`(`res_id`)
    
    -- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO food_type (type_name) VALUES
('Món chính'),
('Món phụ'),
('Tráng miệng'),
('Đồ uống'),
('Món khai vị');

INSERT INTO users (full_name, email, password) VALUES
('Nguyễn Văn A', 'nguyenvana@gmail.com', 'user123'),
('Trần Thị B', 'tranthib@gmail.com', 'user456'),
('Lê Văn C', 'levanc@gmail.com', 'user789'),
('Phạm Thị D', 'phamthid@gmail.com', 'user101'),
('Hoàng Văn E', 'hoangvane@gmail.com', 'user202'),
('Đỗ Thị F', 'dothif@gmail.com', 'user303'),
('Vũ Văn G', 'vuvang@gmail.com', 'user404'),
('Bùi Thị H', 'buithih@gmail.com', 'user505'),
('Ngô Văn I', 'ngovani@gmail.com', 'user606'),
('Lý Thị K', 'lythik@gmail.com', 'user707');

INSERT INTO restaurants (res_name, image, `desc`) VALUES
('Nhà hàng Phở Việt', 'pho_viet.jpg', 'Nhà hàng chuyên phục vụ các món ăn truyền thống Việt Nam'),
('Sushi Tokyo', 'sushi_tokyo.jpg', 'Nhà hàng Nhật Bản với các món sushi tươi ngon'),
('La Pasta', 'la_pasta.jpg', 'Nhà hàng Ý với các món mì Ý đặc trưng'),
('BBQ House', 'bbq_house.jpg', 'Nhà hàng nướng Hàn Quốc'),
('Hải Sản Biển Đông', 'hai_san.jpg', 'Nhà hàng chuyên các món hải sản tươi sống');

INSERT INTO foods (food_name, image, price, `desc`, type_id) VALUES
('Phở bò tái', 'pho_bo.jpg', 60000, 'Phở bò với thịt bò tái', 1),
('Sushi cá hồi', 'sushi.jpg', 85000, 'Sushi cá hồi tươi sống', 1),
('Mì Ý sốt bò bằm', 'pasta.jpg', 75000, 'Mì Ý với sốt bò bằm đặc trưng', 1),
('Bún chả', 'bun_cha.jpg', 55000, 'Bún chả Hà Nội truyền thống', 1),
('Trà sữa trân châu', 'tra_sua.jpg', 35000, 'Trà sữa với trân châu đường đen', 4),
('Bánh flan', 'banh_flan.jpg', 25000, 'Bánh flan caramen', 3),
('Cơm tấm sườn', 'com_tam.jpg', 65000, 'Cơm tấm với sườn nướng', 1),
('Tiramisu', 'tiramisu.jpg', 45000, 'Bánh Tiramisu kiểu Ý', 3);

INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Thêm thịt bò', 20000, 1),
('Thêm hành', 5000, 1),
('Thêm wasabi', 5000, 2),
('Thêm gừng muối', 5000, 2),
('Thêm phô mai', 15000, 3),
('Thêm thịt viên', 20000, 3),
('Thêm chả', 15000, 4),
('Thêm bún', 10000, 4),
('Thêm trân châu', 10000, 5),
('Thêm thạch', 8000, 5),
('Thêm caramen', 5000, 6),
('Thêm sốt dâu', 10000, 6);

INSERT INTO orders (user_id, food_id, amount, code, arr_sub_id) VALUES
(1, 1, 2, 'ORDER001', '1,2'),
(1, 6, 2, 'ORDER002', '11'),
(1, 4, 1, 'ORDER003', '7,8'),
(1, 5, 2, 'ORDER004', '9,10'),
(2, 3, 1, 'ORDER005', '5,6'),
(2, 8, 1, 'ORDER006', '12'),
(3, 5, 3, 'ORDER007', '9,10'),
(3, 4, 2, 'ORDER008', '7,8'),
(4, 2, 2, 'ORDER009', '3,4'),
(5, 7, 1, 'ORDER010', NULL),
(6, 1, 1, 'ORDER011', '1'),
(7, 3, 1, 'ORDER012', '5');

INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, '2025-04-10 14:30:00'),
(1, 3, '2025-04-15 16:45:00'),
(1, 5, '2025-04-19 17:10:00'),
(2, 1, '2025-04-11 10:15:00'),
(2, 2, '2025-04-16 12:30:00'),
(3, 3, '2025-04-12 18:20:00'),
(3, 5, '2025-04-17 19:30:00'),
(4, 4, '2025-04-13 20:00:00'),
(4, 3, '2025-04-20 09:50:00'),
(5, 5, '2025-04-14 11:45:00'),
(5, 2, '2025-04-18 13:25:00'),
(6, 1, '2025-04-15 14:00:00'),
(7, 3, '2025-04-16 15:30:00');

INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 1, 5, '2025-04-20 15:30:00'),
(1, 3, 4, '2025-04-22 17:40:00'),
(1, 5, 5, '2025-04-26 18:20:00'),
(2, 1, 4, '2025-04-21 11:20:00'),
(2, 2, 5, '2025-04-23 13:15:00'),
(3, 3, 3, '2025-04-22 19:25:00'),
(3, 5, 4, '2025-04-24 20:10:00'),
(4, 4, 5, '2025-04-23 21:05:00'),
(4, 3, 4, '2025-04-27 10:30:00'),
(5, 5, 4, '2025-04-24 12:40:00'),
(5, 2, 3, '2025-04-25 14:15:00'),
(6, 1, 4, '2025-04-25 16:00:00'),
(7, 3, 3, '2025-04-26 17:30:00');

-- Tìm 5 người đã like nhà hàng nhiều nhất
SELECT `user_id`, `full_name`, `email`, `password`
FROM (
    SELECT `users`.`user_id`, `users`.`full_name`, `users`.`email`, `users`.`password`, COUNT(`like_res`.`user_id`) AS `like_count`
    FROM `like_res`
    INNER JOIN `users` ON `users`.`user_id` = `like_res`.`user_id`
    GROUP BY `like_res`.`user_id`
    ORDER BY `like_count` DESC
    LIMIT 5
) AS `subquery`;

-- Tìm 2 nhà hàng có lượt like nhiều nhất
SELECT `res_name`, `image`, `desc`
FROM (
    SELECT `restaurants`.`res_name`, `restaurants`.`image`, `restaurants`.`desc`, COUNT(`like_res`.`res_id`) AS `like_count`
    FROM `like_res`
    INNER JOIN `restaurants` ON `like_res`.`res_id` = `restaurants`.`res_id`
    GROUP BY `like_res`.`res_id`
    ORDER BY `like_count` DESC
    LIMIT 2
) AS `subquery`;

-- Tìm người đã đặt hàng nhiều nhất
SELECT `user_id`, `full_name`, `email`, `password`
FROM (
    SELECT `users`.`user_id`, `users`.`full_name`, `users`.`email`, `users`.`password`, COUNT(`orders`.`user_id`) AS `order_count`
    FROM `orders`
    INNER JOIN `users` ON `orders`.`user_id` = `users`.`user_id`
    GROUP BY `orders`.`user_id`
    ORDER BY `order_count` DESC
    LIMIT 1
) AS `subquery`;

-- Tìm người dùng không hoạt động trong hệ thống
SELECT `users`.`user_id`, `users`.`full_name`, `users`.`email`, `users`.`password`
FROM `users`
LEFT JOIN `orders` ON `users`.`user_id` = `orders`.`user_id`
LEFT JOIN `like_res` ON `users`.`user_id` = `like_res`.`user_id`
LEFT JOIN `rate_res` ON `users`.`user_id` = `rate_res`.`user_id`
WHERE `orders`.`user_id` IS NULL 
AND `like_res`.`user_id` IS NULL 
AND `rate_res`.`user_id` IS NULL;


SELECT * 
FROM `users`
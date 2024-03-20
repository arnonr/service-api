-- CreateTable
CREATE TABLE `news_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_th` VARCHAR(500) NOT NULL,
    `name_en` VARCHAR(500) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `news_type_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `title_th` VARCHAR(500) NOT NULL,
    `title_en` VARCHAR(500) NULL,
    `detail_th` LONGTEXT NULL,
    `detail_en` LONGTEXT NULL,
    `news_file` VARCHAR(500) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `count_views` INTEGER NOT NULL DEFAULT 0,
    `created_news` DATE NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_th` VARCHAR(500) NOT NULL,
    `title_en` VARCHAR(500) NULL,
    `banner_file` VARCHAR(500) NULL,
    `banner_url` VARCHAR(500) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `count_views` INTEGER NOT NULL DEFAULT 0,
    `created_banner` DATE NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `about` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_th` VARCHAR(500) NOT NULL,
    `title_en` VARCHAR(500) NULL,
    `detail_th` LONGTEXT NULL,
    `detail_en` LONGTEXT NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `count_views` INTEGER NOT NULL DEFAULT 0,
    `created_about` DATE NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_th` VARCHAR(500) NOT NULL,
    `title_en` VARCHAR(500) NULL,
    `detail_th` LONGTEXT NULL,
    `detail_en` LONGTEXT NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `count_views` INTEGER NOT NULL DEFAULT 0,
    `created_contact` DATE NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_th` VARCHAR(500) NOT NULL,
    `name_en` VARCHAR(500) NULL,
    `detail_th` LONGTEXT NULL,
    `detail_en` LONGTEXT NULL,
    `contact_th` LONGTEXT NULL,
    `contact_en` LONGTEXT NULL,
    `level` INTEGER NOT NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news_gallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `news_id` INTEGER NULL,
    `secret_key` VARCHAR(255) NOT NULL,
    `news_gallery_file` VARCHAR(500) NOT NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_th` VARCHAR(500) NOT NULL,
    `title_en` VARCHAR(500) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `email` VARCHAR(500) NOT NULL,
    `secret_confirm_email` VARCHAR(500) NULL,
    `password` VARCHAR(500) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `prefix` VARCHAR(500) NULL,
    `firstname` VARCHAR(500) NULL,
    `surname` VARCHAR(500) NULL,
    `member_status` INTEGER NOT NULL,
    `organization` VARCHAR(500) NULL,
    `contact_address` LONGTEXT NULL,
    `phone` VARCHAR(500) NULL,
    `phone2` VARCHAR(500) NULL,
    `district_code` INTEGER NULL,
    `email` VARCHAR(500) NULL,
    `invoice_name` VARCHAR(500) NULL,
    `invoice_address` LONGTEXT NULL,
    `tax_id` VARCHAR(500) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `profile_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_th` VARCHAR(500) NOT NULL,
    `name_en` VARCHAR(500) NULL,
    `detail_th` LONGTEXT NULL,
    `detail_en` LONGTEXT NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_category_on_department` (
    `department_id` INTEGER NOT NULL,
    `service_category_id` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`department_id`, `service_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_category_on_news` (
    `news_id` INTEGER NOT NULL,
    `service_category_id` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`news_id`, `service_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_news_type_id_fkey` FOREIGN KEY (`news_type_id`) REFERENCES `news_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_category_on_department` ADD CONSTRAINT `service_category_on_department_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_category_on_department` ADD CONSTRAINT `service_category_on_department_service_category_id_fkey` FOREIGN KEY (`service_category_id`) REFERENCES `service_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_category_on_news` ADD CONSTRAINT `service_category_on_news_news_id_fkey` FOREIGN KEY (`news_id`) REFERENCES `news`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_category_on_news` ADD CONSTRAINT `service_category_on_news_service_category_id_fkey` FOREIGN KEY (`service_category_id`) REFERENCES `service_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

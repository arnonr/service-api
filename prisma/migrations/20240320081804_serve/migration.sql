-- CreateTable
CREATE TABLE `serve` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_id` INTEGER NOT NULL,
    `title_th` VARCHAR(500) NOT NULL,
    `title_en` VARCHAR(500) NULL,
    `detail_th` LONGTEXT NULL,
    `detail_en` LONGTEXT NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_publish` INTEGER NOT NULL DEFAULT 1,
    `count_serve` INTEGER NOT NULL DEFAULT 0,
    `created_serve` DATE NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `serve` ADD CONSTRAINT `serve_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

import {MigrationInterface, QueryRunner} from "typeorm";

export class test1585631685819 implements MigrationInterface {
    name = 'test1585631685819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `title` `name` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `name`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `title` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_2df2f913ab85b7cfc27657171e` (`title`)", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `name` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `name`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_2df2f913ab85b7cfc27657171e`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `title`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `name` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `name` `title` varchar(255) NOT NULL", undefined);
    }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMenuSectionTable1683069239683 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "menu_sections_section",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "uuid",
					},
					{
						name: "menuId",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "sectionId",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "createdAt",
						type: "datetime",
						default: "now()",
					},
					{
						name: "updatedAt",
						type: "datetime",
						default: "now()",
						onUpdate: "now()",
					},
					{
						name: "deletedAt",
						type: "datetime",
						isNullable: true,
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			"menu_sections_section",
			new TableForeignKey({
				columnNames: ["menuId"],
				referencedColumnNames: ["id"],
				referencedTableName: "menu",
				onDelete: "CASCADE",
			}),
		);

		await queryRunner.createForeignKey(
			"menu_sections_section",
			new TableForeignKey({
				columnNames: ["sectionId"],
				referencedColumnNames: ["id"],
				referencedTableName: "section",
				onDelete: "CASCADE",
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSectionItemTable1683069149112 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "section_items_item",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "uuid",
					},
					{
						name: "itemId",
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
			"section_items_item",
			new TableForeignKey({
				columnNames: ["itemId"],
				referencedColumnNames: ["id"],
				referencedTableName: "item",
				onDelete: "CASCADE",
			}),
		);

		await queryRunner.createForeignKey(
			"section_items_item",
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

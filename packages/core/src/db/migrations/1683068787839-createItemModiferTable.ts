import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateItemModiferTable1683068787839 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "item_modifiers_modifer",
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
						name: "modifierId",
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
			"item_modifiers_modifer",
			new TableForeignKey({
				columnNames: ["itemId"],
				referencedColumnNames: ["id"],
				referencedTableName: "item",
				onDelete: "CASCADE",
			}),
		);

		await queryRunner.createForeignKey(
			"item_modifiers_modifer",
			new TableForeignKey({
				columnNames: ["modifierId"],
				referencedColumnNames: ["id"],
				referencedTableName: "modifier",
				onDelete: "CASCADE",
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable("item_modifiers_modifer");
		const foreignKeyItemId = table?.foreignKeys.find((fk) => fk.columnNames.indexOf("itemId") !== -1);
		const foreignKeyModifierId = table?.foreignKeys.find((fk) => fk.columnNames.indexOf("modifierId") !== -1);
		if (foreignKeyItemId) {
			await queryRunner.dropForeignKey("item_modifiers_modifer", foreignKeyItemId);
		}
		if (foreignKeyModifierId) {
			await queryRunner.dropForeignKey("item_modifiers_modifer", foreignKeyModifierId);
		}
		await queryRunner.dropTable("item_modifiers_modifer");
	}
}

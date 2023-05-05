import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItemsTable1683067632441 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: "item",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "uuid",
					},
					{
						name: "name",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "price",
						type: "decimal",
						scale: 2,
						precision: 10,
						isNullable: false,
					},
					{
						name: "description",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "image",
						type: "varchar",
						isNullable: true,
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("item");
	}
}

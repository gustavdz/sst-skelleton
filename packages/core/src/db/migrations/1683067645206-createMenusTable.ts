import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMenusTable1683067645206 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: "menu",
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
						name: "description",
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
		await queryRunner.dropTable("menu");
	}
}

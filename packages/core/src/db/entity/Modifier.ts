import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, BaseEntity, DeleteDateColumn } from "typeorm";

@Entity({ name: "modifier" })
export default class Modifier extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
		length: 50,
		comment: "Unique name of the modifier",
	})
	name: string;

	@Column({
		type: "decimal",
		scale: 10,
		precision: 2,
		comment: "price of the modifier",
	})
	price: number;

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: "timestamp",
		nullable: true,
	})
	updatedAt: Date | null;

	@DeleteDateColumn({
		type: "timestamp",
		nullable: true,
		name: "deletedAt",
	})
	delete: Date | null;
}

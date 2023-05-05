import "reflect-metadata";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	BaseEntity,
	DeleteDateColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";
import Modifier from "./Modifier";

@Entity({ name: "item" })
export default class Item extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
		length: 50,
		comment: "name of the item",
	})
	name: string;

	@Column({
		type: "decimal",
		scale: 10,
		precision: 2,
		comment: "price of the item",
	})
	price: number;

	@Column({
		type: "varchar",
		length: 200,
		comment: "description of the item",
		nullable: true,
	})
	description?: string;

	@Column({
		type: "text",
		comment: "image url of the item",
		nullable: true,
	})
	image?: string;

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

	@ManyToMany(() => Modifier)
	@JoinTable()
	modifiers: Modifier[];
}

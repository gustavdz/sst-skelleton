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
import Item from "./Item";

@Entity({ name: "section" })
export default class Section extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
		length: 50,
		comment: "name of the section",
	})
	name: string;

	@Column({
		type: "varchar",
		length: 200,
		comment: "description of the section",
		nullable: true,
	})
	description?: string;

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

	@ManyToMany(() => Item)
	@JoinTable()
	items: Item[];
}

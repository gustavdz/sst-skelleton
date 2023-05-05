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
import Section from "./Section";

@Entity({ name: "menu" })
export default class Menu extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
		length: 50,
		comment: "name of the menu",
	})
	name: string;

	@Column({
		type: "varchar",
		length: 200,
		comment: "description of the menu",
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

	@ManyToMany(() => Section)
	@JoinTable()
	sections: Section[];
}

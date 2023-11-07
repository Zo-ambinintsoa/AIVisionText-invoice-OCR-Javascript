import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../product/entities/product.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  address: string;

  @Column()
  contactNo: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  additionalDetails: string;

  @OneToMany(() => Product, (product) => product.invoice, { cascade: true })
  products: Product[];
}
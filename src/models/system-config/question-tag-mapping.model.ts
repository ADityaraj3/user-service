import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import { TagModel } from './tags.model';
import { UserModel } from '../public/users.model';

@Table({
  schema: 'system_config',
  tableName: 'question_tag_mapping',
  timestamps: true,
})
export class QuestionTagMappingModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  mapping_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  question_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  platform: string; // Assuming `question_platform` is an enum or a string type.

  @ForeignKey(() => TagModel)
  @Column({
    type: DataType.INTEGER,
  })
  tag_id: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
  })
  created_by: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
  })
  updated_by: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
  })
  updated_at: Date;
}

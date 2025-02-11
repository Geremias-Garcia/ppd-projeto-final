import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface VendaInstance extends Model {
    id: number;
    cliente: number;
    produto: number;
    data: Date;
}

export const Venda = sequelize.define<VendaInstance>('Venda', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    produto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'vendas',
    timestamps: false
});

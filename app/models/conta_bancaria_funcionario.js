module.exports = (sequelize, DataTypes) => {

const ContaBancariaFuncionarioModel = sequelize.define('ContaBancariaFuncionarioModel',{



    CODIGO_FUNCIONARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      
    },

    BANCO:{
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
    },

    AGENCIA:{
  
            type: DataTypes.STRING,
            required: true,
            max: 20,
            allowNull: false

    },

    CONTA:{ 
        
            type: DataTypes.STRING,
            required: true,
            max: 20,
            allowNull: false
        
    }
},
    {
        tableName: 'CONTA_BANCARIA_FUNCIONARIO',
        timestamps: false
    }
)
return ContaBancariaFuncionarioModel

}
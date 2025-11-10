const validTypes =['Plante','Poison','Feu','Eau','Insecte', 'Vol','Normal','Electrik' ,'Fée']
const {RequiredFieldMessage} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique:{
          name: 'name',
          msg: 'Le nom est deja pris ',
        },
        validate:{//validateur  pour le controle de la saisie utilisateur 
          notEmpty:{msg:"le nom ne doit pas etre un champ vode"},
          notNull:{msg:"Le name une propriété requise"},
          
          }
        },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{//validateur  pour le controle de la saisie utilisateur 
           isInt:{msg:"Utilisez uniquement des nombres entiers pour les point de vie"},
           notNull:{msg:"Les points de vie sont une propriété requise"},
           min:{
            args: [0],
            msg: "La valeur du point de vie doit etre superieur ou égale à 0"
          },
           max:{
             args:[999] ,
             
             msg: "La valeur du point de vie doit etre inferieur ou égale à 999"
           }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{//validateur  pour le controle de la saisie utilisateur 
          isInt:{msg:"Utilisez uniquement des nombres entiers pour les dégats"},
          notNull:{msg:"Les degats sont une propriété requise"},
          min:{
            args: [0],
            msg: "La valeur des degats doit etre superieur ou égale à 0"
          },
           max:{
             args:[99] ,
             
             msg: "La valeur des dégats doit etre inferieur ou égale à 99"
           }
       }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{//validateur  pour le controle de la saisie utilisateur 
          isUrl:{msg:"LUrl du pokemon choisie n est pas valide"},
          notNull:{msg:"Le picture est  une propriété requise"}
       }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
             this.setDataValue('types',types.join())
        },
        validate:{
           isTypesValid(value){
             if(!value){
              throw new Error('Un pokemon dois au moins avoir un type.')
             }
             if(value.split(',').length>3){
               throw new Error('Un pokémon ne peut pas avoir plus de trois types.')
             }
             value.split(',').forEach(type => {
              if (!validTypes.includes(type)) {
                throw new Error(`Le type d'un Pokémon doit appartenir à la liste suivante: ${validTypes}`);
              }
            })
           
           }
        }
      }
    }, 
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }
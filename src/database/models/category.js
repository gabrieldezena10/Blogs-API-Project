const createCategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'Categories',
    underscored: false,
  });
  return Category
};

module.exports = createCategoryModel;
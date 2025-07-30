const mainModel = require('../models/mainModel');

const uploadImage = async (req, imagePath) => {
  const { model, model_id } = req;
  const capitalizedModel = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase();
  const result = mainModel.uploadImage(capitalizedModel, model_id, imagePath);
  return result;
};

const createTable = async () => {
  const result = mainModel.createTable();
  return result;
};
  
const mockPopulateTable = async () => {
  const result = mainModel.mockPopulateTable();
  return result;
}

module.exports = {
  uploadImage,
  createTable,
  mockPopulateTable
}

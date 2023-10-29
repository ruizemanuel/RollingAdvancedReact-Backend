import { validationResult } from "express-validator";
import Product from "../models/product";
import ProductHistory from "../models/productHistory";

const showProducts = async (req, res) => {
  try {
    //voy obtener un array con los productos guardados en BD
    const productsList = await Product.find();
    res.status(200).json(productsList);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error al obtener el menu" });
  }
};

const getOneProduct = async (req, res) => {
  try {
    console.log(req.params);

    //buscamos el producto en mi BD
    const productSearch = await Product.findById(req.params.id);
    res.status(200).json(productSearch);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Error al buscar el producto" });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log(req.body);

    const { productName, price, stock, description, urlImg, category } = req.body;
    const createdBy = req.name;

    //crear un objeto para guardarlo en la BD
    const newProduct = new Product({
      /* productName: req.body.productName,
            price: req.body.price,
            urlImg: req.body.urlImg,
            category: req.body.category */

      productName,
      price,
      stock,
      description,
      urlImg,
      category,
    });

    //guardar en BD

    await newProduct.save();
    await createProductHistory(newProduct._id.toString(), createdBy, "Se creó el producto");
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error al crear el producto" });
  }
};

const createProductHistory = async (productId, createdBy, message) => {
  try {
    const createdAt = new Date().toISOString().split('T')[0];
    const product = await Product.findById(productId);
    console.log('un producto', product);
    const newProductHistory = new ProductHistory({
      productName: product.productName,
      createdBy,
      message,
      createdAt
    });

    await newProductHistory.save();
  } catch (error) {
    console.log(error);
  }
};

const showHistory = async (req, res) => {
  try {
    //voy obtener un array con el historial guardado en BD
    const historyList = await ProductHistory.find();
    res.status(200).json(historyList);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error al obtener el historial" });
  }
};

const updateProduct = async (req, res) => {
  try {
    //buscamos el producto por id y lo modifico con los datos que me llegan desde el body
    const createdBy = req.name;
    await Product.findByIdAndUpdate(req.params.id, req.body);
    await createProductHistory(req.params.id, createdBy, "Se modificó el producto");
    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Error al buscar el producto" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    //buscar el producto por su id  y luego lo elimino
    const createdBy = req.name;
    await createProductHistory(req.params.id, createdBy, "Se eliminó el producto");
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Producto eliminado con exito" });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Error al buscar el producto" });
  }
};

export {
  showProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  showHistory,
  createProductHistory,
  deleteProduct,
};

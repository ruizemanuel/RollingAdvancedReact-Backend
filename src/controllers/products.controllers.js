import { validationResult } from "express-validator";
import Product from "../models/product";

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

    const { productName, price, description, urlImg, category } = req.body;

    //crear un objeto para guardarlo en la BD
    const newProduct = new Product({
      /* productName: req.body.productName,
            price: req.body.price,
            urlImg: req.body.urlImg,
            category: req.body.category */

      productName,
      price,
      description,
      urlImg,
      category,
    });

    //guardar en BD

    await newProduct.save();
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error al crear el producto" });
  }
};

const updateProduct = async (req, res) => {
  try {
    //buscamos el producto por id y lo modifico con los datos que me llegan desde el body

    await Product.findByIdAndUpdate(req.params.id, req.body);
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
  deleteProduct,
};

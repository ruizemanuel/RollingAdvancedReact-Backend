import User from "../models/user";

const showUsers = async (req, res) => {
    try {
      //voy obtener un array con los productos guardados en BD
      
      //const usersList = await User.find();
      const usersList = await User.find({}, { password: 0 });
      //const usersList = await User.find({}, { email: 1, roles: 1 });
      
      res.status(200).json(usersList);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Error al obtener la lista de usuarios" });
    }
  };

  const getOneUser = async (req, res) => {
    try {
      console.log(req.params);
  
      //buscamos el user en mi BD
      const userSearch = await User.findById(req.params.id);
      res.status(200).json(userSearch);
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: "Error al obtener el usuario" });
    }
  };

  const updateUser = async (req, res) => {
    try {
      //buscamos el producto por id y lo modifico con los datos que me llegan desde el body
  
      await User.findByIdAndUpdate(req.params.id, req.body);
      console.log('BODY',req.body)
      res.status(200).json({ message: "Usuario actualizado con exito" });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: "Error al obtener el usuario" });
    }
  };

  export {
    showUsers, getOneUser, updateUser
  };
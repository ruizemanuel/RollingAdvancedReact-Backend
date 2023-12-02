import User from "../models/user";

const showUsers = async (req, res) => {
    try {
      const usersList = await User.find({}, { password: 0 });
      res.status(200).json(usersList);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Error al obtener la lista de usuarios" });
    }
  };

  const getOneUser = async (req, res) => {
    try {
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
      await User.findByIdAndUpdate(req.params.id, req.body);
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
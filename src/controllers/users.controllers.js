import User from "../models/user";
import bcrypt from "bcryptjs";
import generateJWT from "../helpers/generateJWT";



const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); 
    if (!user)
      return res
        .status(400)
        .json({ message: "No se encontró un usuario con el email ingresado" });

    if (!user.activo)
      return res
        .status(400)
        .json({ message: "Usuario inactivo" });

    const correctPassword = bcrypt.compareSync(password, user.password)
    if (!correctPassword) return res.status(404).json({ message: "Contraseña incorrecta" })

    const token = await generateJWT(user._id, user.name)
    res.status(200).json({
      message: "Bienvenido",
      email: user.email,
      name: user.name, 
      uid: user._id,
      token,
      roles: user.roles
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error al iniciar sesion" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, passwordrep } = req.body;

    if (password !== passwordrep)
      return res
        .status(400)
        .json({ message: "Las contraseñas no coinciden" });

    const userFound = await User.findOne({ email });
    if (userFound)
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con el email ingresado" });

    let createdUser = new User(req.body);
    const SALT_ROUNDS = 10;
    createdUser.password = await bcrypt.hash(password, SALT_ROUNDS);

    const token = await generateJWT(createdUser._id, createdUser.name)

    await createdUser.save();
    res.status(201).json({
      message: "Usuario creado exitosamente, por favor inicia sesión",
      userName: createdUser.name,
      uid: createdUser._id,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error al registrar usuario" });
  }
};

export { login, register };

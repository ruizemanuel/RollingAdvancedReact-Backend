import User from "../models/user";
import bcrypt from "bcryptjs";
import generateJWT from "../helpers/generateJWT";



const login = async (req, res) => {
  //res.send("User logged in successfully");
  try {
    const { email, password } = req.body;
    //verificar si el email existe
    const user = await User.findOne({ email }); // si no lo encuentra devuelve null
    if (!user)
      return res
        .status(400)
        .json({ message: "No se encontró un usuario con el email ingresado" });

    if (!user.activo)
      return res
        .status(400)
        .json({ message: "Usuario inactivo" });
    //confirmar sie l passwaord enviado es valido

    const correctPassword = bcrypt.compareSync(password, user.password) // el método compara el password enviado con el guardado
    if (!correctPassword) return res.status(404).json({ message: "Contraseña incorrecta" })

    //generar el token
    const token = await generateJWT(user._id, user.name)
    // si el password y email son correctos
    res.status(200).json({
      message: "User email and password correct",
      email: user.email,
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
  //res.send('User registered in successfully')
  try {
    const { name, email, password, passwordrep } = req.body;

    //verificar que las claves coincidan
    if (password !== passwordrep)
      return res
        .status(400)
        .json({ message: "Las contraseñas no coinciden" });

    //verificar si el email existe
    const userFound = await User.findOne({ email });
    //si existe
    if (userFound)
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con el email ingresado" });
    //encriptar el password
    let createdUser = new User(req.body);
    const SALT_ROUNDS = 10;
    createdUser.password = await bcrypt.hash(password, SALT_ROUNDS);

    //generar un token
    const token = await generateJWT(createdUser._id, createdUser.name)
    //guardar en BD
    await createdUser.save();
    res.status(201).json({
      message: "Usuario creado exitosamente",
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

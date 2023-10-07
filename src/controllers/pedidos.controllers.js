import Pedido from "../models/pedido";


const showPedidos = async (req, res) => {
    try {
        //voy obtener un array con los pedidos guardados en BD
        const pedidosList = await Pedido.find();
        res.status(200).json(pedidosList);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Error al obtener los pedidos" });
    }
};

const createPedido = async (req, res) => {
    try {
      console.log('DESDE PEDIDO EN BACK', req.body);
  
      const { pedido, email, estado, total  } = req.body;
  
      //crear un objeto para guardarlo en la BD
      const newPedido = new Pedido({
        /* productName: req.body.productName,
              price: req.body.price,
              urlImg: req.body.urlImg,
              category: req.body.category */
  
        pedido,
        email,
        estado,
        total
      });
  
      //guardar en BD
  
      await newPedido.save();
      res.status(201).json({ message: "Pedido creado con exito" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error al crear el pedido" });
    }
  };

  const getOnePedido = async (req, res) => {
    try {
      console.log(req.params);
  
      //buscamos el producto en mi BD
      const pedidoSearch = await Pedido.findById(req.params.id);
      res.status(200).json(pedidoSearch);
      console.log('ONE PEDIDO', pedidoSearch);
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: "Error al buscar el pedido" });
    }
  };

  const getUnPedido = async (req, res) => {
    try {
      //console.log(req.params);

      const { email } = req.body;

      //const usersList = await User.find({}, { email: 0, password: 0 });
  
      //buscamos el producto en mi BD
      const pedidoSearch = await Pedido.findOne({ email });
      //const pedidoSearch = await Pedido.find({}, { uid: 1, pedido: 1, estado: 1 });
      res.status(200).json(pedidoSearch);
      console.log('UN PEDIDO', pedidoSearch);
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: "Error al buscar el pedido" });
    }
  };

  const updatePedido = async (req, res) => {
    try {
      //buscamos el producto por id y lo modifico con los datos que me llegan desde el body

      console.log('DESDE PEDIDO EDICION EN BACK', req.body);
      console.log('DESDE PEDIDO EDICION ID EN BACK', req.params.id);
  
      await Pedido.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Pedido modificado con exito" });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: "Error al buscar el pedido" });
    }
  };

  const deletePedido = async (req, res) => {
    try {
      //buscar el producto por su id  y luego lo elimino
      await Pedido.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Pedido eliminado con exito" });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: "Error al buscar el pedido" });
    }
  };

  const deleteUnPedido = async (req, res) => {
    try {
      //buscar el producto por su id  y luego lo elimino
      //await Pedido.pedido.findByIdAndDelete(req.params.id);
      const { id, newTotal } = req.body;
      //console.log('EL ID', req.body)
      console.log('EL ID',id)
      console.log('EL ID',newTotal)
      //await Pedido.findByIdAndUpdate(req.params.id, { $pull: { pedido: { _id: id } }}, { new: true })

      await Pedido.findByIdAndUpdate(req.params.id, { $pull: { pedido: { _id: id }}, $set: { total: newTotal }  }, { new: true });

      res.status(200).json({ message: "Pedido eliminado con exito" });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: "Error al buscar el pedido" });
    }
  };


export {
    showPedidos,
    createPedido,
    getOnePedido,
    getUnPedido,
    updatePedido,
    deletePedido,
    deleteUnPedido
};

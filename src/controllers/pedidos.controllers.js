import Pedido from "../models/pedido";


const showPedidos = async (req, res) => {
    try {
        const pedidosList = await Pedido.find();
        res.status(200).json(pedidosList);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Error al obtener los pedidos" });
    }
};

const getVentasTotalesPorMes = async (req, res) => {
  try {
      const ventasPorMes = await Pedido.aggregate([
          {
              $match: {
                  date: { $exists: true }
              }
          },
          {
              $project: {
                  month: { $month: "$date" }, 
                  total: 1 
              }
          },
          {
              $group: {
                  _id: "$month",
                  ventas: { $sum: "$total" } 
              }
          },
          {
              $sort: {
                  _id: 1 
              }
          }
      ]);

      const ventasPorMesConNombre = ventasPorMes.map(item => {
          return {
              mes: obtenerNombreDelMes(item._id), 
              ventas: item.ventas
          };
      });

      res.status(200).json(ventasPorMesConNombre);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener las ventas totales por mes" });
  }
};

function obtenerNombreDelMes(numeroMes) {
  const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return meses[numeroMes - 1];
}

const getVentasTotalesPorCategoria = async (req, res) => {
  try {
      const ventasPorCategoria = await Pedido.aggregate([
          {
              $unwind: "$pedido" 
          },
          {
              $group: {
                  _id: "$pedido.category", 
                  ventas: { $sum: "$pedido.price" } 
              }
          }
      ]);

      res.status(200).json(ventasPorCategoria);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener las ventas totales por categoría" });
  }
};

const createPedido = async (req, res) => {
    try {
  
      const { pedido, email, estado, total  } = req.body;
      const date = new Date().toISOString().split('T')[0];
      const newPedido = new Pedido({

  
        pedido,
        email,
        estado,
        total,
        date
      });
      await newPedido.save();
      res.status(201).json({ message: "Pedido creado con exito" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error al crear el pedido" });
    }
  };

  const getOnePedido = async (req, res) => {
    try {
      const pedidoSearch = await Pedido.findById(req.params.id);
      res.status(200).json(pedidoSearch);
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: "Error al buscar el pedido" });
    }
  };

  const getUnPedido = async (req, res) => {
    try {

      const { email } = req.body;
      const pedidoSearch = await Pedido.findOne({ email });
      res.status(200).json(pedidoSearch);
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: "Error al buscar el pedido" });
    }
  };

  const updatePedido = async (req, res) => {
    try {
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
      const { id, newTotal } = req.body;
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
    getVentasTotalesPorMes,
    getVentasTotalesPorCategoria,
    createPedido,
    getOnePedido,
    getUnPedido,
    updatePedido,
    deletePedido,
    deleteUnPedido
};

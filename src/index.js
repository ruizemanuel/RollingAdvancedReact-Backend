import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import './database';
import products from './routes/products.routes';
import auth from './routes/users.routes';
import users from './routes/listausuarios.routes';
import pedidos from './routes/pedidos.routes';
import * as dotenv from 'dotenv' 


//console.log('estoy en mi backend');


//crear la instancia de Express
const app = express();

//crear un puerto test
app.set('port', process.env.PORT || 4001);

app.listen(app.get('port'), ()=> {

    console.log('*********************************');
    console.log('Estoy en el puerto ' + app.get('port'));
    console.log('*********************************'); 

});


//middlewares
dotenv.config()
app.use(morgan('dev')); //nos da info de la consulta como ser el tipo, status, tiempo de ejecución
app.use(cors()); //nos permite recibir peticiones remotas a nuestra API
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//estos  dos últimos permiten recibir e interpretar el json de la req

//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));


//Rutas

app.use('/apiRestaurant/products', products);
app.use('/apiRestaurant/auth', auth);
app.use('/apiRestaurant/users', users);
app.use('/apiRestaurant/pedidos', pedidos);

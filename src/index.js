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



const app = express();

app.set('port', process.env.PORT || 4001);

app.listen(app.get('port'), ()=> {

    console.log('*********************************');
    console.log('Estoy en el puerto ' + app.get('port'));
    console.log('*********************************'); 

});


dotenv.config()
app.use(morgan('dev')); 
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));



app.use('/apiRestaurant/products', products);
app.use('/apiRestaurant/auth', auth);
app.use('/apiRestaurant/users', users);
app.use('/apiRestaurant/pedidos', pedidos);

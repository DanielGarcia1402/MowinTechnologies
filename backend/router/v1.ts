import * as express from 'express';

import {getAllClientes,getClientesById,createCliente,updateCliente,deleteCliente} from '../controllers/clientes/clientes';
    
// application routes
export default (app) => {

    const apiRoutesClientes = express.Router();
    const serviceClientes = express.Router();
    

    /**
     * POST CLIENTES
     */
    apiRoutesClientes.use('/cliente', serviceClientes);
    serviceClientes.get('/', getAllClientes);
    serviceClientes.get('/:id', getClientesById);
    serviceClientes.post('/', createCliente);
    serviceClientes.put('/:id', updateCliente); 
    serviceClientes.delete('/:id', deleteCliente);
    app.use('/api', apiRoutesClientes);



};


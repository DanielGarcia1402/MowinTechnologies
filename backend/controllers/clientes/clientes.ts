import Cliente from '../../models/clientes/clientes';

//CRUD of the application
export function getAllClientes(req, res, next) {
    Cliente.find((err, clientes) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({clientes});
    });
}

export function getClientesById(req, res, next) {
  const id = req.params.id;  

  Cliente.findById(id, (err, cliente) => {
    if(err) {
        res.status(500).json({err});
    }
    res.status(200).json({cliente});
  });
}

export function createCliente(req, res, next) {
    const cedula     = req.body.cedula;
    const nombre     = req.body.nombre;
    const direccion  = req.body.direccion;
    const telefono   = req.body.telefono;

    if(!cedula) {
        res.status(422).json({err: 'cedula is required.'});
        return;
    } 
    if(!nombre) {
        res.status(422).json({err: 'nombre of the is required.'});
        return;
    }
    if(!direccion) {
        res.status(422).json({err: 'direccion of the is required.'});
        return;
    }
    if(!telefono) {
        res.status(422).json({err: 'telefono of the is required.'});
        return;
    }

    const clientee = new Cliente({
        cedula,
        nombre,
        direccion,
        telefono
    });

    clientee.save((err, cliente) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({cliente});
    });
}

export function updateCliente (req, res, next) {
    const id = req.params.id;

    Cliente.findByIdAndUpdate(id, req.body, (err, cliente) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({cliente});
    });
}

export function deleteCliente(req, res, next) {
    const id = req.params.id;

    Cliente.findByIdAndRemove(id, (err, cliente) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({cliente});
    });

}
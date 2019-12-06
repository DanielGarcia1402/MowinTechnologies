import Cliente from '../../models/categoria/categoria';

//CRUD of the application
export function getAllCategoria(req, res, next) {
    Cliente.find((err, clientes) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({clientes});
    });
}

export function getCategoriaById(req, res, next) {
  const id = req.params.id;  

  Cliente.findById(id, (err, cliente) => {
    if(err) {
        res.status(500).json({err});
    }
    res.status(200).json({cliente});
  });
}

export function createCategoria(req, res, next) {
    const nombre     = req.body.nombre;
    const descripcion     = req.body.descripcion;

    if(!nombre) {
        res.status(422).json({err: 'nombre is required.'});
        return;
    } 
    if(!descripcion) {
        res.status(422).json({err: 'descripcion of the is required.'});
        return;
    }

    const clientee = new Cliente({
        nombre,
        descripcion
    });

    clientee.save((err, cliente) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({cliente});
    });
}

export function updateCategoria (req, res, next) {
    const id = req.params.id;

    Cliente.findByIdAndUpdate(id, req.body, (err, cliente) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({cliente});
    });
}

export function deleteCategoria(req, res, next) {
    const id = req.params.id;

    Cliente.findByIdAndRemove(id, (err, cliente) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({cliente});
    });

}
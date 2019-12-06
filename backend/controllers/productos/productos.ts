import Producto from '../../models/productos/productos';

//CRUD of the application
export function getAllProductos(req, res, next) {
    Producto.find((err, productos) => {
        if(err) {
            res.status(500).json({err});
        }
        console.log(productos);
        res.status(200).json({productos});
    });
}

export function getPrductosById(req, res, next) {
  const id = req.params.id;  

  Producto.findById(id, (err, producto) => {
    if(err) {
        res.status(500).json({err});
    }
    res.status(200).json({producto});
  });
}

export function createProducto(req, res, next) {
    const nombre     = req.body.nombre;
    const precio     = req.body.precio;
    const unidad     = req.body.unidad;
    const imagen     = req.body.imagen;
    const proveedor  = req.body.proveedor;
    const categoria  = req.body.categoria;

    if(!nombre) {
        res.status(422).json({err: 'nombre is required.'});
        return;
    } 
    if(!precio) {
        res.status(422).json({err: 'precio of the is required.'});
        return;
    }
    if(!unidad) {
        res.status(422).json({err: 'unidad of the is required.'});
        return;
    }
    if(!imagen) {
        res.status(422).json({err: 'imagen of the is required.'});
        return;
    }
    if(!proveedor) {
        res.status(422).json({err: 'proveedor of the is required.'});
        return;
    }
    if(!categoria) {
        res.status(422).json({err: 'categoria of the is required.'});
        return;
    }

    const clientee = new Producto({
        nombre,
        precio,
        unidad,
        imagen,
        proveedor,
        categoria
    });

    clientee.save((err, producto) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({producto});
    });
}

export function updateProducto (req, res, next) {
    const id = req.params.id;

    Producto.findByIdAndUpdate(id, req.body, (err, producto) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({producto});
    });
}

export function deleteProducto(req, res, next) {
    const id = req.params.id;

    Producto.findByIdAndRemove(id, (err, producto) => {
        if(err) {
            res.status(500).json({err});
        }
        res.status(200).json({producto});
    });

}
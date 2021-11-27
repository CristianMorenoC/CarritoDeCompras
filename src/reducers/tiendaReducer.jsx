const estadoInicial = {
    productos: [
        { id: 1, nombre: 'Producto1'},
        { id: 2, nombre: 'Producto2'},
        { id: 3, nombre: 'Producto3'},
        { id: 4, nombre: 'Producto4'},
        { id: 5, nombre: 'Producto5'}
    ],
    carrito: []
}

//reducer es una funcion que se encarga de administrar el estado global de nuestra app
const reducer = (estado = estadoInicial, accion) => {
    switch(accion.type){
//accion.type es un metodo para modificar nuesto estado global
        case 'AGREGAR_PRODUCTO_AL_CARRITO':
            const {id, nombre} = accion;
            if (estado.carrito.length === 0){
                return {
                    ...estado, carrito: [{id: id, nombre: nombre, cantidad: 1}]
                }
            }else{
                //de otra forma debemos revisar que el carrito no tenga el prodcuto que queremos agregar
                //si ya tiene el producto entonces queremos actualizar su valor
                //si no tiene el producto entonces lo agregamos
                //para poder editar clonamos el arreglo
                const nuevoCarrito = [...estado.carrito];
                //comprobamos si el carrito ya tiene el id del producto que vamos a agregar
                const yaEstaEnCarrito = nuevoCarrito.filter( productoDeCarrito =>{
                    return productoDeCarrito.id === id
                }).length > 0;

                //si ya tenemos el producto actualizamos
                if(yaEstaEnCarrito){
                    //para ello debemos buscarlo por su posicion
                    //en base a la posicion actualizamos el valor
                    nuevoCarrito.forEach((productoDeCarrito, index)=>{
                    if(productoDeCarrito.id === id){
                        const cantidad = nuevoCarrito[index].cantidad;
                        nuevoCarrito[index] = {id: id, nombre: nombre, cantidad: cantidad + 1};
                    }
                    });
                // de otra forma entonces agregamos el producto al arreglo
                    }else{
                        nuevoCarrito.push({
                            id: id,
                            nombre: nombre,
                            cantidad: 1
                        })
                    }
                return {...estado, carrito:nuevoCarrito}
            };
        case 'ELIMINAR_PRODUCTO_AL_CARRITO':
            const {idEliminar} = accion;
            const copiarCarrito = [...estado.carrito];
            const nuevoCarrito = copiarCarrito.filter( productoCarrito => productoCarrito.id !== idEliminar );
            return {...estado, carrito:nuevoCarrito}

        case 'SUMAR_PRODUCTO_AL_CARRITO':
            const {idSumar, nombreSuma} = accion;
            const copiarCarritoSumar = [...estado.carrito];
            copiarCarritoSumar.forEach((productoCarrito, index) => {
                if(productoCarrito.id === idSumar){
                    copiarCarritoSumar[index] = {id: idSumar, nombre:nombreSuma, cantidad: copiarCarritoSumar[index].cantidad + 1}
                }
            });
            return {...estado, carrito:copiarCarritoSumar}

        case 'RESTAR_PRODUCTO_AL_CARRITO':
            const {idRestar, nombreResta} = accion;
            let copiarCarritoRestar = [...estado.carrito];
            copiarCarritoRestar.forEach((productoCarrito, index) => {
                if(productoCarrito.cantidad >= 1){
                    if(productoCarrito.id === idRestar){
                        copiarCarritoRestar[index] = {id: idRestar, nombre:nombreResta, cantidad: copiarCarritoRestar[index].cantidad - 1}
                    }
                }else{
                    copiarCarritoRestar = copiarCarritoRestar.filter(productoCarrito => productoCarrito.id !== idRestar)
                }
            }
            );
            return {...estado, carrito:copiarCarritoRestar}


        default: return estado;
    }
}




export default reducer;
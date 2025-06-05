
/* 1) comprar 2) ver carrito 3) salir */
/* 1) COMPRAR -> Seleccionar algun producto del menu (array de productos-precio) y agregarlo, o volver*/


let auxMenu = 0;
let montoTotal = 0;

const productos = [
    {nombre:"Hamburguesa clásica", precio: 7.50},
    {nombre: "Pizza Margarita", precio: 9.00},
    {nombre: "Empanadas (3 unidades)", precio: 5.00},
    {nombre: "Tacos de pollo", precio: 6.50}
];

let carrito = [];

function mostrarProductos(){ // Funcion que muestra los productos disponibles del negocio.
    for (let i = 0; i <= productos.length-1; i++){        
        console.log((i+1)+") "+productos[i].nombre+": $"+productos[i].precio);
    }
}

function carritoVacio(){
    if (carrito.length == 0){
        return true;
    }
    else return false;
}

function agregarAlCarrito(opcion){ // Agrega productos al carrito de compras
    carrito.push(productos[opcion-1]);
}

function totalCarrito(){ // Calcula el precio final de la sumatoria de los productos que estan en el carrito actualmente
    for (let i = 0; i <= carrito.length-1; i++){        
        montoTotal = montoTotal + carrito[i].precio;
    }
    return montoTotal;
}

function mostrarCarrito(){ // Muestra los productos que estan en el carrito actualmente y el monto total del carrito
    if (carritoVacio() == true){
        alert("¡El carrito está vacío!");
    }
    else{
        console.log("***CARRITO***");
        for (let i = 0; i <= carrito.length-1; i++){        
        console.log(carrito[i].nombre+": $"+carrito[i].precio);
        }
        console.log("Monto total: $"+totalCarrito());
        montoTotal = 0;
        alert("Mostrando carrito:");
    }

}

function limpiarCarrito(){
    carrito = [];
}





/* MENU PRINCIPAL */

while (auxMenu != 4){
    let confirmar = false;
    console.clear();
    auxMenu = Number(prompt("¡Bienvenido! Por favor, indique qué acción desea realizar \n 1) Comprar \n 2) Ver carrito \n 3) Confirmar pedido \n 4) Salir"));
    switch (auxMenu){
        case 1:
            mostrarProductos();
            while (auxMenu != 5){

                auxMenu= Number(prompt("***COMPRAR***\nIndique qué comida desea, o ingrese '5' para salir:"));
                switch(auxMenu){
                    case 1:
                        agregarAlCarrito(Number(auxMenu)); 
                        alert("Se agregó el producto "+(auxMenu)+" al carrito correctamente.");
                        break;
                    case 2:
                        agregarAlCarrito(Number(auxMenu));  
                        alert("Se agregó el producto "+(auxMenu)+" al carrito correctamente.");
                        break;
                    case 3: 
                        agregarAlCarrito(Number(auxMenu));
                        alert("Se agregó el producto "+(auxMenu)+" al carrito correctamente.");
                        break;
                    case 4:
                        agregarAlCarrito(Number(auxMenu));
                        alert("Se agregó el producto "+(auxMenu)+" al carrito correctamente.");
                        break;                    
                    case 5:
                        break;
                default:
                alert("¡Ingrese una opción correcta!");
                }
            }
            break;


        
        case 2:
            mostrarCarrito();
            break;

        case 3:
            if (carritoVacio() == true){
                    alert("¡El carrito está vacío!");
            }
            else{
                confirmar = confirm("¿Desea confirmar su compra?");
                if (confirmar == false){
                    break;                
                }
                else{
                    console.log("***IMPRIMIENDO TICKET DE COMPRA***");
                    mostrarCarrito();
                    alert("¡Gracias por su compra, vuelva pronto!");
                    limpiarCarrito();
                }
                break;
            }
            break;   

        case 4:
            alert("¡Hasta pronto!");
            break;
        
        default:
            alert("¡Ingrese una opción correcta!");
    }
}
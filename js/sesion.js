/* ALGORITMO DE SIMULACIÓN DE VENTAS DE COMIDA RÁPIDA: SESION */

/* DEFINIENDO VARIABLES Y CONSTANTES: */
let tamaño = 0, //VARIABLE PARA TENER LONGITUD DE CADA TIPO DE MENU
  exislista1 = 0, //VARIABLE PARA SABER SI EXISTE YA UNA LISTA CREADA EN EL MENU AÑADIR.
  exislista2 = 0, //VARIABLE PARA SABER SI EXISTE YA UNA LISTA CREADA EN EL MENU CANCELAR.
  todototal = 0, //VARIABLE QUE CONTABILIZA SI SE HA HECHO ALGUN PEDIDO O NO.
  ini = 0, //VARIABLE INICIALIZADORA PARA INICIAR EL MENU PEDIDO.
  conta = 0, //VARIABLE INICIALIZADORA PARA EL TRABAJO CON SELECT.
  sesioninterval = 0;

let tipo; //VARIABLE QUE CONTENDRA EL TIPO DE MENU SELECCIONADO.
let user = "", //VARIABLE QUE CONTENDRA EL NOMBRE DEL USUARIO INGRESADO.
  pass = "", //VARIABLE QUE CONTENDRA EL PASSWORD DEL USUARIO INGRESADO.
  exismenu = ""; //VARIABLE QUE INDICARA SI EXISTE O NO EL MENU DENTRO DEL SESSIONSTORAGE.
nomcliente = "Anónimo"; //VARIABLE QUE MOSTRARÁ EL NOMBRE DEL CLIENTE EN EL REPORTE DEL PEDIDO.

const numstock = [""], //ARRAY QUE CONTENDRA Y ARMARA EL STOCK DISPONIBLE PARA POSICIONARLO EN UN SELECT.
  numtotal = [""], //ARRAY QUE CONTENDRA Y ARMARA EL PEDIDO REALIZADO PARA POSICIONARLO EN UN SELECT.
  cartatotal = [], //ARRAY QUE CONTENDRA TODA LA CARTA DISPONIBLE.
  menu = []; //ARRAY QUE CONTENDRA TODO EL MENU DISPONIBLE.

/* USUARIOS DESDE JSON */
const existe = JSON.parse(sessionStorage.getItem("usuario")), //CONSTANTE QUE CONTENDRA EL OBJETO USUARIO LLAMADO DESDE SESSIONSTORAGE.
  existe2 = JSON.parse(localStorage.getItem("usuario")); //CONSTANTE QUE CONTENDRA EL OBJETO USUARIO LLAMADO DESDE LOCALSTORAGE.

/* DIVISIONES */
const divinicio = document.querySelector("#inicio"), //CONSTANTE QUE CONTENDRÁ LA DIVISION QUE TRABAJARÁ CON EL NAV. INICIO.
  divmenu = document.querySelector("#menu"), //CONSTANTE QUE CONTENDRÁ LA DIVISION QUE TRABAJARÁ CON EL NAV. MENU.
  divañadir = document.querySelector("#pedido_realizar"), //CONSTANTE QUE CONTENDRÁ LA DIVISION QUE TRABAJARÁ CON EL NAV. AÑADIR.
  divañadirmenu = document.querySelector("#pedido_realizar-menu"), //CONSTANTE QUE CONTENDRA LA SUB-DIVISION QUE TRABAJARÁ CON EL NAV. AÑADIR.
  divcancelar = document.querySelector("#pedido_cancelar"), //CONSTANTE QUE CONTENDRÁ LA DIVISION QUE TRABAJARÁ CON EL NAV. CANCELAR.
  divfinalizar = document.querySelector("#pedido_finalizar"); //CONSTANTE QUE CONTENDRÁ LA DIVISION QUE TRABAJARÁ CON EL NAV. FINALIZAR.
const listadiv = [divinicio, divmenu, divañadir, divcancelar, divfinalizar]; //LISTA CONTENEDORA DE LA BARRA DE NAVEGACION.

/* IDENTIFICADORES  Y CLASES APLICADAS */
const lista = document.querySelector("#lista"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: LISTA.
  pedir = document.querySelector("#pedido"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: PEDIDO.
  cancelado = document.querySelector("#cancelado"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: CANCELADO.
  mensaje = document.querySelector("#pedido_finalizar"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: PEDIDO_FINALIZAR.
  reporte = document.querySelector(".reporte"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON LA CLASE: REPORTE.
  detalle = document.querySelector(".reporte_titulo"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON LA CLASE: REPORTE_TITULO.
  gracias = document.querySelector("#gracias"), //OBTENIENDO DATOS DEL DE LA ETIQUETA HTML CON EL ID: GRACIAS.
  cerrar = document.querySelector("#btn_sesion"),
  cliente = document.querySelector("#btn_cliente"),
  validar = document.querySelector("#btn_cliente-validar");

/* BOTONES DEL NAV */
const listas = document.querySelectorAll(".nav__ul li"); //CONSTANTE QUE CONTIENE LAS LISTAS DE LOS BOTONES DEL NAVEGADOR.
const btninicio = document.querySelector("#btn_inicio"), //CONSTANTE QUE CONTENDRÁ EL BOTÓN DEL NAV. INICIO.
  btnmenu = document.querySelector("#btn_menu"), //CONSTANTE QUE CONTENDRÁ EL BOTÓN DEL NAV. MENU.
  btnañadir = document.querySelector("#btn_añadir"), //CONSTANTE QUE CONTENDRÁ EL BOTÓN DEL NAV. AÑADIR.
  btncancelar = document.querySelector("#btn_cancelar"), //CONSTANTE QUE CONTENDRÁ EL BOTÓN DEL NAV. CANCELAR.
  btnfinalizar = document.querySelector("#btn_finalizar"); //CONSTANTE QUE CONTENDRÁ EL BOTÓN DEL NAV. FINALIZAR.

/* BOTONES DE MENU */
const btnbarato = document.querySelector("#btn_economico"), //CONSTANTE QUE CONTENDRÁ EL BOTÓN DEL MENÚ ECONÓMICO.
  btndeluxe = document.querySelector("#btn_deluxe"), //CONSTANTE QUE CONTENDRÁ EL BOTÓN DEL MENÚ DELUXE.
  btntodomenu = document.querySelector("#btn_todomenu"); //CONSTANTE QUE CONTENDRÁ EL BOTÓN DEL MENÚ COMPLETO.

/* BOTONES DE PRESIONAR */
const btnañade = document.querySelector("#btn_añadir-aceptar"), //CONSTANTE QUE CONTENDRÁ EL BOTÓN PARA AÑADIR PEDIDO.
  btnelimina = document.querySelector("#btn_cancelar-aceptar"), //CONSTANTE QUE CONTENDRÁ EL BOTÓN PARA CANCELAR PEDIDO.
  btnfinal = document.querySelector("#btn_finalizar-aceptar"); //CONSTANTE QUE CONTENDRÁ EL BOTÓN PARA FINALIZAR PEDIDO Y SIMULADOR.

/* LLAMANDO AL OBJETO USUARIO DESDE UN JSON EN CASO SE HAYA INGRESADO POR LOGUEO. */
if (existe != null) {
  //SI EXISTE UN USUARIO EN EL SESSIONSTORAGE SE LE DA LA BIENVENIDA.
  user = existe.usuario; //OBTENIENDO DATOS DEL USUARIO INGRESADO EN LOCALSTORE.
  pass = existe.password; //OBTENIENDO DATOS DEL PASSWORD INGRESADO.
  Swal.fire({
    title: "INGRESO CORRECTO",
    text: "Bienvenido Usuario: " + user,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
  const bienvenida = document.querySelector(".titulo-bienvenida"); //CONSTANTE QUE CONTENDRA EL CONTENIDO DEL TITULO.
  bienvenida.innerHTML = `BIENVENIDO USUARIO: ${user.toUpperCase()}<br> AL SIMULADOR INTERACTIVO DE VENTA DE COMIDA RÁPIDA:`;
} else if (existe2 != null) {
  //SI EXISTE UN USUARIO EN EL LOCALSTORAGE SE LE DA LA BIENVENIDA.
  user = existe2.usuario; //OBTENIENDO DATOS DEL USUARIO INGRESADO EN LOCALSTORAGE.
  pass = existe2.password; //OBTENIENDO DATOS DEL PASSWORD INGRESADO.
  Swal.fire({
    title: "INGRESO CORRECTO",
    text: "Bienvenido Usuario: " + user,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
  const bienvenida = document.querySelector(".titulo-bienvenida");
  bienvenida.innerHTML = `BIENVENIDO USUARIO: ${user.toUpperCase()}<br> AL SIMULADOR INTERACTIVO DE VENTA DE COMIDA RÁPIDA:`;
}

/* EVENTOS QUE OCULTAN EL CONTENIDO DE CADA BARRA DE NAVEGACIÓN Y SOLO MUESTRA LA SELECCIONADA */
btninicio.onclick = () => {
  selediv(divinicio); //LLAMANDO A LA FUNCION SELEDIV PARA SELECCIONAR DIVISION DEL BOTON INICIO.
};
btnmenu.onclick = () => {
  selediv(divmenu); //LLAMANDO A LA FUNCION SELEDIV PARA SELECCIONAR DIVISION DEL BOTON MENU.
  lista.innerHTML = "";
  //CREANDO LA CARTA COMPLETA EN EL NAVEGADOR MENU.
  cartatotal.forEach((lis) => {
    let li = document.createElement("li");
    li.innerHTML =
      `<div class="list"><b>${lis.Nombre}:</b></div><div class="detal">${lis.Descripción}</div>` +
      `<div class="preci">Precio: S/.${lis.Costo}</div><div class="stock">Stock:${lis.Stock} unidad(es).</div><br>`;
    lista.appendChild(li);
  });
};
btnañadir.onclick = () => {
  selediv(divañadir); //LLAMANDO A LA FUNCION SELEDIV PARA SELECCIONAR DIVISION DEL BOTON AÑADIR.
  if (tipo != undefined) {
    //SI NO SE HA SELECCIONADO NINGÚN TIPO DE MENÚ NO SE PODRÁ ACTUALIZAR LOS PEDIDOS.
    tipo.actualizarañadir(); //LLAMANDO AL METODO ACTUALIZARAÑADIR  PARA ACTUALIZAR LA DIVISION AÑADIR.
  }
};
btncancelar.onclick = () => {
  selediv(divcancelar); //LLAMANDO A LA FUNCION SELEDIV PARA SELECCIONAR DIVISION DEL BOTON CANCELAR.
  menutotal.actualizarcancelar(); //LLAMANDO AL METODO ACTUALIZARCANCELAR PARA ACTUALIZAR LA DIVISION CANCELAR.
};
btnfinalizar.onclick = () => {
  selediv(divfinalizar); //LLAMANDO A LA FUNCION SELEDIV PARA SELECCIONAR DIVISION DEL BOTON FINALIZAR.
  if (todototal == 0) {
    detalle.innerHTML = "<b>No se ha realizado ningún pedido.</b>"; //SI NO SE HA REALIZADO NINGUN PEDIDO SE INDICA Y MODIFICA EL MENSAJE EN HTML.
    btnfinal.className = "hidden"; //SI NO EXISTE NINGUN PEDIDO SE OCULTA EL BOTON FINALIZAR.
  } else {
    detalle.innerHTML = "<b>Reporte detallado del pedido: </b>"; //SI SE HA REALIZADO UN PEDIDO EXITOSO SE INDICA Y MUESTRA UN REPORTE DEL PEDIDO.
    reporte.innerHTML = ""; //INICIALIZANDO REPORTE PARA SER ACTUALIZADO.
    btnfinal.className = "btn_finalizar"; //SI EXISTE UN REPORTE SE ACTIVA EL BOTON FINALIZAR.
    tipo.finalizar(); //LLAMANDO AL METODO FINALIZAR PARA ACTUALIZAR LA DIVISION FINALIZAR.
  }
};

/* FUNCION PARA SELECCIONAR CADA ELEMENTO DE LA BARRA DE NAVEGACION: */
function selediv(div) {
  sesioninterval = 0;
  listadiv.forEach((lisdiv) => {
    lisdiv == div
      ? lisdiv.classList.remove("hidden")
      : lisdiv.classList.add("hidden");
    //REMOVIENDO CLASE HIDDEN DE LA DIVISION SELECCIONADA Y OCULTANDO LAS NO SELECCIONADAS.
  });
}

/* ESTABLECIENDO FUNCIÓN CONSTRUCTORA MENÚ PARA CONSTRUIR LOS MENÚS COMO OBJETOS: */
function Menu(Nombre, Stock, Costo, Descripción, Total) {
  this.Nombre = Nombre;
  this.Stock = Stock;
  this.Costo = Costo;
  this.Descripción = Descripción;
  this.total = Total;
}

/* ESTABLECIENDO FUNCIÓN CONSTRUCTORA TIPO PARA CONSTRUIR LOS TIPOS DE MENÚS COMO OBJETOS Y TRABAJANDO EN BASE A SUS MÉTODOS: */
function Tipo(Nombre, Menus) {
  this.nombre = Nombre;
  this.menus = Menus;
  //CREANDO MÉTODO ACTUALIZARAÑADIR PARA INICIALIZAR Y ACTUALIZAR LOS PEDIDOS QUE SE AÑADIRÁN:
  this.actualizarañadir = () => {
    sesioninterval = 0;
    tamaño = this.length; //DECLARANDO TAMAÑO DEL MENU RESPECTO AL SELECCIONADO.
    if (exislista1 == 1) {
      //SI EL MENÚ PARA AÑADIR PEDIDOS YA FUE CREADO SE ELIMINA Y RECREA CON LOS DATOS ACTUALIZADOS.
      const li = document.querySelectorAll(".listapedido");
      li.forEach((li) => {
        li.remove(); //ELIMINANDO LISTAS DEL NAV. AÑADIR
      });
    }
    this.menus.forEach((menu) => {
      //RECORRIENDO TODO EL ARREGLO DEL TIPO DE MENU.
      let li = document.createElement("li"); //CREANDO NUEVAS LISTAS PARA EL NAV. AÑADIR CON LA VARIABLE LI.
      for (let i = 0; i <= menu.Stock; i++) {
        numstock[conta] += `<option value=${i}>${i}</option>`; //CREANDO CONTENIDO DE LOS SELECTORES PARA AÑADIR MENÚ CON RESPECTO AL STOCK.
      }
      li.innerHTML =
        //CREANDO NUEVA LISTA DE MENÚ CON DATOS ACTUALIZADOS.
        `<div class="listado-añadir">${menu.Nombre}</div><input type="text" readonly value="Disponible:${menu.Stock}" class="stock">` +
        `<select name="pedir" id="select_cantidad">${0}${
          numstock[conta]
        }</select> `;
      li.classList.add("listapedido"); //CREANDO CLASE PARA PODER ELIMINAR LISTA Y ACTUALIZAR A UNA NUEVA.
      pedir.appendChild(li); //INGRESANDO LISTAS AL HTML.
      exislista1 = 1; //INICIALIZANDO EXISTENCIA DE LA LISTA AÑADIR.
      numstock[conta] = ""; //INICIALIZANDO CONTADOR DE SELECTOR NUMSTOCK PARA UN NUEVO MENÚ.
      conta++; //AUMENTANDO VALOR DE CONTADOR PARA INGRESAR NUEVO ARREGLO DEL CONTADOR DE SELECTOR NUMSTOCK.
    });
    conta = 0; //REINICIALIZANDO CONTADOR UNA VEZ QUE YA SE RECORRIERON TODOS LOS MENUS DEL TIPOMENU SELECCIONADO.
  };
  //CREANDO MÉTODO PEDIDO PARA ACTUALIZAR LOS VALORES INTERNOS DE CADA PEDIDO REALIZADO EXITOSAMENTE.
  this.pedido = () => {
    let listapedido = document.querySelectorAll(".listapedido"); //LLAMANDO CLASE LISTAPEDIDO QUE CONTIENE LOS PEDIDOS QUE SE AÑADIRÁN.
    listapedido.forEach((lista) => {
      //RECORRIENDO TODOS LOS PEDIDOS QUE SERÁN AÑADIDOS.
      const sele = lista.querySelector("#select_cantidad"); //OBTIENDO VALOR INGRESADO DE LOS SELECTORES PARA CADA MENÚ AÑADIDO.
      if (sele.value != 0) {
        this.menus[ini].Stock -= parseInt(sele.value); //ACTUALIZANDO STOCK DE MENÚS.
        this.menus[ini].total += parseInt(sele.value); //ACTUALIZANDO TOTAL DE PEDIDOS REALIZADOS PARA CADA MENÚ.
        todototal += parseInt(sele.value); //ACTUALIZANDO NÚMERO TOTAL DE PEDIDOS PARA SABER EXISTENCIAS.
        Toastify({
          text: `Se ha añadido ${sele.value} unidades de ${this.menus[ini].Nombre} al pedido.`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      }
      if (todototal != 0) {
        listas[3].className = "nav__li"; //ACTIVANDO LISTA DE NAVEGACION CANCELAR.
        btnelimina.className = "btn_cancelar"; //ACTIVANDO BOTON CANCELAR PARA CANCELAR MENUS DEL PEDIDO.
      }
      ini++; //AUMENTANDO VALOR DE CONTADOR PARA INGRESAR A UN NUEVO MENÚ MIENTRAS SE HACE EL RECORRIDO.
    });
    ini = 0; //REINICIALIZANDO CONTADOR UNA VEZ QUE YA SE RECORRIERON TODOS LOS MENÚS QUE SE AÑADIRÁN.
  };
  //CREANDO MÉTODO ACTUALIZARCANCELAR PARA INICIALIZAR Y ACTUALIZAR LOS PEDIDOS QUE SE CANCELARÁN:
  this.actualizarcancelar = () => {
    sesioninterval = 0;
    if (exislista2 == 1) {
      //SI EL MENÚ PARA CANCELAR PEDIDOS YA FUE CREADO SE ELIMINA Y RECREA CON LOS DATOS ACTUALIZADOS.
      const li = document.querySelectorAll(".listacancelado");
      li.forEach((li) => {
        li.remove(); //ELIMINANDO LISTAS DEL NAV. CANCELAR
      });
    }
    this.menus.forEach((menu) => {
      //RECORRIENDO TODO EL ARREGLO DEL TIPO DE MENU.
      if (menu.total != 0) {
        let li = document.createElement("li"); //CREANDO NUEVAS LISTAS PARA EL NAV. CANCELAR CON LA VARIABLE LI.
        for (let i = 0; i <= menu.total; i++) {
          numtotal[conta] += `<option value=${i}>${i}</option>`; //CREANDO CONTENIDO DE LOS SELECTORES PARA CANCELAR MENÚ CON RESPECTO AL PEDIDO.
        }
        li.innerHTML = //CREANDO NUEVA LISTA DE MENÚ CON DATOS ACTUALIZADOS.
          `<div class="listado-cancelar">${menu.Nombre}</div><input type="text" readonly value="Pedido:${menu.total}" class="stock">` +
          `<select name="cancelar" id="delete_cantidad">${0}${
            numtotal[conta]
          }</select> `;
        li.classList.add("listacancelado"); //CREANDO CLASE PARA PODER ELIMINAR LISTA Y ACTUALIZAR A UNA NUEVA.
        cancelado.appendChild(li); //INGRESANDO LISTAS AL HTML.
        exislista2 = 1; //INICIALIZANDO EXISTENCIA DE LA LISTA CANCELAR.
        numtotal[conta] = ""; //INICIALIZANDO CONTADOR DE SELECTOR NUMTOTAL PARA UN NUEVO MENÚ.
        conta++; //AUMENTANDO VALOR DE CONTADOR PARA INGRESAR NUEVO ARREGLO DEL CONTADOR DE SELECTOR NUMTOTAL.
      }
    });
    conta = 0; //REINICIALIZANDO CONTADOR UNA VEZ QUE YA SE RECORRIERON TODOS LOS MENUS DEL TIPOMENU SELECCIONADO.
  };
  //CREANDO MÉTODO PEDIDO PARA ACTUALIZAR LOS VALORES INTERNOS DE CADA PEDIDO CANCELADO EXITOSAMENTE.
  this.eliminar = () => {
    menutotal.menus.forEach((menu) => {
      //RECORRIENDO TODO EL ARREGLO DEL TIPO DE MENU.
      if (menu.total != 0) {
        //EXCLUYENDO MENUS QUE NO SE HAN PEDIDO.
        let listacancelado = document.querySelectorAll(".listacancelado"); //LLAMANDO CLASE LISTACANCELADO QUE CONTIENE LOS PEDIDOS QUE SE CANCELARÁN.
        listacancelado.forEach((lista) => {
          const nel = lista.querySelector(".listado-cancelar"); //LLAMANDO CLASE LISTADO-CANCELAR PARA OBTENER EL NOMBRE DE CADA MENU A CANCELAR.
          if (nel.innerText == menu.Nombre) {
            //IDENTIFICANDO CADA MENU QUE SE CANCELARA CORRECTAMENTE.
            const dele = lista.querySelector("#delete_cantidad"); //OBTIENDO VALOR INGRESADO DE LOS SELECTORES PARA CADA MENÚ CANCELADO.
            todototal -= parseInt(dele.value); //ACTUALIZANDO NÚMERO TOTAL DE PEDIDOS PARA SABER EXISTENCIAS.
            menu.Stock += parseInt(dele.value); //ACTUALIZANDO STOCK DE MENÚS.
            menu.total -= parseInt(dele.value); //ACTUALIZANDO TOTAL DE PEDIDOS REALIZADOS PARA CADA MENÚ.
            menu.total == 0 && lista.remove(); //REMOVIENDO LISTA SI SE CANCELAN TODOS LOS PEDIDOS.
            if (dele.value != 0) {
              Toastify({
                //INDICANDO UNIDADES CANCELADAS DEL PEDIDO MEDIANTE LIBRERIA TOASTIFY.
                text: `Se ha cancelado ${dele.value} unidad/es de ${menu.Nombre} del pedido.`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(to right, #ff0000, #96c93d)",
                },
                onClick: function () {},
              }).showToast();
            }
            if (todototal == 0) {
              listas[3].className = "hidden"; //DESACTIVANDO BARRA DE NAVEGACION CANCELAR.
              btnelimina.className = "hidden"; //DESACTIVANDO BOTON CANCELAR CUANDO NO EXISTA MENU EN EL PEDIDO.
              reporte.innerHTML = ""; //ELIMINANDO REPORTE PORQUE SE HA CANCELADO TODO EL PEDIDO.
              Swal.fire({
                //INDICANDO CANCELACIÓN DE TODOS LOS PEDIDOS MEDIANTE LIBRERIA SWEETALERT2.
                title: "SE HAN CANCELADO TODOS LOS PEDIDOS!",
                text: "Por favor, añadir nuevos pedidos.",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
              selediv(divañadir);
              menutotal.actualizarañadir(); //LLAMANDO AL METODO ACTUALIZARAÑADIR  PARA ACTUALIZAR LA DIVISION AÑADIR.
            }
          }
        });
      }
    });
  };
  //CREANDO MÉTODO FINALIZAR PARA ACTUALIZAR TODO EL PEDIDO Y MOSTRAR UN REPORTE DETALLADO.
  this.finalizar = () => {
    //METODO QUE FILTRA CADA MENU PEDIDO EN UN ARRAY.
    const pedido = this.menus.filter((el) => {
      return el.total != 0;
    });
    //METODO QUE CONSTRUYE PARTE DEL MENSAJE FINAL QUE SE IMPRIMIRÁ AL COMPLETAR EL PEDIDO.
    const msjfinal = pedido.reduce(
      (acum, ele) => acum + `<li>${ele.Nombre}= ${ele.total} unidad(es).</li>`,
      `<b>CLIENTE: ${nomcliente}</b><hr><b>Su pedido es:</b>`
    );
    //MOSTRANDO MENSAJE FINAL CONSTRUIDO EN HTML.
    let msj = document.createElement("p");
    msj.innerHTML =
      `<div class="reporte_fondo"><br><div class="reporte_lista">` + //AGREGANDO CONTENEDOR DE FONDO Y CONTENEDOR DE LA LISTA.
      `<ul>${msjfinal}</ul>El monto total de su pedido es de: S/.${todototal} Soles.<br>` + //AGREGANDO LISTA DETALLADA.
      `</div><br></div>`; //FINALIZANDO CONTENEDORES Y AGREGANDO UN ESPACIADO ENTRE LOS DOS CONTENEDORES.
    gracias.innerText = `Muchas Gracias por su compra, que tenga un buen día!!!`; //IMPRIMIENTO MENSAJE DE FINALIZACION.
    reporte.appendChild(msj); //AGREGANDO CONTENIDO DEL REPORTE DENTRO DEL CONTENEDOR REPORTE.
  };
}
/*APLICANDO FETCH PARA OBTENER EL MENU DESDE LA DATA MENU.JSON*/
fetch("../data/menu.json")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((menu) => {
      cartatotal.push(
        (menu = new Menu(
          menu.Nombre,
          parseInt(menu.Stock),
          parseFloat(menu.Costo),
          menu.Descripción,
          parseInt(menu.total)
        ))
      );
    })
  )
  .catch((error) => console.log(error));
/* ORDENANDO MENÚ POR ORDEN DE NOMBRES: */
cartatotal.sort((a, b) => {
  if (a.Nombre > b.Nombre) {
    return 1;
  }
  if (a.Nombre < b.Nombre) {
    return -1;
  }
  return 0;
});

//CONSTRUYENDO MENÚ TOTAL:
menutotal = new Tipo("Todo el Menú Disponible", cartatotal);

//LLAMANDO EVENTO SI SE PRESIONA EL BOTÓN VALIDAR.
validar.onclick = () => {
  nomcliente = cliente.value || "Anónimo"; //VALIDANDO NOMBRE DE CLIENTE PERMITIENTO SOLO TEXTO Y NUMEROS
  !isNaN(nomcliente) ? (nomcliente = "Anónimo") : (nomcliente = nomcliente); //VALIDANDO NOMBRE DE CLIENTE SOLO PARA ACEPTAR TEXTO.
  if (nomcliente == "Anónimo") {
    Swal.fire("El nombre no es válido", "", "warning");
    cliente.value = "";
  } else {
    Swal.fire("El nombre es válido", "", "info");
  }
};

/* CREANDO MENUS DE ACUERDO A LO SELECCIONADO POR BOTON */
btnbarato.onclick = () => {
  //CREANDO Y MOSTRANDO EL MENÚ ECONÓMICO:
  economico = cartatotal.filter((el) => {
    return el.Costo <= 10;
  });
  menueconomico = new Tipo("Menú Económico", economico); //CONSTRUYENDO MENÚ ECONÓMICO:
  divañadirmenu.classList.remove("hidden"); //ACTIVA EL MENU ELEGIDO PARA PODER AÑADIRLO.
  menueconomico.actualizarañadir();
  tipo = menueconomico;
};

btndeluxe.onclick = () => {
  //CREANDO Y MOSTRANDO EL MENÚ DELUXE:
  deluxe = cartatotal.filter((el) => {
    return el.Costo > 10;
  });
  menuedeluxe = new Tipo("Menú Deluxe", deluxe); //CONSTRUYENDO MENÚ DELUXE:
  divañadirmenu.classList.remove("hidden");
  menuedeluxe.actualizarañadir();
  tipo = menuedeluxe;
};
btntodomenu.onclick = () => {
  divañadirmenu.classList.remove("hidden");
  menutotal.actualizarañadir();
  tipo = menutotal;
};

//LLAMANDO EVENTOS SI SE PRESIONA EL BOTÓN AÑADIR.
btnañade.onclick = () => {
  tipo.pedido();
  tipo.actualizarañadir();
};

//LLAMANDO EVENTOS SI SE PRESIONA EL BOTÓN CANCELAR.
btnelimina.onclick = () => {
  tipo.eliminar();
  tipo.actualizarcancelar();
};
//LLAMANDO EVENTOS SI SE PRESIONA EL BOTÓN FINALIZAR.

btnfinal.onclick = () => {
  if (btnfinal.value == "FINALIZAR") {
    sesioninterval = 0;
    Swal.fire({
      //PREGUNTANDO SI SE DESEA FINALIZAR EL PEDIDO MEDIANTE LIBRERIA SWEETALERT2.
      title: "DESEA FINALIZAR SU PEDIDO?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "SI",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          //INDICANDO FINALIZACIÓN DEL PEDIDO MEDIANTE LIBRERIA SWEETALERT2.
          title: "FINALIZACIÓN DE PEDIDO",
          text: "Se ha finalizado correctamente su pedido.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        gracias.className = ""; //REMOVIENDO CLASE HIDDEN DEL GRACIAS FINAL.
        detalle.className = "hidden"; //REMOVIENDO TITULO DE REPORTE
        listas[1].className = "hidden"; //REMOVIENDO NAV. MENU.
        listas[2].className = "hidden"; //REMOVIENDO NAV. AÑADIR.
        listas[3].className = "hidden"; //REMOVIENDO NAV. CANCELAR.
        listas[4].children[1].value = "Pedido Detallado"; //EDITANDO NUEVO VALOR DEL NAV. FINALIZAR.
        btnfinal.value = "NUEVO PEDIDO";
        btnfinal.className = "btn_reiniciar";
      } else if (result.isDenied) {
        Swal.fire("PUEDE SEGUIR REALIZANDO SU PEDIDO", "", "info"); //INDICANDO FINALIZACIÓN DEL PEDIDO MEDIANTE LIBRERIA SWEETALERT2.
      }
    });
  } else {
    Swal.fire({
      //PREGUNTANDO SI SE DESEA REALIZAR UN NUEVO PEDIDO MEDIANTE LIBRERIA SWEETALERT2.
      title: "DESEA RELIZAR UN NUEVO SU PEDIDO?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "SI",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          //INDICANDO REINICIO PARA UN NUEVO PEDIDO MEDIANTE LIBRERIA SWEETALERT2.
          position: "center",
          icon: "info",
          title: "ESPERE UN MOMENTO POR FAVOR...",
          showConfirmButton: false,
        });
        btnfinal.className = "btn_finalizar";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else if (result.isDenied) {
        Swal.fire("ACCIÓN CANCELADA", "", "info"); //INDICANDO CANCELACION DE NUEVO PEDIDO MEDIANTE LIBRERIA SWEETALERT2.
      }
    });
  }
};
let sesint = setInterval(() => {
  //CREANDO INTERVALO PARA CERRAR SESION POR INACTIVIDAD
  sesioninterval++; //VARIABLE QUE CONTARÁ LOS INTERVALOS CON UN VALOR INDICADO, EN ESTE CASO SE ESTABLECIO CADA INTERVALO EN 60000 (1 MINUTO)
  if (sesioninterval == 5) {
    //INDICANDO LA CANTIDAD DE INTERVALOS QUE DURARÁ LA SESION EN 5, CON EL VALOR ESTABLECIDO SERÁN 5 MINUTOS DE INACTIVIDAD.
    clearInterval(sesint); //SI SE CIERRA LA SESION SE LIMPIA EL INTERVALO DE INACTIVIDAD
    setTimeout(() => {
      window.location.href = "../ingreso.html"; //SI SE ACTIVA LA INACTIVIDAD SE CIERRA LA SESIÓN Y SE RETORNA A LA PÁGINA DE INGRESO.
    }, 3000),
      Swal.fire({
        //MOSTRANDO MENSAJE DE INACTIVIDAD MEDIANTE LA LIBRERIA SWEETALERT2.
        position: "center",
        icon: "info",
        title:
          "Ha estado inactivo por más de 5 minutos!!!\nSe ha finalizado su sesión.",
        showConfirmButton: false,
      });
  }
}, 60000); //TIEMPO ESTABLECIDO PARA CADA INTERVALO.

cerrar.onclick = () => {
  Swal.fire({
    //PREGUNTANDO SI SE DESEA FINALIZAR EL PEDIDO MEDIANTE LIBRERIA SWEETALERT2.
    title: "ESTA SEGURO DE FINALIZAR SU SESIÓN?",
    text: "Si no ha finalizado su pedido, se eliminará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cerrar sesión.",
    cancelButtonText: "No, cancelar.",
  }).then((result) => {
    if (result.isConfirmed) {
      setTimeout(() => {
        sessionStorage.removeItem("usuario");
        window.location.href = "../ingreso.html";
      }, 1500),
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Ha finalizado correctamente su sesión",
          showConfirmButton: false,
        });
    }
  });
};

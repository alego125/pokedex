//LA estructura es primero declaro las variables que voy a usar, luego declaro la estructura de la fucnion asincrona y al final hago la llamada de la fucnion asincrona

const $pokedex = document.querySelector("pokedex"),
    $idPoke1 = document.getElementById("pokemon1"),
    $idPoke2 = document.getElementById("pokemon2"),
    $nombrePoke1 = document.getElementById("poke1"),
    $nombrePoke2 = document.getElementById("poke2"),
    $btnBuscar = document.getElementById("btn"),
    $fragment = document.createDocumentFragment(),
    $selection = document.getElementById("seleccion"),
    $mensajes = document.querySelector(".mensajes");

async function getDataPokeId(id, num) {

    try {

        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.value}`),
            json = await res.json();

        pintarPokemones(json, num);

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

    } catch (err) {

        let mensaje = err.statusText || "Ocurrio un error";

        $mensajes.innerHTML = `Error ${err.status}: ${mensaje}`;

    }
}

async function getDataPokeNombres(nombre, num) {

    try {

        //Colocamos dentro de una variable la peticion al servidor, ademas le colocamos la palabra await con la cual hacemos que espere a que la respuesta del servidor se reciba para continuar con la siguiente linea de codigo
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.value}`),
            //Luego convertimos la respuesta del servidor a json y tambien le colocamos await para que espere a que la convwersion se ejecute antes de continuar                
            json = await res.json();
        //Entonces ahroa gracias a los await que usamos al estar dentro de una fucnion asincrona ya no tenemos que agregar los then por ejemplo que vimos en el ejecmplo anterior
        pintarPokemones(json, num);


        if (!res.ok) throw { status: res.status, statusText: res.statusText }


    } catch (err) {
        //Creamos una variable de mensaje que si la propiedad statusText viene vacia nos muestra el mensaje que hemos configurado, si no nos muestra el statusText que trae del servidor
        let mensaje = err.statusText || "Ocurrio un error";
        //Incrustamos el mensaje en el html
        $mensajes.innerHTML = `Error ${err.status}: ${mensaje}`;
    }
}



document.addEventListener('click', (e) => {
    if (e.target.id === "btn") {

        //Seleccionamos la funcion dependiendo de la seleccion que hayamos hecho
        if ($selection.getElementsByTagName("option")[$selection.selectedIndex].value == 2) {
            //Validamos que los campos vengan completos
            if ($idPoke1.value !== '' && $idPoke2.value !== '') {
                getDataPokeId($idPoke1, 1);
                getDataPokeId($idPoke2, 2);
            }else{
                //En caso de que no vengan completos mostramos el mensaje de error
                $mensajes.innerHTML += `<br/><b style='color: red;'>'Debe completar todos los campos para realizar la consulta</b>`;
                //Con un setInterval lluego de 3 segundo sacamos el mensaje
                setTimeout(()=>{
                    $mensajes.innerHTML = "";
                },3000);
            }
        } else {            
            //Validamos que los campos vengan completos
            if ($nombrePoke1.value !== '' && $nombrePoke2.value !== '') {
                getDataPokeNombres($nombrePoke1, 1);
                getDataPokeNombres($nombrePoke2, 2);
            }else{
                //En caso de que no vengan completos mostramos el mensaje de error
                $mensajes.innerHTML += `<br/><b style='color: red;'>'Debe completar todos los campos para realizar la consulta</b>`;
                //Con un setInterval lluego de 3 segundo sacamos el mensaje
                setTimeout(()=>{
                    $mensajes.innerHTML = "";
                },3000);
            }
        }
    }
});


const pintarPokemones = (json, num) => {
    console.log(num);
    const $item = document.getElementById(`pok${num}`),
        $imgPoke = $item.getElementsByTagName("img")[0],
        $nombrePoke = $item.getElementsByTagName("h3")[0],
        $alturaPoke = $item.getElementsByTagName("p")[0],
        $pesoPoke = $item.getElementsByTagName("p")[1];

        console.log(json.weight);

    //Seteo la imagen con src y luego coloco el texto en el parrafo
    $imgPoke.setAttribute("src", json.sprites.front_default);
    $nombrePoke.textContent = json.name;
    //La altura de los poquemones esta dada en decimetros por lo que para pasar a centimetro debemos multimplicarla por 10 ya que 1 dedcimetro equivale a 10 centimetros
    $alturaPoke.textContent = `Altura: ${json.height * 10} Cm`;
    //El peso esta dado en Hectogramos por lo cual para pasarlo a kilogramo lo multiplicamos por 0.1. Usamos el metodo to Fixed para dejar solo dos decimales al numero 
    $pesoPoke.textContent = `Peso: ${(json.weight*0.1).toFixed(2)} Kg`

}
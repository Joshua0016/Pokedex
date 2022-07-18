const generationSelect = document.querySelector("#generations");
const image_container = document.querySelector("#image_container");


async function getPokemon() {
    const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/empoleon/").then((result) => result.json());

    // console.log(pokemon.sprites.versions); esto me imprime todas las generaciones

    const generations = Object.keys(pokemon.sprites.versions); //esto me permitirá obtener un arreglo con los nombres de las propiedades


    const generationData = [];

    generations.forEach((generationsName) => {
        const versions = pokemon.sprites.versions[generationsName];//obtengo las versiones que se encuentran dentro de la generacion-i/generacion-ii etc..
        const generation = {
            name: generationsName,
            images: []
        }

        /*importante aclarar que el primer parametro de un bucle
        hace referencia por defecto, al contenido que se encuentra
        en la posición actual del arreglo*/
        Object.values(versions).forEach((versions) => { //convierto en un arreglo los objetos de las versiones (0=red-blue, 1=yellow)

            const images = Object.values(versions);//obtengo un arreglo el contenido que se encuentra en la posición actual
            const imageFilter = images.filter((images) => typeof images === "string") //sí en el arreglo hay algún tipo de contenido distinto del string no se guardará
            generation.images = generation.images.concat(imageFilter);//le añado el arreglo que contiene las  url (back_default, front_default etc...)

        })

        if (generation.images.length > 0) {
            generationData.push(generation);
        }
    })

    addGenerationSelect(generationData);


    generationSelect.addEventListener("change", function () {
        //find buscará el nombre de la generación que sea igual al valor seleccionado del select.
        //Sí lo encuentra entonces valor será igual al objeto de la generación (objeto = redblue, yellow).
        const valorSelect = generationData.find((generation) => generation.name == generationSelect.value);
        image_container.innerHTML = "";
        valorSelect.images.forEach((image) => {
            const img = document.createElement("img");
            img.src = image;
            image_container.appendChild(img);

        })

    });


}

function addGenerationSelect(generationData) {

    generationData.forEach((generationName) => {//por cada elemento de generationData...
        const option = document.createElement("option");//Se crea una etiqueta option
        option.value = generationName.name;//El valor de la etiqueta será el nombre del pokemón en la posición actual del bucle
        option.innerHTML = generationName.name;//hacemos lo mismo con su valor en HTML
        generationSelect.appendChild(option);//luego se añade al select


    })

}




getPokemon();

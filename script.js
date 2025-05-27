document.addEventListener("DOMContentLoaded", () => {
    const inputBuscar = document.getElementById("buscar");
    const resultado = document.getElementById("resultado");
    let paises = [];

    // Obtener datos de la API
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            paises = data;
        })
        .catch(error => console.error("Error al obtener los países:", error));

    // Filtrar y mostrar países
    inputBuscar.addEventListener("keyup", () => {
        const filtro = inputBuscar.value.toLowerCase();
        resultado.innerHTML = "";

        const paisesFiltrados = paises.filter(pais =>
            pais.name.common.toLowerCase().includes(filtro)
        );

        paisesFiltrados.forEach(pais => {
            const div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `
                <h3>${pais.name.common}</h3>
                <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" width="100">
                <p>Región: ${pais.region}</p>
                <p>Población: ${pais.population.toLocaleString()}</p>
            `;
            resultado.appendChild(div);
        });
    });
});

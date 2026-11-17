let elementos = [];

const elementoContainer = document.getElementById("elementoContainer");
const agregarElementoForm = document.getElementById("agregarElementoForm");
const filtroname = document.getElementById("filtroname");
const filtroatomic_number = document.getElementById("filtroatomic_number");
const filtroSimbolo = document.getElementById("filtroSimbolo");
const filtroDiscoveryYear = document.getElementById("filtroDiscoveryYear");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroStateAtRoomTemp = document.getElementById("filtroStateAtRoomTemp");

fetch('https://api.periodictableofelements.org/elements/')
    .then(response => response.json())
    .then(data => {
        elementos = data;
        mostrarElementos(elementos);
    })
    .catch(error => {
        console.error('Error al leer el archivo JSON', error);
    });

function mostrarElementos(arrayElementos) {
    if (!elementoContainer) return;
    elementoContainer.innerHTML = "";

    if (!arrayElementos || arrayElementos.length === 0) {
        elementoContainer.innerHTML = "<p>No se encontraron elementos.</p>";
        return;
    }

    let htmlContent = "";
    arrayElementos.forEach(elemento => {
        let nameHTML = "";
        if (elemento.name && Array.isArray(elemento.name)) {
            nameHTML = elemento.name.map(n => `<li>${n}</li>`).join('');
        }
        
        htmlContent += `
            <article class="caja">
                <h2>${elemento.name}</h2>
                <p>Masa: ${elemento.atomic_mass}</p>
                <p>Número: ${elemento.atomic_number}</p>
                <p>Símbolo: ${elemento.symbol}</p>
                <p>Slug: ${elemento.slug}</p>
                <p>Bloque: ${elemento.block}</p>
                <p>Grupo: ${elemento.group_number}</p>
                <p>Período: ${elemento.period}</p>
                <p>Estado: ${elemento.state_at_room_temp}</p>
                <p>Electronegatividad: ${elemento.electronegativity ?? 0}</p>
                <p>Año de descubrimiento: ${elemento.discovery_year}</p>
                <span class="categoria"><strong>Categoría:</strong> ${elemento.category ?? 'Desconocida'}</span>
                <ul>${nameHTML}</ul>
            </article>
        `;
    });
    elementoContainer.innerHTML = htmlContent;
}

function filtrar() {
    let namVal = filtroname ? filtroname.value.toLowerCase().trim() : "";
    let atoVal = filtroatomic_number && filtroatomic_number.value !== "" ? Number(filtroatomic_number.value) : "";
    let simVal = filtroSimbolo ? filtroSimbolo.value.toLowerCase().trim() : "";
    let disVal = filtroDiscoveryYear && filtroDiscoveryYear.value !== "" ? Number(filtroDiscoveryYear.value) : "";
    let catVal = filtroCategoria ? filtroCategoria.value : "";
    let staVal = filtroStateAtRoomTemp ? filtroStateAtRoomTemp.value : "";

    let elementosFiltrados = elementos.filter(elemento => {
        let coincidenam = namVal === "" || (elemento.name && String(elemento.name).toLowerCase().includes(namVal));
        let coincideAto = atoVal === "" || elemento.atomic_number === atoVal;
        let coincideSim = simVal === "" || (elemento.symbol && String(elemento.symbol).toLowerCase().includes(simVal));
        let coincideDis = disVal === "" || elemento.discovery_year === disVal;
        let coincideCat = catVal === "" || elemento.category === catVal;
        let coincideSta = staVal === "" || elemento.state_at_room_temp === staVal;

        return coincidenam && coincideAto && coincideSim && coincideDis && coincideCat && coincideSta;
    });

    mostrarElementos(elementosFiltrados);
}

// Eventos de los filtros
if (filtroname) filtroname.addEventListener("input", filtrar);
if (filtroatomic_number) filtroatomic_number.addEventListener("input", filtrar);
if (filtroSimbolo) filtroSimbolo.addEventListener("input", filtrar);
if (filtroDiscoveryYear) filtroDiscoveryYear.addEventListener("input", filtrar);
if (filtroCategoria) filtroCategoria.addEventListener("change", filtrar);
if (filtroStateAtRoomTemp) filtroStateAtRoomTemp.addEventListener("change", filtrar);

// Evento del formulario para agregar elementos nuevos
if (agregarElementoForm) {
    agregarElementoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let nombre = document.getElementById("name").value;

        let nuevoElemento = {
            atomic_number: Number(document.getElementById("atomic_number").value),
            symbol: document.getElementById("symbol").value,
            name: nombre,
            slug: nombre.toLowerCase().replace(/\s+/g, '-'),
            atomic_mass: Number(document.getElementById("atomic_mass").value),
            block: document.getElementById("block").value,
            group_number: Number(document.getElementById("group_number").value),
            period: Number(document.getElementById("period").value),
            state_at_room_temp: document.getElementById("state_at_room_temp").value,
            discovery_year: Number(document.getElementById("discovery_year").value),
            category: "custom", 
            electronegativity: 0,
            electron_affinity: 0,
            atomic_radius: 0,
            density: 0,
            melting_point: 0,
            boiling_point: 0
        };

        elementos.push(nuevoElemento);
        mostrarElementos(elementos);
        agregarElementoForm.reset();
    });
}
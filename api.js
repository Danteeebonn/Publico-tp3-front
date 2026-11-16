let elementos = [
    {
        "atomic_number": 1,
        "symbol": "H",
        "name": "Hydrogen",
        "slug": "hydrogen",
        "atomic_mass": 1.008,
        "category": "nonmetal",
        "block": "s",
        "group_number": 1,
        "period": 1,
        "state_at_room_temp": "gas",
        "electronegativity": 2.2,
        "ionization_energy": 1312.0,
        "electron_affinity": -73.0,
        "atomic_radius": 53,
        "density": 0.00008988,
        "melting_point": 14.01,
        "boiling_point": 20.28,
        "discovery_year": 1766,
        "category_color": "#2ecc71",
        "cpk_hex_color": "FFFFFF",
        "grid_row": 1,
        "grid_column": 1,
        "electrons_per_shell": [1],
        "electron_configuration_semantic": "1s1"
    }
];

// Referencias al DOM
const elementoContainer = document.getElementById("elementoContainer");
const agregarCosaBtn = document.getElementById("agregarCosaBtn");
const busqueda = document.getElementById("busqueda");
const filtroatomic_number = document.getElementById("filtroatomic_number");
const filtroname = document.getElementById("filtroname");
const filtroSimbolo = document.getElementById("filtroSimbolo");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroBlock = document.getElementById("filtroBlock");
const filtroStateAtRoomTemp = document.getElementById("filtroStateAtRoomTemp");
const filtroPeriod = document.getElementById("filtroPeriod");
const filtroGroupNumber = document.getElementById("filtroGroupNumber");
const filtroDiscoveryYear = document.getElementById("filtroDiscoveryYear");
const contadorCosas = document.getElementById("contadorCosas");

fetch('https://api.periodictableofelements.org/elements/')
    .then(response => response.json())
    .then(data => {
        elementos = data;
        mostrarElementos(elementos);
    })
    .catch(error => {
        console.error('Error al leer el archivo JSON', error);
        // Si falla la API, al menos muestra el Hidrógeno de respaldo
        mostrarElementos(elementos); 
    });

function mostrarElementos(arrayElementos) {
    elementoContainer.innerHTML = "";

    if (!arrayElementos || arrayElementos.length === 0) {
        elementoContainer.innerHTML = "<p>No se encontraron elementos.</p>";
        if (contadorCosas) contadorCosas.textContent = "0";
        return;
    }

    if (contadorCosas) contadorCosas.textContent = arrayElementos.length;

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
                <p>Electronegatividad: ${elemento.electronegativity}</p>
                <p>Afinidad electrónica: ${elemento.electron_affinity}</p>
                <p>Radio atómico: ${elemento.atomic_radius}</p>
                <p>Densidad: ${elemento.density}</p>
                <p>Punto de fusión: ${elemento.melting_point}</p>
                <p>Punto de ebullición: ${elemento.boiling_point}</p>
                <p>Año de descubrimiento: ${elemento.discovery_year}</p>
                <span class="categoria">${elemento.category}</span>
                <ul>${nameHTML}</ul>
            </article>
        `;
    });
    elementoContainer.innerHTML = htmlContent;
}

function filtrar() {
    let catVal = filtroCategoria ? filtroCategoria.value : "";
    let atoVal = filtroatomic_number && filtroatomic_number.value ? Number(filtroatomic_number.value) : "";
    let namVal = filtroname ? filtroname.value.toLowerCase() : "";
    let simVal = filtroSimbolo ? filtroSimbolo.value : "";
    let bloVal = filtroBlock ? filtroBlock.value : "";
    let staVal = filtroStateAtRoomTemp ? filtroStateAtRoomTemp.value : "";
    let perVal = filtroPeriod && filtroPeriod.value ? Number(filtroPeriod.value) : "";
    let groVal = filtroGroupNumber && filtroGroupNumber.value ? Number(filtroGroupNumber.value) : "";
    let disVal = filtroDiscoveryYear && filtroDiscoveryYear.value ? Number(filtroDiscoveryYear.value) : "";

    let elementosFiltrados = elementos.filter(elemento => {
        let coincideCat = catVal === "" || elemento.category === catVal;
        let coincideAto = atoVal === "" || elemento.atomic_number === atoVal;
        let coincidenam = namVal === "" || (typeof elemento.name === 'string' && elemento.name.toLowerCase().includes(namVal));
        let coincideSim = simVal === "" || elemento.symbol === simVal;
        let coincideblo = bloVal === "" || elemento.block === bloVal;
        let coincideSta = staVal === "" || elemento.state_at_room_temp === staVal;
        let coincidePer = perVal === "" || elemento.period === perVal;
        let coincidegro = groVal === "" || elemento.group_number === groVal;
        let coincideDis = disVal === "" || elemento.discovery_year === disVal;

        return coincideCat && coincideAto && coincidenam && coincideSim && coincideblo && coincideSta && coincidePer && coincidegro && coincideDis;
    });

    mostrarElementos(elementosFiltrados);
}

function buscar() {
    let textoBusq = busqueda.value.toLowerCase();

    let elementosFiltrados = elementos.filter(elemento => {
        // Convertimos todo a String() para que no rompa cuando evalúe números o valores nulos
        return String(elemento.name || "").toLowerCase().includes(textoBusq) ||
            String(elemento.atomic_mass || "").toLowerCase().includes(textoBusq) ||
            String(elemento.atomic_number || "").toLowerCase().includes(textoBusq) ||
            String(elemento.symbol || "").toLowerCase().includes(textoBusq) ||
            String(elemento.slug || "").toLowerCase().includes(textoBusq) ||
            String(elemento.category || "").toLowerCase().includes(textoBusq) ||
            String(elemento.block || "").toLowerCase().includes(textoBusq) ||
            String(elemento.group_number || "").toLowerCase().includes(textoBusq) ||
            String(elemento.period || "").toLowerCase().includes(textoBusq) ||
            String(elemento.state_at_room_temp || "").toLowerCase().includes(textoBusq) ||
            String(elemento.electronegativity || "").toLowerCase().includes(textoBusq) ||
            String(elemento.electron_affinity || "").toLowerCase().includes(textoBusq) ||
            String(elemento.atomic_radius || "").toLowerCase().includes(textoBusq) ||
            String(elemento.density || "").toLowerCase().includes(textoBusq) ||
            String(elemento.melting_point || "").toLowerCase().includes(textoBusq) ||
            String(elemento.boiling_point || "").toLowerCase().includes(textoBusq) ||
            String(elemento.discovery_year || "").toLowerCase().includes(textoBusq);
    });

    mostrarElementos(elementosFiltrados);
}

// Listeners de filtros y búsqueda
if (filtroCategoria) filtroCategoria.addEventListener("change", filtrar);
if (filtroBlock) filtroBlock.addEventListener("change", filtrar);
if (filtroatomic_number) filtroatomic_number.addEventListener("input", filtrar);
if (filtroname) filtroname.addEventListener("input", filtrar);
if (filtroSimbolo) filtroSimbolo.addEventListener("input", filtrar);
if (filtroStateAtRoomTemp) filtroStateAtRoomTemp.addEventListener("change", filtrar);
if (filtroPeriod) filtroPeriod.addEventListener("input", filtrar);
if (filtroGroupNumber) filtroGroupNumber.addEventListener("input", filtrar);
if (filtroDiscoveryYear) filtroDiscoveryYear.addEventListener("input", filtrar);
if (busqueda) busqueda.addEventListener("input", buscar);
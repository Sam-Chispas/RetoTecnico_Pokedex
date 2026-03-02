# RetoTecnico_Pokedex

# 📟 Pokédex Console

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![PokéAPI](https://img.shields.io/badge/PokéAPI-v2-EF5350?style=for-the-badge)

Una Pokédex interactiva con diseño de consola física, construida con React + Vite. Inspirada en la Pokédex clásica del anime, permite explorar, buscar y capturar Pokémon con un equipo de hasta 6 miembros.

---

## 📸 Vista previa

> <img width="1919" height="883" alt="image" src="https://github.com/user-attachments/assets/052aa6bb-d1fd-46bf-8d16-0d2ff821513d" />

> <img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/b8209111-cf76-45af-b256-629120d3df8b" />

```

---

## Funcionalidades

-  **Consola física** — diseño CSS fiel a la Pokédex del anime con dos mitades y bisagra
-  **Pantalla izquierda** — muestra el sprite del Pokémon seleccionado 
-  **Pantalla derecha** — muestra nombre, tipo y estadísticas base; si no hay selección muestra `? ? ? ? ? ?`
-  **Buscador** — filtra por nombre o número de ID en tiempo real
-  **Catálogo** — carga los 151 Pokémon de Gen I en batches de 20 en paralelo con skeleton loader
-  **Sistema de captura** — captura Pokémon y agrégalos automáticamente al equipo
-  **Equipo** — hasta 6 Pokémon, con restricción cuando está lleno
-  **Caché de API** — cada Pokémon se fetchea una sola vez por sesión

---

##  Tecnologías

| Tecnología         | Uso                                      |
|--------------------|------------------------------------------|
| **React 18**       | UI y manejo de estado                    |
| **Vite**           | Bundler y dev server                     |
| **GSAP 3**         | Animaciones de pantalla y hover          |
| **PokéAPI v2**     | Datos de Pokémon (sprites, stats, tipos) |
| **CSS Modules**    | Estilos por componente                   |
| **Press Start 2P** | Fuente retro (Google Fonts)              |

---

##  Estructura del proyecto

```
src/
├── main.jsx
├── App.jsx
├── api/
│   └── pokemon.js           # fetch + caché
├── constants/
│   └── types.js             # colores y labels de tipos/stats
├── components/
│   ├── Console/
│   │   ├── ConsoleLeft.jsx
│   │   ├── ConsoleRight.jsx
│   │   └── Hinge.jsx
│   ├── Screen/
│   │   ├── LeftScreen.jsx   # sprite + animación TV
│   │   ├── LeftScreen.css
│   │   ├── RightScreen.jsx  # stats + info
│   │   └── RightScreen.css
│   ├── Catalog/
│   │   ├── PokeCard.jsx     # card individual
│   │   └── PokeCard.css
│   └── Team/
│       ├── TeamPanel.jsx    # slots del equipo
│       └── TeamPanel.css
└── styles/
    ├── global.css           # body, fuentes
    └── console.css          # consola física completa
```

---

##  Instalación y uso

### Requisitos

- Node.js 18+
- npm 9+

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/pokedex-console.git
cd pokedex-console

# 2. Instala dependencias
npm install

# 3. Instala GSAP
npm install gsap

# 4. Levanta el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build para producción

```bash
npm run build
npm run preview
```

---

##  Cómo usar

1. **Explorar** — al cargar, el catálogo muestra los 151 Pokémon de Gen I progresivamente
2. **Seleccionar** — haz click en cualquier card para ver el sprite en la pantalla izquierda y sus stats en la derecha
3. **Buscar** — usa el buscador de la consola para filtrar por nombre (ej: `pikachu`) o por número (ej: `25`)
4. **Capturar** — pulsa el botón **CAPTURAR** en una card; el Pokémon entra automáticamente al equipo si hay espacio
5. **Equipo** — visualiza tu equipo en los 6 slots de la consola
6. **Liberar** — pulsa **LIBERAR** en una card capturada para quitarlo del equipo y de tu colección

> ⚠️ El equipo se guarda en memoria durante la sesión. Al recargar la página se reinicia.

---

## 📄 Licencia

[MIT](LICENSE)

---

## 🙏 Créditos

- Datos e imágenes: [PokéAPI](https://pokeapi.co/)
- Fuente retro: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) — Google Fonts
- Inspiración visual: Pokédex del anime Pokémon (1997)

> _"Pokémon, I choose you!"_ — Ash Ketchum

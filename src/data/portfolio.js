export const navigation = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#stack', label: 'Stack' },
  { href: '#trayectoria', label: 'Trayectoria' },
]

export const personalProfile = {
  name: 'Gian Piero Rodríguez',
  role: 'Estudiante de Ingeniería de Sistemas y desarrollador de software',
  interests: [
    'Desarrollo backend',
    'Arquitectura de software',
    'Algoritmos',
    'Inteligencia artificial',
    'Desarrollo de videojuegos',
  ],
}

// Contenido confirmado por el titular en PORTFOLIO_CONTENT.md.
export const projects = [
  {
    name: 'Second Brain',
    cover: 'brain',
    title: [
      'Second',
      'Brain',
    ],
    summary: 'Transformando información empresarial en respuestas y herramientas inteligentes.',
    statusLabel: 'Prototipo funcional',
    description: 'Second Brain es un asistente empresarial impulsado por inteligencia artificial que desarrollé para facilitar el acceso a información corporativa y simplificar procesos internos.\n\nEn lugar de navegar entre múltiples sistemas, documentos y registros, el usuario puede realizar consultas mediante lenguaje natural e interactuar con herramientas como la búsqueda de información, la visualización de documentación y la generación de cotizaciones.\n\nEste proyecto representa uno de mis mayores retos técnicos: conectar inteligencia artificial, bases de datos reales, arquitectura backend y una interfaz conversacional dentro de una solución empresarial.',
    problem: 'En muchas organizaciones, la información está distribuida entre bases de datos, documentos y diferentes sistemas. Encontrar un dato específico puede requerir múltiples consultas, conocimientos técnicos o procesos manuales.\n\nSecond Brain busca reducir esa complejidad mediante una interfaz centralizada que facilite el acceso a la información y ayude a agilizar tareas cotidianas.',
    goals: [
      'Facilitar el acceso a información empresarial mediante lenguaje natural.',
      'Integrar inteligencia artificial con sistemas y bases de datos existentes.',
      'Automatizar tareas repetitivas y simplificar procesos.',
      'Ofrecer una experiencia intuitiva sin exigir conocimientos técnicos al usuario.',
      'Desarrollar una arquitectura modular, segura y mantenible.',
    ],
    features: [
      'Chat conversacional asistido por inteligencia artificial.',
      'Consulta de información almacenada en MariaDB.',
      'Exploración de información estructurada.',
      'Consulta de modelos, versiones y características de vehículos.',
      'Visualización integrada de documentos PDF.',
      'Flujo conversacional para elaborar cotizaciones.',
      'Generación de cotizaciones en PDF.',
      'Validación de datos y manejo de errores.',
      'Mejoras de seguridad, respaldo y optimización del sistema.',
    ],
    technologies: [
      'Vue 3',
      'Nuxt 4',
      'TypeScript',
      'NestJS',
      'Node.js',
      'MariaDB',
      'APIs de inteligencia artificial',
      'PM2',
    ],
    technicalHighlights: [
      'Uno de los mayores desafíos fue desarrollar un backend capaz de conectar una interfaz conversacional con información almacenada en una base de datos empresarial.',
      'La solución utiliza una arquitectura modular basada en NestJS, con separación de responsabilidades, validación de entradas y servicios especializados para gestionar las consultas y funcionalidades del asistente.',
      'También trabajé en la integración frontend-backend, manejo de documentos, generación de PDF, estrategias de caché, pruebas automatizadas y medidas de endurecimiento de seguridad.',
      'El proyecto me ha permitido profundizar en arquitectura de software, integración de IA y desarrollo de sistemas que deben funcionar con información real.',
    ],
    status: 'Prototipo funcional en evolución continua.\n\nCuenta con consultas a bases de datos, funcionalidades conversacionales, visualización de documentos y generación de cotizaciones. Continúo trabajando en su robustez, seguridad y capacidades de integración empresarial.',
    repositoryNote: 'Proyecto desarrollado en un contexto empresarial. El código fuente y los datos internos no se encuentran disponibles públicamente.',
    links: [],
  },
  {
    name: 'Vende360',
    cover: 'vende',
    title: [
      'Vende',
      '360',
    ],
    summary: 'Una experiencia digital para conectar personas, vehículos y oportunidades.',
    statusLabel: 'Prácticas profesionales',
    description: 'Vende360 es un marketplace de vehículos en cuyo desarrollo participé durante mis prácticas profesionales.\n\nLa plataforma busca facilitar la experiencia de quienes desean explorar, comprar o vender un vehículo, reuniendo publicaciones, información detallada y funcionalidades de contacto en una interfaz moderna y accesible.\n\nMi trabajo se enfocó especialmente en el desarrollo frontend y en la integración de funcionalidades con el backend, participando en la construcción de diferentes módulos de la plataforma.',
    problem: 'Comprar o vender un vehículo puede implicar navegar entre múltiples anuncios, contactar a diferentes vendedores y comparar información presentada de manera poco uniforme.\n\nVende360 propone centralizar este proceso en una plataforma organizada, donde los usuarios puedan explorar opciones, consultar detalles y establecer contacto de una manera más sencilla.',
    goals: [
      'Facilitar la búsqueda y exploración de vehículos.',
      'Ofrecer una experiencia moderna y adaptable a distintos dispositivos.',
      'Simplificar la interacción entre compradores y vendedores.',
      'Centralizar publicaciones, perfiles y contactos.',
      'Construir una plataforma modular y preparada para incorporar nuevas funcionalidades.',
    ],
    features: [
      'Catálogo de vehículos con interfaces de filtrado y ordenamiento.',
      'Páginas de detalle con información de cada vehículo.',
      'Interfaces de registro, inicio de sesión y recuperación de acceso.',
      'Gestión de perfiles de usuario.',
      'Sistema de notificaciones.',
      'Registro de contactos recibidos.',
      'Formularios y flujos para publicación de vehículos.',
      'Integración de mapas mediante Leaflet.',
      'Diseño responsive para escritorio y dispositivos móviles.',
    ],
    featuresNote: 'Algunas funcionalidades se desarrollaron a nivel de interfaz o integración parcial y quedaron pendientes de completar en el backend.',
    technologies: [
      'Vue',
      'Nuxt',
      'JavaScript',
      'Frappe Framework',
      'Python',
      'APIs REST',
      'Leaflet',
    ],
    technicalHighlights: [
      'Participé en el desarrollo de componentes reutilizables con Vue y Nuxt, la organización de vistas y rutas, el consumo de endpoints y la integración de funcionalidades de usuario con el backend basado en Frappe.',
      'Trabajé con flujos de autenticación, perfiles, notificaciones, registros de contacto y diferentes interfaces del marketplace.',
      'Uno de los principales aprendizajes fue comprender cómo se conectan las necesidades del usuario, el diseño de interfaces y los servicios backend dentro de una aplicación real desarrollada en equipo.',
    ],
    status: 'Proyecto de prácticas profesionales con módulos funcionales y funcionalidades en diferentes etapas de implementación.\n\nLa experiencia me permitió trabajar sobre una plataforma real, participar en su evolución técnica y enfrentar problemas de integración y experiencia de usuario.',
    repositoryNote: 'Proyecto profesional. Enlace público por confirmar.',
    links: [],
  },
  {
    name: 'Idemne',
    cover: 'idemne',
    title: [
      'Idemne',
    ],
    summary: '¿Cuánto de ti mismo puedes perder antes de dejar de ser tú?',
    statusLabel: 'Diseño y preproducción',
    description: 'Idemne es mi proyecto personal de videojuego indie 2D, una experiencia roguelike que combina exploración, decisiones, progresión de habilidades y una narrativa psicológica centrada en la identidad.\n\nLa historia sigue a un protagonista reconstruido por una institución que desconoce gran parte de su pasado. A medida que avanza, descubre recuerdos fragmentados y comienza a cuestionar quién es realmente.\n\nEn este mundo, la tecnología, las mutaciones y las fuerzas espirituales ofrecen diferentes caminos de poder, pero cada uno puede transformar la manera en que el protagonista se percibe a sí mismo y es tratado por los demás.\n\nIdemne nace de mi interés por crear videojuegos donde las mecánicas y la narrativa no sean elementos independientes, sino partes de una misma experiencia.',
    problem: 'Muchos videojuegos presentan decisiones narrativas y sistemas de progresión que apenas se relacionan entre sí.\n\nCon Idemne quiero explorar una experiencia donde las decisiones del jugador, su equipamiento y la forma en que desarrolla al personaje tengan consecuencias tanto jugables como narrativas.',
    goals: [
      'Crear un roguelike 2D con identidad visual y narrativa propia.',
      'Diseñar sistemas de progresión que permitan diferentes estilos de juego.',
      'Integrar decisiones morales con consecuencias en el mundo.',
      'Construir un sistema de habilidades con combinaciones y sinergias.',
      'Explorar temas como identidad, memoria, humanidad y sacrificio.',
      'Aprender y aplicar desarrollo de videojuegos mediante Godot.',
    ],
    features: [
      'Partidas roguelike con elementos aleatorios.',
      'Diferentes rutas de poder: tecnología, mutaciones y habilidades espirituales.',
      'Habilidades y equipamiento con posibles sinergias.',
      'Sistema de humanidad, reputación y cordura.',
      'Recuperación gradual de recuerdos.',
      'Encuentros con versiones anteriores del protagonista.',
      'Decisiones con consecuencias narrativas.',
      'Gestión de equipamiento, accesorios y mejoras.',
      'Diferentes modos de dificultad.',
      'Exploración, combate y progresión entre partidas.',
    ],
    featuresNote: 'Estas mecánicas forman parte del diseño del juego y no deben interpretarse como sistemas ya implementados en una versión jugable.',
    technologies: [
      'Godot',
      'Diseño de videojuegos 2D',
      'Diseño de sistemas',
      'Creación de sprites',
      'Documentación técnica y narrativa',
    ],
    technicalHighlights: [
      'El principal desafío de Idemne es diseñar sistemas interconectados que permitan al jugador experimentar diferentes combinaciones sin perder coherencia en la jugabilidad.',
      'Estoy trabajando en la definición de sus mecánicas, reglas de progresión, equipamiento, estructura narrativa y primeros diseños de personajes.',
      'El proyecto también representa una oportunidad para aplicar pensamiento algorítmico, arquitectura de software y principios de diseño de sistemas en un contexto creativo.',
    ],
    status: 'Diseño y preproducción.\n\nEl proyecto cuenta con una ambientación desarrollada, conceptos narrativos, mecánicas planificadas y primeros diseños visuales. La implementación del videojuego en Godot forma parte de la siguiente etapa.',
    repositoryNote: 'Proyecto personal en desarrollo. Demostración jugable todavía no disponible.',
    links: [],
  },
]

export const technologies = [
  {
    name: 'C++',
    category: 'Lenguaje',
    icon: 'c-plusplus',
    description: 'Un lenguaje que me permite comprender el software desde sus fundamentos, trabajar con estructuras de datos y resolver problemas mediante algoritmos eficientes.',
    usage: 'Principalmente para desarrollar soluciones algorítmicas, trabajar con estructuras de datos, aplicar programación orientada a objetos y profundizar en el funcionamiento interno del software.',
    experience: 'Es uno de los lenguajes con los que tengo mayor experiencia y el que más disfruto utilizar.\n\nHe trabajado con algoritmos, estructuras de datos, manejo de memoria, abstracciones y resolución de problemas que requieren razonamiento lógico.',
    projects: [
      'Proyectos académicos, ejercicios de algoritmia y aplicaciones de programación orientada a objetos.',
    ],
    interests: [
      'La optimización, las estructuras de datos, el diseño de algoritmos y la capacidad de construir soluciones eficientes comprendiendo cómo funcionan internamente.',
    ],
  },
  {
    name: 'Java',
    category: 'Lenguaje',
    icon: 'java',
    description: 'Un lenguaje con el que he explorado cómo organizar aplicaciones, separar responsabilidades y construir sistemas orientados a objetos.',
    usage: 'Para desarrollar aplicaciones estructuradas, trabajar con patrones de diseño, interfaces gráficas y persistencia de datos.',
    experience: 'He desarrollado aplicaciones utilizando programación orientada a objetos, arquitectura MVC, Java Swing y SQLite.\n\nTambién he trabajado con eventos, serialización de objetos, colecciones, interfaces y organización modular del código.',
    projects: [
      'Aplicaciones académicas de Lenguajes de Programación III, incluyendo interfaces gráficas, sistemas MVC y aplicaciones con bases de datos SQLite.',
    ],
    interests: [
      'La arquitectura de aplicaciones, los patrones de diseño, la separación de responsabilidades y la creación de código mantenible.',
    ],
  },
  {
    name: 'Python',
    category: 'Lenguaje',
    icon: 'python',
    description: 'Una herramienta versátil para convertir ideas en soluciones, automatizar tareas y experimentar con nuevas tecnologías.',
    usage: 'Para desarrollar scripts, resolver problemas, trabajar con datos y bases de datos, automatizar procesos y explorar herramientas relacionadas con inteligencia artificial.',
    experience: 'He trabajado con Python en ejercicios de programación, operaciones con SQLite y desarrollo de pequeñas herramientas.\n\nTambién lo he utilizado como parte de mi experiencia académica y de mentoría, explicando conceptos de programación y persistencia de datos.',
    projects: [
      'Ejercicios académicos, herramientas de programación y actividades de enseñanza con Python y SQLite.',
    ],
    interests: [
      'Su aplicación a la automatización, el procesamiento de datos y especialmente la inteligencia artificial, área en la que quiero profundizar profesionalmente.',
    ],
  },
  {
    name: 'TypeScript',
    category: 'Lenguaje',
    icon: 'typescript',
    description: 'La combinación de la flexibilidad de JavaScript con herramientas que permiten construir aplicaciones más predecibles y fáciles de mantener.',
    usage: 'Para desarrollar aplicaciones web y servicios backend con tipado estático, contratos de datos y una estructura más robusta.',
    experience: 'Lo utilizo principalmente en el desarrollo de Second Brain, trabajando con NestJS, controladores, servicios, DTO, validaciones e integración entre componentes.\n\nSu uso me ha permitido profundizar en el desarrollo backend dentro del ecosistema de Node.js.',
    projects: [
      'Second Brain.',
    ],
    interests: [
      'La seguridad de tipos, el diseño de interfaces y contratos, la arquitectura de aplicaciones y la prevención de errores durante el desarrollo.',
    ],
  },
  {
    name: 'Vue',
    category: 'Frontend',
    icon: 'vue',
    description: 'Un framework progresivo que me permite transformar lógica y componentes en interfaces dinámicas, intuitivas y reutilizables.',
    usage: 'Para construir interfaces interactivas, desarrollar componentes reutilizables, gestionar estados reactivos e integrar aplicaciones frontend con servicios backend.',
    experience: 'He trabajado con Vue en aplicaciones reales, desarrollando componentes, vistas, formularios, interacciones y conexiones con APIs.\n\nTambién he trabajado con interfaces responsive y con la organización de proyectos basados en componentes.',
    projects: [
      'Second Brain y Vende360.',
    ],
    interests: [
      'La reactividad, la arquitectura de componentes, la experiencia de usuario y la construcción de interfaces que combinen funcionalidad, claridad y rendimiento.',
    ],
  },
  {
    name: 'Nuxt',
    category: 'Framework',
    icon: 'nuxt',
    description: 'Una herramienta que utilizo para construir aplicaciones Vue más completas, con una arquitectura organizada y capacidades para desarrollar experiencias web modernas.',
    usage: 'Para estructurar aplicaciones frontend, organizar rutas, integrar APIs y desarrollar interfaces que forman parte de sistemas más amplios.',
    experience: 'He trabajado con Nuxt en Second Brain y Vende360, desarrollando vistas, componentes, navegación e integración con servicios backend.\n\nTambién he participado en tareas relacionadas con compilación, configuración y despliegue de aplicaciones.',
    projects: [
      'Second Brain y Vende360.',
    ],
    interests: [
      'La arquitectura de aplicaciones web, el renderizado, la organización modular, el rendimiento y la integración eficiente entre frontend y backend.',
    ],
  },
  {
    name: 'NestJS',
    category: 'Backend',
    icon: 'nestjs',
    description: 'El framework con el que estoy profundizando en la construcción de servicios backend modulares, escalables y preparados para aplicaciones reales.',
    usage: 'Para desarrollar APIs, organizar lógica de negocio, integrar bases de datos, validar información y conectar aplicaciones con servicios de inteligencia artificial.',
    experience: 'Lo utilizo en Second Brain, donde he trabajado con módulos, controladores, servicios, DTO, inyección de dependencias, validación de entradas y consultas a MariaDB.\n\nTambién he participado en la implementación de pruebas automatizadas, controles de seguridad y optimizaciones del backend.',
    projects: [
      'Second Brain.',
    ],
    interests: [
      'La arquitectura backend, los sistemas modulares, el diseño de APIs, la seguridad y la integración de servicios de inteligencia artificial.',
    ],
  },
  {
    name: 'SQL',
    category: 'Bases de datos',
    icon: 'ui-database',
    description: 'El lenguaje que permite transformar grandes volúmenes de registros en información estructurada, consultable y útil para una aplicación.',
    usage: 'Para consultar, relacionar y gestionar información almacenada en bases de datos relacionales.',
    experience: 'He trabajado con MariaDB y SQLite, realizando consultas, explorando estructuras de tablas, utilizando relaciones y conectando aplicaciones con bases de datos.\n\nEn Second Brain, he trabajado con una base de datos empresarial real e integrado consultas con servicios backend.',
    projects: [
      'Second Brain y aplicaciones académicas con SQLite.',
    ],
    interests: [
      'El modelado relacional, la optimización de consultas, la integridad de datos y la construcción de sistemas capaces de utilizar información confiable de manera eficiente.',
    ],
  },
]

// Edita aquí los destinos. Sin href se muestra una tarjeta informativa sin enlace.
export const socialLinks = [
  {
    name: 'GitHub', icon: 'github',
    description: 'Explora mis repositorios y mi código.',
    href: 'https://github.com/Crudo27',
    newTab: true,
    action: 'Ver perfil',
  },
  {
    name: 'LinkedIn', icon: 'linkedin',
    description: 'Mi perfil profesional y formación.',
    href: null,
    newTab: true,
    action: 'Ver perfil',
  },
  {
    name: 'Correo electrónico', icon: 'email',
    description: 'Escríbeme para conversar sobre software.',
    href: 'mailto:gp100805@gmail.com',
    newTab: false,
    action: 'Escribir correo',
  },
]

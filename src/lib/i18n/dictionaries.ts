export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const es = {
  nav: {
    proyectos: "Proyectos",
    musicdy: "Musicdy",
    contacto: "Contacto",
    sendEmail: "Enviar correo",
  },
  hero: {
    line1: "Webs y productos",
    line2: "digitales que se sienten",
    line3: "premium.",
    subtitle:
      "Soy Leandro Cruces, desarrollador full-stack. Construyo sitios en producción para clientes reales y estoy creando Musicdy, mi startup musical.",
    ctaProjects: "Ver proyectos",
    ctaMusicdy: "Conocer Musicdy",
  },
  projects: {
    tabs: { sitios: "Sitios web", video: "Edición de video" },
    timeline: {
      sitiosTitle: "Sitios en producción",
      sitiosDescription:
        "Una cronología interactiva de los sitios que diseñé y desplegué a medida sobre la infraestructura de Vercel.",
      videoTitle: "Edición de video",
      videoDescription:
        "Videoclips musicales grabados junto a Zoe Navarro y editados por mí, más todo el contenido audiovisual de Musicdy: edición creativa, marketing y marca.",
    },
    groups: {
      entregados: "Entregados",
      enVenta: "En venta",
      enProduccion: "En producción",
      destacado: "Destacado",
      videoclips: "Videoclips",
      contenidoMarca: "Contenido de marca",
    },
    hoverOpenSite: "Abrir sitio",
    items: {
      mindfulness: {
        name: "Mindfulness Buenos Aires",
        status: "Vendida y entregada",
        description:
          "Sitio institucional de la Lic. Lissy Szwarcberg, instructora MBSR certificada por el Global Mindfulness Collaborative (Brown University). Programas de 4 y 8 semanas, retiros, propuestas para empresas, testimonios y un reproductor de meditaciones guiadas. Entregado y en producción con dominio propio.",
        cta: "Visitar sitio oficial",
        tags: ["Next.js", "Tailwind", "Lenis"],
      },
      beylhe: {
        name: "Beylhe",
        status: "Vendida y entregada",
        description:
          "Sitio web de exhibición y e-commerce desarrollado a medida para Beylhe, una artista dedicada al diseño y venta de cuadros y obras de arte visual. Proyecto entregado de forma exitosa a cliente final.",
        cta: "Visitar sitio oficial",
        tags: ["React", "Arte & Galería", "Tailwind"],
      },
      asrey: {
        name: "As Rey Dry Gin",
        status: "En proceso de venta",
        description:
          "El primer gin artesanal de Cutral-Có, Neuquén, galardonado con Medalla de Plata en la Copa Argentina de Destilados 2025. E-commerce premium con catálogo, carrito y pasarela de pago Mercado Pago.",
        cta: "Ver demo",
        tags: ["Next.js", "MercadoPago", "Tailwind"],
      },
      esteko: {
        name: "Esteko Ingeniería",
        status: "En proceso de venta",
        description:
          "Web corporativa para consultoría civil y cálculo estructural. Muestra portafolios técnicos, detalles de ingeniería, modelado BIM avanzado y fotogrametría industrial.",
        cta: "Ver demo",
        tags: ["Next.js", "Ingeniería", "Interactive SVG"],
      },
      enbox: {
        name: "Enbox Gym",
        status: "Fitness & Box",
        description:
          "Landing page interactiva para centro de entrenamiento funcional y boxeo en Cutral-Có. Diseñada para potenciar conversiones con grillas de horarios interactivos, planes y registro rápido.",
        cta: "Ver sitio",
        tags: ["React", "Vite", "Framer Motion"],
      },
      crecer: {
        name: "Crecer Inmobiliaria",
        status: "Portal inmobiliario",
        description:
          "Plataforma web con catálogo para Crecer Hub Inmobiliario, con trayectoria desde 1982. Incluye buscador dinámico, filtros por zona y precio, y contacto directo por propiedades.",
        cta: "Ver sitio",
        tags: ["React", "Buscador", "Tailwind CSS"],
      },
    },
    videos: {
      verEnYoutube: "Ver en YouTube",
      verVideoclip: "Ver videoclip",
      featured: {
        title: "Más fotos",
        role: "Videoclip oficial",
        description:
          "Videoclip oficial de «Más fotos» del artista ivi. Me encargué de la grabación y del montaje completo: selección de tomas, ritmo de corte al pulso de la canción, corrección de color y armado final del video.",
        tags: ["Grabación", "Edición", "Color"],
      },
      memoria: {
        title: "siempre en tu memoria",
        role: "Videoclip",
        description:
          "Videoclip grabado por Zoe Navarro y editado por mí de principio a fin: montaje, ritmo de corte y corrección de color para acompañar el tono del tema.",
        tags: ["Edición", "Montaje", "Color"],
      },
      volver: {
        title: "CUANDO NOS VOLVAMOS A VER",
        role: "Videoclip",
        description:
          "Grabación de Zoe Navarro con edición y post-producción a mi cargo. Sincronización con la letra, transiciones y gradación de color del videoclip.",
        tags: ["Edición", "Transiciones", "Color"],
      },
      mia: {
        title: "QUIERO HACERTE MIA",
        role: "Videoclip",
        description:
          "Videoclip filmado por Zoe Navarro y montado por mí. Selección de tomas, corte al ritmo del beat y ajuste de color para un acabado limpio y consistente.",
        tags: ["Edición", "Ritmo", "Color"],
      },
      lean: {
        title: "LEAN",
        role: "Videoclip",
        description:
          "Otro videoclip del proyecto grabado por Zoe Navarro y editado íntegramente por mí, cuidando el ritmo de corte y la estética general del video.",
        tags: ["Edición", "Montaje", "Color"],
      },
    },
    musicdyContent: {
      role: "Recién arrancando",
      description:
        "Todo el contenido de Musicdy lo hago yo: la edición creativa, el marketing y la publicación. La startup recién está arrancando con el contenido, así que estoy armando desde cero la identidad audiovisual de la marca.",
      tags: ["Edición creativa", "Marketing", "Contenido", "Marca"],
      contentInProgress: "Contenido en construcción",
      cta: "Ver en Instagram",
    },
  },
  musicdy: {
    eyebrow: "La startup",
    intro:
      "Plataforma de streaming y marketplace de beats que estoy diseñando y desarrollando. Los productores publican, los artistas escuchan y las licencias se compran dentro de la app. Todas las capturas de abajo son de la app real, ya con la sesión iniciada.",
    facts: {
      platform: { label: "Plataforma", value: "Web + App móvil" },
      payments: { label: "Pagos integrados", value: "Stripe y Mercado Pago" },
      model: { label: "Modelo", value: "Licencias de beats" },
      backend: { label: "Backend", value: "FastAPI + Supabase" },
    },
    capabilities: {
      player: {
        title: "Reproductor y licencias",
        description:
          "Al entrar, un carrusel 3D de beats con reproductor integrado. Cada track muestra el productor y su precio, con la compra de licencia a un clic dentro de la app.",
        chips: ["Carrusel 3D", "Reproductor", "Comprar licencia"],
      },
      explore: {
        title: "Explorar y descubrir",
        description:
          "Biblioteca personal con playlists, productores en tendencia y colecciones de la comunidad. Búsqueda por título, productor o BPM y filtros por género.",
        chips: ["Biblioteca", "Tendencias", "Colecciones"],
      },
      studio: {
        title: "Studio de publicación",
        description:
          "Flujo guiado en pasos para publicar un beat, un sample/loop o una canción: se sube el archivo original y la portada, y se definen las licencias y los splits.",
        chips: ["Subir beats", "Portada", "Licencias y splits"],
      },
      profile: {
        title: "Perfil de artista",
        description:
          "Perfil público con seguidores, colaboraciones, compras, billetera y estadísticas, más enlaces a Instagram y Spotify. Todo lo que necesita un productor para crecer.",
        chips: ["Seguidores", "Billetera", "Estadísticas"],
      },
    },
    visitCta: "Visitar musicdy.com",
    tapToExpand: "Tocá una captura para ampliarla",
    expandWord: "Ampliar",
    lightbox: {
      close: "Cerrar",
      previous: "Captura anterior",
      next: "Captura siguiente",
      openOn: "Abrir en musicdy.com",
      expandLabel: "Ampliar captura:",
      screenshotOf: "Captura de Musicdy:",
      realScreenshotOf: "Captura real de Musicdy:",
      goTo: "Ir a",
    },
  },
  footer: {
    eyebrow: "Hablemos",
    headline: { before: "¿Tenés un proyecto", highlight: "en mente", after: "?" },
    paragraph:
      "Ya sea una web a medida, una tienda online o un producto desde cero, escribime y lo hacemos realidad.",
    cta: "Escribime",
    socials: {
      github: { label: "GitHub", sub: "Ver mis repositorios" },
      linkedin: { label: "LinkedIn", sub: "Conectemos" },
      email: { label: "Correo" },
    },
    rights: "Todos los derechos reservados.",
  },
  metadata: {
    title: "Leandro Cruces | Portafolio",
    description:
      "Portafolio profesional de Leandro Cruces - Desarrollador y creador de experiencias web de calidad premium.",
  },
};

export const en: typeof es = {
  nav: {
    proyectos: "Projects",
    musicdy: "Musicdy",
    contacto: "Contact",
    sendEmail: "Send email",
  },
  hero: {
    line1: "Websites and digital",
    line2: "products that feel",
    line3: "premium.",
    subtitle:
      "I am Leandro Cruces, a full-stack developer. I build production sites for real clients and I am building Musicdy, my music startup.",
    ctaProjects: "View projects",
    ctaMusicdy: "Discover Musicdy",
  },
  projects: {
    tabs: { sitios: "Websites", video: "Video editing" },
    timeline: {
      sitiosTitle: "Websites in production",
      sitiosDescription:
        "An interactive timeline of the websites I designed and deployed, custom-built on Vercel infrastructure.",
      videoTitle: "Video editing",
      videoDescription:
        "Music videos filmed with Zoe Navarro and edited by me, plus all of Musicdy audiovisual content: creative editing, marketing, and brand.",
    },
    groups: {
      entregados: "Delivered",
      enVenta: "For sale",
      enProduccion: "In production",
      destacado: "Featured",
      videoclips: "Music videos",
      contenidoMarca: "Brand content",
    },
    hoverOpenSite: "Open site",
    items: {
      mindfulness: {
        name: "Mindfulness Buenos Aires",
        status: "Sold & delivered",
        description:
          "Institutional site for Lic. Lissy Szwarcberg, an MBSR instructor certified by the Global Mindfulness Collaborative (Brown University). Features 4- and 8-week programs, retreats, corporate proposals, testimonials, and a guided-meditation player. Delivered and live on its own domain.",
        cta: "Visit official site",
        tags: ["Next.js", "Tailwind", "Lenis"],
      },
      beylhe: {
        name: "Beylhe",
        status: "Sold & delivered",
        description:
          "Custom-built showcase and e-commerce site for Beylhe, an artist who designs and sells paintings and visual artwork. Successfully delivered to the end client.",
        cta: "Visit official site",
        tags: ["React", "Art & Gallery", "Tailwind"],
      },
      asrey: {
        name: "As Rey Dry Gin",
        status: "Currently for sale",
        description:
          "The first craft gin from Cutral-Có, Neuquén, awarded a Silver Medal at the 2025 Argentine Spirits Cup. A premium e-commerce build with catalog, cart, and Mercado Pago checkout.",
        cta: "View demo",
        tags: ["Next.js", "MercadoPago", "Tailwind"],
      },
      esteko: {
        name: "Esteko Ingeniería",
        status: "Currently for sale",
        description:
          "Corporate site for a civil engineering and structural-calculation consultancy. Showcases technical portfolios, engineering detail, advanced BIM modeling, and industrial photogrammetry.",
        cta: "View demo",
        tags: ["Next.js", "Engineering", "Interactive SVG"],
      },
      enbox: {
        name: "Enbox Gym",
        status: "Fitness & Box",
        description:
          "Interactive landing page for a functional-training and boxing gym in Cutral-Có. Built to drive conversions with interactive schedule grids, membership plans, and quick sign-up.",
        cta: "View site",
        tags: ["React", "Vite", "Framer Motion"],
      },
      crecer: {
        name: "Crecer Inmobiliaria",
        status: "Real estate portal",
        description:
          "Web platform with property catalog for Crecer Hub Inmobiliario, in business since 1982. Includes dynamic search, filters by area and price, and direct contact per listing.",
        cta: "View site",
        tags: ["React", "Search", "Tailwind CSS"],
      },
    },
    videos: {
      verEnYoutube: "Watch on YouTube",
      verVideoclip: "Watch video",
      featured: {
        title: "Más fotos",
        role: "Official music video",
        description:
          "Official music video for ivi's «Más fotos». I handled the filming and the full edit: shot selection, cutting to the song rhythm, color correction, and final assembly.",
        tags: ["Filming", "Editing", "Color"],
      },
      memoria: {
        title: "siempre en tu memoria",
        role: "Music video",
        description:
          "Music video filmed by Zoe Navarro and edited by me start to finish: cutting, pacing, and color correction to match the track tone.",
        tags: ["Editing", "Cutting", "Color"],
      },
      volver: {
        title: "CUANDO NOS VOLVAMOS A VER",
        role: "Music video",
        description:
          "Filmed by Zoe Navarro, with editing and post-production handled by me. Lyric sync, transitions, and color grading for the video.",
        tags: ["Editing", "Transitions", "Color"],
      },
      mia: {
        title: "QUIERO HACERTE MIA",
        role: "Music video",
        description:
          "Video filmed by Zoe Navarro and cut by me. Shot selection, editing to the beat, and color tuning for a clean, consistent finish.",
        tags: ["Editing", "Pacing", "Color"],
      },
      lean: {
        title: "LEAN",
        role: "Music video",
        description:
          "Another video from the project, filmed by Zoe Navarro and edited entirely by me, with close attention to pacing and the video overall look.",
        tags: ["Editing", "Cutting", "Color"],
      },
    },
    musicdyContent: {
      role: "Just getting started",
      description:
        "I handle all of Musicdy content myself: creative editing, marketing, and publishing. The startup is just getting started with content, so I am building the brand audiovisual identity from scratch.",
      tags: ["Creative editing", "Marketing", "Content", "Brand"],
      contentInProgress: "Content in progress",
      cta: "View on Instagram",
    },
  },
  musicdy: {
    eyebrow: "The startup",
    intro:
      "A beat-streaming and marketplace platform I am designing and building. Producers publish, artists listen, and licenses are purchased right inside the app. Every screenshot below is from the real app, already logged in.",
    facts: {
      platform: { label: "Platform", value: "Web + Mobile app" },
      payments: { label: "Integrated payments", value: "Stripe & Mercado Pago" },
      model: { label: "Model", value: "Beat licensing" },
      backend: { label: "Backend", value: "FastAPI + Supabase" },
    },
    capabilities: {
      player: {
        title: "Player & licensing",
        description:
          "A 3D beat carousel with a built-in player greets you on entry. Every track shows the producer and price, with license purchase one click away, right inside the app.",
        chips: ["3D carousel", "Player", "Buy license"],
      },
      explore: {
        title: "Explore & discover",
        description:
          "A personal library with playlists, trending producers, and community collections. Search by title, producer, or BPM, with filters by genre.",
        chips: ["Library", "Trending", "Collections"],
      },
      studio: {
        title: "Publishing studio",
        description:
          "A guided, step-by-step flow to publish a beat, a sample/loop, or a song: upload the original file and cover art, then set licenses and splits.",
        chips: ["Upload beats", "Cover art", "Licenses & splits"],
      },
      profile: {
        title: "Artist profile",
        description:
          "A public profile with followers, collaborations, purchases, wallet, and stats, plus links to Instagram and Spotify, everything a producer needs to grow.",
        chips: ["Followers", "Wallet", "Stats"],
      },
    },
    visitCta: "Visit musicdy.com",
    tapToExpand: "Tap a screenshot to expand it",
    expandWord: "Expand",
    lightbox: {
      close: "Close",
      previous: "Previous screenshot",
      next: "Next screenshot",
      openOn: "Open on musicdy.com",
      expandLabel: "Expand screenshot:",
      screenshotOf: "Musicdy screenshot:",
      realScreenshotOf: "Real screenshot of Musicdy:",
      goTo: "Go to",
    },
  },
  footer: {
    eyebrow: "Let's talk",
    headline: { before: "Got a project", highlight: "in mind", after: "?" },
    paragraph:
      "Whether it is a custom website, an online store, or a product built from scratch, reach out and let us make it happen.",
    cta: "Message me",
    socials: {
      github: { label: "GitHub", sub: "View my repositories" },
      linkedin: { label: "LinkedIn", sub: "Let's connect" },
      email: { label: "Email" },
    },
    rights: "All rights reserved.",
  },
  metadata: {
    title: "Leandro Cruces | Portfolio",
    description:
      "Professional portfolio of Leandro Cruces - Developer and creator of premium-quality web experiences.",
  },
};

export const dictionaries = { es, en };
export type Dictionary = typeof es;

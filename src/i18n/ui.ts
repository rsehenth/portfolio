/**
 * UI Translations - Centralized translation strings for interface elements
 * Separated from case study content which lives in MDX files
 */

export type Locale = 'pt-BR' | 'en';

export const locales: Locale[] = ['pt-BR', 'en'];
export const defaultLocale: Locale = 'pt-BR';

export const ui = {
  'pt-BR': {
    // Navigation
    nav: {
      projects: 'Projetos',
      about: 'Sobre',
      contact: 'Contato',
    },

    // Header CTAs
    header: {
      linkedin: 'LinkedIn',
      viewWork: 'Ver projetos',
    },

    theme: {
      switchToDark: 'Ativar modo escuro',
      switchToLight: 'Ativar modo claro',
    },

    // Hero
    hero: {
      badge: 'Technical Product Manager · AI Products · Product × Engineering',
      tagline: 'Construo produtos na interseção entre IA, Produto e Engenharia.',
      subheadline: 'Conecto estratégia de produto, decisões técnicas e execução hands-on para transformar problemas complexos em produtos simples, confiáveis e escaláveis.',
      ctaPrimary: 'Ver cases',
      ctaSecondary: 'LinkedIn',
      ctaCV: 'Baixar CV (PDF)',
      ctaCVAriaLabel: 'Baixar currículo em PDF',
    },

    // Selected Work section
    work: {
      title: 'Projetos Selecionados',
      subtitle: 'Cases que mostram diferentes formas de atuação entre produto, IA e tecnologia.',
      viewCase: 'Ver case →',
      viewAll: 'Ver todos os projetos',
      empty: 'Novos cases serão publicados em breve.',
      demonstrates: 'Demonstra',
    },

    // Home-specific project presentation layer
    // Isolated from MDX frontmatter — changes here affect ONLY the Home cards
    homeProjects: {
      subtitle: 'Cases que mostram diferentes formas de atuação entre produto, IA e tecnologia.',
      viewCase: 'Ver case →',
      viewAll: 'Ver todos os projetos →',
      projects: {
        profresolve: {
          category: 'AI Product · SaaS',
          description: 'Plataforma de IA para a rotina docente, com geração de materiais, monetização por créditos e arquitetura de resiliência para LLMs.',
          highlights: [
            { value: '16', label: 'Geradores' },
            { value: '2.4K+', label: 'Test cases' },
          ],
          focus: ['AI Product', 'Reliability', 'Product Economics'],
        },
        'super-squad-ai': {
          category: 'AI Product · Developer Tools',
          description: 'Orquestrador multiagente para desenvolvimento de software, com execução isolada em Git e verificação determinística antes da integração.',
          highlights: [
            { value: '1 + N', label: 'Agent architecture' },
            { value: '2-stage', label: 'Verification' },
          ],
          focus: ['Agent Orchestration', 'Reliability', 'Technical Product'],
        },
        'project-aurora': {
          category: 'Product Leadership · Game Systems',
          description: "Beat 'em up 2D em produção no qual lidero visão de produto, sistemas, progressão e priorização em uma equipe de três pessoas.",
          highlights: [
            { value: '3', label: 'Pessoas na equipe' },
            { value: 'Post-PoC', label: 'Early Production' },
          ],
          focus: ['Product Leadership', 'Game Systems', 'MVP Scoping'],
        },
        cultos: {
          category: 'Technical Product · Church Tech',
          description: 'MVP desktop adaptado para a operação de mídia em igrejas brasileiras, com experiência PT-BR, funcionamento offline e sincronização opcional com a nuvem.',
          highlights: [
            { value: '9 + mídia', label: 'Coleções sincronizadas' },
            { value: 'Offline-first', label: 'Desktop product' },
          ],
          focus: ['Product Adaptation', 'Technical Product', 'UX Simplification'],
        },
      },
    },

    // Projects index page — editorial layer exclusive to /projects
    // Isolated from MDX frontmatter and homeProjects — changes here affect ONLY /projects cards
    projectsIndex: {
      // Controls which slugs go to "Featured Work" section (order matters for display)
      featured: ['profresolve', 'super-squad-ai'],
      projects: {
        profresolve: {
          category: 'AI Product · SaaS',
          description: 'Plataforma de inteligência artificial para a rotina docente, com geração de materiais, monetização por créditos e arquitetura resiliente para uso com modelos de linguagem.',
          highlights: [
            { value: '16', label: 'Geradores' },
            { value: '2.4K+', label: 'Test cases' },
          ],
          focus: ['AI Product', 'Reliability', 'Product Economics'],
          stage: 'Produto ativo',
        },
        'super-squad-ai': {
          category: 'AI Product · Developer Tools',
          description: 'Sistema de orquestração de agentes de IA para desenvolvimento de software, com execução isolada em Git e verificação determinística antes de cada integração.',
          highlights: [
            { value: '1 + N', label: 'Arquitetura Leader + Workers' },
            { value: '2-stage', label: 'Verification' },
          ],
          focus: ['AI Product', 'Agent Orchestration', 'Reliability'],
          stage: 'Em desenvolvimento',
        },
        'project-aurora': {
          category: 'Product Leadership · Game Systems',
          description: "Beat 'em up 2D em produção inicial, no qual lidero visão de produto, sistemas, progressão e priorização em uma equipe de três pessoas.",
          // Stage já comunica o estágio (Post-PoC · Early Production) — não repetir como highlight
          highlights: [
            { value: '3', label: 'Pessoas na equipe' },
          ],
          focus: ['Product Leadership', 'Game Systems', 'MVP Scoping'],
          stage: 'Post-PoC · Early Production',
        },
        cultos: {
          category: 'Technical Product · Desktop',
          description: 'MVP desktop para operação de mídia em igrejas brasileiras, com UX simplificada, funcionamento offline e sincronização opcional com a nuvem.',
          highlights: [
            { value: '9 + mídia', label: 'Coleções sincronizadas' },
            { value: 'Offline-first', label: 'Desktop product' },
          ],
          focus: ['Product Adaptation', 'Local-first', 'UX Simplification'],
          stage: 'MVP · Early Release',
        },
        'universal-docs': {
          category: 'Technical Product · Developer Experience',
          description: 'Starter reutilizável de documentação técnica com CSS isolado, branding configurável, busca, i18n e arquitetura pensada para integração dentro do produto.',
          highlights: [
            { value: '3', label: 'Idiomas' },
            { value: '57', label: 'Test cases' },
          ],
          focus: ['Developer Experience', 'Reusable Architecture', 'Docs-as-Code'],
          stage: 'Reusable Starter',
        },
        mosaic: {
          category: 'Product Prototype · UX',
          description: 'MVP de link-in-bio com editor visual que permite criar páginas pessoais usando blocos arrastáveis, redimensionáveis e editáveis, sem escrever código.',
          highlights: [
            { value: '6', label: 'Tipos de bloco' },
            { value: '5', label: 'Tamanhos de layout' },
          ],
          focus: ['Product Prototyping', 'UX Systems', 'Interaction Design'],
          stage: 'MVP · Demo',
        },
        'project-stream': {
          category: 'Technical Product · Desktop Media',
          description: 'Arquitetura de um produto desktop de streaming que busca simplificar convidados, layouts e transmissão, com o processamento audiovisual principal no computador do host.',
          highlights: [],
          focus: ['Product Architecture', 'Media Systems', 'Risk Reduction'],
          stage: 'Discovery · Pre-PoC',
        },
        'cripto-host-decentralized-hosting': {
          category: 'Technical Product · Web3 Infrastructure',
          description: 'Discovery e arquitetura de uma proposta de hosting descentralizado que buscava oferecer uma experiência simples de deploy para frontends Web3 usando IPFS, Filecoin e Arweave.',
          highlights: [
            { value: 'MVP scoped', label: 'Escopo definido' },
            { value: 'Arquitetura candidata', label: 'Planejamento técnico' },
          ],
          focus: ['Product Discovery', 'Technical Architecture', 'MVP Scoping'],
          stage: 'Discovery · Technical Architecture',
        },
      },
    },

    // Projects index page
    projectsPage: {
      title: 'Projetos',
      subtitle: 'Uma seleção de produtos e sistemas que mostram como trabalho entre produto, inteligência artificial e tecnologia da estratégia à execução.',
      description: 'Portfólio de produtos construídos e entregues por Lucas Sehnem, Technical Product Manager.',
      empty: 'Nenhum projeto publicado ainda. Volte em breve!',
      featuredHeading: 'Projetos em destaque',
      moreHeading: 'Outros projetos',
      viewCase: 'Ver case →',
      focus: 'Foco',
    },

    // Product Impact section
    impact: {
      title: 'Impacto de Produto',
      subtitle: 'Resultados verificados de decisões e execução de produto.',
    },

    // How I Work section
    howIWork: {
      title: 'Como Trabalho',
      subtitle: 'Três pilares que guiam minha forma de construir produtos.',
      product: {
        title: 'Produto',
        description: 'Transformo problemas em hipóteses, prioridades e decisões com critérios claros.',
      },
      technology: {
        title: 'Tecnologia',
        description: 'Entendo as implicações técnicas das decisões e trabalho diretamente com IA, APIs, arquitetura e prototipação.',
      },
      execution: {
        title: 'Execução',
        description: 'Aproximo decisão e implementação para validar mais cedo e aprender mais rápido.',
      },
      // Home-specific skills — isolated from profile.ts (which is shared with /about)
      skills: {
        product:    ['Discovery', 'Strategy', 'Prioritization'],
        technology: ['AI', 'APIs', 'Architecture'],
        execution:  ['Prototyping', 'Testing', 'Iteration'],
      },
    },

    // About section
    about: {
      title: 'Sobre',

      // Hero tagline exclusive to About — not from profile.ts (which is shared globally)
      heroTagline: 'Trabalho entre produto, IA e engenharia, aproximando decisão e implementação.',

      // SEO meta exclusive to About — not the site-wide siteDescription
      meta: {
        title: 'Sobre | Lucas Sehnem · Technical Product Manager',
        description: 'Trajetória de Lucas Sehnem entre usuários, produto e tecnologia, com experiência em AI Products, Technical Product, discovery, estratégia e execução hands-on.',
      },

      // bio.* kept untouched — consumed by HomePage.astro for the Home About section
      bio: {
        p1: 'Trabalho de forma hands-on entre produto e tecnologia, atuando diretamente com desenvolvimento, IA, APIs, arquitetura, automações e prototipação para transformar decisões de produto em soluções reais.',
        p2: 'Meu trabalho não termina na definição do que construir. Busco entender as implicações técnicas, os trade-offs e o caminho mais eficiente para transformar uma decisão de produto em valor real para o usuário.',
      },

      // intro.* exclusive to the About page — separate from bio.* to avoid Home regression
      intro: {
        p1: 'Minha trajetória em tecnologia começou próxima dos usuários. Passei mais de cinco anos no ecossistema TRON DAO / DLive atuando com suporte, onboarding, localização e feedback em português, inglês e espanhol. Depois, na exchange espanhola Bit2Me e em projetos da Play9/NineBlocks, passei a conectar comunidade, growth e produto, levando sinais de usuários para decisões de comunicação, discovery e backlog.',
        p2: 'Essa experiência me levou a papéis cada vez mais próximos de produto. Na Cripto Host, atuei como Product Owner, trabalhando com backlog, requisitos técnicos, pesquisa de infraestrutura e priorização junto à engenharia.',
        p3: 'Hoje, como cofundador do ProfResolve, atuo em todo o ciclo do produto: discovery, visão, roadmap, UX, monetização e implementação técnica. Construí a plataforma de ponta a ponta, incluindo frontend, backend, APIs, pagamentos, banco de dados, infraestrutura de IA e mecanismos de confiabilidade. Essa combinação entre entendimento do usuário, decisões de produto e execução técnica é o que levo para a próxima equipe.',
      },

      focus: {
        title: 'Onde Atuo',
        aiProducts: {
          title: 'AI Products',
          description: 'Trabalho com produtos que usam LLMs, agentes e fluxos de IA, pensando não apenas na geração, mas também em confiabilidade, comportamento, custo e experiência do usuário.',
        },
        technicalProduct: {
          title: 'Technical Product',
          description: 'Conecto decisões de produto a arquitetura, APIs, integrações, dados e restrições técnicas para entender o que é viável, onde estão os riscos e quais trade-offs fazem sentido.',
        },
        productStrategy: {
          title: 'Product Strategy',
          description: 'Trabalho na definição do problema, visão, escopo, prioridades e evolução do produto, buscando separar o que precisa ser construído agora do que ainda pode esperar.',
        },
        experimentation: {
          title: 'Experimentation & Validation',
          description: 'Uso protótipos, PoCs e MVPs para reduzir incerteza antes de aumentar o investimento, definindo o que precisa ser comprovado e quais sinais devem orientar a próxima decisão.',
        },
      },

      // currently removed — see plan; themes covered by focus areas and cases

      // skills.* kept for TypeScript compatibility — not used in the new About template
      skills: {
        title: 'Como Trabalho',
        product: 'Produto',
        technology: 'Tecnologia',
        execution: 'Execução',
      },

      toolkit: {
        title: 'Ferramentas Técnicas',
        groups: [
          {
            category: 'AI & APIs',
            items: ['LLMs', 'APIs', 'Structured Outputs', 'AI Workflows'],
          },
          {
            category: 'Product Engineering',
            items: ['TypeScript', 'Python', 'React / Next.js', 'SQL'],
          },
          {
            category: 'Architecture & Delivery',
            items: ['PostgreSQL', 'Redis', 'Git', 'Observability'],
          },
        ],
      },

      // contact.* kept for TypeScript compatibility — new About CTA uses the global contact.* keys
      contact: {
        title: 'Vamos conversar',
        subtitle: 'Estou aberto a conversar sobre oportunidades em Technical Product, AI Products e equipes construindo produtos tecnicamente complexos.',
      },
    },

    // Contact section
    contact: {
      title: 'Vamos conversar',
      subtitle: 'Estou aberto a conversar sobre oportunidades em Technical Product, AI Products e equipes construindo produtos tecnicamente complexos.',
      ctaLinkedin: 'LinkedIn',
      ctaEmail: 'Enviar e-mail',
      ctaCV: 'Baixar CV (PDF)',
      showEmail: 'Ver e-mail',
      emailAriaLabel: 'Ver endereço de e-mail',
      emailRevealedLabel: 'E-mail revelado',
    },

    // Footer
    footer: {
      copyright: '© {year} Lucas Sehnem. Todos os direitos reservados.',
      builtBy: 'Desenvolvido por Lucas Sehnem.',
    },

    // Case study page
    caseStudy: {
      role: 'Papel',
      product: 'Produto',
      focus: 'Foco',
      timeline: 'Período',
      status: 'Status',
      stage: 'Etapa',
      base: 'Base',
      technologies: 'Tecnologias',
      stack: 'Stack',
      previous: 'Anterior',
      next: 'Próximo',
      allWork: 'Todos os Projetos',
      backToProjects: 'Voltar aos projetos',
      metrics: 'Métricas Principais',
      snapshotLabel: 'Escopo Técnico',
      snapshotProductLabel: 'Produto',
      snapshotTechnicalLabel: 'Escala técnica',
      visitProduct: 'Acessar produto ↗',
      verifiedResults: 'Resultados Verificados',
      technicalScale: 'Escala Técnica',
      productImpact: 'Impacto de Produto',
    },

    // Status labels
    status: {
      Active: 'Ativo',
      Completed: 'Concluído',
      Archived: 'Arquivado',
      'On Hold': 'Em espera',
    },

    // Common
    common: {
      loading: 'Carregando...',
      error: 'Erro ao carregar',
      notFound: 'Página não encontrada',
      backHome: 'Voltar ao início',
    },

    // SEO / Meta
    meta: {
      siteTitle: 'Lucas Sehnem — Technical Product Manager',
      siteDescription: 'Technical Product Manager na interseção de IA, Produto e Engenharia. Construindo produtos com IA, APIs e SaaS.',
    },
  },

  'en': {
    // Navigation
    nav: {
      projects: 'Work',
      about: 'About',
      contact: 'Contact',
    },

    // Header CTAs
    header: {
      linkedin: 'LinkedIn',
      viewWork: 'View My Work',
    },

    theme: {
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
    },

    // Hero
    hero: {
      badge: 'Technical Product Manager · AI Products · Product × Engineering',
      tagline: 'I build products at the intersection of AI, Product and Engineering.',
      subheadline: 'I connect product strategy, technical decisions and hands-on execution to turn complex problems into simple, reliable and scalable products.',
      ctaPrimary: 'View cases',
      ctaSecondary: 'LinkedIn',
      ctaCV: 'Download CV (PDF)',
      ctaCVAriaLabel: 'Download resume as PDF',
    },

    // Selected Work section
    work: {
      title: 'Selected Work',
      subtitle: 'Case studies that show different ways I work across product, AI and technology.',
      viewCase: 'View case →',
      viewAll: 'View all projects',
      empty: 'New case studies coming soon.',
      demonstrates: 'Demonstrates',
    },

    // Home-specific project presentation layer
    // Isolated from MDX frontmatter — changes here affect ONLY the Home cards
    homeProjects: {
      subtitle: 'Case studies that show different ways I work across product, AI and technology.',
      viewCase: 'View case →',
      viewAll: 'View all projects →',
      projects: {
        profresolve: {
          category: 'AI Product · SaaS',
          description: 'An AI platform for educators, combining content generation, credit-based monetization and a resilient LLM architecture.',
          highlights: [
            { value: '16', label: 'Generators' },
            { value: '2.4K+', label: 'Test cases' },
          ],
          focus: ['AI Product', 'Reliability', 'Product Economics'],
        },
        'super-squad-ai': {
          category: 'AI Product · Developer Tools',
          description: 'A multi-agent software engineering orchestrator with isolated Git execution and deterministic verification before integration.',
          highlights: [
            { value: '1 + N', label: 'Agent architecture' },
            { value: '2-stage', label: 'Verification' },
          ],
          focus: ['Agent Orchestration', 'Reliability', 'Technical Product'],
        },
        'project-aurora': {
          category: 'Product Leadership · Game Systems',
          description: "A 2D beat 'em up in production where I lead product vision, game systems, progression and prioritization within a three-person team.",
          highlights: [
            { value: '3', label: 'People on the team' },
            { value: 'Post-PoC', label: 'Early Production' },
          ],
          focus: ['Product Leadership', 'Game Systems', 'MVP Scoping'],
        },
        cultos: {
          category: 'Technical Product · Church Tech',
          description: 'A desktop MVP tailored for media operation in Brazilian churches, combining a native PT-BR experience, offline-first usage and optional cloud synchronization.',
          highlights: [
            { value: '9 + media', label: 'Synced collections' },
            { value: 'Offline-first', label: 'Desktop product' },
          ],
          focus: ['Product Adaptation', 'Technical Product', 'UX Simplification'],
        },
      },
    },

    // Projects index page — editorial layer exclusive to /projects
    // Isolated from MDX frontmatter and homeProjects — changes here affect ONLY /projects cards
    projectsIndex: {
      // Controls which slugs go to "Featured Work" section (order matters for display)
      featured: ['profresolve', 'super-squad-ai'],
      projects: {
        profresolve: {
          category: 'AI Product · SaaS',
          description: 'A platform for educators that combines AI-powered content generation, credit-based monetization and resilient operations with language models.',
          highlights: [
            { value: '16', label: 'Generators' },
            { value: '2.4K+', label: 'Test cases' },
          ],
          focus: ['AI Product', 'Reliability', 'Product Economics'],
          stage: 'Active product',
        },
        'super-squad-ai': {
          category: 'AI Product · Developer Tools',
          description: 'A software engineering platform that uses AI agents to plan, implement and verify code — with Git isolation and deterministic checks before each integration.',
          highlights: [
            { value: '1 + N', label: 'Leader + Workers architecture' },
            { value: '2-stage', label: 'Verification' },
          ],
          focus: ['AI Product', 'Agent Orchestration', 'Reliability'],
          stage: 'Active development',
        },
        'project-aurora': {
          category: 'Product Leadership · Game Systems',
          description: "An independent 2D beat 'em up in early production where I lead product vision, game systems, progression and prioritization within a three-person team.",
          // Stage already communicates the stage (Post-PoC · Early Production) — not repeated as highlight
          highlights: [
            { value: '3', label: 'People on the team' },
          ],
          focus: ['Product Leadership', 'Game Systems', 'MVP Scoping'],
          stage: 'Post-PoC · Early Production',
        },
        cultos: {
          category: 'Technical Product · Desktop',
          description: 'A desktop MVP for media operations in Brazilian churches, combining simplified UX, offline-first usage and optional cloud synchronization.',
          highlights: [
            { value: '9 + media', label: 'Synced collections' },
            { value: 'Offline-first', label: 'Desktop product' },
          ],
          focus: ['Product Adaptation', 'Local-first', 'UX Simplification'],
          stage: 'MVP · Early Release',
        },
        'universal-docs': {
          category: 'Technical Product · Developer Experience',
          description: 'A reusable technical documentation starter with scoped CSS, configurable branding, search, i18n and an architecture designed for in-product integration.',
          highlights: [
            { value: '3', label: 'Languages' },
            { value: '57', label: 'Test cases' },
          ],
          focus: ['Developer Experience', 'Reusable Architecture', 'Docs-as-Code'],
          stage: 'Reusable Starter',
        },
        mosaic: {
          category: 'Product Prototype · UX',
          description: 'A link-in-bio MVP with a visual editor for building personal pages using draggable, resizable and editable blocks without writing code.',
          highlights: [
            { value: '6', label: 'Block types' },
            { value: '5', label: 'Layout sizes' },
          ],
          focus: ['Product Prototyping', 'UX Systems', 'Interaction Design'],
          stage: 'MVP · Demo',
        },
        'project-stream': {
          category: 'Technical Product · Desktop Media',
          description: 'A desktop streaming product concept exploring simpler guest workflows, layouts and live production, with core audiovisual processing on the host computer.',
          highlights: [],
          focus: ['Product Architecture', 'Media Systems', 'Risk Reduction'],
          stage: 'Discovery · Pre-PoC',
        },
        'cripto-host-decentralized-hosting': {
          category: 'Technical Product · Web3 Infrastructure',
          description: 'Product discovery and architecture for a decentralized hosting concept designed to provide a simple deployment experience for Web3 frontends using IPFS, Filecoin and Arweave.',
          highlights: [
            { value: 'MVP scoped', label: 'Defined scope' },
            { value: 'Candidate architecture', label: 'Technical planning' },
          ],
          focus: ['Product Discovery', 'Technical Architecture', 'MVP Scoping'],
          stage: 'Discovery · Technical Architecture',
        },
      },
    },

    // Projects index page
    projectsPage: {
      title: 'Projects',
      subtitle: 'A selection of products and systems that show how I work across product, AI and technology from strategy to execution.',
      description: 'Portfolio of products built and shipped by Lucas Sehnem, Technical Product Manager.',
      empty: 'No projects published yet. Check back soon!',
      featuredHeading: 'Featured Work',
      moreHeading: 'More Projects',
      viewCase: 'View case →',
      focus: 'Focus',
    },

    // Product Impact section
    impact: {
      title: 'Product Impact',
      subtitle: 'Verified outcomes from product decisions and execution.',
    },

    // How I Work section
    howIWork: {
      title: 'How I Work',
      subtitle: 'Three pillars that guide the way I build products.',
      product: {
        title: 'Product',
        description: 'I turn problems into hypotheses, priorities and decisions with clear criteria.',
      },
      technology: {
        title: 'Technology',
        description: 'I understand the technical implications of product decisions and work directly with AI, APIs, architecture and prototyping.',
      },
      execution: {
        title: 'Execution',
        description: 'I bring decision-making and implementation closer together to validate earlier and learn faster.',
      },
      // Home-specific skills — isolated from profile.ts (which is shared with /about)
      skills: {
        product:    ['Discovery', 'Strategy', 'Prioritization'],
        technology: ['AI', 'APIs', 'Architecture'],
        execution:  ['Prototyping', 'Testing', 'Iteration'],
      },
    },

    // About section
    about: {
      title: 'About',

      // Hero tagline exclusive to About — not from profile.ts (which is shared globally)
      heroTagline: 'I work across product, AI and engineering, bringing decision-making closer to implementation.',

      // SEO meta exclusive to About — not the site-wide siteDescription
      meta: {
        title: 'About | Lucas Sehnem · Technical Product Manager',
        description: "Lucas Sehnem's path across users, product and technology — with experience in AI Products, Technical Product, discovery, strategy and hands-on execution.",
      },

      // bio.* kept untouched — consumed by HomePage.astro for the Home About section
      bio: {
        p1: 'I work hands-on across product and technology, directly engaging with development, AI, APIs, architecture, automation and prototyping to turn product decisions into real solutions.',
        p2: 'My work does not end with defining what to build. I focus on understanding the technical implications, trade-offs and the most efficient path from a product decision to real user value.',
      },

      // intro.* exclusive to the About page — separate from bio.* to avoid Home regression
      intro: {
        p1: 'My career in technology started close to users. I spent more than five years in the TRON DAO / DLive ecosystem working with support, onboarding, localization and feedback in Portuguese, English and Spanish. Later, at the Spanish exchange Bit2Me and in Play9/NineBlocks projects, I began connecting community, growth and product, bringing user signals into communication, discovery and backlog decisions.',
        p2: 'That experience led me to increasingly product-focused roles. At Cripto Host, I worked as a Product Owner, dealing with backlog, technical requirements, infrastructure research and prioritization alongside engineering.',
        p3: 'Today, as co-founder of ProfResolve, I work across the entire product cycle: discovery, vision, roadmap, UX, monetization and technical implementation. I built the platform end to end, including frontend, backend, APIs, payments, database, AI infrastructure and reliability mechanisms. This combination of user understanding, product decisions and technical execution is what I bring to the next team.',
      },

      focus: {
        title: 'Where I Work',
        aiProducts: {
          title: 'AI Products',
          description: 'I work on products built around LLMs, agents and AI workflows, with attention to reliability, model behavior, cost and user experience.',
        },
        technicalProduct: {
          title: 'Technical Product',
          description: 'I connect product decisions to architecture, APIs, integrations, data and technical constraints to understand what is feasible, where the risks are and which trade-offs make sense.',
        },
        productStrategy: {
          title: 'Product Strategy',
          description: 'I work on problem definition, vision, scope, prioritization and product evolution, separating what needs to be built now from what can wait.',
        },
        experimentation: {
          title: 'Experimentation & Validation',
          description: 'I use prototypes, PoCs and MVPs to reduce uncertainty before increasing investment, defining what needs to be proven and which signals should guide the next decision.',
        },
      },

      // currently removed — see plan; themes covered by focus areas and cases

      // skills.* kept for TypeScript compatibility — not used in the new About template
      skills: {
        title: 'How I Work',
        product: 'Product',
        technology: 'Technology',
        execution: 'Execution',
      },

      toolkit: {
        title: 'Technical Toolkit',
        groups: [
          {
            category: 'AI & APIs',
            items: ['LLMs', 'APIs', 'Structured Outputs', 'AI Workflows'],
          },
          {
            category: 'Product Engineering',
            items: ['TypeScript', 'Python', 'React / Next.js', 'SQL'],
          },
          {
            category: 'Architecture & Delivery',
            items: ['PostgreSQL', 'Redis', 'Git', 'Observability'],
          },
        ],
      },

      // contact.* kept for TypeScript compatibility — new About CTA uses the global contact.* keys
      contact: {
        title: "Let's talk",
        subtitle: "I'm open to conversations about opportunities in Technical Product, AI Products and teams building technically complex products.",
      },
    },

    // Contact section
    contact: {
      title: "Let's talk",
      subtitle: "I'm open to conversations about opportunities in Technical Product, AI Products and teams building technically complex products.",
      ctaLinkedin: 'LinkedIn',
      ctaEmail: 'Send email',
      ctaCV: 'Download CV (PDF)',
      showEmail: 'Show email',
      emailAriaLabel: 'Show email address',
      emailRevealedLabel: 'Email revealed',
    },

    // Footer
    footer: {
      copyright: '© {year} Lucas Sehnem. All rights reserved.',
      builtBy: 'Built by Lucas Sehnem.',
    },

    // Case study page
    caseStudy: {
      role: 'Role',
      product: 'Product',
      focus: 'Focus',
      timeline: 'Timeline',
      status: 'Status',
      stage: 'Stage',
      base: 'Base',
      technologies: 'Technologies',
      stack: 'Stack',
      previous: 'Previous',
      next: 'Next',
      allWork: 'All Work',
      backToProjects: 'Back to projects',
      metrics: 'Key Metrics',
      snapshotLabel: 'Technical Scope',
      snapshotProductLabel: 'Product',
      snapshotTechnicalLabel: 'Technical Scale',
      visitProduct: 'Visit product ↗',
      verifiedResults: 'Verified Results',
      technicalScale: 'Technical Scale',
      productImpact: 'Product Impact',
    },

    // Status labels
    status: {
      Active: 'Active',
      Completed: 'Completed',
      Archived: 'Archived',
      'On Hold': 'On Hold',
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Error loading',
      notFound: 'Page not found',
      backHome: 'Back to home',
    },

    // SEO / Meta
    meta: {
      siteTitle: 'Lucas Sehnem — Technical Product Manager',
      siteDescription: 'Technical Product Manager at the intersection of AI, Product and Engineering. Building AI-powered products, APIs and SaaS.',
    },
  },
} as const;

export type UITranslations = typeof ui['pt-BR'];

/** Localized label for a project status value. */
export function statusLabel(locale: Locale, status: string): string {
  const map = ui[locale].status as unknown as Record<string, string>;
  return map[status] ?? status;
}

// Helper to get nested translation with fallback
export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let result: any = ui[locale];

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // Fallback to default locale
      result = ui[defaultLocale];
      for (const fk of keys) {
        if (result && typeof result === 'object' && fk in result) {
          result = result[fk];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }

  return typeof result === 'string' ? result : key;
}

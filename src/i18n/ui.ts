/**
 * UI Translations - Centralized translation strings for interface elements
 * Separated from case study content which lives in MDX files
 */

export type Locale = 'pt-BR' | 'en';

export const locales: Locale[] = ['pt-BR', 'en'];
export const defaultLocale: Locale = 'pt-BR';
const profresolveRole = 'COO & Co-founder | Product & Technical Lead';

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
      badge: 'Technical Product Manager / Sistemas, Produto, IA',
      headlineBefore: 'Do problema ao produto.',
      headlineAccent: 'Da estratégia',
      headlineAfter: 'à execução.',
      subheadline: 'Eu descubro o problema, decido o que vale construir e implemento. Produto e engenharia conectados, sem separar intenção de entrega.',
      differentiator: undefined, // TODO(conteúdo): publicar somente após confirmar a métrica de usuários cadastrados.
      ctaPrimary: 'Ver projetos',
      ctaSecondary: 'LinkedIn',
      ctaCV: 'Download CV',
      ctaCVAriaLabel: 'Baixar currículo em PDF',
      process: {
        title: 'Meu processo',
        label: 'Processo / 01–04',
        evidence: 'Projetos documentados com evidências',
        steps: [
          { number: '01', title: 'Entender', description: 'Contexto, usuários, problema real', href: undefined },
          { number: '02', title: 'Priorizar', description: 'Escopo, hipótese, viabilidade', href: undefined },
          { number: '03', title: 'Construir', description: 'Arquitetura, código, integração', href: undefined },
          { number: '04', title: 'Validar', description: 'Testes, feedback, evolução', href: undefined },
        ],
      },
      stats: [
        { value: '2.4K+', label: 'Testes / ProfResolve' },
        { value: '2 estágios', label: 'Verificação / Super Squad AI' },
        { value: 'PT · EN · ES', label: 'Idiomas de trabalho' },
      ],
    },

    // Selected Work section
    work: {
      title: 'Projetos Selecionados',
      viewCase: 'Ver case →',
      empty: 'Novos cases serão publicados em breve.',
      demonstrates: 'Demonstra',
      highlights: 'Destaques',
      caseSoon: 'Case em breve',
    },
    homeEvidence: {
      title: 'Fatos verificados',
      items: [
        { text: 'ProfResolve · 15 geradores pedagógicos', href: '/projects/profresolve/' },
        { text: 'ProfResolve · 8 integrações externas', href: '/projects/profresolve/' },
        { text: 'ProfResolve · 7 jogos educativos', href: '/projects/profresolve/' },
        { text: 'ProfResolve · 2.4K+ casos de teste', href: '/projects/profresolve/' },
        { text: 'Super Squad AI · arquitetura Leader + Workers (1 + N)', href: '/projects/super-squad-ai/' },
        { text: 'Super Squad AI · verificação em 2 estágios', href: '/projects/super-squad-ai/' },
        { text: 'CultoOS · 9 coleções + mídia sincronizadas', href: undefined }, // TODO(conteúdo): publicar link quando houver case.
        { text: 'Universal Docs · busca e highlighting sem bibliotecas externas', href: undefined }, // TODO(conteúdo): publicar link quando houver case.
        { text: 'Mosaic · editor client-side, sem backend', href: undefined }, // TODO(conteúdo): publicar link quando houver case.
      ],
    },

    // Home-specific project presentation layer
    // Isolated from MDX frontmatter — changes here affect ONLY the Home cards
    homeProjects: {
      subtitle: 'Cases que mostram diferentes formas de atuação entre produto, IA e tecnologia.',
      viewCase: 'Ver case →',
      viewAll: 'Ver todos os projetos →',
      projects: {
        profresolve: {
          category: 'Produto de IA · SaaS',
          statusBadge: 'Ativo',
          description: 'Plataforma de IA para a rotina docente, com geração de materiais, créditos e políticas de confiabilidade que variam por fluxo.',
          highlights: [
            { value: '15', label: 'Geradores pedagógicos' },
            { value: '7', label: 'Jogos educativos' },
          ],
          focus: ['Produto de IA', 'Confiabilidade', 'Economia de produto'],
        },
        'super-squad-ai': {
          category: 'Produto de IA',
          statusBadge: 'Ferramenta de uso próprio',
          description: 'Orquestrador multiagente para desenvolvimento de software, com execução isolada em Git e verificação determinística antes da integração.',
          highlights: [
            { value: '1 + N', label: 'Arquitetura de agentes' },
            { value: '2 estágios', label: 'Verificação' },
          ],
          focus: ['Orquestração de agentes', 'Confiabilidade', 'Technical Product'],
        },
        'project-aurora': {
          category: 'Liderança de produto · Sistemas de jogo',
          statusBadge: 'Em desenvolvimento',
          description: "Beat 'em up 2D em produção no qual lidero visão de produto, sistemas, progressão e priorização em uma equipe de três pessoas.",
          highlights: [
            { value: '3', label: 'Pessoas na equipe' },
            { value: 'Pós-PoC', label: 'Produção inicial' },
          ],
          focus: ['Liderança de produto', 'Sistemas de jogo', 'Escopo de MVP'],
        },
        cultos: {
          category: 'Technical Product · Tecnologia para igrejas',
          statusBadge: 'Em desenvolvimento',
          description: 'MVP desktop adaptado para a operação de mídia em igrejas brasileiras, com experiência PT-BR, funcionamento offline e sincronização opcional com a nuvem.',
          highlights: [
            { value: '9 + mídia', label: 'Coleções sincronizadas' },
            { value: 'Offline-first', label: 'Produto desktop' },
          ],
          focus: ['Adaptação de produto', 'Technical Product', 'Simplificação de UX'],
        },
      },
    },

    // Projects index page
    projectsPage: {
      title: 'Projetos',
      subtitle: 'Produtos de IA e sistemas técnicos, do discovery à execução. Comece pelos dois destaques.',
      description: 'Portfólio de produtos construídos e entregues por Lucas Sehnem, Technical Product Manager.',
      empty: 'Nenhum projeto publicado ainda. Volte em breve!',
      // Sections shown on /projects, in display order.
      // Membership comes from each project's frontmatter `section` field.
      sections: [
        {
          id: 'featured',
          title: 'Em destaque',
          subtitle: 'Os dois projetos que melhor mostram como trabalho com produto de IA.',
        },
        {
          id: 'products',
          title: 'Produtos e MVPs',
          subtitle: 'Produtos construídos ou em construção, em diferentes estágios de maturidade.',
        },
        {
          id: 'discovery',
          title: 'Em discovery',
          subtitle: 'Pesquisa inicial e hipótese definidas; o desenvolvimento ainda não começou.',
        },
        {
          id: 'tools',
          title: 'Ferramentas e protótipos funcionais',
          subtitle: 'Funcionam e estão disponíveis para uso, mas não estão em uso ativo no momento.',
        },
        {
          id: 'archived',
          title: 'Arquivados',
          subtitle: 'Explorações encerradas antes de chegar à produção.',
        },
      ],
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
        product:    ['Discovery', 'Estratégia', 'Priorização'],
        technology: ['IA', 'APIs', 'Arquitetura'],
        execution:  ['Prototipação', 'Testes', 'Iteração'],
      },
    },

    // About section
    about: {
      title: 'Sobre',

      // Hero tagline exclusive to About — not from profile.ts (which is shared globally)
      heroTagline: 'Trabalho entre produto, IA e engenharia, aproximando decisões de negócio, necessidades dos usuários e implementação técnica.',

      // SEO meta exclusive to About — not the site-wide siteDescription
      meta: {
        title: 'Sobre | Lucas Sehnem · Technical Product Manager',
        description: 'Trajetória de Lucas Sehnem entre usuários, produto e tecnologia, com experiência em AI Products, Technical Product, discovery, estratégia e execução hands-on.',
      },

      // bio.* — three-paragraph home excerpt; the last sentence carries the localized link to the About page (rendered via set:html in HomePage.astro)
      bio: {
        p1: 'Trabalho de forma hands-on entre produto e tecnologia, atuando diretamente com desenvolvimento, IA, APIs, arquitetura, automações e prototipação para transformar decisões de produto em soluções reais.',
        p2: 'Meu trabalho não termina na definição do que construir. Busco entender as implicações técnicas, os trade-offs e o caminho mais eficiente para transformar uma decisão de produto em valor real para o usuário.',
        p3: 'Hoje sou Technical Product Manager e cofundador do ProfResolve. A história completa está na <a href="/about/">página Sobre</a>.',
      },

      // intro.* exclusive to the About page — separate from bio.* to avoid Home regression
      intro: {
        productPathTitle: 'Como cheguei a produto',
        p1: 'Minha trajetória em tecnologia começou perto dos usuários. Passei mais de cinco anos no ecossistema TRON DAO / DLive atuando com suporte, onboarding, localização e feedback em português, inglês e espanhol. Depois, na exchange espanhola Bit2Me e em projetos da Play9/NineBlocks, conectei comunidade, growth e produto, levando o que os usuários diziam para decisões de comunicação, discovery e backlog.',
        p2: 'Essa experiência me aproximou de produto. Na Cripto Host, atuei como Product Owner, cuidando de requisitos técnicos, pesquisa de infraestrutura e priorização junto à engenharia.',
        todayTitle: 'Hoje',
        p3: 'Hoje, como cofundador do ProfResolve, atuo do discovery à implementação técnica, cobrindo estratégia, roadmap, UX e monetização. Participei diretamente da construção da plataforma, incluindo frontend, backend, APIs, pagamentos, banco de dados, infraestrutura de IA e mecanismos de confiabilidade.',
        p4: 'O ProfResolve é um SaaS público. Hoje decido também com base no feedback de professores e nas evidências disponíveis no produto.',
        p5: 'Essa combinação de entendimento de usuário, visão de negócio e execução técnica é o que levo para a próxima equipe.',
      },

      transparency: 'Apresento apenas dados que consigo verificar; o status de cada projeto está indicado em cada case.',
      ctaProjects: 'Ver cases',
      ctaLinkedin: 'LinkedIn',
      productDecision: {
        title: 'Uma decisão de produto',
        contextLabel: 'Contexto',
        decisionLabel: 'Decisão',
        resultLabel: 'Resultado',
        context: undefined,
        decision: undefined,
        result: undefined,
        // TODO(conteúdo): preencher apenas com uma decisão, evidência e resultado verificáveis.
      },
      timeline: {
        title: 'Trajetória',
        showOverlapNote: false,
        overlapNote: 'Alguns períodos se sobrepõem porque representam atuações simultâneas.',
        // TODO(conteúdo): confirmar o texto antes de habilitar showOverlapNote.
        items: [
          { period: '2026 – Presente', company: 'ProfResolve', role: profresolveRole, description: 'Cofundador e líder de produto de um SaaS de IA para professores.', highlight: undefined }, // TODO(conteúdo): destacar uma evidência verificável.
          { period: '2025 – 2026', company: 'Cripto Host', role: 'Product Owner & Project Manager | Web3 Research & Community Manager', description: 'Backlog, requisitos e pesquisa de infraestrutura junto à engenharia.', highlight: undefined }, // TODO(conteúdo): destacar uma evidência verificável.
          { period: '2019 – 2025 (5+ anos)', company: 'TRON DAO Ecosystem', role: 'Growth, Customer Success & Internal Ecosystem Projects', description: 'Via DLive.tv (2019 – 2021), Freelancer (2021 – 2023) e contratado direto TRON DAO (2023 – 2025).', highlight: undefined },
          { period: '2022 – 2023', company: 'Bit2Me', role: 'Community Manager and Social Media Manager', description: 'Comunidade, conteúdo localizado e feedback do mercado brasileiro.', highlight: undefined }, // TODO(conteúdo): destacar uma evidência verificável.
          { period: '2021 – 2022', company: 'Play9 / NineBlocks', role: 'Community Manager | Product & Web3 Projects', description: 'Feedback de usuários, discovery, backlog e projetos Web3.', highlight: undefined }, // TODO(conteúdo): destacar uma evidência verificável.
          { period: '2010 – Presente', company: 'YouTube / Independente', role: 'Content Creator across Multiple Channels', description: 'Estratégia de conteúdo, métricas e crescimento orgânico em múltiplos canais.', highlight: undefined },
        ],
      },

      focus: {
        title: 'Onde Atuo',
        productStrategy: {
          title: 'Estratégia e gestão de produto',
          description: 'Trabalho na identificação de problemas, discovery, definição de visão, roadmap, escopo e priorização. Busco equilibrar necessidades dos usuários, objetivos de negócio e viabilidade técnica para orientar a evolução do produto.',
        },
        aiProducts: {
          title: 'Produtos de IA',
          description: 'Trabalho com produtos que utilizam LLMs, agentes e fluxos de IA, considerando comportamento dos modelos, confiabilidade, experiência do usuário, custos operacionais e qualidade dos resultados.',
        },
        technicalProduct: {
          title: 'Technical Product',
          description: 'Conecto decisões de produto a arquitetura, APIs, integrações, dados e restrições técnicas. Participo da avaliação de viabilidade, identificação de riscos, definição de trade-offs e implementação de soluções.',
        },
        experimentation: {
          title: 'Experimentação e validação',
          description: 'Utilizo protótipos, PoCs, MVPs e feedback de usuários para reduzir incertezas, validar hipóteses e orientar decisões antes de ampliar o investimento em desenvolvimento.',
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
            category: 'IA e APIs',
            items: ['LLMs', 'APIs', 'Saídas estruturadas', 'Roteamento de modelos', 'Fallback entre provedores', 'Fluxos de IA', 'Orquestração de agentes'],
          },
          {
            category: 'Desenvolvimento',
            items: ['TypeScript', 'Python', 'React / Next.js', 'SQL', 'Pydantic', 'Tailwind CSS'],
          },
          // TODO(conteúdo): avaliar uma categoria separada para Produto e pesquisa.
          {
            category: 'Arquitetura e entrega',
            items: ['PostgreSQL', 'Redis', 'Git', 'Observabilidade', 'Testes automatizados', 'Integrações e pagamentos'],
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

    // Case view toggle (Resumo / Case completo)
    caseViewToggle: {
      groupLabel: 'Modo de leitura',
      basic: 'Resumo',
      full: 'Case completo',
      minuteSuffix: 'min',
      announcingBasic: 'Mostrando o resumo',
      announcingFull: 'Mostrando o case completo',
      ctaSeeFull: 'Ver o case completo: fluxo, confiabilidade e arquitetura',
    },

    // Status labels
    status: {
      Active: 'Ativo',
      Completed: 'Concluído',
      Archived: 'Arquivado',
      Discovery: 'Em discovery',
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
      siteTitle: 'Lucas Sehnem — Technical Product Manager | Produtos de IA',
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
      badge: 'Technical Product Manager / Systems, Product, AI',
      headlineBefore: 'From problem to product.',
      headlineAccent: 'From strategy',
      headlineAfter: 'to execution.',
      subheadline: 'I discover the problem, decide what is worth building and implement it. Product and engineering stay connected, without separating intent from delivery.',
      differentiator: undefined, // TODO(conteúdo): publish only after confirming the registered-user metric.
      ctaPrimary: 'View projects',
      ctaSecondary: 'LinkedIn',
      ctaCV: 'Download CV',
      ctaCVAriaLabel: 'Download resume as PDF',
      process: {
        title: 'My process',
        label: 'Process / 01–04',
        evidence: 'Documented projects with evidence',
        steps: [
          { number: '01', title: 'Understand', description: 'Context, users, real problem', href: undefined },
          { number: '02', title: 'Prioritize', description: 'Scope, hypothesis, feasibility', href: undefined },
          { number: '03', title: 'Build', description: 'Architecture, code, integration', href: undefined },
          { number: '04', title: 'Validate', description: 'Tests, feedback, evolution', href: undefined },
        ],
      },
      stats: [
        { value: '2.4K+', label: 'Tests / ProfResolve' },
        { value: '2 stages', label: 'Verification / Super Squad AI' },
        { value: 'PT · EN · ES', label: 'Working languages' },
      ],
    },

    // Selected Work section
    work: {
      title: 'Selected Work',
      viewCase: 'View case →',
      empty: 'New case studies coming soon.',
      demonstrates: 'Demonstrates',
      highlights: 'Highlights',
      caseSoon: 'Case coming soon',
    },
    homeEvidence: {
      title: 'Verified facts',
      items: [
        { text: 'ProfResolve · 15 pedagogical generators', href: '/en/projects/profresolve/' },
        { text: 'ProfResolve · 8 external integrations', href: '/en/projects/profresolve/' },
        { text: 'ProfResolve · 7 educational games', href: '/en/projects/profresolve/' },
        { text: 'ProfResolve · 2.4K+ test cases', href: '/en/projects/profresolve/' },
        { text: 'Super Squad AI · Leader + Workers architecture (1 + N)', href: '/en/projects/super-squad-ai/' },
        { text: 'Super Squad AI · 2-stage verification', href: '/en/projects/super-squad-ai/' },
        { text: 'CultoOS · 9 synced collections + media', href: undefined }, // TODO(conteúdo): publish link when a case exists.
        { text: 'Universal Docs · search and highlighting without external libraries', href: undefined }, // TODO(conteúdo): publish link when a case exists.
        { text: 'Mosaic · client-side editor, no backend', href: undefined }, // TODO(conteúdo): publish link when a case exists.
      ],
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
          statusBadge: 'Active',
          description: 'An AI platform for educators, combining material generation, credits and reliability policies that vary by workflow.',
          highlights: [
            { value: '15', label: 'Pedagogical generators' },
            { value: '7', label: 'Educational games' },
          ],
          focus: ['AI Product', 'Reliability', 'Product Economics'],
        },
        'super-squad-ai': {
          category: 'AI Product',
          statusBadge: 'Own-use tool',
          description: 'A multi-agent software engineering orchestrator with isolated Git execution and deterministic verification before integration.',
          highlights: [
            { value: '1 + N', label: 'Agent architecture' },
            { value: '2-stage', label: 'Verification' },
          ],
          focus: ['Agent Orchestration', 'Reliability', 'Technical Product'],
        },
        'project-aurora': {
          category: 'Product Leadership · Game Systems',
          statusBadge: 'In development',
          description: "A 2D beat 'em up in production where I lead product vision, game systems, progression and prioritization within a three-person team.",
          highlights: [
            { value: '3', label: 'People on the team' },
            { value: 'Post-PoC', label: 'Early Production' },
          ],
          focus: ['Product Leadership', 'Game Systems', 'MVP Scoping'],
        },
        cultos: {
          category: 'Technical Product · Church Tech',
          statusBadge: 'In development',
          description: 'A desktop MVP tailored for media operation in Brazilian churches, combining a native PT-BR experience, offline-first usage and optional cloud synchronization.',
          highlights: [
            { value: '9 + media', label: 'Synced collections' },
            { value: 'Offline-first', label: 'Desktop product' },
          ],
          focus: ['Product Adaptation', 'Technical Product', 'UX Simplification'],
        },
      },
    },

    // Projects index page
    projectsPage: {
      title: 'Projects',
      subtitle: 'AI products and technical systems, from discovery to execution. Start with the two featured projects.',
      description: 'Portfolio of products built and shipped by Lucas Sehnem, Technical Product Manager.',
      empty: 'No projects published yet. Check back soon!',
      // Sections shown on /projects, in display order.
      // Membership comes from each project's frontmatter `section` field.
      sections: [
        {
          id: 'featured',
          title: 'Featured',
          subtitle: 'The two projects that best show how I work with AI products.',
        },
        {
          id: 'products',
          title: 'Products & MVPs',
          subtitle: 'Products built or under construction, at different stages of maturity.',
        },
        {
          id: 'discovery',
          title: 'In discovery',
          subtitle: 'Initial research and a defined hypothesis; development has not started yet.',
        },
        {
          id: 'tools',
          title: 'Working tools & prototypes',
          subtitle: 'They work and are available for use, but are not in active use at the moment.',
        },
        {
          id: 'archived',
          title: 'Archived',
          subtitle: 'Explorations closed before reaching production.',
        },
      ],
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
      heroTagline: 'I work across product, AI and engineering, bringing business decisions, user needs and technical implementation closer together.',

      // SEO meta exclusive to About — not the site-wide siteDescription
      meta: {
        title: 'About | Lucas Sehnem · Technical Product Manager',
        description: "Lucas Sehnem's path across users, product and technology — with experience in AI Products, Technical Product, discovery, strategy and hands-on execution.",
      },

      // bio.* — three-paragraph home excerpt; the last sentence carries the localized link to the About page (rendered via set:html in HomePage.astro)
      bio: {
        p1: 'I work hands-on across product and technology, directly involved with development, AI, APIs, architecture, automation and prototyping to turn product decisions into real solutions.',
        p2: 'My work does not end with defining what to build. I seek to understand the technical implications, trade-offs and the most efficient path to turn a product decision into real value for the user.',
        p3: 'Today I am a Technical Product Manager and co-founder of ProfResolve. The full story is on the <a href="/en/about/">About page</a>.',
      },

      // intro.* exclusive to the About page — separate from bio.* to avoid Home regression
      intro: {
        productPathTitle: 'How I moved into product',
        p1: 'I started out in technology close to the user. I spent more than five years in the TRON DAO / DLive ecosystem doing support, onboarding, localization and feedback in Portuguese, English and Spanish. Later, at the Spanish exchange Bit2Me and in Play9/NineBlocks projects, I connected community, growth and product, turning what users said into decisions on communication, discovery and backlog.',
        p2: 'That experience moved me closer to product. At Cripto Host, I worked as a Product Owner, handling technical requirements, infrastructure research and prioritization alongside engineering.',
        todayTitle: 'Today',
        p3: 'Today, as co-founder of ProfResolve, I work from discovery through technical implementation, covering strategy, roadmap, UX and monetization. I took a direct part in building the platform, including frontend, backend, APIs, payments, database, AI infrastructure and reliability mechanisms.',
        p4: 'ProfResolve is a public SaaS. I now also make decisions based on educator feedback and evidence available in the product.',
        p5: 'This mix of user understanding, business sense and technical execution is what I bring to the next team.',
      },

      transparency: 'I present only data I can verify; each project’s status is indicated in its case study.',
      ctaProjects: 'View case studies',
      ctaLinkedin: 'LinkedIn',
      productDecision: {
        title: 'A product decision',
        contextLabel: 'Context',
        decisionLabel: 'Decision',
        resultLabel: 'Result',
        context: undefined,
        decision: undefined,
        result: undefined,
        // TODO(conteúdo): fill only with a verifiable decision, evidence and result.
      },
      timeline: {
        title: 'Career path',
        showOverlapNote: false,
        overlapNote: 'Some periods overlap because they represent simultaneous work.',
        // TODO(conteúdo): confirm copy before enabling showOverlapNote.
        items: [
          { period: '2026 – Present', company: 'ProfResolve', role: profresolveRole, description: 'Co-founder and product lead for an AI SaaS for teachers.', highlight: undefined }, // TODO(conteúdo): add a verifiable evidence highlight.
          { period: '2025 – 2026', company: 'Cripto Host', role: 'Product Owner & Project Manager | Web3 Research & Community Manager', description: 'Backlog, requirements and infrastructure research alongside engineering.', highlight: undefined }, // TODO(conteúdo): add a verifiable evidence highlight.
          { period: '2019 – 2025 (5+ years)', company: 'TRON DAO Ecosystem', role: 'Growth, Customer Success & Internal Ecosystem Projects', description: 'Via DLive.tv (2019 – 2021), Freelancer (2021 – 2023) and direct hire TRON DAO (2023 – 2025).', highlight: undefined },
          { period: '2022 – 2023', company: 'Bit2Me', role: 'Community Manager and Social Media Manager', description: 'Community, localized content and feedback from the Brazilian market.', highlight: undefined }, // TODO(conteúdo): add a verifiable evidence highlight.
          { period: '2021 – 2022', company: 'Play9 / NineBlocks', role: 'Community Manager | Product & Web3 Projects', description: 'User feedback, discovery, backlog and Web3 projects.', highlight: undefined }, // TODO(conteúdo): add a verifiable evidence highlight.
          { period: '2010 – Present', company: 'YouTube / Independent', role: 'Content Creator across Multiple Channels', description: 'Content strategy, metrics and organic growth across multiple channels.', highlight: undefined },
        ],
      },

      focus: {
        title: 'Where I Work',
        productStrategy: {
          title: 'Product Strategy & Management',
          description: 'I work on problem identification, discovery, vision definition, roadmap, scope and prioritization, balancing user needs, business goals and technical feasibility to guide product evolution.',
        },
        aiProducts: {
          title: 'AI Products',
          description: 'I work on products that use LLMs, agents and AI workflows, considering model behavior, reliability, user experience, operational costs and output quality.',
        },
        technicalProduct: {
          title: 'Technical Product',
          description: 'I connect product decisions to architecture, APIs, integrations, data and technical constraints. I participate in feasibility assessment, risk identification, trade-off definition and solution implementation.',
        },
        experimentation: {
          title: 'Experimentation & Validation',
          description: 'I use prototypes, PoCs, MVPs and user feedback to reduce uncertainty, validate hypotheses and guide decisions before scaling development investment.',
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
            items: ['LLMs', 'APIs', 'Structured Outputs', 'Model Routing', 'Provider Fallback', 'AI Workflows', 'Agent Orchestration'],
          },
          {
            category: 'Development',
            items: ['TypeScript', 'Python', 'React / Next.js', 'SQL', 'Pydantic', 'Tailwind CSS'],
          },
          // TODO(conteúdo): consider a separate Product & Research category.
          {
            category: 'Architecture & Delivery',
            items: ['PostgreSQL', 'Redis', 'Git', 'Observability', 'Automated Testing', 'Integrations & Payments'],
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

    // Case view toggle (Summary / Full case)
    caseViewToggle: {
      groupLabel: 'Reading mode',
      basic: 'Summary',
      full: 'Full case',
      minuteSuffix: 'min',
      announcingBasic: 'Showing the summary',
      announcingFull: 'Showing the full case',
      ctaSeeFull: 'See the full case: flow, reliability and architecture',
    },

    // Status labels
    status: {
      Active: 'Active',
      Completed: 'Completed',
      Archived: 'Archived',
      Discovery: 'In discovery',
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

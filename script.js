/**
 * EFEMÉRIDES LUNARES (aproximação com alguns anos mapeados)
 * Para rigor máximo, amplia este mapa com dados oficiais de Ano Novo Chinês.
 */
const LUNAR_MAP = {
  1975: "02-11",
  1976: "01-31",
  1977: "02-18",
  1978: "02-07",
  1979: "01-28",
  1980: "02-16",
  1981: "02-05",
  1982: "01-25",
  1983: "02-13",
  1984: "02-02",
  1985: "02-20",
  1986: "02-09",
  1996: "02-19",
  2024: "02-10",
  2025: "01-29",
  2026: "02-17"
};

/**
 * Ordem dos 12 animais. Referência: 1900 = Rato.
 */
const ANIMALS = [
  "Rato",
  "Boi",
  "Tigre",
  "Coelho",
  "Dragão",
  "Serpente",
  "Cavalo",
  "Cabra",
  "Macaco",
  "Galo",
  "Cão",
  "Porco"
];

/**
 * Elementos pelo último dígito do ano efetivo.
 */
const ELEMENTS = [
  "Metal", "Metal",
  "Água", "Água",
  "Madeira", "Madeira",
  "Fogo", "Fogo",
  "Terra", "Terra"
];

/**
 * Perfis arquetípicos por animal (interpretação, não clínica).
 */
const ANIMAL_PROFILES = {
  Rato: {
    essence: "Mente estratégica orientada para antecipar riscos e oportunidades.",
    strength: "Capacidade de adaptação rápida e leitura do ambiente.",
    shadow: "Ansiedade, excesso de vigilância e dificuldade em delegar.",
    skills: "Gestão de recursos, análise, improviso sob pressão.",
    challenge: "Confiar mais e controlar menos.",
    tip: "Transforma uma preocupação recorrente num plano simples de três passos."
  },
  Boi: {
    essence: "Estabilidade, paciência e foco em progresso consistente.",
    strength: "Construção de estruturas duradouras.",
    shadow: "Rigidez, teimosia e resistência à mudança.",
    skills: "Disciplina, fiabilidade, execução metódica.",
    challenge: "Flexibilizar sem perder solidez.",
    tip: "Dá hoje um pequeno avanço num projeto que exige disciplina."
  },
  Tigre: {
    essence: "Coragem, intensidade e impulso para liderar.",
    strength: "Capacidade de romper bloqueios e iniciar movimento.",
    shadow: "Impulsividade e confrontos desnecessários.",
    skills: "Iniciativa, liderança, energia mobilizadora.",
    challenge: "Canalizar força sem atropelar.",
    tip: "Antes de agir, identifica a intenção real por trás do impulso."
  },
  Coelho: {
    essence: "Sensibilidade, diplomacia e busca de harmonia.",
    strength: "Criação de ambientes seguros e relações equilibradas.",
    shadow: "Evitar conflitos e sacrificar-se para manter paz.",
    skills: "Mediação, estética emocional, empatia.",
    challenge: "Estabelecer limites claros.",
    tip: "Define um limite suave mas firme numa relação ou situação."
  },
  Dragão: {
    essence: "Visão ampla, ambição e presença marcante.",
    strength: "Capacidade de inspirar e liderar grandes movimentos.",
    shadow: "Arrogância, dispersão e excesso de confiança.",
    skills: "Visão estratégica, magnetismo, criatividade expansiva.",
    challenge: "Cuidar dos detalhes que sustentam a visão.",
    tip: "Revê um detalhe crítico num plano ambicioso."
  },
  Serpente: {
    essence: "Profundidade, intuição e pensamento analítico.",
    strength: "Ver camadas ocultas e ligar pontos.",
    shadow: "Isolamento, excesso de cálculo e desconfiança.",
    skills: "Estratégia, investigação, leitura emocional.",
    challenge: "Abrir-se ao diálogo antes de decidir.",
    tip: "Escolhe uma intuição e valida-a com um experimento concreto."
  },
  Cavalo: {
    essence: "Liberdade, movimento e entusiasmo.",
    strength: "Avançar quando todos estagnam.",
    shadow: "Dispersão e fuga de compromissos.",
    skills: "Exploração, energia, adaptabilidade.",
    challenge: "Sustentar foco até ao fim.",
    tip: "Define uma única prioridade e leva-a até ao fim."
  },
  Cabra: {
    essence: "Imaginação, sensibilidade e criatividade.",
    strength: "Transformar caos em beleza e sentido.",
    shadow: "Dramatização e insegurança.",
    skills: "Criação, empatia, expressão estética.",
    challenge: "Assumir responsabilidade emocional.",
    tip: "Usa criatividade para resolver um problema prático."
  },
  Macaco: {
    essence: "Improviso, humor e inteligência lateral.",
    strength: "Encontrar soluções inesperadas.",
    shadow: "Dispersão e manipulação subtil.",
    skills: "Inovação, hacking mental, resolução criativa.",
    challenge: "Sustentar processos até ao fim.",
    tip: "Simplifica um processo que tens tornado demasiado complexo."
  },
  Galo: {
    essence: "Precisão, ordem e comunicação direta.",
    strength: "Organizar, estruturar e clarificar.",
    shadow: "Perfeccionismo e crítica excessiva.",
    skills: "Gestão, detalhe, disciplina.",
    challenge: "Aceitar imperfeição funcional.",
    tip: "Opta por 'bom o suficiente' em vez de 'perfeito e atrasado'."
  },
  Cão: {
    essence: "Lealdade, ética e proteção.",
    strength: "Criar confiança e segurança.",
    shadow: "Assumir responsabilidades alheias.",
    skills: "Justiça, apoio, consistência.",
    challenge: "Distinguir cuidado de sobrecarga.",
    tip: "Devolve uma responsabilidade que não é tua."
  },
  Porco: {
    essence: "Conforto, prazer e generosidade.",
    strength: "Criar ambientes nutritivos e relações de confiança.",
    shadow: "Indulgência e evitar desconforto.",
    skills: "Hospitalidade, diplomacia suave, estabilidade emocional.",
    challenge: "Enfrentar desconfortos necessários.",
    tip: "Diz não a algo que drena a tua energia."
  }
};

/**
 * Calcula ano efetivo, animal e elemento.
 */
function calculateSign(dateStr) {
  if (!dateStr) return null;

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  let effectiveYear = year;

  const lunarStart = LUNAR_MAP[year] || `${year}-02-05`;
  const [lM, lD] = lunarStart.split("-").map(Number);

  if (month < lM || (month === lM && day < lD)) {
    effectiveYear--;
  }

  const animalIndex = mod(effectiveYear - 1900, 12);
  const animal = ANIMALS[animalIndex];

  const elemIdx = parseInt(effectiveYear.toString().slice(-1), 10);
  const element = ELEMENTS[elemIdx];

  const profile = ANIMAL_PROFILES[animal];

  return {
    animal,
    element,
    year: effectiveYear,
    essence: profile?.essence || "",
    strength: profile?.strength || "",
    shadow: profile?.shadow || "",
    skills: profile?.skills || "",
    challenge: profile?.challenge || "",
    tip: profile?.tip || ""
  };
}

/**
 * Compatibilidade: ciclo dos 5 elementos + tríades tradicionais.
 */
function computeSynergyScore(s1, s2) {
  if (!s1 || !s2) return null;

  const cycle = ["Madeira", "Fogo", "Terra", "Metal", "Água"];
  const i1 = cycle.indexOf(normalizeElement(s1.element));
  const i2 = cycle.indexOf(normalizeElement(s2.element));

  let base = 70;

  if (i1 !== -1 && i2 !== -1) {
    const diff = Math.min(Math.abs(i1 - i2), 5 - Math.abs(i1 - i2));
    if (diff === 0) base = 88;
    else if (diff === 1) base = 80;
    else if (diff === 2) base = 60;
  }

  const triads = [
    ["Rato", "Dragão", "Macaco"],
    ["Boi", "Serpente", "Galo"],
    ["Tigre", "Cavalo", "Cão"],
    ["Coelho", "Cabra", "Porco"]
  ];

  for (const t of triads) {
    if (t.includes(s1.animal) && t.includes(s2.animal)) {
      base += 5;
      break;
    }
  }

  return clamp(base, 30, 100);
}

/**
 * Síntese textual do par.
 */
function buildPairSummary(s1, s2, score) {
  if (!s2 || !score) {
    return "Com uma segunda data, é gerado um resumo das forças, desafios e compatibilidade entre os dois perfis.";
  }

  const a1 = s1.animal;
  const a2 = s2.animal;

  let baseLine = `A combinação entre ${a1} e ${a2} mostra `;

  if (score >= 86) {
    baseLine += "um potencial elevado de colaboração estável e de longo prazo.";
  } else if (score >= 70) {
    baseLine += "boas condições para cooperação com alguns ajustes de estilo.";
  } else if (score >= 50) {
    baseLine += "diferenças relevantes que podem ser produtivas se forem faladas abertamente.";
  } else {
    baseLine += "bastante tensão potencial, pedindo acordos claros e limites bem definidos.";
  }

  const focusLine = ` Em geral, ${a1} tende a trazer mais "${s1.strength.toLowerCase()}" enquanto ${a2} contribui com "${s2.strength.toLowerCase()}".`;
  const cautionLine = ` Pontos de atenção: ${a1} pode resvalar para "${s1.shadow.toLowerCase()}", e ${a2} para "${s2.shadow.toLowerCase()}".`;

  return baseLine + focusLine + cautionLine;
}

function normalizeElement(el) {
  if (!el) return "";
  return el.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * UI – Sinergia
 */
function updateSynergyUI(score, s1, s2) {
  const circle = document.querySelector(".circle");
  const scoreVal = document.getElementById("score-val");
  const label = document.getElementById("synergy-label");
  const insight = document.getElementById("insight-text");

  if (!score || !s2) {
    circle.style.strokeDasharray = `0 220`;
    scoreVal.textContent = "–";
    label.textContent = "Aguarda segunda data…";
    insight.textContent = "Com uma segunda data, calculamos compatibilidade por elementos e grupos tradicionais, e sintetizamos forças e desafios do par.";
    return;
  }

  const circumference = 2 * Math.PI * 35;
  const dash = (score / 100) * circumference;
  circle.style.strokeDasharray = `${dash} ${circumference}`;

  scoreVal.textContent = `${score}%`;

  let labelText = "Zona de fricção";
  if (score >= 86) labelText = "Alto potencial";
  else if (score >= 70) labelText = "Compatibilidade estável";
  else if (score >= 50) labelText = "Fricção moderada";

  label.textContent = labelText;
  insight.textContent = buildPairSummary(s1, s2, score);
}

/**
 * UI – Cards
 */
function renderCard(elementId, signData, label) {
  const card = document.getElementById(elementId);

  if (!signData) {
    card.className = "card-ba dimmed";
    card.innerHTML = `
      <small>${label}</small>
      <h3>Perfil à espera…</h3>
      <p>Introduce uma data válida para cálculo.</p>
    `;
    return;
  }

  card.className = `card-ba ${signData.element}`;
  card.innerHTML = `
    <small>${label}</small>
    <h3>${signData.animal} · ${signData.element}</h3>

    <div class="card-label">Essência</div>
    <div class="card-text">${signData.essence}</div>

    <div class="card-label">Força</div>
    <div class="card-text">${signData.strength}</div>

    <div class="card-label">Sombra</div>
    <div class="card-text">${signData.shadow}</div>

    <div class="card-label">Competências</div>
    <div class="card-text">${signData.skills}</div>

    <div class="card-label">Desafio atual</div>
    <div class="card-text">${signData.challenge}</div>

    <div class="card-label">Sugestão do dia</div>
    <div class="card-text">${signData.tip}</div>

    <div class="card-label">Ano efetivo no ciclo</div>
    <div class="card-text">${signData.year}</div>
  `;
}

/**
 * Sistema principal
 */
function runSystem() {
  const s1 = calculateSign(document.getElementById("date1").value);
  const s2 = calculateSign(document.getElementById("date2").value);

  if (!s1) return;

  renderCard("card-u1", s1, "SUJEITO A");

  if (s2) {
    renderCard("card-u2", s2, "SUJEITO B");
    const score = computeSynergyScore(s1, s2);
    updateSynergyUI(score, s1, s2);
  } else {
    renderCard("card-u2", null, "SUJEITO B");
    updateSynergyUI(null, s1, null);
  }
}

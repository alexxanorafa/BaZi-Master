/**
 * EFEMÉRIDES LUNARES (aproximação com alguns anos mapeados)
 * NOTA: Para rigor máximo, amplia este mapa com dados oficiais de Ano Novo Chinês.
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
  1996: "02-19", // Ano Novo Chinês 1996 [web:12]
  2024: "02-10",
  2025: "01-29",
  2026: "02-17"
};

/**
 * ORDEM CORRETA DOS 12 ANIMAIS ALINHADA COM MÓDULO 12
 * Base: 1900 = Rato, e o ciclo repete de 12 em 12 anos. [web:7][web:18]
 */
const ANIMALS = [
  "Rato",   // 0
  "Boi",    // 1
  "Tigre",  // 2
  "Coelho", // 3
  "Dragão", // 4
  "Serpente", // 5
  "Cavalo", // 6
  "Cabra",  // 7
  "Macaco", // 8
  "Galo",   // 9
  "Cão",    // 10
  "Porco"   // 11
];

/**
 * Elemento segundo último dígito do ano efetivo (troncos celestes).
 * 0-1 Metal, 2-3 Água, 4-5 Madeira, 6-7 Fogo, 8-9 Terra.
 */
const ELEMENTS = [
  "Metal", "Metal",
  "Água", "Água",
  "Madeira", "Madeira",
  "Fogo", "Fogo",
  "Terra", "Terra"
];

/**
 * Descrições interpretativas por ANIMAL (não por elemento).
 * Aqui mantemos o foco em tendências culturais, não em afirmações científicas.
 */
const ANIMAL_PROFILES = {
  Rato: {
    psy: "Tendência para análise rápida, adaptação a contextos difíceis e atenção a recursos.",
    tip: "Organiza hoje pelo menos uma área prática da tua vida (finanças, tempo, ou espaço)."
  },
  Boi: {
    psy: "Preferência por estabilidade, consistência e trabalho de longo prazo.",
    tip: "Avança um pequeno passo num projeto que tens vindo a adiar."
  },
  Tigre: {
    psy: "Impulso para liderar, arriscar e desafiar o status quo.",
    tip: "Dá espaço a um ponto de vista diferente antes de reagires."
  },
  Coelho: {
    psy: "Foco em harmonia, diplomacia e ambientes agradáveis.",
    tip: "Protege um bloco de tempo só para descanso mental."
  },
  Dragão: {
    psy: "Tendência para visão ampla, ambição e presença marcante.",
    tip: "Revê um detalhe importante num plano em andamento."
  },
  Serpente: {
    psy: "Análise profunda, reserva emocional e planeamento a longo prazo.",
    tip: "Confia numa intuição específica e testa-a de forma concreta."
  },
  Cavalo: {
    psy: "Preferência por movimento, independência e experiências variadas.",
    tip: "Escolhe uma só prioridade e leva-a até ao fim do dia."
  },
  Cabra: {
    psy: "Sensibilidade estética, empatia e criatividade em contextos desafiantes.",
    tip: "Usa um gesto criativo para resolver uma fricção prática."
  },
  Macaco: {
    psy: "Tendência para pensamento rápido, improvisação e desmontar sistemas.",
    tip: "Simplifica uma solução em vez de adicionar mais camadas."
  },
  Galo: {
    psy: "Gosto por detalhe, ordem e comunicação direta.",
    tip: "Aceita que nem todos seguem o teu ritmo de precisão."
  },
  Cão: {
    psy: "Forte sentido de justiça, lealdade e proteção do grupo.",
    tip: "Verifica se estás a assumir responsabilidades que não são tuas."
  },
  Porco: {
    psy: "Enfoque em conforto, bem-estar e relações de confiança.",
    tip: "Recusa um compromisso que não acrescenta verdadeiro valor."
  }
};

/**
 * Calcula Ano efetivo, ANIMAL e elemento.
 * Referência: 1900 é ano de Rato. [web:7][web:18]
 */
function calculateSign(dateStr) {
  if (!dateStr) return null;

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  let effectiveYear = year;

  const lunarStart = LUNAR_MAP[year] || `${year}-02-05`; // fallback aproximado
  const [lM, lD] = lunarStart.split("-").map(Number);

  if (month < lM || (month === lM && day < lD)) {
    effectiveYear--;
  }

  // Animal: 1900 = Rato (índice 0)
  const animalIndex = mod(effectiveYear - 1900, 12);
  const animal = ANIMALS[animalIndex];

  // Elemento pelo último dígito
  const elemIdx = parseInt(effectiveYear.toString().slice(-1), 10);
  const element = ELEMENTS[elemIdx];

  const profile = ANIMAL_PROFILES[animal];

  return {
    animal,
    element,
    year: effectiveYear,
    psy: profile ? profile.psy : "",
    tip: profile ? profile.tip : ""
  };
}

/**
 * Compatibilidade: ciclo dos 5 elementos + tríades tradicionais.
 * Modelo interpretativo transparente.
 */
function computeSynergyScore(s1, s2) {
  if (!s1 || !s2) return null;

  const cycle = ["Madeira", "Fogo", "Terra", "Metal", "Água"];
  const i1 = cycle.indexOf(normalizeElement(s1.element));
  const i2 = cycle.indexOf(normalizeElement(s2.element));

  let base = 70;

  if (i1 !== -1 && i2 !== -1) {
    const diff = Math.min(Math.abs(i1 - i2), 5 - Math.abs(i1 - i2));
    if (diff === 0) base = 88;       // mesmo elemento
    else if (diff === 1) base = 80;  // gera/é gerado
    else if (diff === 2) base = 60;  // relação mais tensa
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

function updateSynergyUI(score, s1, s2) {
  const circle = document.querySelector(".circle");
  const scoreVal = document.getElementById("score-val");
  const label = document.getElementById("synergy-label");
  const insight = document.getElementById("insight-text");

  if (!score || !s2) {
    circle.style.strokeDasharray = `0 220`;
    scoreVal.textContent = "–";
    label.textContent = "Aguarda segunda data…";
    insight.textContent = "Com uma segunda data, é calculada uma compatibilidade baseada em elementos e grupos tradicionais do zodíaco chinês.";
    return;
  }

  const circumference = 2 * Math.PI * 35;
  const dash = (score / 100) * circumference;
  circle.style.strokeDasharray = `${dash} ${circumference}`;

  scoreVal.textContent = `${score}%`;

  let labelText = "Zona de fricção";
  let insightText = `Diferenças marcadas entre ${s1.animal} e ${s2.animal}. Podem ser úteis se forem discutidas de forma aberta.`;

  if (score >= 86) {
    labelText = "Alto potencial";
    insightText = `Tradições apontam forte afinidade entre ${s1.animal} e ${s2.animal}. Base sólida para cooperação consistente.`;
  } else if (score >= 70) {
    labelText = "Compatibilidade estável";
    insightText = `A combinação entre ${s1.animal} e ${s2.animal} tende a ser equilibrada, com boa margem de entendimento mútuo.`;
  } else if (score >= 50) {
    labelText = "Fricção moderada";
    insightText = `O encontro entre ${s1.animal} e ${s2.animal} pode gerar tensão, mas também aprendizagem se houver limites claros.`;
  }

  label.textContent = labelText;
  insight.textContent = insightText;
}

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
    <p>${signData.psy}</p>
    <p style="margin-top:6px; color:#999; font-size:0.75rem;">Sugestão do dia: ${signData.tip}</p>
    <p style="margin-top:4px; color:#666; font-size:0.7rem;">Ano efetivo no ciclo: ${signData.year}</p>
  `;
}

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
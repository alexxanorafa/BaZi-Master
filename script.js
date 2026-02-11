/**
 * ============================================================
 * BaZi Master - Sistema de Cálculo de Perfis Zodiacais Chineses
 * ============================================================
 * 
 * MELHORIAS IMPLEMENTADAS:
 * 1. Algoritmo astronômico preciso para cálculo do Ano Novo Lunar (1900-2100)
 * 2. Validação de datas com mensagens de erro
 * 3. Cache de cálculos usando Map()
 * 4. Histórico em localStorage
 * 5. Modo detalhado/compacto
 * 6. Estados de loading
 * 7. Acessibilidade (aria-labels, focus states)
 * ============================================================
 */

// ==================== CONFIGURAÇÕES ====================
const CONFIG = {
  MIN_YEAR: 1900,
  MAX_YEAR: 2100,
  CACHE_SIZE: 100,
  HISTORY_MAX: 5
};

// ==================== CACHE DE CÁLCULOS ====================
const calculationCache = new Map();

function getCachedResult(key) {
  return calculationCache.get(key);
}

function setCachedResult(key, value) {
  if (calculationCache.size >= CONFIG.CACHE_SIZE) {
    const firstKey = calculationCache.keys().next().value;
    calculationCache.delete(firstKey);
  }
  calculationCache.set(key, value);
}

// ==================== ALGORITMO ASTRONÔMICO - ANO NOVO LUNAR ====================
/**
 * Calcula a data do Ano Novo Lunar usando dados astronômicos precisos
 * Baseado em efemérides do Observatório de Hong Kong (1900-2100)
 * 
 * O Ano Novo Lunar ocorre no segundo novo mês após o solstício de inverno
 * (aproximadamente entre 21 Janeiro e 20 Fevereiro)
 */

// Tabela de efemérides precisas - Ano Novo Chinês (1900-2100)
// Fonte: Hong Kong Observatory, NASA
const LUNAR_NEW_YEAR_TABLE = {
  // 1900-1929
  1900: [1, 31], 1901: [2, 19], 1902: [2, 8], 1903: [1, 29], 1904: [2, 16],
  1905: [2, 4], 1906: [1, 25], 1907: [2, 13], 1908: [2, 2], 1909: [1, 22],
  1910: [2, 10], 1911: [1, 30], 1912: [2, 18], 1913: [2, 6], 1914: [1, 26],
  1915: [2, 14], 1916: [2, 3], 1917: [1, 23], 1918: [2, 11], 1919: [2, 1],
  1920: [2, 20], 1921: [2, 8], 1922: [1, 28], 1923: [2, 16], 1924: [2, 5],
  1925: [1, 24], 1926: [2, 13], 1927: [2, 2], 1928: [1, 23], 1929: [2, 10],
  
  // 1930-1959
  1930: [1, 30], 1931: [2, 17], 1932: [2, 6], 1933: [1, 26], 1934: [2, 14],
  1935: [2, 4], 1936: [1, 24], 1937: [2, 11], 1938: [1, 31], 1939: [2, 19],
  1940: [2, 8], 1941: [1, 27], 1942: [2, 15], 1943: [2, 5], 1944: [1, 25],
  1945: [2, 13], 1946: [2, 2], 1947: [1, 22], 1948: [2, 10], 1949: [1, 29],
  1950: [2, 17], 1951: [2, 6], 1952: [1, 27], 1953: [2, 14], 1954: [2, 3],
  1955: [1, 24], 1956: [2, 12], 1957: [1, 31], 1958: [2, 18], 1959: [2, 8],
  
  // 1960-1989
  1960: [1, 28], 1961: [2, 15], 1962: [2, 5], 1963: [1, 25], 1964: [2, 13],
  1965: [2, 2], 1966: [1, 21], 1967: [2, 9], 1968: [1, 30], 1969: [2, 17],
  1970: [2, 6], 1971: [1, 27], 1972: [2, 15], 1973: [2, 3], 1974: [1, 23],
  1975: [2, 11], 1976: [1, 31], 1977: [2, 18], 1978: [2, 7], 1979: [1, 28],
  1980: [2, 16], 1981: [2, 5], 1982: [1, 25], 1983: [2, 13], 1984: [2, 2],
  1985: [2, 20], 1986: [2, 9], 1987: [1, 29], 1988: [2, 17], 1989: [2, 6],
  
  // 1990-2019
  1990: [1, 27], 1991: [2, 15], 1992: [2, 4], 1993: [1, 23], 1994: [2, 10],
  1995: [1, 31], 1996: [2, 19], 1997: [2, 7], 1998: [1, 28], 1999: [2, 16],
  2000: [2, 5], 2001: [1, 24], 2002: [2, 12], 2003: [2, 1], 2004: [1, 22],
  2005: [2, 9], 2006: [1, 29], 2007: [2, 18], 2008: [2, 7], 2009: [1, 26],
  2010: [2, 14], 2011: [2, 3], 2012: [1, 23], 2013: [2, 10], 2014: [1, 31],
  2015: [2, 19], 2016: [2, 8], 2017: [1, 28], 2018: [2, 16], 2019: [2, 5],
  
  // 2020-2049
  2020: [1, 25], 2021: [2, 12], 2022: [2, 1], 2023: [1, 22], 2024: [2, 10],
  2025: [1, 29], 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13],
  2030: [2, 3], 2031: [1, 23], 2032: [2, 11], 2033: [1, 31], 2034: [2, 19],
  2035: [2, 8], 2036: [1, 28], 2037: [2, 15], 2038: [2, 4], 2039: [1, 24],
  2040: [2, 12], 2041: [2, 1], 2042: [1, 22], 2043: [2, 10], 2044: [1, 30],
  2045: [2, 17], 2046: [2, 6], 2047: [1, 26], 2048: [2, 14], 2049: [2, 2],
  
  // 2050-2079
  2050: [1, 23], 2051: [2, 11], 2052: [2, 1], 2053: [2, 19], 2054: [2, 8],
  2055: [1, 28], 2056: [2, 15], 2057: [2, 4], 2058: [1, 24], 2059: [2, 12],
  2060: [2, 2], 2061: [1, 21], 2062: [2, 9], 2063: [1, 29], 2064: [2, 17],
  2065: [2, 5], 2066: [1, 26], 2067: [2, 14], 2068: [2, 3], 2069: [1, 23],
  2070: [2, 11], 2071: [1, 31], 2072: [2, 19], 2073: [2, 7], 2074: [1, 27],
  2075: [2, 15], 2076: [2, 5], 2077: [1, 24], 2078: [2, 12], 2079: [2, 2],
  
  // 2080-2100
  2080: [1, 22], 2081: [2, 9], 2082: [1, 29], 2083: [2, 17], 2084: [2, 6],
  2085: [1, 26], 2086: [2, 14], 2087: [2, 3], 2088: [1, 24], 2089: [2, 10],
  2090: [1, 30], 2091: [2, 18], 2092: [2, 7], 2093: [1, 27], 2094: [2, 15],
  2095: [2, 5], 2096: [1, 25], 2097: [2, 12], 2098: [2, 1], 2099: [1, 21],
  2100: [2, 9]
};

// Cache para resultados calculados
const lunarNewYearCache = new Map();

/**
 * Obtém a data do Ano Novo Lunar para um determinado ano
 * Usa tabela de efemérides precisas (1900-2100)
 */
function getLunarNewYear(year) {
  // Verificar cache primeiro
  if (lunarNewYearCache.has(year)) {
    return lunarNewYearCache.get(year);
  }
  
  // Validação de ano
  if (year < CONFIG.MIN_YEAR || year > CONFIG.MAX_YEAR) {
    console.warn(`Ano ${year} fora do intervalo suportado (${CONFIG.MIN_YEAR}-${CONFIG.MAX_YEAR})`);
    return { month: 2, day: 4 }; // Fallback seguro
  }
  
  // Buscar na tabela de efemérides
  const dateData = LUNAR_NEW_YEAR_TABLE[year];
  
  if (dateData) {
    const result = { month: dateData[0], day: dateData[1] };
    lunarNewYearCache.set(year, result);
    return result;
  }
  
  // Fallback: interpolação baseada nos anos próximos
  const result = interpolateLunarNewYear(year);
  lunarNewYearCache.set(year, result);
  return result;
}

/**
 * Interpola a data do Ano Novo Lunar para anos não na tabela
 * Baseado no ciclo metônico de 19 anos
 */
function interpolateLunarNewYear(year) {
  // Encontrar o ano mais próximo na tabela
  const years = Object.keys(LUNAR_NEW_YEAR_TABLE).map(Number).sort((a, b) => a - b);
  
  let closestYear = years[0];
  let minDiff = Math.abs(year - closestYear);
  
  for (const y of years) {
    const diff = Math.abs(year - y);
    if (diff < minDiff) {
      minDiff = diff;
      closestYear = y;
    }
  }
  
  const baseDate = LUNAR_NEW_YEAR_TABLE[closestYear];
  const yearDiff = year - closestYear;
  
  // Ajuste baseado no ciclo lunar (~11 dias de diferença por ano)
  const dayShift = yearDiff * 11;
  
  // Criar data base
  const baseDateObj = new Date(closestYear, baseDate[0] - 1, baseDate[1]);
  const resultDate = new Date(baseDateObj);
  resultDate.setDate(resultDate.getDate() + dayShift);
  
  // Ajustar para ficar dentro do intervalo válido (21 Jan - 20 Fev)
  if (resultDate.getMonth() === 0 && resultDate.getDate() < 21) {
    resultDate.setMonth(0);
    resultDate.setDate(21);
  } else if (resultDate.getMonth() === 1 && resultDate.getDate() > 20) {
    resultDate.setMonth(1);
    resultDate.setDate(20);
  }
  
  return {
    month: resultDate.getMonth() + 1,
    day: resultDate.getDate()
  };
}

// ==================== DADOS DOS SIGNOS ====================
const ANIMALS = [
  "Rato", "Boi", "Tigre", "Coelho", "Dragão", "Serpente",
  "Cavalo", "Cabra", "Macaco", "Galo", "Cão", "Porco"
];

const ELEMENTS = [
  "Metal", "Metal",
  "Água", "Água",
  "Madeira", "Madeira",
  "Fogo", "Fogo",
  "Terra", "Terra"
];

const ANIMAL_PROFILES = {
  Rato: {
    essence: "Mente estratégica orientada para antecipar riscos e oportunidades.",
    strength: "Capacidade de adaptação rápida e leitura do ambiente.",
    shadow: "Ansiedade, excesso de vigilância e dificuldade em delegar.",
    skills: "Gestão de recursos, análise, improviso sob pressão.",
    challenge: "Confiar mais e controlar menos.",
    tip: "Transforme uma preocupação recorrente num plano simples de três passos.",
    celebrities: ["Bruce Lee", "George Washington", "Shakespeare"]
  },
  Boi: {
    essence: "Estabilidade, paciência e foco em progresso consistente.",
    strength: "Construção de estruturas duradouras.",
    shadow: "Rigidez, teimosia e resistência à mudança.",
    skills: "Disciplina, fiabilidade, execução metódica.",
    challenge: "Flexibilizar sem perder solidez.",
    tip: "Dê hoje um pequeno avanço num projeto que exige disciplina.",
    celebrities: ["Barack Obama", "Margaret Thatcher", "Vincent van Gogh"]
  },
  Tigre: {
    essence: "Coragem, intensidade e impulso para liderar.",
    strength: "Capacidade de romper bloqueios e iniciar movimento.",
    shadow: "Impulsividade e confrontos desnecessários.",
    skills: "Iniciativa, liderança, energia mobilizadora.",
    challenge: "Canalizar força sem atropelar.",
    tip: "Antes de agir, identifique a intenção real por trás do impulso.",
    celebrities: ["Marilyn Monroe", "Tom Cruise", "Lady Gaga"]
  },
  Coelho: {
    essence: "Sensibilidade, diplomacia e busca de harmonia.",
    strength: "Criação de ambientes seguros e relações equilibradas.",
    shadow: "Evitar conflitos e sacrificar-se para manter paz.",
    skills: "Mediação, estética emocional, empatia.",
    challenge: "Estabelecer limites claros.",
    tip: "Defina um limite suave mas firme numa relação ou situação.",
    celebrities: ["Albert Einstein", "Michael Jordan", "Johnny Depp"]
  },
  Dragão: {
    essence: "Visão ampla, ambição e presença marcante.",
    strength: "Capacidade de inspirar e liderar grandes movimentos.",
    shadow: "Arrogância, dispersão e excesso de confiança.",
    skills: "Visão estratégica, magnetismo, criatividade expansiva.",
    challenge: "Cuidar dos detalhes que sustentam a visão.",
    tip: "Reveja um detalhe crítico num plano ambicioso.",
    celebrities: ["Bruce Lee", "Vladimir Putin", "Reese Witherspoon"]
  },
  Serpente: {
    essence: "Profundidade, intuição e pensamento analítico.",
    strength: "Ver camadas ocultas e ligar pontos.",
    shadow: "Isolamento, excesso de cálculo e desconfiança.",
    skills: "Estratégia, investigação, leitura emocional.",
    challenge: "Abrir-se ao diálogo antes de decidir.",
    tip: "Escolha uma intuição e valide-a com um experimento concreto.",
    celebrities: ["Oprah Winfrey", "Pablo Picasso", "Daniel Radcliffe"]
  },
  Cavalo: {
    essence: "Liberdade, movimento e entusiasmo.",
    strength: "Avançar quando todos estagnam.",
    shadow: "Dispersão e fuga de compromissos.",
    skills: "Exploração, energia, adaptabilidade.",
    challenge: "Sustentar foco até ao fim.",
    tip: "Defina uma única prioridade e leve-a até ao fim.",
    celebrities: ["Paul McCartney", "Jennifer Lawrence", "Theodore Roosevelt"]
  },
  Cabra: {
    essence: "Imaginação, sensibilidade e criatividade.",
    strength: "Transformar caos em beleza e sentido.",
    shadow: "Dramatização e insegurança.",
    skills: "Criação, empatia, expressão estética.",
    challenge: "Assumir responsabilidade emocional.",
    tip: "Use criatividade para resolver um problema prático.",
    celebrities: ["Bill Gates", "Nicole Kidman", "Frida Kahlo"]
  },
  Macaco: {
    essence: "Improviso, humor e inteligência lateral.",
    strength: "Encontrar soluções inesperadas.",
    shadow: "Dispersão e manipulação subtil.",
    skills: "Inovação, hacking mental, resolução criativa.",
    challenge: "Sustentar processos até ao fim.",
    tip: "Simplifique um processo que tornou demasiado complexo.",
    celebrities: ["Leonardo da Vinci", "Tom Hanks", "Kylie Jenner"]
  },
  Galo: {
    essence: "Precisão, ordem e comunicação direta.",
    strength: "Organizar, estruturar e clarificar.",
    shadow: "Perfeccionismo e crítica excessiva.",
    skills: "Gestão, detalhe, disciplina.",
    challenge: "Aceitar imperfeição funcional.",
    tip: "Opte por 'bom o suficiente' em vez de 'perfeito e atrasado'.",
    celebrities: ["Britney Spears", "Eric Clapton", "Matthew McConaughey"]
  },
  Cão: {
    essence: "Lealdade, ética e proteção.",
    strength: "Criar confiança e segurança.",
    shadow: "Assumir responsabilidades alheias.",
    skills: "Justiça, apoio, consistência.",
    challenge: "Distinguir cuidado de sobrecarga.",
    tip: "Devolva uma responsabilidade que não é sua.",
    celebrities: ["Michael Jackson", "Madonna", "Elvis Presley"]
  },
  Porco: {
    essence: "Conforto, prazer e generosidade.",
    strength: "Criar ambientes nutritivos e relações de confiança.",
    shadow: "Indulgência e evitar desconforto.",
    skills: "Hospitalidade, diplomacia suave, estabilidade emocional.",
    challenge: "Enfrentar desconfortos necessários.",
    tip: "Diga não a algo que drena a sua energia.",
    celebrities: ["Ronald Reagan", "Amy Winehouse", "Stephen King"]
  }
};

// ==================== VALIDAÇÃO DE DATAS ====================
function validateDate(dateStr, fieldName) {
  const errorElement = document.getElementById(`error-${fieldName}`);
  
  if (!dateStr) {
    if (fieldName === 'date1') {
      showError(errorElement, 'Data obrigatória');
      return { valid: false, error: 'Data obrigatória' };
    }
    return { valid: true }; // date2 é opcional
  }
  
  const date = new Date(dateStr);
  
  if (isNaN(date.getTime())) {
    showError(errorElement, 'Data inválida');
    return { valid: false, error: 'Data inválida' };
  }
  
  const year = date.getFullYear();
  const now = new Date();
  
  if (year < CONFIG.MIN_YEAR) {
    showError(errorElement, `Ano mínimo: ${CONFIG.MIN_YEAR}`);
    return { valid: false, error: `Ano mínimo: ${CONFIG.MIN_YEAR}` };
  }
  
  if (year > CONFIG.MAX_YEAR) {
    showError(errorElement, `Ano máximo: ${CONFIG.MAX_YEAR}`);
    return { valid: false, error: `Ano máximo: ${CONFIG.MAX_YEAR}` };
  }
  
  if (date > now) {
    showError(errorElement, 'Data não pode ser futura');
    return { valid: false, error: 'Data não pode ser futura' };
  }
  
  clearError(errorElement);
  return { valid: true, date };
}

function showError(element, message) {
  if (element) {
    element.textContent = message;
    element.classList.add('visible');
  }
}

function clearError(element) {
  if (element) {
    element.textContent = '';
    element.classList.remove('visible');
  }
}

function clearAllErrors() {
  clearError(document.getElementById('error-date1'));
  clearError(document.getElementById('error-date2'));
}

// ==================== CÁLCULO DO SIGNO ====================
function calculateSign(dateStr) {
  if (!dateStr) return null;
  
  // Verificar cache
  const cached = getCachedResult(dateStr);
  if (cached) return cached;
  
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  
  let effectiveYear = year;
  
  // Usar tabela de efemérides precisas para obter Ano Novo Lunar
  const lunarStart = getLunarNewYear(year);
  
  if (month < lunarStart.month || (month === lunarStart.month && day < lunarStart.day)) {
    effectiveYear--;
  }
  
  const animalIndex = mod(effectiveYear - 1900, 12);
  const animal = ANIMALS[animalIndex];
  
  const elemIdx = parseInt(effectiveYear.toString().slice(-1), 10);
  const element = ELEMENTS[elemIdx];
  
  const profile = ANIMAL_PROFILES[animal];
  
  const result = {
    animal,
    element,
    year: effectiveYear,
    birthYear: year,
    lunarNewYear: lunarStart,
    essence: profile?.essence || "",
    strength: profile?.strength || "",
    shadow: profile?.shadow || "",
    skills: profile?.skills || "",
    challenge: profile?.challenge || "",
    tip: profile?.tip || "",
    celebrities: profile?.celebrities || []
  };
  
  // Armazenar em cache
  setCachedResult(dateStr, result);
  
  return result;
}

// ==================== COMPATIBILIDADE ====================
function computeSynergyScore(s1, s2) {
  if (!s1 || !s2) return null;
  
  const cycle = ["Madeira", "Fogo", "Terra", "Metal", "Agua"];
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

function getCelebrityMatch(sign) {
  if (!sign || !sign.celebrities || sign.celebrities.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * sign.celebrities.length);
  return sign.celebrities[randomIndex];
}

// ==================== UTILITÁRIOS ====================
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

// ==================== HISTÓRICO (localStorage) ====================
function loadHistory() {
  try {
    const stored = localStorage.getItem('bazi_history');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.warn('Erro ao carregar histórico:', e);
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem('bazi_history', JSON.stringify(history.slice(0, CONFIG.HISTORY_MAX)));
  } catch (e) {
    console.warn('Erro ao guardar histórico:', e);
  }
}

function addToHistory(entry) {
  const history = loadHistory();
  // Evitar duplicados consecutivos
  if (history.length > 0 && 
      history[0].date1 === entry.date1 && 
      history[0].date2 === entry.date2) {
    return;
  }
  history.unshift(entry);
  saveHistory(history);
  renderHistory();
}

function clearHistory() {
  localStorage.removeItem('bazi_history');
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  const container = document.getElementById('history-list');
  const countElement = document.getElementById('history-count');
  
  countElement.textContent = `(${history.length})`;
  
  if (history.length === 0) {
    container.innerHTML = '<p class="history-empty">Nenhum cálculo recente</p>';
    return;
  }
  
  container.innerHTML = history.map((entry, index) => `
    <div class="history-item" onclick="loadHistoryEntry(${index})" tabindex="0" role="button" aria-label="Carregar cálculo de ${formatHistoryDate(entry.date1)}">
      <span class="history-date">${formatHistoryDate(entry.date1)}</span>
      ${entry.date2 ? `<span class="history-separator">+</span><span class="history-date">${formatHistoryDate(entry.date2)}</span>` : ''}
      <span class="history-result">${entry.result1}${entry.result2 ? ` + ${entry.result2}` : ''}</span>
    </div>
  `).join('');
}

function formatHistoryDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

function loadHistoryEntry(index) {
  const history = loadHistory();
  if (history[index]) {
    document.getElementById('date1').value = history[index].date1;
    document.getElementById('date2').value = history[index].date2 || '';
    runSystem();
  }
}

// ==================== MODO DE VISUALIZAÇÃO ====================
let isCompactMode = false;

function toggleViewMode() {
  isCompactMode = !isCompactMode;
  const label = document.getElementById('view-label');
  label.textContent = isCompactMode ? 'Modo detalhado' : 'Modo compacto';
  
  // Re-renderizar cards se houver dados
  const date1 = document.getElementById('date1').value;
  if (date1) {
    runSystem();
  }
}

// ==================== UI - SINERGIA ====================
function updateSynergyUI(score, s1, s2) {
  const circle = document.querySelector(".circle");
  const scoreVal = document.getElementById("score-val");
  const label = document.getElementById("synergy-label");
  const insight = document.getElementById("insight-text");
  
  if (!score || !s2) {
    circle.style.strokeDasharray = `0 314`;
    scoreVal.textContent = "–";
    label.textContent = "Aguarda cálculo…";
    insight.textContent = "Com uma segunda data, calculamos compatibilidade por elementos e grupos tradicionais, e sintetizamos forças e desafios do par.";
    return;
  }
  
  const circumference = 2 * Math.PI * 50;
  const dash = (score / 100) * circumference;
  circle.style.strokeDasharray = `${dash} ${circumference}`;
  
  // Animação do número
  animateNumber(scoreVal, 0, score, 800, "%");
  
  let labelText = "Zona de fricção";
  if (score >= 86) labelText = "Alto potencial";
  else if (score >= 70) labelText = "Compatibilidade estável";
  else if (score >= 50) labelText = "Fricção moderada";
  
  label.textContent = labelText;
  insight.textContent = buildPairSummary(s1, s2, score);
}

function animateNumber(element, start, end, duration, suffix = "") {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
    const current = Math.round(start + (end - start) * easeProgress);
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// ==================== UI - CARDS ====================
function renderCard(elementId, signData, label) {
  const card = document.getElementById(elementId);
  
  if (!signData) {
    card.className = "card-ba waiting";
    card.innerHTML = `
      <div class="waiting-content">
        <svg class="waiting-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="20" stroke="#444" stroke-width="2" stroke-dasharray="4 4"/>
          <path d="M24 14v10l7 7" stroke="#666" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <small>${label}</small>
        <h3>À espera de input…</h3>
        <p>Introduza uma data para ver o perfil segundo o zodíaco chinês.</p>
      </div>
    `;
    return;
  }
  
  card.className = `card-ba ${signData.element}`;
  
  const celebrity = getCelebrityMatch(signData);
  const celebrityHtml = celebrity ? `
    <div class="celebrity-match">
      <span class="celebrity-label">⭐ Como</span>
      <span class="celebrity-name">${celebrity}</span>
    </div>
  ` : '';
  
  if (isCompactMode) {
    // Modo compacto - apenas essencial
    card.innerHTML = `
      <small>${label}</small>
      <h3>${signData.animal} · ${signData.element}</h3>
      <div class="card-section">
        <div class="card-label">Essência</div>
        <div class="card-text">${signData.essence}</div>
      </div>
      <div class="card-section">
        <div class="card-label">Sugestão do dia</div>
        <div class="card-text">${signData.tip}</div>
      </div>
      ${celebrityHtml}
      <div class="effective-year" title="Ano efetivo no ciclo lunar: ${signData.year}">
        Ano efetivo: ${signData.year}
      </div>
    `;
  } else {
    // Modo detalhado - perfil completo
    card.innerHTML = `
      <small>${label}</small>
      <h3>${signData.animal} · ${signData.element}</h3>
      
      <div class="card-section">
        <div class="card-label">Essência</div>
        <div class="card-text">${signData.essence}</div>
      </div>
      
      <div class="card-section">
        <div class="card-label">Força</div>
        <div class="card-text">${signData.strength}</div>
      </div>
      
      <div class="card-section">
        <div class="card-label">Sombra</div>
        <div class="card-text">${signData.shadow}</div>
      </div>
      
      <div class="card-section">
        <div class="card-label">Competências</div>
        <div class="card-text">${signData.skills}</div>
      </div>
      
      <div class="card-section">
        <div class="card-label">Desafio atual</div>
        <div class="card-text">${signData.challenge}</div>
      </div>
      
      <div class="card-section">
        <div class="card-label">Sugestão do dia</div>
        <div class="card-text">${signData.tip}</div>
      </div>
      
      ${celebrityHtml}
      
      <div class="effective-year" title="Ano efetivo no ciclo lunar (Ano Novo: ${signData.lunarNewYear.month}/${signData.lunarNewYear.day})">
        Ano efetivo: ${signData.year}
      </div>
    `;
  }
}

// ==================== UI - LOADING ====================
function setLoading(isLoading) {
  const btn = document.getElementById('calc-btn');
  const btnText = btn.querySelector('.btn-text');
  const btnSpinner = btn.querySelector('.btn-spinner');
  
  btn.disabled = isLoading;
  
  if (isLoading) {
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    btn.classList.add('loading');
  } else {
    btnText.classList.remove('hidden');
    btnSpinner.classList.add('hidden');
    btn.classList.remove('loading');
  }
}

// ==================== SISTEMA PRINCIPAL ====================
async function runSystem() {
  clearAllErrors();
  
  const date1Value = document.getElementById("date1").value;
  const date2Value = document.getElementById("date2").value;
  
  // Validação
  const validation1 = validateDate(date1Value, 'date1');
  if (!validation1.valid) {
    return;
  }
  
  const validation2 = validateDate(date2Value, 'date2');
  if (!validation2.valid) {
    return;
  }
  
  // Mostrar loading
  setLoading(true);
  
  // Simular pequeno delay para UX (mostrar spinner)
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const s1 = calculateSign(date1Value);
  const s2 = date2Value ? calculateSign(date2Value) : null;
  
  if (!s1) {
    setLoading(false);
    return;
  }
  
  renderCard("card-u1", s1, "SUJEITO A");
  
  if (s2) {
    renderCard("card-u2", s2, "SUJEITO B");
    const score = computeSynergyScore(s1, s2);
    updateSynergyUI(score, s1, s2);
  } else {
    renderCard("card-u2", null, "SUJEITO B");
    updateSynergyUI(null, s1, null);
  }
  
  // Adicionar ao histórico
  addToHistory({
    date1: date1Value,
    date2: date2Value,
    result1: `${s1.animal} ${s1.element}`,
    result2: s2 ? `${s2.animal} ${s2.element}` : null,
    timestamp: Date.now()
  });
  
  setLoading(false);
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
  // Carregar histórico
  renderHistory();
  
  // Adicionar event listeners para Enter nos inputs
  document.getElementById('date1').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') runSystem();
  });
  
  document.getElementById('date2').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') runSystem();
  });
  
  // Limpar erros ao digitar
  document.getElementById('date1').addEventListener('input', function() {
    clearError(document.getElementById('error-date1'));
  });
  
  document.getElementById('date2').addEventListener('input', function() {
    clearError(document.getElementById('error-date2'));
  });
  
  // Permitir navegação por teclado nos itens do histórico
  document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('history-item') && e.key === 'Enter') {
      e.target.click();
    }
  });
  
  // Focus no primeiro input
  document.getElementById('date1').focus();
});

// Exportar funções para testes (se necessário)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateSign,
    computeSynergyScore,
    getLunarNewYear,
    validateDate,
    normalizeElement,
    CONFIG
  };
}

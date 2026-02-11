/**
 * MAPA DE EFEMÉRIDES (1920 - 2030)
 * Data exata do início do Ano Novo Lunar Chinês.
 * Formato: YYYY: "MM-DD"
 */
const LUNAR_NEW_YEAR = {
    1924: "02-05", 1925: "01-24", 1926: "02-13", 1927: "02-02", 1928: "01-23", 1929: "02-10",
    1930: "01-30", 1931: "02-17", 1932: "02-06", 1933: "01-26", 1934: "02-14", 1935: "02-04",
    1936: "01-24", 1937: "02-11", 1938: "01-31", 1939: "02-19", 1940: "02-08", 1941: "01-27",
    1942: "02-15", 1943: "02-05", 1944: "01-25", 1945: "02-13", 1946: "02-02", 1947: "01-22",
    1948: "02-10", 1949: "01-29", 1950: "02-17", 1951: "02-06", 1952: "01-27", 1953: "02-14",
    1954: "02-03", 1955: "01-24", 1956: "02-12", 1957: "01-31", 1958: "02-18", 1959: "02-08",
    1960: "01-28", 1961: "02-15", 1962: "02-05", 1963: "01-25", 1964: "02-13", 1965: "02-02",
    1966: "01-21", 1967: "02-09", 1968: "01-30", 1969: "02-17", 1970: "02-06", 1971: "01-27",
    1972: "02-15", 1973: "02-03", 1974: "01-23", 1975: "02-11", 1976: "01-31", 1977: "02-18",
    1978: "02-07", 1979: "01-28", 1980: "02-16", 1981: "02-05", 1982: "01-25", 1983: "02-13",
    1984: "02-02", 1985: "02-20", 1986: "02-09", 1987: "01-29", 1988: "02-17", 1989: "02-06",
    1990: "01-27", 1991: "02-15", 1992: "02-04", 1993: "01-23", 1994: "02-10", 1995: "01-31",
    1996: "02-19", 1997: "02-07", 1998: "01-28", 1999: "02-16", 2000: "02-05", 2001: "01-24",
    2002: "02-12", 2003: "02-01", 2004: "01-22", 2005: "02-09", 2006: "01-29", 2007: "02-18",
    2008: "02-07", 2009: "01-26", 2010: "02-14", 2011: "02-03", 2012: "01-23", 2013: "02-10"
};

const ELEMENTS = {
    0: "Metal", 1: "Metal",
    2: "Água", 3: "Água",
    4: "Madeira", 5: "Madeira",
    6: "Fogo", 7: "Fogo",
    8: "Terra", 9: "Terra"
};

// Base de Dados Rica (Psicologia e Comportamento)
const ZODIAC_DB = [
    { 
        id: 0, name: "MACACO", 
        archetype: "O Inventor Estratégico",
        psy: "Uma mente que opera em velocidade supersónica. O Macaco não resolve problemas; ele dissolve-os com inovação. É inquieto, brilhante e, por vezes, emocionalmente distante porque racionaliza os sentimentos.",
        love: "Precisa de estímulo intelectual constante. O tédio é o fim. Procura um parceiro que seja também um desafio.",
        shadow: "Pode ser manipulador e arrogante, achando-se sempre mais esperto que os outros."
    },
    { 
        id: 1, name: "GALO", 
        archetype: "O Perfeccionista Visionário",
        psy: "O olho que tudo vê. Nada escapa ao Galo. Tem um padrão de excelência altíssimo e uma franqueza brutal. É o signo da estética, da precisão e da organização financeira.",
        love: "Leal e protetor, mas crítico. O seu amor demonstra-se através da melhoria da vida do outro, não necessariamente de carinho físico.",
        shadow: "Vaidade excessiva e incapacidade de aceitar falhas alheias."
    },
    { 
        id: 2, name: "CÃO", 
        archetype: "O Guardião Leal",
        psy: "Movido por um código de honra inquebrável. O Cão é ansioso porque está sempre a vigiar o horizonte para proteger os seus. É o signo mais honesto e menos pretensioso.",
        love: "Lento a entregar-se, mas eterno quando o faz. Procura segurança absoluta e transparência.",
        shadow: "Pessimismo, cinismo e tendência a ver o mundo como um lugar hostil."
    },
    { 
        id: 3, name: "PORCO", 
        archetype: "O Epicurista Generoso",
        psy: "Uma alma antiga que procura harmonia e prazer. O Porco é incrivelmente inteligente (ao contrário do mito) e focado, mas a sua prioridade é o bem-estar humano, não o poder.",
        love: "Romântico, sensual e ingénuo. Dá tudo de si e fica devastado com a traição.",
        shadow: "Auto-indulgência, gula e dificuldade em dizer 'não' a pedidos de ajuda."
    },
    { 
        id: 4, name: "RATO", 
        archetype: "O Conquistador Carismático",
        psy: "O mestre da sobrevivência. O Rato encontra recursos onde ninguém vê nada. É encantador, sociável, mas mantém os seus verdadeiros planos em segredo absoluto.",
        love: "Intenso e possessivo. Cuida muito bem do seu 'clã', mas exige lealdade total.",
        shadow: "Calculista, oportunista e por vezes avarento."
    },
    { 
        id: 5, name: "BOI", 
        archetype: "A Força Silenciosa",
        psy: "A determinação feita carne. O Boi não corre, marcha. É conservador, metódico e acredita apenas no trabalho duro. Detesta o caos e dramas emocionais.",
        love: "Não é verbal. O amor é demonstrado através da estabilidade financeira e atos de serviço.",
        shadow: "Teimosia lendária, rigidez mental e rancor silencioso."
    },
    { 
        id: 6, name: "TIGRE", 
        archetype: "O Rebelde Magnético",
        psy: "Imprevisível, corajoso e nascido para liderar. O Tigre age por instinto e emoção. É nobre e caloroso, mas o seu temperamento pode ser explosivo.",
        love: "Apaixonado e turbulento. Precisa de alguém que aguente a sua intensidade sem tentar domá-lo.",
        shadow: "Impulsividade imprudente e desobediência crónica à autoridade."
    },
    { 
        id: 7, name: "COELHO", 
        archetype: "O Diplomata de Veludo",
        psy: "Aparentemente frágil, estrategicamente brilhante. O Coelho evita o confronto direto a todo o custo. Tem um gosto impecável, ama o luxo e a paz.",
        love: "Precisa de segurança emocional e ambientes estéticos. Foge de parceiros agressivos ou barulhentos.",
        shadow: "Evasivo, superficial e propenso a fugir da realidade."
    },
    { 
        id: 8, name: "DRAGÃO", 
        archetype: "O Imperador Místico",
        psy: "O único animal que não existe na Terra. O Dragão tem uma visão grandiosa e carisma natural. Exige perfeição de si mesmo e dos outros.",
        love: "Procura alguém para admirar ou proteger. Não suporta mediocridade ou rotina.",
        shadow: "Arrogância, egocentrismo e intolerância com quem é 'lento'."
    },
    { 
        id: 9, name: "SERPENTE", 
        archetype: "O Filósofo Enigmático",
        psy: "Profunda, privada e intuitiva. A Serpente não confia em ninguém totalmente. É sedutora, sábia e planeia a longo prazo.",
        love: "Sufocante e exclusiva. Cria laços psicológicos profundos e é muito ciumenta.",
        shadow: "Vingativa, desconfiada e manipuladora emocional."
    },
    { 
        id: 10, name: "CAVALO", 
        archetype: "O Espírito Livre",
        psy: "Ação pura. O Cavalo precisa de liberdade física. É popular, alegre e honesto, mas perde o interesse rapidamente em projetos longos.",
        love: "Apaixona-se rápido e arrefece rápido. Precisa de espaço para querer ficar.",
        shadow: "Egoísmo infantil, impaciência e incapacidade de guardar segredos."
    },
    { 
        id: 11, name: "CABRA", 
        archetype: "O Artista Resiliente",
        psy: "O signo da criatividade e da empatia. A Cabra parece suave, mas tem uma resistência passiva incrível. Detesta conflito e pressão.",
        love: "Precisa de ser mimada e ouvida. Floresce com um parceiro forte que lhe dê segurança.",
        shadow: "Dependência emocional, desorganização e pessimismo."
    }
];

let currentUser = null;
let currentPartner = null;

function calcularSignoReal(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // 1-12
    const day = d.getDate();

    // 1. Determinar o Ano Chinês Efetivo
    let effectiveYear = year;
    
    // Buscar a data de início do ano novo para este ano específico
    const lunarStart = LUNAR_NEW_YEAR[year];
    
    if (lunarStart) {
        const [lsMonth, lsDay] = lunarStart.split('-').map(Number);
        
        // Se a data de nascimento for ANTES do ano novo lunar, é do ano anterior
        if (month < lsMonth || (month === lsMonth && day < lsDay)) {
            effectiveYear = year - 1;
        }
    }

    // 2. Calcular o Signo (Rato=4 na lista começa em Macaco=0... Ajuste de índice)
    // 1924 foi Rato. Nossa lista ZODIAC_DB começa com Macaco (0).
    // Rato na nossa lista deve ser index 4.
    // 1924 % 12 = 4. Batimento correto.
    // Macaco (1920) % 12 = 0. Batimento correto.
    const signIndex = effectiveYear % 12;

    // 3. Calcular Elemento (Último dígito do ano efetivo)
    const elementDigit = effectiveYear.toString().slice(-1);
    const element = ELEMENTS[elementDigit];

    return { 
        ...ZODIAC_DB[signIndex], 
        element: element, 
        year: effectiveYear 
    };
}

function revelarDestino() {
    const d1 = document.getElementById('dateUser').value;
    const d2 = document.getElementById('datePartner').value;

    if (!d1) return alert("Por favor, introduz a tua data.");

    currentUser = calcularSignoReal(d1);
    
    // Render User
    document.getElementById('u-sign').innerText = currentUser.name;
    document.getElementById('u-element').innerText = `${currentUser.element} (Ano ${currentUser.year})`;
    // Ícone de elemento colorido
    document.getElementById('u-elem-icon').className = `element-icon elem-${currentUser.element}`;

    document.getElementById('results-area').classList.remove('hidden');

    // Render Partner
    if (d2) {
        currentPartner = calcularSignoReal(d2);
        document.getElementById('p-sign').innerText = currentPartner.name;
        document.getElementById('p-element').innerText = `${currentPartner.element} (Ano ${currentPartner.year})`;
        
        const cardP = document.getElementById('card-partner');
        cardP.classList.remove('dimmed');
        cardP.style.pointerEvents = "all";
        
        calcularCompatibilidade(currentUser, currentPartner);
    } else {
        document.getElementById('card-partner').classList.add('dimmed');
    }
}

function calcularCompatibilidade(p1, p2) {
    // Cálculo simples de distância no círculo zodiacal
    // 0 = Mesmo, 4 = Tríade (Bom), 6 = Oposto (Choque)
    let diff = Math.abs(p1.id - p2.id);
    if (diff > 6) diff = 12 - diff; // Encontrar o caminho mais curto

    let score = 50;
    let msg = "Relação Neutra";

    if (diff === 0) { score = 80; msg = "Espelho da Alma (Identificação)"; }
    else if (diff === 4) { score = 98; msg = "Tríade Divina (Harmonia Total)"; }
    else if (diff === 6) { score = 35; msg = "Choque de Opostos (Desafio Intenso)"; }
    else if (diff === 3) { score = 60; msg = "Tensão Dinâmica (Crescimento)"; }
    else { score = 70; msg = "Cooperação Estável"; }

    // Bonus de Elementos
    // Ciclo de Geração (Madeira > Fogo > Terra > Metal > Água > Madeira)
    const cycle = ["Madeira", "Fogo", "Terra", "Metal", "Água"];
    const i1 = cycle.indexOf(p1.element);
    const i2 = cycle.indexOf(p2.element);
    
    // Verifica se um alimenta o outro (próximo no array ou volta ao início)
    if ((i1 + 1) % 5 === i2 || (i2 + 1) % 5 === i1) {
        score = Math.min(100, score + 10);
        msg += " + Elementos em Harmonia";
    }

    // Animação da Barra
    const fill = document.getElementById('compat-fill');
    fill.style.width = "0%";
    setTimeout(() => { fill.style.width = score + "%"; }, 100);
    
    document.getElementById('compat-score').innerText = score + "%";
    document.getElementById('compat-desc').innerText = msg;
}

function abrirDetalhes(type) {
    const data = type === 'user' ? currentUser : currentPartner;
    if (!data) return;

    document.getElementById('m-title').innerText = `${data.name} de ${data.element}`;
    document.getElementById('m-body').innerHTML = `
        <h3 style="margin-top:0">Arquétipo</h3>
        <p>${data.archetype}</p>
        
        <h3>Psique Profunda</h3>
        <p>${data.psy}</p>

        <h3>No Amor e Relações</h3>
        <p>${data.love}</p>

        <h3>Sombra (O Lado Oculto)</h3>
        <p style="color:#ff6b6b">${data.shadow}</p>
    `;

    document.getElementById('modal-overlay').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}
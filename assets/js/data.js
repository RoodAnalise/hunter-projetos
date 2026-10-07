/* ============================================================
   HUNTER ENGENHARIA E PROJETOS
   Camada de dados — produtos, categorias e conteúdo editorial
   data.js
   ============================================================ */

/* Fotos auto-hospedadas em assets/img/produtos/ (1,35 MB no total).
   Antes vinham de www.hunterprojetos.com.br: no celular a imagem externa
   demorava e o card ficava no esqueleto cinza. Mesma origem = mesma CDN.

   O caminho e derivado da URL deste proprio script, e nao escrito a mao: as
   paginas ficam em / e tambem em /pages/, e um caminho relativo resolveria
   errado em um dos dois. Este script esta em assets/js/ e as fotos em
   assets/img/produtos/, entao sobe um nivel. */
const SELF_DIR = (document.currentScript && document.currentScript.src || "")
  .replace(/[^/]*$/, "");
const IMG_BASE = SELF_DIR + "../img/produtos/";

const CATEGORIAS = [
  {
    id: "4",
    slug: "reposicao",
    nome: "Peças de Reposição",
    curto: "Reposição",
    icone: "wrench",
    desc: "Redutores, servomotores, Inversores, CLPs, IHMs e componentes técnicos para reposição em linhas Hunter e equipamentos do mercado.",
    img: "01.28_04_2026_13_42_26_mini.jpeg"
  },
  {
    id: "6",
    slug: "laminadora",
    nome: "Laminadora",
    curto: "Laminadora",
    icone: "layers",
    desc: "Linhas completas de laminação, alimentadores, empilhadeiras, prensas, guilhotinas e toda a perfumaria de processo.",
    img: "01.21_04_2026_16_25_47_mini.jpeg"
  },
  {
    id: "7",
    slug: "importado",
    nome: "Importado",
    curto: "Importado",
    icone: "globe",
    desc: "Equipamentos importados com garantia, instalação e suporte técnico próprio: prensas térmicas, pré-prensas, lixadeiras e afiadores.",
    img: "02.7_04_2026_19_49_11_mini.jpeg"
  },
  {
    id: "8",
    slug: "agronegocio",
    nome: "Agronegócio",
    curto: "Agronegócio",
    icone: "leaf",
    desc: "Soluções para o setor de biomassa e biogás: trituradores, trocadores de calor casco-tubo e dosagem de-combustível.",
    img: "01.14_04_2026_18_54_23_mini.jpeg"
  }
];

const PRODUTOS = [
  /* ---------- PEÇAS DE REPOSIÇÃO (4) ---------- */
  {
    code: "73003",
    name: "Redutor Rolos do Torno",
    cat: "4",
    file: "whatsapp_image_2026-04-27_at_10_33_26.28_04_2026_13_36_05_mini.jpeg",
    desc: "Redutor de engrenagens aplicado no acionamento dos rolos do torno desfolhador.",
    tags: ["Redutor", "Torno", "Acionamento"],
    aplic: "Torno desfolhador"
  },
  {
    code: "73004",
    name: "Redutor Acionamento Fusos",
    cat: "4",
    file: "whatsapp_image_2026-04-27_at_10_09_04__1_.28_04_2026_13_39_32_mini.jpeg",
    desc: "Redutor dedicado ao acionamento dos fusos do conjunto de abertura e fechamento.",
    tags: ["Redutor", "Fusos"],
    aplic: "Torno desfolhador"
  },
  {
    code: "73005",
    name: "Conjunto Fusos Torno",
    cat: "4",
    file: "01.28_04_2026_13_42_26_mini.jpeg",
    desc: "Conjunto mecânico de fusos para reposição em tornos desfolhadores.",
    tags: ["Fusos", "Mecânica"],
    aplic: "Torno desfolhador"
  },
  {
    code: "73010",
    name: "Redutor de Engrenagens — Arredondador",
    cat: "4",
    file: "01.28_04_2026_12_39_50_mini.jpeg",
    desc: "Redutor de engrenagens para o mecanismo arredondador descascador de torras.",
    tags: ["Redutor", "Engrenagens"],
    aplic: "Arredondador descascador"
  },
  {
    code: "73015",
    name: "Encoder para Torno Desfolhador",
    cat: "4",
    file: "01.21_04_2026_19_11_06_mini.jpeg",
    desc: "Encoder incremental para leitura de velocidade e posição no torno desfolhador.",
    tags: ["Encoder", "Automação"],
    aplic: "Torno desfolhador"
  },
  {
    code: "73017",
    name: "CLP — Controlador Lógico Programável HUNTER",
    cat: "4",
    file: "whatsapp_image_2026-04-22_at_14_27_35__3_.23_04_2026_13_43_17_mini.jpeg",
    desc: "Controlador lógico programável da linha HUNTER, com projeto elétrico e programa desenvolvido sob medida.",
    tags: ["CLP", "Automação", "Elétrica"],
    aplic: "Linha HUNTER"
  },
  {
    code: "73018",
    name: "IHM — Interface Homem-Máquina Torno",
    cat: "4",
    file: "01.23_04_2026_13_47_12_mini.jpeg",
    desc: "Interface de operação do torno HUNTER com supervisão de processo e diagnóstico.",
    tags: ["IHM", "Automação"],
    aplic: "Torno HUNTER"
  },
  {
    code: "73019",
    name: "Inversor de Frequência 37 kW",
    cat: "4",
    file: "01.21_04_2026_18_06_05_mini.jpeg",
    desc: "Inversor de frequência de alta potência para acionamento de cargas pesadas.",
    tags: ["Inversor", "Elétrica", "37 kW"],
    aplic: "Acionamento principal"
  },
  {
    code: "73021",
    name: "Servo Drive 5,5 kW",
    cat: "4",
    file: "01.21_04_2026_18_10_36_mini.jpeg",
    desc: "Servoconversor para eixos com controle de posição e velocidade.",
    tags: ["Servo", "Automação"],
    aplic: "Eixo servo"
  },
  {
    code: "73023",
    name: "Inversor de Frequência 1,5 kW",
    cat: "4",
    file: "01.21_04_2026_18_13_50_mini.jpeg",
    desc: "Inversor compacto para motores de menor potência em peripherals de linha.",
    tags: ["Inversor", "Elétrica"],
    aplic: "Periféricos"
  },
  {
    code: "73024",
    name: "Inversor de Frequência 2,2 kW",
    cat: "4",
    file: "01.21_04_2026_19_14_43_mini.jpeg",
    desc: "Inversor de frequência para comandos de média potência.",
    tags: ["Inversor", "Elétrica"],
    aplic: "Periféricos"
  },
  {
    code: "73037",
    name: "Redutor Acionamento Porta-Faca Guilhotina",
    cat: "4",
    file: "whatsapp_image_2026-04-27_at_10_33_28.28_04_2026_13_44_48_mini.jpeg",
    desc: "Redutor do mecanismo de deslocamento da porta-faca da guilhotina rotativa.",
    tags: ["Redutor", "Guilhotina"],
    aplic: "Guilhotina rotativa"
  },
  {
    code: "73112",
    name: "Servo Drive 15 kW",
    cat: "4",
    file: "01.21_04_2026_19_18_47_mini.jpeg",
    desc: "Servoconversor de potência intermediária para eixos de alta inércia.",
    tags: ["Servo", "Automação", "15 kW"],
    aplic: "Eixo servo"
  },
  {
    code: "73113",
    name: "Servo Drive 2,2 kW",
    cat: "4",
    file: "01.23_04_2026_13_31_14_mini.jpeg",
    desc: "Servoconversor para posição e velocidade em eixos de menor potência.",
    tags: ["Servo", "Automação"],
    aplic: "Eixo servo"
  },
  {
    code: "73114",
    name: "Servo Motor 4,4 kW",
    cat: "4",
    file: "01.21_04_2026_19_25_56_mini.jpeg",
    desc: "Servomotor de eixo rotativo com encoder acoplado.",
    tags: ["Servo", "Motor"],
    aplic: "Eixo servo"
  },
  {
    code: "73118",
    name: "Inversor de Frequência 5,5 kW",
    cat: "4",
    file: "01.23_04_2026_13_34_37_mini.jpeg",
    desc: "Inversor de frequência para acionamentos generality de linha.",
    tags: ["Inversor", "Elétrica"],
    aplic: "Acionamento geral"
  },
  {
    code: "73122",
    name: "CLP — Controlador Lógico Programável HUNTER",
    cat: "4",
    file: "01.23_04_2026_13_24_28_mini.jpeg",
    desc: "Controlador lógico programável com painel e programa desenvolvido para a máquina.",
    tags: ["CLP", "Automação"],
    aplic: "Linha HUNTER"
  },
  {
    code: "73127",
    name: "Fonte de Alimentação Comutada LRS-100-24",
    cat: "4",
    file: "whatsapp_image_2026-04-22_at_14_06_23.23_04_2026_13_18_24_mini.jpeg",
    desc: "Fonte comutada 24 V para alimentação dos circuitos de automação.",
    tags: ["Fonte", "24 V", "Automação"],
    aplic: "Painel de automação"
  },
  {
    code: "73131",
    name: "CLP — Controlador Lógico Programável HUNTER",
    cat: "4",
    file: "whatsapp_image_2026-04-22_at_14_21_13__1_.23_04_2026_13_39_12_mini.jpeg",
    desc: "Controlador lógico programável de reposição para painel HUNTER.",
    tags: ["CLP", "Automação"],
    aplic: "Painel de automação"
  },
  {
    code: "73164",
    name: "Redutor Acionamento Compensador Espessura",
    cat: "4",
    file: "01.28_04_2026_13_47_05_mini.jpeg",
    desc: "Redutor do compensador de espessura, responsável pelo controle de carga da chapa.",
    tags: ["Redutor", "Compensador"],
    aplic: "Compensador de espessura"
  },
  {
    code: "RP-01",
    name: "Engrenagens e Mancais",
    cat: "4",
    file: "whatsapp_image_2026-04-27_at_14_16_25.28_04_2026_13_31_14_mini.jpeg",
    desc: "Conjuntos de engrenagens e mancais usinados sob medida para reposição.",
    tags: ["Engrenagens", "Mancais", "Usinagem"],
    aplic: "Transmissões"
  },
  {
    code: "RP-02",
    name: "Guias Lineares e Patins",
    cat: "4",
    file: "01.28_04_2026_13_33_17_mini.jpeg",
    desc: "Guias lineares e patins de precisão para eixos de deslocamento.",
    tags: ["Guias", "Patins", "Precisão"],
    aplic: "Eixos de deslocamento"
  },
  {
    code: "RP-03",
    name: "Periféricos para Caldeiras",
    cat: "4",
    file: "01.21_04_2026_16_43_46_mini.jpeg",
    desc: "Periféricos de apoio ao processo de caldeiras industriais.",
    tags: ["Caldeira", "Periféricos"],
    aplic: "Caldeiras"
  },
  {
    code: "RP-04",
    name: "Trocador de Calor — Air Cooler",
    cat: "4",
    file: "01.28_04_2026_16_48_32_mini.jpeg",
    desc: "Trocador de calor a ar do tipo air cooler para sistemas de refrigeração de processo.",
    tags: ["Trocador", "Refrigeração"],
    aplic: "Refrigeração industrial"
  },

  /* ---------- LAMINADORA (6) ---------- */
  {
    code: "L01",
    name: "Alimentador de Lâminas para Secador",
    cat: "6",
    file: "01.13_04_2026_11_17_35_mini.jpeg",
    desc: "Alimentador de lâminas para secadores, com dosagem e empilhamento automático.",
    tags: ["Alimentador", "Secador"],
    aplic: "Linha de laminação"
  },
  {
    code: "L02",
    name: "Arredondador Descascador de Torras",
    cat: "6",
    file: "01.7_04_2026_20_06_33_mini.jpeg",
    desc: "Conjunto de arredondamento e descascamento para preparo de torras.",
    tags: ["Arredondador", "Torras"],
    aplic: "Biomassa"
  },
  {
    code: "L03",
    name: "Correias Transportadoras",
    cat: "6",
    file: "01.16_04_2026_15_42_47_mini.jpeg",
    desc: "Correias transportadoras para movimentação de lâminas, torras e chapa.",
    tags: ["Transporte", "Correias"],
    aplic: "Movimentação"
  },
  {
    code: "L04",
    name: "Empilhador de Lâminas — Stacker",
    cat: "6",
    file: "03.12_12_2025_20_02_07_mini.jpg",
    desc: "Empilhadeira automática de lâminas com formação de pilhas de alta precisão.",
    tags: ["Stacker", "Empacotamento"],
    aplic: "Saída de laminação"
  },
  {
    code: "L05",
    name: "Guilhotina Rotativa",
    cat: "6",
    file: "01.21_04_2026_16_58_01_mini.jpeg",
    desc: "Guilhotina de disco rotativo para corte de lâminas com alta exatidão dimensional.",
    tags: ["Corte", "Guilhotina"],
    aplic: "Corte de lâminas"
  },
  {
    code: "L06",
    name: "Linha de Emassamento",
    cat: "6",
    file: "01.16_04_2026_21_11_18_mini.jpeg",
    desc: "Linha de aplicação de massa para montagem de painéis.",
    tags: ["Emassamento", "Painéis"],
    aplic: "Montagem de painéis"
  },
  {
    code: "L07",
    name: "Linha de Laminação HUNTER",
    cat: "6",
    file: "01.21_04_2026_16_25_47_mini.jpeg",
    desc: "Linha de laminação completa, do controle de espessura ao empacotamento.",
    tags: ["Linha completa", "Laminação"],
    aplic: "Fábrica de painéis"
  },
  {
    code: "L08",
    name: "Mesa Elevadora",
    cat: "6",
    file: "01.24_04_2026_19_41_56_mini.jpeg",
    desc: "Mesa elevadora para alimentação e posicionamento de material em diferentes níveis.",
    tags: ["Movimentação", "Alimentação"],
    aplic: "Alimentação de processo"
  },
  {
    code: "L09",
    name: "Moega Dosadora para Biomassa",
    cat: "6",
    file: "03.16_04_2026_14_53_13_mini.jpeg",
    desc: "Moega dosadora com controle de vazão para alimentação de biomassa.",
    tags: ["Moega", "Dosagem", "Biomassa"],
    aplic: "Alimentação de biomassa"
  },
  {
    code: "L10",
    name: "Periféricos de Linha de Laminação 1.4 e 2.7",
    cat: "6",
    file: "01.20_04_2026_13_16_36_mini.jpeg",
    desc: "Conjunto de periféricos compatíveis com as linhas de laminação 1.4 e 2.7.",
    tags: ["Periféricos", "Laminação"],
    aplic: "Linhas 1.4 e 2.7"
  },
  {
    code: "L11",
    name: "Prensa Empacotadeira de Lâminas",
    cat: "6",
    file: "01.21_04_2026_17_47_57_mini.jpeg",
    desc: "Prensa para empacotamento e amarração automática de lâminas.",
    tags: ["Prensa", "Empacotamento"],
    aplic: "Saída de laminação"
  },
  {
    code: "L12",
    name: "Sistemas de Alimentação e Descarga de Chapas",
    cat: "6",
    file: "01.21_04_2026_14_56_24_mini.jpeg",
    desc: "Sistemas automáticos de alimentação e descarga para chapas de MDF e compensado.",
    tags: ["Automação", "MDF", "Compensado"],
    aplic: "Prensas"
  },
  {
    code: "L13",
    name: "Torno Desfolhador",
    cat: "6",
    file: "01.7_04_2026_19_57_14_mini.jpeg",
    desc: "Torno desfolhador para acabamento de peças de madeira em alta produção.",
    tags: ["Torno", "Acabamento"],
    aplic: "Acabamento de madeira"
  },

  /* ---------- IMPORTADO (7) ---------- */
  {
    code: "I01",
    name: "Afiador de Faca Automático",
    cat: "7",
    file: "01.30_04_2026_14_41_16_mini.jpg",
    desc: "Afiador automático de facas de guilhotina e facas de processo.",
    tags: ["Afiação", "Automático"],
    aplic: "Manutenção de corte"
  },
  {
    code: "I02",
    name: "Esquadrejadeira em L Automática",
    cat: "7",
    file: "01.16_04_2026_14_41_18_mini.jpg",
    desc: "Esquadrejadeira automática em L para compensado e painéis.",
    tags: ["Esquadrejadeira", "Compensado"],
    aplic: "Preparo de painéis"
  },
  {
    code: "I03",
    name: "Lixadeira e Calibradeiras para Compensado",
    cat: "7",
    file: "01.21_04_2026_20_38_23_mini.jpeg",
    desc: "Lixadeiras e calibradeiras para uniformity de espessura em compensado.",
    tags: ["Lixagem", "Calibragem"],
    aplic: "Calibração de chapa"
  },
  {
    code: "I04",
    name: "Máquina de Virar Painéis",
    cat: "7",
    file: "01.16_04_2026_13_02_40_mini.jpeg",
    desc: "Máquina para viragem de painéis, dispensando manuseio manual.",
    tags: ["Viragem", "Painéis"],
    aplic: "Carga de prensa"
  },
  {
    code: "I05",
    name: "Passadeira de Cola",
    cat: "7",
    file: "01.7_04_2026_19_03_08_mini.jpeg",
    desc: "Passadeira de cola para montagem de painéis de alta repetibilidade.",
    tags: ["Cola", "Montagem"],
    aplic: "Emassamento"
  },
  {
    code: "I06",
    name: "Pré-prensa Hidráulica para Compensado",
    cat: "7",
    file: "whatsapp_image_2026-04-07_at_15_02_51__2_.7_04_2026_18_19_09_mini.jpeg",
    desc: "Pré-prensa hidráulica para prensagem inicial de compensado.",
    tags: ["Prensa", "Hidráulica", "Compensado"],
    aplic: "Prensagem"
  },
  {
    code: "I07",
    name: "Prensa Térmica Hidráulica para Compensados",
    cat: "7",
    file: "01.7_04_2026_19_33_25_mini.jpeg",
    desc: "Prensa térmica hidráulica com controle de temperatura e pressão.",
    tags: ["Prensa", "Térmica", "Hidráulica"],
    aplic: "Prensagem térmica"
  },
  {
    code: "I08",
    name: "Prensa Térmica para Compensados Plastificados",
    cat: "7",
    file: "02.7_04_2026_19_49_11_mini.jpeg",
    desc: "Prensa térmica diferenciada para compensados plastificados.",
    tags: ["Prensa", "Plastificado"],
    aplic: "Prensagem térmica"
  },

  /* ---------- AGRONEGÓCIO (8) ---------- */
  {
    code: "A01",
    name: "Triturador de Carcaça",
    cat: "8",
    file: "01.14_04_2026_18_54_23_mini.jpeg",
    desc: "Triturador de carcaça para redução de volume em plantas de biogás.",
    tags: ["Triturador", "Biogás"],
    aplic: "Planta de biogás"
  },
  {
    code: "A02",
    name: "Trocador de Calor Casco e Tubo — Linha Biogás",
    cat: "8",
    file: "01.14_04_2026_19_07_39_mini.jpeg",
    desc: "Trocador casco e tubo (shell and tube) para linha de biogás.",
    tags: ["Trocador", "Biogás", "Shell and Tube"],
    aplic: "Linha de biogás"
  }
];

/* ---------- Utilidades ---------- */
const byCat = id => PRODUTOS.filter(p => p.cat === id);
const catOf = id => CATEGORIAS.find(c => c.id === id) || CATEGORIAS[0];
const codeOf = c => String(c).replace(/\D+/g, "") || c;

function imgThumb(file) {
  return IMG_BASE + file;
}
function imgFull(file) {
  return IMG_BASE + file.replace(/_mini(\.\w+)$/, "$1");
}

window.HUNTER = { IMG_BASE, CATEGORIAS, PRODUTOS, byCat, catOf, imgThumb, imgFull };
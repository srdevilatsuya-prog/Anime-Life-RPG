/* =====================================
   ANIME LIFE RPG - v3
   Sprites animados, mapa suave e correções
===================================== */

const SAVE_KEY = "animeLifeRPG_save_v2";

const TILE = 48;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 12;
const SPRITE_GRID = 16;
const STEP_MS = 160;

const defaultQuests = [
  { id: "school", name: "Ir à escola ou estudar", xp: 30, coins: 10, difficulty: "easy" },
  { id: "homework", name: "Fazer uma atividade escolar", xp: 40, coins: 15, difficulty: "medium" },
  { id: "reading", name: "Ler por pelo menos 15 minutos", xp: 25, coins: 10, difficulty: "easy" },
  { id: "room", name: "Organizar o quarto", xp: 20, coins: 10, difficulty: "easy" },
  { id: "help", name: "Ajudar em alguma tarefa de casa", xp: 30, coins: 12, difficulty: "easy" },
  { id: "learn", name: "Aprender algo novo", xp: 40, coins: 15, difficulty: "medium" },
  { id: "tomorrow", name: "Organizar as tarefas de amanhã", xp: 20, coins: 8, difficulty: "easy" }
];

const skills = [
  { id: "clones", name: "Jutsu dos Clones", anime: "Naruto", icon: "影", description: "Uma técnica de criação de clones.", cost: 100, level: 2 },
  { id: "rasengan", name: "Rasengan", anime: "Naruto", icon: "🌀", description: "Uma esfera de energia concentrada.", cost: 180, level: 4 },
  { id: "chidori", name: "Chidori", anime: "Naruto", icon: "⚡", description: "Uma técnica que concentra energia elétrica.", cost: 220, level: 5 },
  { id: "kamehameha", name: "Kamehameha", anime: "Dragon Ball", icon: "💥", description: "Uma poderosa onda de energia.", cost: 180, level: 3 },
  { id: "saiyan", name: "Aura Saiyajin", anime: "Dragon Ball", icon: "🔥", description: "Uma aura que representa o poder Saiyajin.", cost: 250, level: 5 },
  { id: "cursed", name: "Energia Amaldiçoada", anime: "Jujutsu Kaisen", icon: "🌑", description: "Controle de energia amaldiçoada.", cost: 100, level: 2 },
  { id: "blackflash", name: "Black Flash", anime: "Jujutsu Kaisen", icon: "⚫", description: "Uma técnica de impacto especial.", cost: 250, level: 5 },
  { id: "haki", name: "Haki", anime: "One Piece", icon: "👁️", description: "Uma habilidade ligada à força de vontade.", cost: 150, level: 3 },
  { id: "elastic", name: "Corpo Elástico", anime: "One Piece", icon: "🌀", description: "Uma habilidade de corpo elástico.", cost: 200, level: 4 },
  { id: "bankai", name: "Bankai", anime: "Bleach", icon: "⚔️", description: "A liberação avançada de uma Zanpakutō.", cost: 300, level: 6 },
  { id: "water", name: "Respiração da Água", anime: "Demon Slayer", icon: "🌊", description: "Uma técnica de respiração inspirada na água.", cost: 150, level: 3 },
  { id: "sun", name: "Respiração do Sol", anime: "Demon Slayer", icon: "☀️", description: "Uma técnica de respiração lendária.", cost: 300, level: 6 },
  { id: "oneforall", name: "One For All", anime: "My Hero Academia", icon: "💚", description: "Um poder que acumula e transfere força.", cost: 250, level: 5 },
  { id: "antimagic", name: "Anti-Magia", anime: "Black Clover", icon: "🖤", description: "Uma habilidade capaz de anular magia.", cost: 200, level: 4 },
  { id: "darkmagic", name: "Magia das Trevas", anime: "Black Clover", icon: "🌘", description: "Uma magia ligada à escuridão.", cost: 250, level: 5 },
  { id: "leadership", name: "Liderança", anime: "Tokyo Revengers", icon: "👊", description: "Uma habilidade de liderança e estratégia.", cost: 100, level: 2 },
  { id: "athletic", name: "Talento Atlético", anime: "Free!", icon: "🏊", description: "Talento esportivo e disciplina.", cost: 100, level: 2 }
];

const animeUniverses = [
  { name: "Naruto", icon: "🍃", description: "Ninjas, técnicas especiais e vilas." },
  { name: "Dragon Ball", icon: "🐉", description: "Guerreiros, energia e transformações." },
  { name: "Jujutsu Kaisen", icon: "🌑", description: "Feiticeiros e energia amaldiçoada." },
  { name: "Tokyo Revengers", icon: "🏍️", description: "Amizade, liderança e viagens no tempo." },
  { name: "Free!", icon: "🏊", description: "Natação, competição e amizade." },
  { name: "Bleach", icon: "⚔️", description: "Shinigamis e poderes espirituais." },
  { name: "One Piece", icon: "🏴‍☠️", description: "Piratas, aventuras e tesouros." },
  { name: "My Hero Academia", icon: "🦸", description: "Heróis e individualidades." },
  { name: "Demon Slayer", icon: "🌊", description: "Espadachins e técnicas de respiração." },
  { name: "Black Clover", icon: "🍀", description: "Magia, grimórios e cavaleiros mágicos." }
];

const achievements = [
  { id: "first", name: "Primeiro Passo", description: "Conclua sua primeira missão.", icon: "🌟", condition: s => s.totalCompleted >= 1 },
  { id: "five", name: "Aventureiro Dedicado", description: "Conclua 5 missões.", icon: "🏅", condition: s => s.totalCompleted >= 5 },
  { id: "ten", name: "Determinação", description: "Conclua 10 missões.", icon: "🔥", condition: s => s.totalCompleted >= 10 },
  { id: "level5", name: "Evolução", description: "Alcance o nível 5.", icon: "⚡", condition: s => s.level >= 5 },
  { id: "level10", name: "Lenda em Formação", description: "Alcance o nível 10.", icon: "👑", condition: s => s.level >= 10 },
  { id: "skill", name: "Primeira Habilidade", description: "Desbloqueie uma habilidade.", icon: "✨", condition: s => s.unlockedSkills.length >= 1 },
  { id: "explorer", name: "Explorador", description: "Visite os três mapas.", icon: "🗺️", condition: s => s.visitedZones.length >= 3 }
];

/* =====================================
   MUNDO: ZONAS, MAPAS, NPCs E PORTAIS
===================================== */

const zones = [
  {
    id: "village",
    name: "Vila Inicial",
    ground: "#477b4d", ground2: "#437748", path: "#b79a69", wall: "#315b39",
    npc: "Mestre Ren",
    dialogue: "Bem-vindo, aventureiro! Complete suas missões e fique mais forte.",
    portal: "Portal de Naruto",
    portalDialogue: "Um portal para outro universo! Deseja viajar?",
    spawn: { x: 2, y: 5 },
    npcPos: { x: 4, y: 4 },
    portalPos: { x: 16, y: 9 },
    npcLook: { hairStyle: "short", hairColor: "#d9d9ea", skinColor: "#e0b08a", eyeColor: "#3b3b4f", outfitColor: "#c0392b" },
    trees: [[2, 2], [3, 2], [8, 2], [9, 2], [2, 8], [3, 8], [7, 9], [8, 9], [14, 2], [15, 2], [18, 3], [18, 8]],
    layout: [
      "11111111111111111111",
      "10000000000000000001",
      "10000100000010000001",
      "10000100000010000001",
      "10000000000000000001",
      "10000022222200000001",
      "10000020000200000001",
      "10000020000200000001",
      "10000020000200000001",
      "10000000000000000001",
      "10000000000000000001",
      "11111111111111111111"
    ]
  },
  {
    id: "heroes",
    name: "Cidade dos Heróis",
    ground: "#536d91", ground2: "#4e688c", path: "#a9b4c5", wall: "#35445e",
    npc: "Professor Kai",
    dialogue: "Um verdadeiro herói evolui com dedicação e disciplina.",
    portal: "Portal de My Hero Academia",
    portalDialogue: "Você encontrou um caminho para outro universo!",
    spawn: { x: 2, y: 5 },
    npcPos: { x: 15, y: 3 },
    portalPos: { x: 16, y: 9 },
    npcLook: { hairStyle: "spiky", hairColor: "#2b6cb0", skinColor: "#d9a67e", eyeColor: "#2f855a", outfitColor: "#2f855a" },
    trees: [[2, 2], [2, 3], [8, 2], [9, 2], [2, 8], [3, 8], [7, 9], [8, 9], [12, 2], [18, 2], [18, 3], [18, 8]],
    layout: [
      "11111111111111111111",
      "10000000000000000001",
      "10001000000000100001",
      "10001000000000100001",
      "10000000000000000001",
      "10000022222200000001",
      "10000020000200000001",
      "10000020000200000001",
      "10000020000200000001",
      "10000000000000000001",
      "10000000000000000001",
      "11111111111111111111"
    ]
  },
  {
    id: "pirates",
    name: "Ilha dos Piratas",
    ground: "#4b805c", ground2: "#477b58", path: "#c6a36b", wall: "#315c45",
    npc: "Capitão Ryo",
    dialogue: "O mundo é enorme! Continue explorando e encontre sua própria aventura.",
    portal: "Portal de One Piece",
    portalDialogue: "O mar de aventuras espera por você!",
    spawn: { x: 2, y: 5 },
    npcPos: { x: 15, y: 8 },
    portalPos: { x: 16, y: 9 },
    npcLook: { hairStyle: "messy", hairColor: "#7b2d26", skinColor: "#c98f66", eyeColor: "#222222", outfitColor: "#d69e2e" },
    trees: [[2, 2], [3, 2], [8, 2], [9, 2], [2, 8], [3, 8], [7, 9], [8, 9], [12, 2], [13, 2], [18, 3], [18, 5]],
    layout: [
      "11111111111111111111",
      "10000000000000000001",
      "10000100000000010001",
      "10000100000000010001",
      "10000000000000000001",
      "10000022222200000001",
      "10000020000200000001",
      "10000020000200000001",
      "10000020000200000001",
      "10000000000000000001",
      "10000000000000000001",
      "11111111111111111111"
    ]
  }
];

/* =====================================
   DATAS E ESTADO DO JOGO
===================================== */

function dateString(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function todayString() {
  return dateString(0);
}

function createInitialState() {
  return {
    name: "Aventureiro",
    xp: 0,
    level: 1,
    coins: 0,
    gems: 0,
    totalCompleted: 0,
    streak: 0,
    lastActive: "",
    lastQuestDate: todayString(),
    quests: defaultQuests.map(q => ({ ...q, completed: false, custom: false })),
    hairStyle: "spiky",
    hairColor: "#29213e",
    skinColor: "#e9b995",
    eyeColor: "#55c8ff",
    outfitColor: "#7047dc",
    unlockedSkills: [],
    equippedSkills: [],
    inventory: [
      { id: "starter", name: "Medalha de Iniciante", icon: "🎖️", description: "Sua primeira recompensa." }
    ],
    unlockedAchievements: [],
    mapX: zones[0].spawn.x,
    mapY: zones[0].spawn.y,
    zone: 0,
    visitedZones: [0]
  };
}

function sanitizeColor(value, fallback) {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function sanitizeHairStyle(value) {
  return ["spiky", "short", "long", "messy"].includes(value) ? value : "spiky";
}

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

/* Usada ao carregar e ao importar: garante que o salvamento é válido */
function normalizeGame(data) {
  const initial = createInitialState();
  const g = { ...initial, ...(data && typeof data === "object" ? data : {}) };

  g.name = String(g.name || "Aventureiro").slice(0, 20);
  g.level = Math.max(1, Math.floor(toNumber(g.level, 1)));
  g.xp = Math.max(0, toNumber(g.xp, 0));
  g.coins = Math.max(0, toNumber(g.coins, 0));
  g.gems = Math.max(0, toNumber(g.gems, 0));
  g.totalCompleted = Math.max(0, Math.floor(toNumber(g.totalCompleted, 0)));
  g.streak = Math.max(0, Math.floor(toNumber(g.streak, 0)));
  g.lastActive = typeof g.lastActive === "string" ? g.lastActive : "";
  g.lastQuestDate = typeof g.lastQuestDate === "string" ? g.lastQuestDate : todayString();

  g.hairStyle = sanitizeHairStyle(g.hairStyle);
  g.hairColor = sanitizeColor(g.hairColor, initial.hairColor);
  g.skinColor = sanitizeColor(g.skinColor, initial.skinColor);
  g.eyeColor = sanitizeColor(g.eyeColor, initial.eyeColor);
  g.outfitColor = sanitizeColor(g.outfitColor, initial.outfitColor);

  if (Array.isArray(g.quests)) {
    g.quests = g.quests
      .filter(q => q && typeof q === "object" && q.id && q.name)
      .map(q => ({
        id: String(q.id),
        name: String(q.name).slice(0, 60),
        xp: Math.max(0, toNumber(q.xp, 0)),
        coins: Math.max(0, toNumber(q.coins, 0)),
        difficulty: ["easy", "medium", "hard"].includes(q.difficulty) ? q.difficulty : "easy",
        completed: Boolean(q.completed),
        custom: Boolean(q.custom)
      }));
  } else {
    g.quests = [];
  }
  if (!g.quests.length) g.quests = initial.quests;

  if (!Array.isArray(g.unlockedSkills)) g.unlockedSkills = [];
  g.unlockedSkills = g.unlockedSkills.filter(id => skills.some(skill => skill.id === id));

  if (!Array.isArray(g.equippedSkills)) g.equippedSkills = [];
  g.equippedSkills = g.equippedSkills
    .filter(id => g.unlockedSkills.includes(id))
    .slice(0, 4);

  if (!Array.isArray(g.inventory)) g.inventory = initial.inventory;
  if (!Array.isArray(g.unlockedAchievements)) g.unlockedAchievements = [];
  if (!Array.isArray(g.visitedZones)) g.visitedZones = [0];

  g.zone = Math.max(0, Math.min(zones.length - 1, Math.floor(toNumber(g.zone, 0))));
  g.mapX = Math.max(1, Math.min(MAP_WIDTH - 2, Math.floor(toNumber(g.mapX, zones[g.zone].spawn.x))));
  g.mapY = Math.max(1, Math.min(MAP_HEIGHT - 2, Math.floor(toNumber(g.mapY, zones[g.zone].spawn.y))));

  // Corrige saves antigos em que o jogador ficou em cima de uma árvore ou do NPC
  if (isBlockedIn(g.zone, g.mapX, g.mapY)) {
    g.mapX = zones[g.zone].spawn.x;
    g.mapY = zones[g.zone].spawn.y;
  }

  return g;
}

function loadGame() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return createInitialState();
    return normalizeGame(JSON.parse(saved));
  } catch (error) {
    console.error("Erro ao carregar o jogo:", error);
    return createInitialState();
  }
}

let game = loadGame();

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(game));
  } catch (error) {
    console.error("Não foi possível salvar:", error);
    notify("Não foi possível salvar o progresso.");
  }
}

/* Salvamento com atraso: usado ao andar, para não salvar a cada passo */
let saveTimer = null;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveGame, 300);
}

window.addEventListener("beforeunload", saveGame);

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function notify(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

/* =====================================
   NÍVEIS E CONQUISTAS
===================================== */

function xpForNextLevel(level) {
  return level * 100;
}

function updateLevel() {
  while (game.xp >= xpForNextLevel(game.level)) {
    game.xp -= xpForNextLevel(game.level);
    game.level++;
    game.gems += 5;
    game.coins += 25;

    game.inventory.push({
      id: "level-" + game.level,
      name: "Recompensa de nível " + game.level,
      icon: "🎁",
      description: "Recompensa recebida ao subir de nível."
    });

    notify("LEVEL UP! Você alcançou o nível " + game.level + "!");
  }
}

function updateAchievements() {
  achievements.forEach(achievement => {
    const alreadyUnlocked = game.unlockedAchievements.includes(achievement.id);

    if (!alreadyUnlocked && achievement.condition(game)) {
      game.unlockedAchievements.push(achievement.id);
      game.coins += 30;
      notify("Conquista desbloqueada: " + achievement.name + "!");
    }
  });
}

/* =====================================
   MISSÕES
===================================== */

/* Retorna true quando as missões foram renovadas */
function checkDailyReset() {
  const today = todayString();
  if (game.lastQuestDate === today) return false;

  game.quests = game.quests.filter(quest => quest.custom);
  game.quests.forEach(quest => { quest.completed = false; });
  defaultQuests.forEach(quest => {
    game.quests.push({ ...quest, completed: false, custom: false });
  });

  game.lastQuestDate = today;
  saveGame();
  return true;
}

/* A sequência só vale se a última atividade foi hoje ou ontem */
function getEffectiveStreak() {
  if (!game.lastActive) return 0;
  if (game.lastActive === todayString()) return game.streak;
  return game.lastActive === dateString(-1) ? game.streak : 0;
}

function completeQuest(id) {
  const quest = game.quests.find(item => item.id === id);
  if (!quest || quest.completed) return;

  quest.completed = true;
  game.xp += quest.xp;
  game.coins += quest.coins;
  game.totalCompleted++;

  const today = todayString();

  if (game.lastActive !== today) {
    game.streak = game.lastActive === dateString(-1) ? game.streak + 1 : 1;
    game.lastActive = today;
  }

  updateLevel();
  updateAchievements();
  saveGame();
  renderAll();
  notify("Missão concluída! +" + quest.xp + " XP");
}

function deleteQuest(id) {
  const quest = game.quests.find(item => item.id === id);
  if (!quest || !quest.custom) return;

  game.quests = game.quests.filter(item => item.id !== id);
  saveGame();
  renderAll();
  notify("Missão removida.");
}

function addCustomQuest() {
  const input = document.getElementById("newQuestName");
  const difficulty = document.getElementById("newQuestDifficulty");
  const name = input.value.trim();

  if (!name) {
    notify("Digite o nome da missão.");
    return;
  }

  const rewards = {
    easy: { xp: 20, coins: 8 },
    medium: { xp: 40, coins: 15 },
    hard: { xp: 70, coins: 25 }
  };

  const reward = rewards[difficulty.value];

  game.quests.push({
    id: "custom-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
    name,
    xp: reward.xp,
    coins: reward.coins,
    difficulty: difficulty.value,
    completed: false,
    custom: true
  });

  input.value = "";
  saveGame();
  renderAll();
  notify("Missão adicionada!");
}

function renderQuests() {
  const questList = document.getElementById("questList");
  const homeList = document.getElementById("homeQuestList");

  const pending = game.quests.filter(q => !q.completed);
  const completed = game.quests.filter(q => q.completed);

  document.getElementById("questDone").textContent = completed.length;
  document.getElementById("questRemaining").textContent = pending.length;
  document.getElementById("questTotal").textContent = game.quests.length;

  function questHTML(quest) {
    const difficultyNames = { easy: "Fácil", medium: "Média", hard: "Difícil" };

    return `
      <div class="quest-item ${quest.completed ? "done" : ""}">
        <div>
          <div class="quest-name">${escapeHTML(quest.name)}</div>
          <div class="quest-meta">${difficultyNames[quest.difficulty] || "Personalizada"} • +${quest.coins} moedas</div>
        </div>
        <div class="quest-reward">+${quest.xp} XP</div>
        <button class="complete-btn" data-complete-quest="${escapeHTML(quest.id)}" ${quest.completed ? "disabled" : ""}>
          ${quest.completed ? "✓ Concluída" : "Concluir"}
        </button>
        ${quest.custom ? `<button class="delete-btn" data-delete-quest="${escapeHTML(quest.id)}" title="Remover missão" aria-label="Remover missão">🗑</button>` : ""}
      </div>
    `;
  }

  questList.innerHTML = game.quests.map(questHTML).join("");
  homeList.innerHTML = game.quests.slice(0, 4).map(questHTML).join("");
}

/* =====================================
   SPRITES DO PERSONAGEM (PIXEL ART)
   Grade de 16x16 pixels, desenhada por código
===================================== */

/* amount: -1 (escurece) até 1 (clareia) */
function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const target = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  const r = Math.round(((n >> 16) & 255) + (target - ((n >> 16) & 255)) * p);
  const g = Math.round(((n >> 8) & 255) + (target - ((n >> 8) & 255)) * p);
  const b = Math.round((n & 255) + (target - (n & 255)) * p);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/*
  dir: "down" | "up" | "left" | "right"
  frame: 0 = parado, 1 e 2 = passos da caminhada
  u: tamanho de cada pixel da sprite na tela
*/
function drawSprite(ctx, ox, oy, u, look, dir, frame) {
  ox = Math.round(ox);
  oy = Math.round(oy);

  const flip = dir === "left";
  const side = dir === "left" || dir === "right";
  const back = dir === "up";

  const hair = look.hairColor;
  const skin = look.skinColor;
  const eyes = look.eyeColor;
  const outfit = look.outfitColor;
  const style = look.hairStyle;

  const hairShine = shade(hair, 0.3);
  const hairDark = shade(hair, -0.3);
  const outfitDark = shade(outfit, -0.3);
  const outfitLight = shade(outfit, 0.25);
  const skinDark = shade(skin, -0.2);
  const eyeDark = shade(eyes, -0.45);
  const pants = "#29263d";
  const shoe = "#15121f";

  const R = (x, y, w, h, color) => {
    const gx = flip ? SPRITE_GRID - x - w : x;
    const x0 = Math.round(ox + gx * u);
    const x1 = Math.round(ox + (gx + w) * u);
    const y0 = Math.round(oy + y * u);
    const y1 = Math.round(oy + (y + h) * u);
    ctx.fillStyle = color;
    ctx.fillRect(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0));
  };

  // Pernas
  const leg = (x, len) => {
    R(x, 13, 2, len, pants);
    R(x, 12 + len, 2, 1, shoe);
  };

  if (frame === 1) { leg(5, 3); leg(9, 2); }
  else if (frame === 2) { leg(5, 2); leg(9, 3); }
  else { leg(5, 3); leg(9, 3); }

  // Corpo
  if (side) {
    R(5, 9, 6, 4, outfit);
    R(5, 12, 6, 1, outfitDark);
  } else {
    R(4, 9, 8, 4, outfit);
    R(4, 12, 8, 1, outfitDark);
    if (!back) R(7, 9, 2, 1, outfitLight);
  }

  // Braços
  if (side) {
    const swing = frame === 1 ? 1 : frame === 2 ? -1 : 0;
    R(7 + swing, 9, 2, 3, outfitDark);
    R(7 + swing, 12, 2, 1, skin);
  } else {
    const leftArm = frame === 1 ? 1 : 0;
    const rightArm = frame === 2 ? 1 : 0;
    R(3, 9 + leftArm, 1, 3, outfit);
    R(3, 12 + leftArm, 1, 1, skin);
    R(12, 9 + rightArm, 1, 3, outfit);
    R(12, 12 + rightArm, 1, 1, skin);
  }

  // Cabeça
  if (side) R(5, 3, 7, 6, skin);
  else R(4, 3, 8, 6, skin);

  // Cabelo
  if (!side && !back) {
    R(4, 2, 8, 3, hair);
    R(5, 2, 3, 1, hairShine);
    R(4, 5, 1, 2, hair);
    R(11, 5, 1, 2, hair);
    if (style !== "short") {
      R(4, 5, 2, 1, hair);
      R(10, 5, 2, 1, hair);
    }
    if (style === "spiky") {
      R(3, 1, 2, 2, hair); R(6, 0, 2, 2, hair); R(9, 0, 2, 2, hair); R(11, 1, 2, 2, hair);
    } else if (style === "long") {
      R(3, 3, 1, 8, hair); R(12, 3, 1, 8, hair);
    } else if (style === "messy") {
      R(3, 2, 2, 3, hair); R(11, 2, 2, 3, hair); R(5, 1, 3, 1, hair); R(9, 1, 2, 1, hair); R(7, 5, 2, 1, hair);
    }
  } else if (back) {
    R(4, 2, 8, 7, hair);
    R(4, 8, 8, 1, hairDark);
    R(5, 2, 3, 1, hairShine);
    if (style === "spiky") {
      R(3, 1, 2, 2, hair); R(6, 0, 2, 2, hair); R(9, 0, 2, 2, hair); R(11, 1, 2, 2, hair);
    } else if (style === "long") {
      R(3, 3, 10, 8, hair);
      R(3, 10, 10, 1, hairDark);
    } else if (style === "messy") {
      R(3, 2, 2, 3, hair); R(11, 2, 2, 3, hair); R(5, 1, 3, 1, hair);
    }
  } else {
    // Lado (virado para a direita; o lado esquerdo é espelhado)
    R(5, 2, 7, 3, hair);
    R(5, 3, 3, 5, hair);
    R(6, 2, 3, 1, hairShine);
    R(9, 4, 3, 1, hair);
    if (style === "spiky") {
      R(4, 1, 2, 2, hair); R(7, 0, 2, 2, hair); R(10, 1, 2, 2, hair);
    } else if (style === "long") {
      R(4, 3, 4, 9, hair);
    } else if (style === "messy") {
      R(4, 2, 2, 3, hair); R(8, 1, 3, 1, hair); R(11, 3, 1, 2, hair);
    }
  }

  // Rosto
  if (!side && !back) {
    R(5, 6, 2, 2, eyes); R(9, 6, 2, 2, eyes);
    R(5, 7, 2, 1, eyeDark); R(9, 7, 2, 1, eyeDark);
    R(5, 6, 1, 1, "#ffffff"); R(9, 6, 1, 1, "#ffffff");
    R(7, 8, 2, 1, skinDark);
  } else if (side) {
    R(9, 6, 2, 2, eyes);
    R(9, 7, 2, 1, eyeDark);
    R(9, 6, 1, 1, "#ffffff");
    R(10, 8, 1, 1, skinDark);
  }
}

function getGameLook() {
  return {
    hairStyle: game.hairStyle,
    hairColor: game.hairColor,
    skinColor: game.skinColor,
    eyeColor: game.eyeColor,
    outfitColor: game.outfitColor
  };
}

function getFormLook() {
  const initial = createInitialState();
  return {
    hairStyle: sanitizeHairStyle(document.getElementById("hairStyle").value),
    hairColor: sanitizeColor(document.getElementById("hairColor").value, initial.hairColor),
    skinColor: sanitizeColor(document.getElementById("skinColor").value, initial.skinColor),
    eyeColor: sanitizeColor(document.getElementById("eyeColor").value, initial.eyeColor),
    outfitColor: sanitizeColor(document.getElementById("outfitColor").value, initial.outfitColor)
  };
}

function drawAvatarCanvas(canvas, look, dir, frame, u) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ox = (canvas.width - SPRITE_GRID * u) / 2;
  const oy = (canvas.height - SPRITE_GRID * u) / 2 - u;

  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, oy + SPRITE_GRID * u, u * 5, u * 1.4, 0, 0, Math.PI * 2);
  ctx.fill();

  drawSprite(ctx, ox, oy, u, look, dir, frame);
}

/* =====================================
   PERSONAGEM (TELA DE PERSONALIZAÇÃO)
===================================== */

let previewLook = getGameLook();
let previewDir = "down";
let previewWalking = true;
let previewLoopId = null;
const DIR_ORDER = ["down", "left", "up", "right"];

function renderCharacter() {
  document.getElementById("sideName").textContent = game.name;
  document.getElementById("homeCharacterName").textContent = game.name;
  document.getElementById("previewName").textContent = game.name;

  document.getElementById("characterName").value = game.name;
  document.getElementById("hairStyle").value = game.hairStyle;
  document.getElementById("hairColor").value = game.hairColor;
  document.getElementById("skinColor").value = game.skinColor;
  document.getElementById("eyeColor").value = game.eyeColor;
  document.getElementById("outfitColor").value = game.outfitColor;

  previewLook = getGameLook();

  drawAvatarCanvas(document.getElementById("miniAvatar"), getGameLook(), "down", 0, 2);
  drawAvatarCanvas(document.getElementById("homeAvatar"), getGameLook(), "down", 0, 8);
  drawCustomPreview(0);
}

function drawCustomPreview(frame) {
  drawAvatarCanvas(document.getElementById("customAvatar"), previewLook, previewDir, frame, 16);
}

function isPageActive(page) {
  return document.getElementById("page-" + page).classList.contains("active");
}

function previewLoop(now) {
  previewLoopId = null;
  if (!isPageActive("character")) return;

  const walkFrames = [1, 0, 2, 0];
  const frame = previewWalking ? walkFrames[Math.floor(now / 170) % 4] : 0;
  drawCustomPreview(frame);

  previewLoopId = requestAnimationFrame(previewLoop);
}

function startPreviewLoop() {
  if (previewLoopId) return;
  previewLoopId = requestAnimationFrame(previewLoop);
}

function turnPreview() {
  previewDir = DIR_ORDER[(DIR_ORDER.indexOf(previewDir) + 1) % DIR_ORDER.length];
  if (!previewWalking) drawCustomPreview(0);
}

/* =====================================
   HABILIDADES
===================================== */

function unlockSkill(id) {
  const skill = skills.find(item => item.id === id);
  if (!skill || game.unlockedSkills.includes(id)) return;

  if (game.level < skill.level) {
    notify("Você precisa alcançar o nível " + skill.level + ".");
    return;
  }

  if (game.coins < skill.cost) {
    notify("Moedas insuficientes!");
    return;
  }

  game.coins -= skill.cost;
  game.unlockedSkills.push(id);

  game.inventory.push({
    id: "skill-" + id,
    name: skill.name,
    icon: skill.icon,
    description: "Habilidade desbloqueada de " + skill.anime + "."
  });

  updateAchievements();
  saveGame();
  renderAll();
  notify(skill.name + " desbloqueada!");
}

function toggleEquipSkill(id) {
  if (!game.unlockedSkills.includes(id)) return;

  const index = game.equippedSkills.indexOf(id);

  if (index !== -1) {
    game.equippedSkills.splice(index, 1);
    notify("Habilidade desequipada.");
  } else {
    if (game.equippedSkills.length >= 4) {
      notify("Você só pode equipar 4 habilidades.");
      return;
    }

    game.equippedSkills.push(id);
    notify("Habilidade equipada!");
  }

  saveGame();
  renderAll();
}

function renderSkills() {
  const container = document.getElementById("skillsList");
  const equippedContainer = document.getElementById("equippedSkills");

  equippedContainer.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    const skill = skills.find(item => item.id === game.equippedSkills[i]);

    equippedContainer.innerHTML += `
      <div class="equipped-slot">
        ${skill
          ? `<div><strong>${escapeHTML(skill.icon)} ${escapeHTML(skill.name)}</strong><br><small>${escapeHTML(skill.anime)}</small></div>`
          : `<span>Slot ${i + 1}<br>Vazio</span>`}
      </div>
    `;
  }

  container.innerHTML = skills.map(skill => {
    const unlocked = game.unlockedSkills.includes(skill.id);
    const equipped = game.equippedSkills.includes(skill.id);
    const canUnlock = game.level >= skill.level && game.coins >= skill.cost;

    return `
      <article class="skill-card ${unlocked ? "" : "locked"} ${equipped ? "equipped" : ""}">
        <div class="skill-icon">${escapeHTML(skill.icon)}</div>
        <h3>${escapeHTML(skill.name)}</h3>
        <span class="tag">${escapeHTML(skill.anime)}</span>
        <p>${escapeHTML(skill.description)}</p>
        <small class="skill-cost">${unlocked ? "DESBLOQUEADA" : `🪙 ${skill.cost} moedas • Nível ${skill.level}`}</small>
        <button
          ${unlocked ? `data-equip-skill="${skill.id}"` : `data-unlock-skill="${skill.id}"`}
          ${!unlocked && !canUnlock ? "disabled" : ""}>
          ${equipped ? "Desequipar" : unlocked ? "Equipar" : "Desbloquear"}
        </button>
      </article>
    `;
  }).join("");
}

/* =====================================
   UNIVERSOS, INVENTÁRIO E CONQUISTAS
===================================== */

function renderAnime() {
  document.getElementById("animeList").innerHTML = animeUniverses.map(anime => `
    <article class="anime-card">
      <div class="anime-icon">${anime.icon}</div>
      <h3>${escapeHTML(anime.name)}</h3>
      <p>${escapeHTML(anime.description)}</p>
      <span class="tag">UNIVERSO DISPONÍVEL</span>
    </article>
  `).join("");
}

function renderInventory() {
  const container = document.getElementById("inventoryList");

  if (!game.inventory.length) {
    container.innerHTML = "<p class='muted'>Seu inventário está vazio.</p>";
    return;
  }

  container.innerHTML = game.inventory.map(item => `
    <article class="inventory-item">
      <div class="inventory-icon">${escapeHTML(item.icon)}</div>
      <strong>${escapeHTML(item.name)}</strong>
      <p>${escapeHTML(item.description)}</p>
    </article>
  `).join("");
}

function renderAchievements() {
  document.getElementById("achievementsList").innerHTML = achievements.map(item => {
    const unlocked = game.unlockedAchievements.includes(item.id);

    return `
      <div class="achievement ${unlocked ? "" : "locked"}">
        <div class="achievement-icon">${item.icon}</div>
        <div>
          <strong>${escapeHTML(item.name)}</strong>
          <p>${escapeHTML(item.description)}</p>
          <small>${unlocked ? "✓ DESBLOQUEADA" : "🔒 BLOQUEADA"}</small>
        </div>
      </div>
    `;
  }).join("");
}

/* =====================================
   PAINEL
===================================== */

function renderStats() {
  const streak = getEffectiveStreak();

  document.getElementById("sideLevel").textContent = "Nível " + game.level;
  document.getElementById("homeXP").textContent = game.xp + " XP";
  document.getElementById("homeLevel").textContent = game.level;
  document.getElementById("homeCompleted").textContent = game.totalCompleted;
  document.getElementById("homeStreak").textContent = streak + (streak === 1 ? " dia" : " dias");

  document.getElementById("topCoins").textContent = game.coins;
  document.getElementById("topGems").textContent = game.gems;

  document.getElementById("levelLabel").textContent = "NÍVEL " + game.level;
  document.getElementById("xpCurrent").textContent = game.xp + " XP";

  const required = xpForNextLevel(game.level);
  document.getElementById("xpNeeded").textContent = required + " XP";

  document.getElementById("xpBar").style.width =
    Math.min((game.xp / required) * 100, 100) + "%";

  document.getElementById("xpMessage").textContent =
    (required - game.xp) + " XP para alcançar o próximo nível.";

  document.getElementById("homeZone").textContent = zones[game.zone].name;
  document.getElementById("zoneName").textContent = zones[game.zone].name;
}

function renderAll() {
  renderStats();
  renderCharacter();
  renderQuests();
  renderSkills();
  renderAnime();
  renderInventory();
  renderAchievements();
  drawMap();
}

/* =====================================
   NAVEGAÇÃO
===================================== */

const pageNames = {
  home: "Painel do aventureiro",
  map: "Mapa 2D",
  character: "Personalização",
  quests: "Central de missões",
  skills: "Habilidades",
  anime: "Universos de anime",
  inventory: "Inventário",
  achievements: "Conquistas",
  settings: "Configurações"
};

function openPage(page) {
  document.querySelectorAll(".page").forEach(section => {
    section.classList.toggle("active", section.id === "page-" + page);
  });

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  document.getElementById("pageTitle").textContent =
    pageNames[page] || "Anime Life RPG";

  if (page !== "map") heldKeys.length = 0;

  if (page === "map") {
    syncMapState();
    drawMap();
    checkNearby();
    startMapLoop();
  }

  if (page === "character") {
    startPreviewLoop();
  }
}

document.querySelectorAll(".nav-btn").forEach(button => {
  button.addEventListener("click", () => openPage(button.dataset.page));
});

document.querySelectorAll("[data-goto]").forEach(button => {
  button.addEventListener("click", () => openPage(button.dataset.goto));
});

/* =====================================
   EVENTOS DE MISSÕES E HABILIDADES
===================================== */

document.getElementById("addQuest").addEventListener("click", addCustomQuest);

document.getElementById("newQuestName").addEventListener("keydown", event => {
  if (event.key === "Enter") addCustomQuest();
});

document.addEventListener("click", event => {
  const completeButton = event.target.closest("[data-complete-quest]");
  if (completeButton) {
    completeQuest(completeButton.dataset.completeQuest);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-quest]");
  if (deleteButton) {
    deleteQuest(deleteButton.dataset.deleteQuest);
    return;
  }

  const unlockButton = event.target.closest("[data-unlock-skill]");
  if (unlockButton) {
    unlockSkill(unlockButton.dataset.unlockSkill);
    return;
  }

  const equipButton = event.target.closest("[data-equip-skill]");
  if (equipButton) {
    toggleEquipSkill(equipButton.dataset.equipSkill);
  }
});

/* =====================================
   PERSONALIZAÇÃO AO VIVO
===================================== */

document.getElementById("saveCharacter").addEventListener("click", () => {
  const name = document.getElementById("characterName").value.trim();
  const look = getFormLook();

  game.name = name || "Aventureiro";
  game.hairStyle = look.hairStyle;
  game.hairColor = look.hairColor;
  game.skinColor = look.skinColor;
  game.eyeColor = look.eyeColor;
  game.outfitColor = look.outfitColor;

  saveGame();
  renderAll();
  notify("Personagem atualizado!");
});

["hairStyle", "hairColor", "skinColor", "eyeColor", "outfitColor"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    previewLook = getFormLook();
    if (!previewWalking) drawCustomPreview(0);
  });
});

document.getElementById("characterName").addEventListener("input", event => {
  document.getElementById("previewName").textContent =
    event.target.value.trim() || "Aventureiro";
});

document.getElementById("customAvatar").addEventListener("click", turnPreview);
document.getElementById("turnBtn").addEventListener("click", turnPreview);

document.getElementById("walkBtn").addEventListener("click", event => {
  previewWalking = !previewWalking;
  event.currentTarget.textContent = previewWalking ? "⏸ Parar" : "▶ Andar";
  if (!previewWalking) drawCustomPreview(0);
});

/* =====================================
   MAPA 2D - ESTADO E MOVIMENTO
===================================== */

const mapCanvas = document.getElementById("gameMap");
const mapCtx = mapCanvas.getContext("2d");

const DIRS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0]
};

const KEY_DIRS = {
  arrowup: "up", w: "up",
  arrowdown: "down", s: "down",
  arrowleft: "left", a: "left",
  arrowright: "right", d: "right"
};

const heldKeys = [];

const mapState = {
  rx: game.mapX,          // posição desenhada (suave)
  ry: game.mapY,
  fromX: game.mapX,
  fromY: game.mapY,
  toX: game.mapX,
  toY: game.mapY,
  t: 0,
  moving: false,
  step: 0,
  facing: "down",
  pending: null,          // direção pedida por deslize no toque
  target: null,           // destino pedido por toque no mapa
  fade: 0                 // efeito ao viajar pelo portal
};

let portalArmedAt = 0;

function syncMapState() {
  mapState.rx = mapState.fromX = mapState.toX = game.mapX;
  mapState.ry = mapState.fromY = mapState.toY = game.mapY;
  mapState.t = 0;
  mapState.moving = false;
  mapState.pending = null;
  mapState.target = null;
}

function currentZone() {
  return zones[game.zone];
}

function isMapOpen() {
  return document.getElementById("page-map").classList.contains("active");
}

function setMapMessage(message) {
  document.getElementById("mapMessage").textContent = message;
}

function isBlockedIn(zoneIndex, x, y) {
  if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) return true;

  const zone = zones[zoneIndex];
  if (zone.layout[y][x] === "1") return true;
  if (zone.trees.some(([tx, ty]) => tx === x && ty === y)) return true;
  if (zone.npcPos.x === x && zone.npcPos.y === y) return true;

  return false;
}

function isBlocked(x, y) {
  return isBlockedIn(game.zone, x, y);
}

function isNear(pos) {
  return Math.abs(game.mapX - pos.x) + Math.abs(game.mapY - pos.y) <= 1;
}

function isNearNPC() {
  return isNear(currentZone().npcPos);
}

function isNearPortal() {
  return isNear(currentZone().portalPos);
}

function tryStep(dir) {
  const [dx, dy] = DIRS[dir];
  mapState.facing = dir;

  const nextX = game.mapX + dx;
  const nextY = game.mapY + dy;

  if (isBlocked(nextX, nextY)) return false;

  mapState.fromX = game.mapX;
  mapState.fromY = game.mapY;
  mapState.toX = nextX;
  mapState.toY = nextY;
  mapState.t = 0;
  mapState.moving = true;
  mapState.step++;
  return true;
}

/* Caminha em direção ao ponto tocado no mapa */
function stepTowardTarget() {
  const target = mapState.target;
  if (!target) return null;

  const dx = target.x - game.mapX;
  const dy = target.y - game.mapY;

  if (!dx && !dy) {
    mapState.target = null;
    return null;
  }

  const horizontal = dx > 0 ? "right" : "left";
  const vertical = dy > 0 ? "down" : "up";
  const options = [];

  if (Math.abs(dx) >= Math.abs(dy)) {
    if (dx) options.push(horizontal);
    if (dy) options.push(vertical);
  } else {
    if (dy) options.push(vertical);
    if (dx) options.push(horizontal);
  }

  for (const dir of options) {
    const [vx, vy] = DIRS[dir];
    if (!isBlocked(game.mapX + vx, game.mapY + vy)) return dir;
  }

  mapState.target = null;
  return null;
}

function startNextStep() {
  const dir = mapState.pending || heldKeys[heldKeys.length - 1] || stepTowardTarget();
  mapState.pending = null;
  if (dir) tryStep(dir);
}

function updateMap(dt) {
  const ms = mapState;

  if (ms.fade > 0) ms.fade = Math.max(0, ms.fade - dt / 450);

  if (!ms.moving) startNextStep();
  if (!ms.moving) return;

  ms.t += dt / STEP_MS;

  if (ms.t >= 1) {
    const overshoot = ms.t - 1;

    game.mapX = ms.toX;
    game.mapY = ms.toY;
    ms.rx = ms.toX;
    ms.ry = ms.toY;
    ms.moving = false;
    ms.t = 0;

    scheduleSave();
    checkNearby();

    startNextStep();
    if (ms.moving) ms.t = Math.min(overshoot, 0.9);
  }

  if (ms.moving) {
    ms.rx = ms.fromX + (ms.toX - ms.fromX) * ms.t;
    ms.ry = ms.fromY + (ms.toY - ms.fromY) * ms.t;
  }
}

/* =====================================
   MAPA 2D - LOOP DE ANIMAÇÃO
   (só roda enquanto a aba do mapa está aberta)
===================================== */

let mapLoopId = null;
let lastFrameTime = 0;

function mapLoop(now) {
  mapLoopId = null;
  if (!isMapOpen()) return;

  const dt = Math.min(now - lastFrameTime, 50);
  lastFrameTime = now;

  updateMap(dt);
  drawMap(now);

  mapLoopId = requestAnimationFrame(mapLoop);
}

function startMapLoop() {
  if (mapLoopId) return;
  lastFrameTime = performance.now();
  mapLoopId = requestAnimationFrame(mapLoop);
}

/* =====================================
   MAPA 2D - DESENHO DO CENÁRIO
===================================== */

function roundedRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function drawGroundTile(g, zone, x, y, isPath) {
  const px = x * TILE;
  const py = y * TILE;

  if (isPath) {
    g.fillStyle = zone.path;
    g.fillRect(px, py, TILE, TILE);
    g.fillStyle = "#00000014";
    if ((x * 5 + y * 3) % 2 === 0) g.fillRect(px + 10, py + 14, 6, 4);
    g.fillRect(px + 30, py + 30, 5, 3);
    return;
  }

  g.fillStyle = (x + y) % 2 === 0 ? zone.ground : zone.ground2;
  g.fillRect(px, py, TILE, TILE);

  const seed = (x * 7 + y * 13) % 5;

  if (seed === 0) {
    g.fillStyle = "#ffffff14";
    g.fillRect(px + 10, py + 12, 3, 3);
    g.fillRect(px + 30, py + 30, 3, 3);
  }

  if (seed === 2) {
    g.fillStyle = "#00000012";
    g.fillRect(px + 22, py + 8, 2, 6);
    g.fillRect(px + 26, py + 10, 2, 5);
  }

  if ((x * 11 + y * 5) % 17 === 0) {
    g.fillStyle = zone.id === "pirates" ? "#ffd36b" : "#ff9bd0";
    g.fillRect(px + 20, py + 20, 4, 4);
    g.fillStyle = "#ffffff66";
    g.fillRect(px + 21, py + 21, 2, 2);
  }
}

function drawBorderTile(g, zone, x, y) {
  const px = x * TILE;
  const py = y * TILE;

  if (zone.id === "pirates") {
    g.fillStyle = "#1f6a96";
    g.fillRect(px, py, TILE, TILE);
    g.strokeStyle = "#ffffff40";
    g.lineWidth = 2;
    for (let i = 0; i < 2; i++) {
      const wy = py + 14 + i * 18;
      g.beginPath();
      g.moveTo(px + 4, wy);
      g.quadraticCurveTo(px + 14, wy - 6, px + 24, wy);
      g.quadraticCurveTo(px + 34, wy + 6, px + 44, wy);
      g.stroke();
    }
    return;
  }

  if (zone.id === "heroes") {
    g.fillStyle = "#3b4a68";
    g.fillRect(px, py, TILE, TILE);
    g.strokeStyle = "#00000040";
    g.lineWidth = 2;
    g.strokeRect(px + 1, py + 1, TILE - 2, TILE - 2);
    g.beginPath();
    g.moveTo(px, py + TILE / 2);
    g.lineTo(px + TILE, py + TILE / 2);
    g.moveTo(px + TILE / 2, py);
    g.lineTo(px + TILE / 2, py + TILE / 2);
    g.stroke();
    return;
  }

  // Vila: cerca viva
  g.fillStyle = zone.wall;
  g.fillRect(px, py, TILE, TILE);
  g.fillStyle = "#3d7348";
  g.beginPath();
  g.arc(px + 14, py + 16, 12, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.arc(px + 34, py + 30, 13, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#2a5232";
  g.beginPath();
  g.arc(px + 32, py + 12, 8, 0, Math.PI * 2);
  g.fill();
}

function drawBuilding(g, zone, x, y, h) {
  const px = x * TILE;
  const py = y * TILE;
  const height = h * TILE;

  if (zone.id === "village") {
    g.fillStyle = "#00000030";
    g.fillRect(px + 4, py + height - 4, TILE, 6);

    g.fillStyle = "#c9a46a";
    g.fillRect(px + 2, py + 14, TILE - 4, height - 14);
    g.fillStyle = "#a98650";
    g.fillRect(px + 2, py + 14, TILE - 4, 4);

    g.fillStyle = "#b0413e";
    g.beginPath();
    g.moveTo(px - 6, py + 18);
    g.lineTo(px + TILE / 2, py - 10);
    g.lineTo(px + TILE + 6, py + 18);
    g.closePath();
    g.fill();
    g.fillStyle = "#8a2f2e";
    g.fillRect(px - 6, py + 16, TILE + 12, 3);

    g.fillStyle = "#5b3a24";
    g.fillRect(px + 17, py + height - 22, 14, 22);
    g.fillStyle = "#ffe8a0";
    g.fillRect(px + 8, py + height - 56 + 8, 10, 10);
    g.fillRect(px + 30, py + height - 56 + 8, 10, 10);
    return;
  }

  if (zone.id === "heroes") {
    g.fillStyle = "#00000030";
    g.fillRect(px + 4, py + height - 4, TILE, 6);

    g.fillStyle = "#46587a";
    g.fillRect(px + 2, py - 8, TILE - 4, height + 8);
    g.fillStyle = "#2c3a55";
    g.fillRect(px + 2, py - 8, TILE - 4, 6);
    g.fillRect(px + 22, py - 18, 4, 12);

    for (let wy = py + 2; wy < py + height - 14; wy += 16) {
      g.fillStyle = (wy / 16) % 2 < 1 ? "#ffe9a3" : "#7ad0ff";
      g.fillRect(px + 9, wy, 10, 8);
      g.fillRect(px + 29, wy, 10, 8);
    }

    g.fillStyle = "#1e2840";
    g.fillRect(px + 17, py + height - 14, 14, 14);
    return;
  }

  // Ilha dos Piratas: cabana
  g.fillStyle = "#00000030";
  g.fillRect(px + 4, py + height - 4, TILE, 6);

  g.fillStyle = "#8a5a35";
  g.fillRect(px + 3, py + 14, TILE - 6, height - 14);
  g.strokeStyle = "#00000030";
  g.lineWidth = 2;
  for (let line = px + 12; line < px + TILE - 3; line += 10) {
    g.beginPath();
    g.moveTo(line, py + 14);
    g.lineTo(line, py + height);
    g.stroke();
  }

  g.fillStyle = "#d9b86a";
  g.beginPath();
  g.moveTo(px - 4, py + 18);
  g.lineTo(px + TILE / 2, py - 8);
  g.lineTo(px + TILE + 4, py + 18);
  g.closePath();
  g.fill();

  g.fillStyle = "#3a2615";
  g.fillRect(px + 17, py + height - 22, 14, 22);

  g.fillStyle = "#111111";
  g.fillRect(px + TILE - 10, py - 14, 10, 8);
  g.fillStyle = "#e8e8e8";
  g.fillRect(px + TILE - 7, py - 12, 4, 4);
  g.fillStyle = "#5b3a24";
  g.fillRect(px + TILE - 11, py - 14, 2, 24);
}

const terrainCache = [];

function getTerrain(zoneIndex) {
  if (terrainCache[zoneIndex]) return terrainCache[zoneIndex];

  const canvas = document.createElement("canvas");
  canvas.width = MAP_WIDTH * TILE;
  canvas.height = MAP_HEIGHT * TILE;
  const g = canvas.getContext("2d");

  const zone = zones[zoneIndex];
  const layout = zone.layout;

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const border = x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1;

      if (border) {
        drawBorderTile(g, zone, x, y);
      } else {
        drawGroundTile(g, zone, x, y, layout[y][x] === "2");
      }
    }
  }

  // Construções (blocos "1" dentro do mapa)
  for (let x = 1; x < MAP_WIDTH - 1; x++) {
    for (let y = 1; y < MAP_HEIGHT - 1; y++) {
      if (layout[y][x] !== "1") continue;
      if (y > 1 && layout[y - 1][x] === "1") continue;

      let h = 1;
      while (y + h < MAP_HEIGHT - 1 && layout[y + h][x] === "1") h++;

      drawBuilding(g, zone, x, y, h);
    }
  }

  terrainCache[zoneIndex] = canvas;
  return canvas;
}

function drawTree(x, y) {
  const px = x * TILE;
  const py = y * TILE;

  mapCtx.fillStyle = "#00000040";
  mapCtx.beginPath();
  mapCtx.ellipse(px + 24, py + 44, 16, 5, 0, 0, Math.PI * 2);
  mapCtx.fill();

  mapCtx.fillStyle = "#68452e";
  mapCtx.fillRect(px + 20, py + 28, 9, 17);

  mapCtx.fillStyle = "#173f2c";
  mapCtx.beginPath();
  mapCtx.arc(px + 24, py + 20, 20, 0, Math.PI * 2);
  mapCtx.fill();

  mapCtx.fillStyle = "#2c6a43";
  mapCtx.beginPath();
  mapCtx.arc(px + 22, py + 16, 15, 0, Math.PI * 2);
  mapCtx.fill();

  mapCtx.fillStyle = "#3f8a58";
  mapCtx.beginPath();
  mapCtx.arc(px + 17, py + 11, 8, 0, Math.PI * 2);
  mapCtx.fill();
}

function drawPortal(pos, now) {
  const cx = pos.x * TILE + TILE / 2;
  const cy = pos.y * TILE + TILE / 2;
  const pulse = (Math.sin(now / 280) + 1) / 2;

  const glow = mapCtx.createRadialGradient(cx, cy, 4, cx, cy, 36);
  glow.addColorStop(0, "rgba(180, 130, 255, 0.55)");
  glow.addColorStop(1, "rgba(180, 130, 255, 0)");
  mapCtx.fillStyle = glow;
  mapCtx.beginPath();
  mapCtx.arc(cx, cy, 34 + pulse * 4, 0, Math.PI * 2);
  mapCtx.fill();

  mapCtx.fillStyle = "#2a1650";
  mapCtx.beginPath();
  mapCtx.ellipse(cx, cy, 15, 21, 0, 0, Math.PI * 2);
  mapCtx.fill();

  mapCtx.strokeStyle = "#c9a5ff";
  mapCtx.lineWidth = 3;
  mapCtx.stroke();

  mapCtx.save();
  mapCtx.translate(cx, cy);
  mapCtx.rotate(now / 600);
  mapCtx.strokeStyle = "#ead9ff";
  mapCtx.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    mapCtx.beginPath();
    mapCtx.arc(0, 0, 5 + i * 3, i * 2, i * 2 + 2.2);
    mapCtx.stroke();
  }
  mapCtx.restore();

  mapCtx.fillStyle = "#ffffff";
  for (let i = 0; i < 4; i++) {
    const angle = now / 500 + (i * Math.PI) / 2;
    mapCtx.fillRect(cx + Math.cos(angle) * 20, cy + Math.sin(angle) * 26, 3, 3);
  }
}

function drawNameTag(text, cx, y, borderColor) {
  mapCtx.font = "bold 13px Rajdhani, Arial, sans-serif";
  mapCtx.textAlign = "center";
  mapCtx.textBaseline = "middle";

  const width = mapCtx.measureText(text).width + 14;

  roundedRect(mapCtx, cx - width / 2, y - 16, width, 18, 8);
  mapCtx.fillStyle = "rgba(18, 14, 32, 0.8)";
  mapCtx.fill();
  mapCtx.strokeStyle = borderColor;
  mapCtx.lineWidth = 1;
  mapCtx.stroke();

  mapCtx.fillStyle = "#ffffff";
  mapCtx.fillText(text, cx, y - 7);
  mapCtx.textBaseline = "alphabetic";
  mapCtx.textAlign = "left";
}

function drawBubble(text, cx, y) {
  mapCtx.font = "bold 13px Rajdhani, Arial, sans-serif";
  mapCtx.textAlign = "center";
  mapCtx.textBaseline = "middle";

  const width = mapCtx.measureText(text).width + 18;

  roundedRect(mapCtx, cx - width / 2, y - 20, width, 22, 9);
  mapCtx.fillStyle = "#2a1f45";
  mapCtx.fill();
  mapCtx.strokeStyle = "#9565ff";
  mapCtx.lineWidth = 2;
  mapCtx.stroke();

  mapCtx.fillStyle = "#ffffff";
  mapCtx.fillText(text, cx, y - 9);
  mapCtx.textBaseline = "alphabetic";
  mapCtx.textAlign = "left";
}

function drawPlayer() {
  const ms = mapState;
  const px = ms.rx * TILE;
  const bob = ms.moving ? Math.abs(Math.sin(ms.t * Math.PI)) * 3 : 0;
  const py = ms.ry * TILE - bob;

  mapCtx.fillStyle = "#00000055";
  mapCtx.beginPath();
  mapCtx.ellipse(px + TILE / 2, ms.ry * TILE + TILE - 4, 14, 5, 0, 0, Math.PI * 2);
  mapCtx.fill();

  const frame = ms.moving ? (ms.step % 2 === 0 ? 1 : 2) : 0;
  drawSprite(mapCtx, px, py, TILE / SPRITE_GRID, getGameLook(), ms.facing, frame);

  drawNameTag(game.name, px + TILE / 2, py - 2, "#b99aff");
}

function drawNPC(zone, now, nearNpc) {
  const px = zone.npcPos.x * TILE;
  const py = zone.npcPos.y * TILE;
  const bob = Math.round(Math.sin(now / 450));

  let facing = "down";
  if (nearNpc) {
    const dx = game.mapX - zone.npcPos.x;
    const dy = game.mapY - zone.npcPos.y;
    if (Math.abs(dx) > Math.abs(dy)) facing = dx > 0 ? "right" : "left";
    else facing = dy > 0 ? "down" : "up";
  }

  mapCtx.fillStyle = "#00000055";
  mapCtx.beginPath();
  mapCtx.ellipse(px + TILE / 2, py + TILE - 4, 14, 5, 0, 0, Math.PI * 2);
  mapCtx.fill();

  drawSprite(mapCtx, px, py + bob, TILE / SPRITE_GRID, zone.npcLook, facing, 0);

  drawNameTag(zone.npc, px + TILE / 2, py - 2, "#f0b34e");
}

function drawMap(now = performance.now()) {
  if (!mapCanvas || !mapCtx || !isMapOpen()) return;

  const zone = currentZone();

  mapCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  mapCtx.drawImage(getTerrain(game.zone), 0, 0);

  drawPortal(zone.portalPos, now);

  const nearNpc = isNearNPC();
  const nearPortal = isNearPortal();

  // Desenha de cima para baixo, para o personagem passar atrás das árvores
  const entities = [];
  zone.trees.forEach(([x, y]) => entities.push({ order: y + 1, draw: () => drawTree(x, y) }));
  entities.push({ order: zone.npcPos.y + 1, draw: () => drawNPC(zone, now, nearNpc) });
  entities.push({ order: mapState.ry + 1, draw: () => drawPlayer() });
  entities.sort((a, b) => a.order - b.order);
  entities.forEach(entity => entity.draw());

  if (!mapState.moving) {
    if (nearNpc) {
      drawBubble("E • Conversar", zone.npcPos.x * TILE + TILE / 2, zone.npcPos.y * TILE - 22);
    } else if (nearPortal) {
      drawBubble("E • Viajar", zone.portalPos.x * TILE + TILE / 2, zone.portalPos.y * TILE - 14);
    }
  }

  if (mapState.fade > 0) {
    mapCtx.fillStyle = `rgba(20, 10, 40, ${mapState.fade})`;
    mapCtx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
  }
}

/* =====================================
   INTERAÇÃO COM NPC E PORTAL
===================================== */

function checkNearby() {
  const zone = currentZone();

  if (isNearNPC()) {
    setMapMessage("NPC próximo: " + zone.npc + ". Pressione E para conversar.");
  } else if (isNearPortal()) {
    setMapMessage(zone.portal + " encontrado! Pressione E para viajar.");
  } else {
    setMapMessage("Explore o mapa. Procure o NPC e o portal!");
  }
}

function interactMap() {
  if (mapState.moving) return;

  const zone = currentZone();

  if (isNearNPC()) {
    const pending = game.quests.filter(q => !q.completed).length;
    const extra = pending > 0
      ? ` Você ainda tem ${pending} ${pending === 1 ? "missão pendente" : "missões pendentes"} hoje.`
      : " Você completou todas as missões de hoje. Parabéns!";

    portalArmedAt = 0;
    setMapMessage(zone.npc + ": " + zone.dialogue + extra);
    return;
  }

  if (isNearPortal()) {
    const now = Date.now();

    // Primeiro E mostra o aviso; o segundo E viaja
    if (now - portalArmedAt > 5000) {
      portalArmedAt = now;
      setMapMessage(zone.portal + ": " + zone.portalDialogue + " Pressione E novamente para viajar.");
      return;
    }

    portalArmedAt = 0;

    const nextZone = (game.zone + 1) % zones.length;

    game.zone = nextZone;
    game.mapX = zones[nextZone].spawn.x;
    game.mapY = zones[nextZone].spawn.y;

    if (!game.visitedZones.includes(nextZone)) {
      game.visitedZones.push(nextZone);
    }

    syncMapState();
    mapState.facing = "down";
    mapState.fade = 1;

    updateAchievements();
    saveGame();
    renderAll();

    setMapMessage("Você chegou a " + currentZone().name + "!");
    notify("Novo universo explorado!");
    return;
  }

  setMapMessage("Não há ninguém ou nenhum portal perto de você.");
}

/* =====================================
   CONTROLES DO MAPA
===================================== */

document.addEventListener("keydown", event => {
  if (!isMapOpen()) return;

  const target = event.target;

  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  ) return;

  const key = event.key.toLowerCase();
  const dir = KEY_DIRS[key];

  if (dir) {
    event.preventDefault();
    if (!heldKeys.includes(dir)) heldKeys.push(dir);
    mapState.target = null;
    return;
  }

  if (key === "e") {
    event.preventDefault();
    if (!event.repeat) interactMap();
  }
});

document.addEventListener("keyup", event => {
  const dir = KEY_DIRS[event.key.toLowerCase()];
  if (!dir) return;

  const index = heldKeys.indexOf(dir);
  if (index !== -1) heldKeys.splice(index, 1);
});

window.addEventListener("blur", () => {
  heldKeys.length = 0;
});

document.getElementById("interactBtn").addEventListener("click", interactMap);

/* Toque: tocar anda até o ponto; deslizar dá um passo na direção */
let touchStart = null;

mapCanvas.addEventListener("pointerdown", event => {
  touchStart = { x: event.clientX, y: event.clientY };
});

mapCanvas.addEventListener("pointerup", event => {
  if (!touchStart) return;

  const dx = event.clientX - touchStart.x;
  const dy = event.clientY - touchStart.y;
  touchStart = null;

  if (Math.abs(dx) < 15 && Math.abs(dy) < 15) {
    const rect = mapCanvas.getBoundingClientRect();
    const scaleX = mapCanvas.width / rect.width;
    const scaleY = mapCanvas.height / rect.height;
    const tileX = Math.floor(((event.clientX - rect.left) * scaleX) / TILE);
    const tileY = Math.floor(((event.clientY - rect.top) * scaleY) / TILE);

    mapState.target = {
      x: Math.max(1, Math.min(MAP_WIDTH - 2, tileX)),
      y: Math.max(1, Math.min(MAP_HEIGHT - 2, tileY))
    };
    return;
  }

  mapState.target = null;

  if (Math.abs(dx) > Math.abs(dy)) {
    mapState.pending = dx > 0 ? "right" : "left";
  } else {
    mapState.pending = dy > 0 ? "down" : "up";
  }
});

mapCanvas.addEventListener("pointercancel", () => {
  touchStart = null;
});

/* =====================================
   EXPORTAR E IMPORTAR
===================================== */

document.getElementById("exportSave").addEventListener("click", () => {
  saveGame();

  const file = new Blob([JSON.stringify(game, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = "anime-life-rpg-save.json";
  link.click();

  URL.revokeObjectURL(url);
  notify("Salvamento exportado!");
});

document.getElementById("importSave").addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);

      if (
        !imported ||
        !Array.isArray(imported.quests) ||
        !Array.isArray(imported.unlockedSkills)
      ) {
        throw new Error("Arquivo inválido");
      }

      game = normalizeGame(imported);
      syncMapState();

      saveGame();
      checkDailyReset();
      updateLevel();
      updateAchievements();
      saveGame();
      renderAll();

      notify("Salvamento importado!");
    } catch (error) {
      notify("Não foi possível importar esse arquivo.");
    }

    event.target.value = "";
  };

  reader.readAsText(file);
});

/* =====================================
   REINICIAR JOGO
===================================== */

document.getElementById("resetGame").addEventListener("click", () => {
  const confirmed = confirm(
    "Tem certeza que deseja reiniciar seu progresso? Essa ação não pode ser desfeita."
  );

  if (!confirmed) return;

  game = createInitialState();
  syncMapState();
  saveGame();
  renderAll();
  openPage("home");
  notify("Seu progresso foi reiniciado.");
});

/* =====================================
   INICIALIZAÇÃO
===================================== */

checkDailyReset();
updateLevel();
updateAchievements();
saveGame();
syncMapState();
renderAll();
openPage("home");

/* Renova as missões se o jogo ficar aberto durante a virada do dia */
function refreshIfNewDay() {
  if (checkDailyReset()) {
    renderAll();
    notify("Novas missões diárias disponíveis!");
  } else {
    renderStats();
  }
}

setInterval(refreshIfNewDay, 60000);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) refreshIfNewDay();
});
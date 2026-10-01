// UGXGIG — shared configuration
// Swap any value below if a number or group changes. Nothing else needs editing.

const ADMIN_WA_NUMBER = "256753548775"; // receives boss job posts + worker applications fall back here
const PAYMENT_NUMBER = "0707281801";    // mobile money line for all payments (budgets, fees, entries)

const GROUP_LINKS = {
  // Tier 1 — 10 players, 5,500 UGX entry, kill pot, battle-royale style
  "racers-2": "https://chat.whatsapp.com/C8DHvDg7epe3Y1A97Kycyq",
  "last-man": "https://chat.whatsapp.com/I2F0SJQHdTBAZ6L3tJdJjm",
  "maze-escape": "https://chat.whatsapp.com/HbbLMiNHTxg1BfKOd67TZt",

  // Tier 2 — 4 players, 2,500 UGX entry
  "racers-1": "https://chat.whatsapp.com/BfsccBnjE6u7kJX70Fguva",
  "spelling-battles": "https://chat.whatsapp.com/CbNtzQGonzaLEwypEbyfG2",
  "ludo-2": "https://chat.whatsapp.com/IfI15Lcwb3U7jLaZ4SYlvI",
  "colour-sort": "https://chat.whatsapp.com/CkLbjtPGU7e4cEvZyCdOaJ",

  // Tier 3 — 2 players, 1,000 UGX entry
  "canon-fleet": "https://chat.whatsapp.com/DzqzmyT9v8B5KlUgYnVEa5",
  "whack-a-mole": "https://chat.whatsapp.com/DuehOWCzDuHG5SCyuJqjua",
  "jigsaw-puzzle-tournaments": "https://chat.whatsapp.com/HjgMtSgMw7CIKZAuimrtwd",
  "memory-match": "https://chat.whatsapp.com/LplwWzbXnLj9tPDeikN5CW",

  // Daily ticket tournament — small chat group (players submit tickets here)
  "tournament": "https://chat.whatsapp.com/H8tBwuOV3Kq69sqAr91EQZ",

  // Referral tracking group
  "referral": "https://chat.whatsapp.com/KTUjLovVM8IA0as4Y9yzNt",
};

const TIERS = {
  tier3: {
    label: "Tier 3",
    players: 2,
    entry: 1000,
    payout: 1500,
    cut: 200,
    tournamentFeed: 300,
    killPot: 0,
    style: "Simple 2D games",
    games: ["canon-fleet", "whack-a-mole", "jigsaw-puzzle-tournaments", "memory-match"],
  },
  tier2: {
    label: "Tier 2",
    players: 4,
    entry: 2500,
    payout: 7500,
    cut: 2000,
    tournamentFeed: 500,
    killPot: 0,
    style: "Skill & party games",
    games: ["racers-1", "spelling-battles", "ludo-2", "colour-sort"],
  },
  tier1: {
    label: "Tier 1",
    players: 10,
    entry: 5500,
    payout: 30000,
    cut: 10000,
    tournamentFeed: 5000,
    killPot: 10000,
    style: "Battle royale — kill pot pays 1,000/kill",
    games: ["racers-2", "last-man", "maze-escape"],
  },
};

const GAME_NAMES = {
  "racers-2": "Racers 2",
  "last-man": "Last Man",
  "maze-escape": "Maze Escape",
  "racers-1": "Racers 1",
  "spelling-battles": "Spelling Battles",
  "ludo-2": "Ludo 2",
  "colour-sort": "Colour Sort",
  "canon-fleet": "Canon Fleet",
  "whack-a-mole": "Whack-a-Mole",
  "jigsaw-puzzle-tournaments": "Jigsaw Puzzle Tournaments",
  "memory-match": "Memory Match",
};

// ---- helpers shared by every page ----

// Opens a direct WhatsApp chat with text already sitting in the message box.
// Only works for a real phone number — NOT a group invite link (WhatsApp
// doesn't allow prefilled text on group links).
function openDirectChat(number, text) {
  const digits = number.replace(/[^\d]/g, "");
  const url = `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

// Group invite links can't carry prefilled text, so instead we copy the
// summary to the clipboard and open the group, and tell the person to paste.
function openGroupWithMessage(groupKey, text) {
  const link = GROUP_LINKS[groupKey];
  copyText(text);
  window.open(link, "_blank");
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => {});
  } else {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }
}

function fmtUGX(n) {
  return "UGX " + n.toLocaleString("en-UG");
}

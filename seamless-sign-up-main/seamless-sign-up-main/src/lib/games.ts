export type GameSlug =
  | "ipl-live-betting"
  | "football"
  | "teen-patti"
  | "roulette"
  | "andar-bahar"
  | "live-dealer";

import iplImg from "@/assets/game-ipl.png";
import footballImg from "@/assets/game-football.png";
import teenpattiImg from "@/assets/game-teenpatti.png";
import rouletteImg from "@/assets/game-roulette.png";
import andarbaharImg from "@/assets/game-andarbahar.png";
import livedealerImg from "@/assets/game-livedealer.png";

export type Game = {
  slug: GameSlug;
  title: string;
  tag: string;
  icon: "trophy" | "target" | "spade" | "dice" | "gamepad" | "zap";
  image: string;
  tagline: string;
  description: string;
  howToPlay: string[];
  minStake: string;
};

export const GAMES: Record<GameSlug, Game> = {
  "ipl-live-betting": {
    slug: "ipl-live-betting",
    title: "IPL Live Betting",
    tag: "Cricket",
    icon: "trophy",
    image: iplImg,
    tagline: "Ball-by-ball back & lay markets",
    description:
      "Live IPL exchange with real-time odds, session bets, fancy markets and instant settlement after every over.",
    howToPlay: [
      "Get your Cricbet99 ID on WhatsApp",
      "Deposit via UPI from your wallet",
      "Pick a match and place back/lay on any market",
      "Winnings settle instantly to your wallet",
    ],
    minStake: "₹100",
  },
  football: {
    slug: "football",
    title: "Football Markets",
    tag: "Sports",
    icon: "target",
    image: footballImg,
    tagline: "Full match, halves, and correct score",
    description:
      "EPL, La Liga, Champions League and Indian Super League — pre-match plus in-play with live odds updates.",
    howToPlay: [
      "Choose a match from the fixtures list",
      "Pick 1X2, Over/Under, or correct score",
      "Stake within your wallet balance",
      "Cash out any time before final whistle",
    ],
    minStake: "₹100",
  },
  "teen-patti": {
    slug: "teen-patti",
    title: "Teen Patti",
    tag: "Card Game",
    icon: "spade",
    image: teenpattiImg,
    tagline: "3-card classic with live dealers",
    description:
      "India's favourite card game with side bets, boot rounds and live-streamed tables 24/7.",
    howToPlay: [
      "Join a table that matches your stake",
      "Place your boot before cards deal",
      "Play blind, chaal or fold each round",
      "Win the pot with the strongest hand",
    ],
    minStake: "₹50",
  },
  roulette: {
    slug: "roulette",
    title: "Roulette",
    tag: "Casino",
    icon: "dice",
    image: rouletteImg,
    tagline: "European & Lightning variants",
    description:
      "European single-zero and Lightning Roulette with up to 500x multipliers on straight-up numbers.",
    howToPlay: [
      "Place chips on numbers, colours or splits",
      "Wait for the wheel to spin",
      "Payouts credited automatically",
      "Rebet with one click",
    ],
    minStake: "₹50",
  },
  "andar-bahar": {
    slug: "andar-bahar",
    title: "Andar Bahar",
    tag: "Card Game",
    icon: "gamepad",
    image: andarbaharImg,
    tagline: "Fastest hands in the house",
    description:
      "Traditional Indian card game with side bets on suit and range. Rounds finish in under 30 seconds.",
    howToPlay: [
      "Pick Andar or Bahar",
      "The joker card is revealed",
      "Dealer deals until match hits your side",
      "Instant payout — 0.9x for main bet",
    ],
    minStake: "₹50",
  },
  "live-dealer": {
    slug: "live-dealer",
    title: "Live Dealer",
    tag: "Casino",
    icon: "zap",
    image: livedealerImg,
    tagline: "Blackjack, Baccarat & more",
    description:
      "HD-streamed studio tables with professional dealers. Chat, tip, and play as long as you like.",
    howToPlay: [
      "Choose a table (Blackjack, Baccarat, Sic Bo)",
      "Set your stake and place your bet",
      "Follow the dealer in real time",
      "Winnings settle after each hand",
    ],
    minStake: "₹100",
  },
};

export const GAME_LIST = Object.values(GAMES);

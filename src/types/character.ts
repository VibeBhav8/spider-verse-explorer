export interface CharacterStats {
  strength: number;
  agility: number;
  speed: number;
  intellect: number;
}

export interface Character {
  id: string;
  name: string;
  alias: string;
  universe: string;
  powers: string[];
  bio: string;
  themeColor: string;
  accentColor: string;
  imageUrl: string;
  renderUrl?: string;
  avatarUrl?: string;
  quote: string;
  firstAppearance: string;
  stats: CharacterStats;
  badge?: string;
}

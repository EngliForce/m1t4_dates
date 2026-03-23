export interface ScoreEntry {
  name: string;
  score: number;
  lastUpdate: number;
}

export interface WebSocketMessage {
  type: 'SCORE_UPDATE' | 'INITIAL_SCORES' | 'JOIN';
  payload?: any;
}

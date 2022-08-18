export interface Store {
  settings: {
    theme: 'light' | 'dark' | 'system';
    accuracy: 'low' | 'normal' | 'high';
    newLapAccuracy: number;
  };
}

export interface Action {
  type: 'set';
  value?: Partial<Store>;
}

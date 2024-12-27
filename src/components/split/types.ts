export interface Participant {
  id: string;
  identifier: string;
  share: number;
  percentage?: number;
}

export type SplitStep = 'participants' | 'amount' | 'percentages' | 'confirm';
import { ICard } from './card.interface';

export interface IPlayer {
  id: string;
  userName: string;
  cards: ICard[];
}
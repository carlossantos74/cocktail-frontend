export interface Cocktail { 
  idDrink: string
  strCategory: string
  strDrinkThumb: string 
  strDrink: string
}

export enum StateType {
  LOADING = 'loading',
  ERROR = 'error',
  EMPTY = 'empty',
}
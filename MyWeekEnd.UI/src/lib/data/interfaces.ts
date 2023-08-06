export interface IDatabaseCollection<T> {
  add(items: T[]): boolean;
  get(conditions: any): T[];
  update(items: T[]): boolean;
  delete(conditions: any): boolean;
}
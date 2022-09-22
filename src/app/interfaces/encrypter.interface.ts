export interface IEncrypter {
  hash(text: string, salt?: number) : Promise<string> | string;
  compare(text: string, hash: string) : Promise<boolean> | boolean;
}
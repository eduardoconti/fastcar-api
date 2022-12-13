export interface IEncrypter {
   hash(text: string, salt?: number): Promise<string>;
   compare(text: string, hash: string): Promise<boolean>;
}

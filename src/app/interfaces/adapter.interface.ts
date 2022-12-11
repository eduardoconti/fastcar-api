export interface IAdapter<I> {
   adapt(slug?: string): I;
}

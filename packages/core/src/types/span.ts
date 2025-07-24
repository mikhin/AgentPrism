export type Span = {
  id: string;
  title: string;
  description: string;
  children?: Span[];
};

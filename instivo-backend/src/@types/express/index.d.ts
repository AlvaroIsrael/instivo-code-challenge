// biome-ignore lint/style/noNamespace: <explanation>
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}

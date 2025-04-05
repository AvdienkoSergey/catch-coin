declare const loader: (options: {
    displayErrors: boolean;
    timeout: number;
  }) => (filePath: string, sandbox: object) => Promise<object>;
  
  export default loader;
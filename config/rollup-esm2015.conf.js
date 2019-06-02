import external from "./externals";

export default {
  input: 'tmp/esm2015/ivy-rest.js',
  output: {
    file: 'dist/esm2015/ivy-rest.js',
    format: 'es',
    sourcemap: true
  },
  external,
};

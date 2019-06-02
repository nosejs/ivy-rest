import external from './externals';

export default {
  input: 'tmp/esm5/ivy-rest.js',
  output: {
    file: 'dist/esm5/ivy-rest.js',
    format: 'es',
    sourcemap: true
  },
  external,
};

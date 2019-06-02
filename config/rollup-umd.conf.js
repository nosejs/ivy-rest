import external from "./externals";

export default {
  input: 'tmp/esm5/ivy-rest.js',
  output: {
    file: 'dist/bundles/ivy-rest.umd.js',
    format: 'umd',
    name: 'ngxRestangular',
    globals: {
      // Angular dependencies
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
      '@angular/common/http': 'ng.common.http',
      'lodash': '_',
      'core-js/fn/object': 'core.Object',
      'rxjs/Observable': 'Rx.Observable',
      'rxjs/BehaviorSubject': 'Rx.BehaviorSubject',
    },
  },
  external,
};

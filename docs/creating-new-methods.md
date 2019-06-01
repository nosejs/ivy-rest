## Creating new Restangular Methods

Let's assume that your API needs some custom methods to work. If that's the case, always calling customGET or customPOST for that method with all parameters is a pain in the ass. That's why every element has a `addRestangularMethod` method.

This can be used together with the hook `addElementTransformer` to do some neat stuff. Let's see an example to learn this:

````javascript
// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
  // It will transform all building elements, NOT collections
  RestangularProvider.addElementTransformer('buildings', false, function(building) {
    // This will add a method called evaluate that will do a get to path evaluate with NO default
    // query params and with some default header
    // signature is (name, operation, path, params, headers, elementToPost)

    building.addRestangularMethod('evaluate', 'get', 'evaluate', undefined, {'myHeader': 'value'});

    return building;
  });

  RestangularProvider.addElementTransformer('users', true, function(user) {
    // This will add a method called login that will do a POST to the path login
    // signature is (name, operation, path, params, headers, elementToPost)

    user.addRestangularMethod('login', 'post', 'login');

    return user;
  });
}

// AppModule is the main entry point into Angular2 bootstraping process
@NgModule({
  bootstrap: [ AppComponent ],
  imports: [ // import Angular's modules
    RestangularModule.forRoot(RestangularConfigFactory),
  ],
})

// Then, later in your code you can do the following:

// GET to /buildings/123/evaluate?myParam=param with headers myHeader: value

// Signature for this "custom created" methods is (params, headers, elem) if it's a safe operation (GET, OPTIONS, etc.)
// If it's an unsafe operation (POST, PUT, etc.), signature is (elem, params, headers).

// If something is set to any of this variables, the default set in the method creation will be overridden
// If nothing is set, then the defaults are sent
Restangular.one('buildings', 123).evaluate({myParam: 'param'});

// GET to /buildings/123/evaluate?myParam=param with headers myHeader: specialHeaderCase

Restangular.one('buildings', 123).evaluate({myParam: 'param'}, {'myHeader': 'specialHeaderCase'});

// Here the body of the POST is going to be {key: value} as POST is an unsafe operation
Restangular.all('users').login({key: value});

````

**[Back to top](#table-of-contents)**

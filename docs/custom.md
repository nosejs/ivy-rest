# Custom

## Adding Custom Methods to Collections

Create custom methods for your collection using Restangular.extendCollection(). This is an alias for:

```js
  RestangularProvider.addElementTransformer(route, true, fn);
```

### Example:
```js
  // create methods for your collection
  Restangular.extendCollection('accounts', function(collection) {
    collection.totalAmount = function() {
      // implementation here
    };

    return collection;
  });

  var accounts$ = Restangular.all('accounts').getList();

  accounts$.subscribe( accounts => {
    accounts.totalAmount(); // invoke your custom collection method
  });
```

**[Back to top](#table-of-contents)**

## Adding Custom Methods to Models

Create custom methods for your models using Restangular.extendModel(). This is an alias for:

```js
  RestangularProvider.addElementTransformer(route, false, fn);
```

**[Back to top](#table-of-contents)**

### Example:
```js
  Restangular.extendModel('accounts', function(model) {
    model.prettifyAmount = function() {};
    return model;
  });

  var account$ = Restangular.one('accounts', 1).get();

  account$.subscribe(function(account) {
    account.prettifyAmount(); // invoke your custom model method
  });
```

**[Back to top](#table-of-contents)**

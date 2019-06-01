# FAQ

#### **How can I handle errors?**

Errors can be checked on the second argument of the subscribe.

````javascript
Restangular.all("accounts").getList().subscribe( response => {
  console.log("All ok");
}, errorResponse => {
  console.log("Error with status code", errorResponse.status);
});
````

#### **I need to send Authorization token in EVERY Restangular request, how can I do this?**

You can use `setDefaultHeaders` or `addFullRequestInterceptor`

````javascript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RestangularModule } from 'ngx-restangular';
import { authService } from '../your-services';

// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider, authService) {

  // set static header
  RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});

  // by each request to the server receive a token and update headers with it
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    let bearerToken = authService.getBearerToken();

    return {
      headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
    };
  });
}

// AppModule is the main entry point into Angular2 bootstraping process
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
  ],
  imports: [
    // Importing RestangularModule and making default configs for restanglar
    RestangularModule.forRoot([authService], RestangularConfigFactory),
  ]
})
export class AppModule {
}
````
**[Back to top](#table-of-contents)**


#### **I need to send one header in EVERY Restangular request, how can I do this?**

You can use `defaultHeaders` property for this. `defaultsHeaders` can be scoped with `withConfig` so it's really cool.

#### **How can I send a delete WITHOUT a body?**

You must add a requestInterceptor for this.

````js
RestangularProvider.setRequestInterceptor(function(elem, operation) {
  if (operation === "remove") {
     return null;
  }
  return elem;
})
````

#### **I use Mongo and the ID of the elements is `_id` not `id` as the default. Therefore requests are sent to undefined routes**

What you need to do is to configure the `RestangularFields` and set the `id` field to `_id`. Let's see how:

````javascript
RestangularProvider.setRestangularFields({
  id: "_id"
});
````

#### **What if each of my models has a different ID name like CustomerID for Customer**

In some cases, people have different ID name for each entity. For example, they have CustomerID for customer and EquipmentID for Equipment. If that's the case, you can override Restangular's getIdFromElem. For that, you need to do:

````js
RestangularProvider.configuration.getIdFromElem = function(elem) {
  // if route is customers ==> returns customerID
  return elem[_.initial(elem.route).join('') + "ID"];
}
````
With that, you'd get what you need :)

#### **How can I send files in my request using Restangular?**

This can be done using the customPOST / customPUT method. Look at the following example:
````js
Restangular.all('users')
.customPOST(formData, undefined, undefined, { 'Content-Type': undefined });
````
This basically tells the request to use the *Content-Type: multipart/form-data* as the header. Also *formData* is the body of the request, be sure to add all the params here, including the File you want to send of course.

#### **How do I handle CRUD operations in a List returned by Restangular?**

````javascript
Restangular.all('users').getList().subscribe( users => {
  this.users = users;
  var userWithId = _.find(users, function(user) {
    return user.id === 123;
  });

  userWithId.name = "Gonto";
  userWithId.put();

  // Alternatively delete the element from the list when finished
  userWithId.remove().subscribe( () => {
    // Updating the list and removing the user after the response is OK.
    this.users = _.without(this.users, userWithId);
  });

});
````

#### Removing an element from a collection, keeping the collection restangularized

While the example above removes the deleted user from the collection, it also overwrites the collection object with a plain array (because of `_.without`) which no longer knows about its Restangular attributes.

If want to keep the restangularized collection, remove the element by modifying the collection in place:

```javascript
userWithId.remove().subscribe( () => {
  let index = $scope.users.indexOf(userWithId);
  if (index > -1) this.users.splice(index, 1);
});
```

#### How can I access the `unrestangularized` element as well as the `restangularized` one?

In order to get this done, you need to use the `responseExtractor`. You need to set a property there that will point to the original response received. Also, you need to actually copy this response as that response is the one that's going to be `restangularized` later

````javascript
RestangularProvider.setResponseExtractor( (response) => {
  var newResponse = response;
  if (_.isArray(response)) {
    _.forEach(newResponse, function(value, key) {
      newResponse[key].originalElement = _.clone(value);
    });
  } else {
    newResponse.originalElement = _.clone(response);
  }

  return newResponse;
});
````
Alternatively, if you just want the stripped out response on any given call, you can use the .plain() method, doing something like this:

````javascript

this.showData = function () {
  baseUrl.post(someData).subscribe( (response) => {
    console.log(response.plain());
  });
};
````

**[Back to top](#table-of-contents)**

#### How can add withCredentials params to requests?
````javascript
// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
  // Adding withCredential parametr to all Restangular requests
  RestangularProvider.setDefaultHttpFields({ withCredentials: true });
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
  ],
  imports: [
    // Global configuration
    RestangularModule.forRoot(RestangularConfigFactory),
  ]
})
export class AppModule {}
````

**[Back to top](#table-of-contents)**

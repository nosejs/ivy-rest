## Using values directly in templates with Observables

If you want to use values directly in templates use `AsyncPipe`

````js
this.accounts = this.restangular.all('accounts').getList();
````

````html
<tr *ngFor="let account of accounts | async">
  <td>{{account.fullName}}</td>
</tr>
````

**[Back to top](#table-of-contents)**

# Style Guide and Conventions

### Localization and Internationalization

- Consider namespacing translation keys by module and keep a consistent key naming scheme. It helps to keep translation keys short and the file organized and easy to navigate
- Add a comment on top of the file to describe the namespace
- Separate translation key by sections according to either application domain (models) or visual structure (components)

This is a tricky topic so it can get really messy quickly

For example, for a `ProductManagementModule` you could have

```
{
  /*
  * Namespace: PMM => Product Management Module
  */

  // GENERAL
  'pmm.global.products.page-name': '...',
  'pmm.global.products.tab-title': '...',

  // PRODUCTS
  'pmm.products.properties.name': '...',
  'pmm.products.properties.price': '...',
  'pmm.products.modal.title': '...',

  // PRODUCTS VALIDATION
  'pmm.products.validation.name-required': '...',
  'pmm.products.validation.name-min-length': '...',
}
```

### Keep a consistent module folder structure

- Keep files in folder by type
- Use dash-case and suffixes like .component and .model (ng-cli helps a lot with this and by adopting the naming standard we can keep consistency)
- Consider making a distinction between container components and presentational components. This is a good practice in component based architecture. In a nutshell: - A container is essentially a 'smart component' that is aware of services, sandboxes* or state management*. They are generally not meant to be reused, they are used to contain other smaller presentational components. (thus the name 'container'). An example could be a `ProductPage` component or a `ProductList` component - A presentational component (also sometimes named 'dumb component') is a small component meant to be as atomic or reusable as possible. They are not aware of app-wide state or services, they receive configurations via @Inputs and communicate to parents via @Outputs thus keeping a consistent API which makes them easy to reuse, refactor and test. An example could be a `FeaturedButton` component or a `ClientInfoPreview` component. Read more online on the topic of 'Smart and Dumb components'
- Choose only 1 css style type for component styles (css, sass, scss, less) and stick with it. For the current project the selected one is CSS.
- Avoid component folder nesting (putting a component inside another component's folder) to keep the folder structure as flat as possible making it easier to navigate in it.

(\*) More on sandboxes and state management later on

For example

```
|ProductsManagement
 |-components
 | |-ProductForm
 |   |-product-form.component.ts|html|css|spec
 | |-ProductIcons
 |   |product-icons.component.ts|html|css|spec
 |-containers
 | |-ProductList
 |   |-product-list.component.ts|html|css|spec
 |-guards
 | |-products-loaded.guard.ts
 |-services
 | |-products.service.ts
 | |-shopping-cart.service.ts
 |-models
 | |-product.model.ts
 | |-cart-item.model.ts
 |+store
 |-products-management.module.ts
 |-products-management-routing.module.ts
 |-products-management.sandbox.ts
```

### Naming conventions

- camelCase variables and classMethods: Why? Because it's standard in javascript
- Add a $ suffix to observables: Why? Because it makes them easy to identify in html templates and component classes
- Typescript interfaces without 'I' prefix. Why? Because a typescript interface does not generate any javascript code, and according to the [typescript guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines) they discourage the use of the 'I' prefix, which is also mentioned in the official Angular Style Guide
- Name component @Output emitters imperatively, without 'on' prefix. Why? **This is consistent with built-in events such as button clicks**. Also, **Angular allows for an alternative syntax on-\*. If the event itself was prefixed with on this would result in an on-onEvent binding expression**. (as per the official Angular Style Guide)

Examples:

```
export interface CustomInterface {
  ...
}

@Component({
  ...
})
export class MyComponent implements OnInit, CustomIterface {

  myStream$: Observable<any>

  @Output()
  save = new EventEmitter<any>()

}
```

### Editor configs

- Use tabs instead of spaces for indentation
- Use a tab width of 2
- Prefer single quotes over double quotes

Recommended extensions for vscode users

- Prettier (code autoformatter and linter)
- Angular Language Service (code completion on component html templates)
- IntelliSense for css (as the name implies)

### Other

**Optional:** A very useful technique in javascript/typescript to be used is the 'barrel files' technique. It consists on creating an index.ts file on a folder and exporting everything the folder contains, this way it's easier to import something from that folder somewhere else.

Example:

```
|-components
  |+ProductList
  |+ProductItem
  |-index.ts
```

```
// index.ts
export const components: any[] = [
  ProductListComponent,
  ProductItemComponent
]

export * from './ProductList/product-list.component.ts'
export * from './ProductItem/product-item.component.ts'

-------------------------------------------------------

// later, in any other file

import * as fromComponents from './path/to/components/root'

const ROUTES: Routes = [
  {
    path: 'product-item',
    // All components under 1 object import
    component: fromComponents.ProductItemComponent
  }
]

// or better yet, in a module
@NgModule({
  // Concise and easy to add/remove new components
  // to declarations, exports or other module metadata
  // without changing module
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components]
})
```

### About State Management and the Sandbox pattern

State Management is a technique that leverages the principles of the flux architechture created by Facebook. The most widely used library for state management is redux, with React having the react-redux package and Angular the @ngrx/store library. It's a rather long topic to describe in a few words here, It's highly recommended to check it out online for it is a technique that greatly helps in keeping apps predictable, easy to keep track of changes and reactive.

The sandbox pattern is very useful in Angular apps. It introduces an abstraction layer which helps in separating the container (or smart) components from knowing the specifics of services or state management providers used in the app, also reducing the amount of dependencies the container component has, which ultimately makes it easier to refactor and test. Basically a sandbox is a service which gets injected to the component and it provides it with everything the component might need from a service or the state management layer (similar to a facade but not exactly the same). This way the component gets fewer dependencies (the sandbox) which it's easy to mock for a service is nothing but a class. Again, check online for a better explanation.

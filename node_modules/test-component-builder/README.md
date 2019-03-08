# Test Component Builder

A component builder used for testing. Mainly built for testing react components but is not limited to react.

To install run `npm install test-component-builder`

Example of using the component to build a simple `Calendar` component that accepts some properties.

```js
import constructBuilder from "test-component-builder";

const builder = props => {
  //... some mocking
  /*return <Calendar {...props} />;*/
};

let calendarBuilder;
describe("test block description", () => {
  beforeEach(() => {
    calendarBuilder = constructBuilder(builder).with({
      /* some default props */
    });
  });

  it("test description", () => {
    const calendar = calendarBuilder
      .with({
        /*some specialized props*/
      })
      .using(/* some renderer, fx shallow from enzyme or react-testing-library */)
      .create(); /* <---- important, otherwise the resulting 
            object won't be created */

    /* ..asserts etc */
  });
});
```

If it is a requirement that the mocked components have parameters, this can be created using the `inject` method.

```js
import constructBuilder from "test-component-builder";

const builder = props => deeperProps => {
  //... some mocking
  //... some mocking requireing parameters based on the test
  /*return <Calendar {...props} />;*/
};

let calendarBuilder;
describe("test block description", () => {
  beforeEach(() => {
    calendarBuilder = constructBuilder(builder).with({
      /* some default props */
    });
  });

  it("test description", () => {
    const calendar = calendarBuilder
      .with({
        /*some specialized props*/
      })
      .using(/* some renderer, fx shallow from enzyme or react-testing-library */)
      .inject(/* some props relative to this test */)
      .create(); /* <---- important, otherwise the resulting 
            object won't be created */

    /* ..asserts etc */
  });
});
```

The `inject` method works by injecting the props in the chained functions in order. for example `inject(a).inject(b)...` would inject like `props => a => b =>...`. `inject` also works as a step in the `beforeEach` method and any other method that is run before each test.

The only method that cannot be chained is the `create` method, this is the method that creates the final result of the builder, and must be run last.

## Outline

| Method                              | Parameters                                                                                | Description                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `with(properties)`                  | _properties_ : **object**                                                                 | Merges all the `properties` that are chained together with the `with` method. <br><br>\*These are merged with lodash assign.                                                                                                                                                                                                                                                                                            |
| `inject(values, clone)`             | _values_ : **object**<br><br>_clone_ : **boolean** **default: true**                      | Injects all the `values` that are chained together with the `inject` method in sequence. For example `inject(a).inject(b)...` would inject like `props => a => b => ....` <br><br>_values are cloned by default._                                                                                                                                                                                                       |
| `override(key, values)`             | _values_ : **object**                                                                     | Searches for injected values that matches `{ key: key }` and merges the passed in values with the values found. <br><br>_These are merged with lodash assign. If no key is found then this does nothing_                                                                                                                                                                                                                |
| `using(wrapper, prewrapper = null)` | _wrapper_ : **function(result): _result_** <br><br> _prewrapper_ : **function(): _void_** | Runs after both `with` and `inject` methods have been run on the whole chain. `using` accepts the result of the chain as an input; so chaining multiple `using` statements runs them in sequence, passing the previous wrapped result to the next chained wrapped. <br><br> _If a `prewrapper` is passed, it will be run before the wrapper and can be used fx. to make sure that the dom is cleared before rendering._ |
| `create()`                          |                                                                                           | Runs the chains that are created using the other methods in this order. `with*` -> `inject*` -> `using*` -> `result`. All other methods return the builder back, this returns the finished instance.                                                                                                                                                                                                                    |

These rendereres are recommended when using `test-component-builder` for testing react components.

2. [react-testing-library](https://github.com/kentcdodds/react-testing-library) by Kent C. Dodds
1. [Enzyme](https://github.com/airbnb/enzyme) by Airbnb

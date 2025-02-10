# React Manual Error Handling
By default, [Error Boundaries](https://legacy.reactjs.org/docs/error-boundaries.html) do not catch errors thrown during event handlers or in asynchronous code. This hook is a basic one that allows you to redirect these errors through the use of state so that they are thrown by the component itself and caught by the boundary.

The hook is exported as default, so you can import in one of the following ways:
```javascript
// ES6
import useManualErrorHandling from '@ptolemy2002/react-manual-error-handling';
// CommonJS
const useManualErrorHandling = require('@ptolemy2002/react-manual-error-handling');
```

## Type Reference
```typescript
type TryFunction<T> = (fn: () => Promise<T> | T) => Promise<T | void>;
type ThrowFunction = (e: unknown) => void;
type UseManualErrorHandlingResult<T> =
  HookResult<{_try: TryFunction<T>, _throw: ThrowFunction}, TryFunction<T> | ThrowFunction>
  & {_try: TryFunction<T>, _throw: ThrowFunction}
  & [TryFunction<T>, ThrowFunction]
;
```

DO NOT attempt to access array properties in `UseManualErrorHandlingResult` directly, as it doesn't actually have those properties. The array is used so that destructuring works correctly.

## Hooks
The following hooks are available in the library:

### useManualErrorHandling<T = any>(): UseManualErrorHandlingResult<T>
#### Description
When using the hook, you get two functions: `_try` and `_throw`. `_throw` simply needs to be called with an error as the only argument. `_try` is an async function itself that is called with a callback function as the only argument. It will attempt running the callback and use `_throw` if an error is thrown. The callback can be either a normal function or async. Here's an example of usage:

```javascript
function Main() {
    const { _try } = useManualErrorHandling();
    const handleClick = () => _try(() => errorDelay(1000));

    return (
        <button onClick={handleClick}>Click to throw an error after 1 second</button>
    );
}
```

The `errorDelay` function is a simple function that throws an error after a delay. This example can be seen in action within the library's repository.

`T` represents the type that the callback function must return.

### Parameters
None

### Returns
- `UseManualErrorHandlingResult<T>`: An object containing the `_try` and `_throw` functions. The object can be accessed as an object or as an array, courtesy of the `HookResult` class.

## Peer Dependencies
- `react^18.3.1`
- `react-dom^18.3.1`
- `@ptolemy2002/react-hook-result^2.1.1`
- `@ptolemy2002/ts-utils^3.0.0`

## Commands
The following commands exist in the project:

- `npm run build` - Builds the library
- `npm run dev` - Starts the development server
- `npm run lint` - Lints the project
- `npm run uninstall` - Uninstalls all dependencies for the library and clears the cache
- `npm run reinstall` - Uninstalls, clears the cache, and then reinstalls all dependencies for the library
- `npm run release` - Publishes the library to npm without changing the version
- `npm run release-patch` - Publishes the library to npm with a patch version bump
- `npm run release-minor` - Publishes the library to npm with a minor version bump
- `npm run release-major` - Publishes the library to npm with a major version bump
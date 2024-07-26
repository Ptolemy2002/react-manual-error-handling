# React Manual Error Handling
By default, [Error Boundaries](https://legacy.reactjs.org/docs/error-boundaries.html) do not catch errors thrown during event handlers or in asynchronous code. This hook is a basic one that allows you to redirect these errors through the use of state so that they are thrown by the component itself and caught by the boundary.

The hook is exported as default, so you can import in one of the following ways:
```
// ES6
import useManualErrorHandling from '@ptolemy2002/react-manual-error-handling';
// CommonJS
const useManualErrorHandling = require('@ptolemy2002/react-manual-error-handling');
```

When using the hook, you get two functions: `_try` and `_throw`. `_throw` simply needs to be called with an error as the only argument. `_try` is an async function itself that is called with a callback function as the only argument. It will attempt running the callback and use `_throw` if an error is thrown. The callback can be either a normal function or async. Here's an example of usage:

```
function Main() {
    const { _try } = useManualErrorHandling();
    const handleClick = () => _try(() => errorDelay(1000));

    return (
        <button onClick={handleClick}>Click to throw an error after 1 second</button>
    );
}
```

The `errorDelay` function is a simple function that throws an error after a delay. This example can be seen in action within the `example` app provided as part of the library's repository.

## Meta
This is a React Library Created by Ptolemy2002's [cra-template-react-library](https://www.npmjs.com/package/@ptolemy2002/cra-template-react-library) template in combination with [create-react-app](https://www.npmjs.com/package/create-react-app). It contains methods of building and publishing your library to npm.
For now, the library makes use of React 18 and does not use TypeScript.

## Commands
The following commands exist in the project:

- `npm run uninstall` - Uninstalls all dependencies for the library
- `npm run reinstall` - Uninstalls and then Reinstalls all dependencies for the library
- `npm run example-uninstall` - Uninstalls all dependencies for the example app
- `npm run example-install` - Installs all dependencies for the example app
- `npm run example-reinstall` - Uninstalls and then Reinstalls all dependencies for the example app
- `npm run example-start` - Starts the example app after building the library
- `npm run build` - Builds the library
- `npm run release` - Publishes the library to npm without changing the version
- `npm run release-patch` - Publishes the library to npm with a patch version bump
- `npm run release-minor` - Publishes the library to npm with a minor version bump
- `npm run release-major` - Publishes the library to npm with a major version bump
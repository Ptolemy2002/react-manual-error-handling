import {useState, useCallback} from 'react';
import HookResult from "@ptolemy2002/react-hook-result";

export type TryFunction<T> = (fn: () => Promise<T> | T) => Promise<T | void>;
export type ThrowFunction = (e: unknown) => void;
export type UseManualErrorHandlingResult<T> =
  HookResult<{_try: TryFunction<T>, _throw: ThrowFunction}, TryFunction<T> | ThrowFunction>
  & {_try: TryFunction<T>, _throw: ThrowFunction}
  & [TryFunction<T>, ThrowFunction]
;

export default function useManualErrorHandling<T=any>(): UseManualErrorHandlingResult<T> {
  const [, setError] = useState<unknown>(null);

  const _throw = useCallback<ThrowFunction>(
      (e) => {
          setError(() => {
              throw e;
          });
      },
      [setError]
  );

  const _try = useCallback<TryFunction<T>>(
      async (fn: () => Promise<T> | T) => {
          try {
              return await fn();
          } catch (e) {
              _throw(e);
          }
      },
      [_throw]
  );

  return new HookResult({ _try, _throw }, ["_try", "_throw"]) as UseManualErrorHandlingResult<T>;
};
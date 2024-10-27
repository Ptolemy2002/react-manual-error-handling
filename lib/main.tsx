import {useState, useCallback} from 'react';
import HookResult, {HookResultData} from "@ptolemy2002/react-hook-result";
import { MaybePromise } from '@ptolemy2002/ts-utils';

export type TryFunction<T> = (fn: () => MaybePromise<T>) => Promise<T | void>;
export type ThrowFunction = (e: unknown) => void;
export type UseManualErrorHandlingResult<T> = HookResultData<{ _try: TryFunction<T>, _throw: ThrowFunction }, readonly [TryFunction<T>, ThrowFunction]>;

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
import { CommandExecutor } from './interface';
import { OffscreenContextPolyfillMutationIndex } from '../../transfer/TransferrableMutation';
import { NumericBoolean } from '../../utils';
import { Strings } from '../strings';
import { deserialize } from '../global-id';

export function OffscreenPolyfillCallProcessor(strings: Strings): CommandExecutor {
  return {
    execute(mutations: Uint16Array, startPosition: number, target: RenderableElement): number {
      const argCount = mutations[startPosition + OffscreenContextPolyfillMutationIndex.ArgumentCount];
      const methodCalled = strings.get(mutations[startPosition + OffscreenContextPolyfillMutationIndex.MethodCalled]);
      const isSetter = mutations[startPosition + OffscreenContextPolyfillMutationIndex.IsSetter] === NumericBoolean.TRUE;

      const argsStart = startPosition + OffscreenContextPolyfillMutationIndex.Args;
      let { offset, args } = deserialize(mutations, argsStart, argCount, strings);

      if (methodCalled === 'setLineDash') {
        args = [args];
      }

      const mainContext = (target as HTMLCanvasElement).getContext('2d');
      if (isSetter) {
        (mainContext as any)[methodCalled] = args[0];
      } else {
        (mainContext as any)[methodCalled](...args);
      }

      return offset;
    },
    print(mutations: Uint16Array, startPosition: number, target?: RenderableElement | null): Object {
      const argCount = mutations[startPosition + OffscreenContextPolyfillMutationIndex.ArgumentCount];
      const methodCalled = strings.get(mutations[startPosition + OffscreenContextPolyfillMutationIndex.MethodCalled]);
      const isSetter = mutations[startPosition + OffscreenContextPolyfillMutationIndex.IsSetter] === NumericBoolean.TRUE;

      const argsStart = startPosition + OffscreenContextPolyfillMutationIndex.Args;
      let { offset, args } = deserialize(mutations, argsStart, argCount, strings);

      if (methodCalled === 'setLineDash') {
        args = [args];
      }

      return {
        type: 'OFFSCREEN_POLYFILL',
        target,
        ArgumentCount: argCount,
        MethodCalled: methodCalled,
        IsSetter: isSetter,
        Args: args,
        End: offset,
      };
    },
  };
}

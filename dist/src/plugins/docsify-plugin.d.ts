export default function initMiniSandbox(hook: {
    beforeEach: (fn: (content: string) => string) => void;
    doneEach: (fn: Function) => void;
}): void;

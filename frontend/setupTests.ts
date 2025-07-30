import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

const g = globalThis;

g.TextEncoder = TextEncoder;
// @ts-expect-error TextDecoder is not defined in NodeJS
g.TextDecoder = TextDecoder;
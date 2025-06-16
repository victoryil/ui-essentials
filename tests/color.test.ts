import { getColorFromString } from '../src';
import {describe, expect, it} from "vitest";

describe('getColorFromString', () => {
    it('always returns same color for same input', () => {
        expect(getColorFromString('Alice')).toBe(getColorFromString('Alice'));
    });
});
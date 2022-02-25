/**
 * Raise a runtime exception if a value is `null` or `undefined`.
 *
 * @param value The value to be asserted.
 */
export function defined(value: unknown): asserts value {
  if (value == null) {
    throw new Error("Value is not defined.");
  }
}

/**
 * Raise a runtime exception if a condition is not verified.
 *
 * @param value The condition to be checked.
 */
export function assert(condition: unknown): asserts condition {
  if (!condition) {
    throw new Error("Condition is not verified.");
  }
}

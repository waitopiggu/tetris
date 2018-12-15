export default {
  /**
   * Any
   * @param {boolean} previousValue
   * @param {boolean} currentValue
   */
  any: (previousValue, currentValue) => (
    previousValue || currentValue
  ),
  /**
   * Get Tetromino Block
   * @param {any} tetromino
   * @param {number} rotation
   */
  block: (tetromino, rotation) => (
    tetromino.rotations[rotation]
  ),
  /**
   * Next Index
   * @param {Array<any>} items
   * @param {number} currentIndex
   * @param {boolean} reverse
   */
  nextIndex: (items, currentIndex, reverse = false) => {
    if (reverse) {
      const nextIndex = currentIndex - 1;
      return nextIndex < 0 ? (items.length - 1) : nextIndex;
    }
    const nextIndex = currentIndex + 1;
    return nextIndex >= items.length ? 0 : nextIndex;
  },
  /**
   * Random Item
   * @param {Array<any>} items
   */
  randomItem: items => items[Math.floor(Math.random() * items.length)],
};

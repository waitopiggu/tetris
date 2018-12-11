export default {
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
   * Random Index
   * @param {Array<any>} items
   */
  randomIndex: items => Math.floor(Math.random() * items.length),
};

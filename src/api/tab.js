const LS_INDEX_KEY = '@shopping-cart/tab/tab-next-index';

class Tab {
  getLabel = () => {
    const index = this.#getIndex();
    const label = `Order #${index}`;
    this.#updateIndex(index + 1);
    return label;
  };

  #getIndex = () => {
    try {
      const value = localStorage.getItem(LS_INDEX_KEY);
      const index = parseInt(value);
      return isNaN(index) ? 1 : index;
    } catch (error) {
      console.warning('Tab.#getIndex error! Returned 1.', error.message);
      return 1;
    }
  };

  #updateIndex = (value) => {
    localStorage.setItem(LS_INDEX_KEY, value?.toString());
  };
}

export default new Tab();

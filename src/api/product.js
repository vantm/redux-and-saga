import { find } from 'lodash';
import items from './mock/products.json';

class Products {
  list = () => {
    return items;
  };

  get = (id) => {
    return find(items, (x) => x.id === id);
  };
}

export default new Products();

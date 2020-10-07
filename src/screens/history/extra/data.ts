import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly title: string,
              readonly category: string,
              readonly image: ImageSourcePropType,
              readonly price: number,
              readonly amount: number) {
  }

  get formattedPrice(): string {
    return `$${this.price}`;
  }

  get totalPrice(): number {
    return this.price * this.amount;
  }

  static pinkChair(): Product {
    return new Product(
      'Pohe',
      'Breakfast',
      require('../assets/image-product-1.jpg'),
      130,
      1,
    );
  }

  static whiteChair(): Product {
    return new Product(
      'Daal Chawal',
      'Lunch',
      require('../assets/image-product-3.jpg'),
      150,
      1,
    );
  }

  static woodChair(): Product {
    return new Product(
      'Sabbu Vada',
      'Dinner',
      require('../assets/image-product-2.jpg'),
      125,
      1,
    );
  }

  static blackLamp(): Product {
    return new Product(
      'Pohe',
      'Breakfast',
      require('../assets/image-product-1.jpg'),
      80,
      1,
    );
  }
}

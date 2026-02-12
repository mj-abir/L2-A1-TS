const formatValue = (
  value: string | number | boolean,
): string | number | boolean => {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value * 10;
  } else {
    return !value;
  }
};



const getLength = (value: string | number[]): number | undefined => {
  if (typeof value === "string") {
    return value.length;
  } else if (Array.isArray(value)) {
    return value.length;
  }
};



class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getDetails() {
    const details = `'Name: ${this.name}, Age: ${this.age}'`;
    return details;
  }
}



type Item = {
  title: string;
  rating: number;
};
const filterByRating = (value: Item[]): Item[] => {
  const highRated = value.filter((item) => item.rating >= 4);
  return highRated;
};



type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};
const filterActiveUsers = (value: User[]): User[] => {
  const activeUser = value.filter((user) => user.isActive === true);
  return activeUser;
};



interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}
const printBookDetails = (value: Book) => {
  const details = `Title: ${value.title}, Author: ${value.author}, Published: ${value.publishedYear}, Available: ${value.isAvailable}`;
  console.log(details);
};




const getUniqueValues = (
  array1: number[] | string[],
  array2: number[] | string[],
): (number | string)[] => {
  const arr = [...array1, ...array2];
  const unique = [...new Set(arr)];
  return unique;
};




type Products = {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
};
const calculateTotalPrice = (products: Products[]): number => {
  const totalPrice = products.reduce((totalPrice, product) => {
    const subTotal = product.price * product.quantity;
    const discount = product.discount ?? 0;

    return totalPrice + subTotal - (subTotal * discount) / 100;
  }, 0);

  return totalPrice;
};

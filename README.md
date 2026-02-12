# typescript-problems-basic

### Type & Interface 

টাইপ আর ইন্টারফেস, টাইপস্ক্রিপ্টের ২টি বিষয়, দেখতে অনেকটা একরকম মনে হলেও দুইটার ব্যবহারবিধি এবং আচরণের মধ্যে কিছু পার্থক্য আছে। 
প্রথমে দেখি ২ টার মধ্যে কি সাদৃশ্য রয়েছে:
একটা Object এর আকৃতি তথা তার প্রোপার্টিগুলোর ডাটা টাইপ ডিক্লেয়ার করতে টাইপ অথবা ইন্টারফেস যেকোনো টাই ব্যবহার করা যায়। এক্ষেত্রে শুধুমাত্র '=' ছাড়া বাকি সবকিছুই একরকম।

কিন্তু পার্থক্যের মধ্যে অন্যতম হচ্ছে ২ টা ভিন্ন ভিন্ন ডিক্লেয়ারেশনকে একত্র করার মধ্যে। একই নামে ২ বা ততোধিক ইন্টারফেসকে ভিন্ন ভিন্ন প্রোপার্টি দিয়ে ডিক্লেয়ার করলে টাইপস্ক্রিপট সবগুলোকে সেইম ইন্টারফেসে একত্র করতে পারে, যেটা 'টাইপ' করতে পারে না। যেমন: 

```javascript
interface Movies {
    name: string;
    year:number;
}

interface Movies {
    genre: string;
    director: string;
}

const space : Movies = {
  name : "Interstellar",
  year : 2014,
  genre : "Sci-fi",
  director : "Christopher Nolan"
}
```


এটা কাজ করবে।

কিন্তু 

```javascript
type A = { x: number };
type B = { x: string };

type C = A & B;
const obj: C = {
  x: ??? 
};

```

এটা কাজ করবে না।

তারপর আসি এক্সটেন্ড করা vs ইন্টারসেকশন করা: 
একটা ইন্টারফেসকে কিছু প্রোপার্টি দিয়ে ডিক্লেয়ার করার পর সেটাকে নতুন এক বা একাধিক ইন্টারফেসে এক্সটেন্ড করা যায়, এক্ষেত্রে নতুন ইন্টারফেসে তার নিজস্ব প্রোপার্টি গুলোর সাথে এক্সটেন্ড করা ইন্টারফেসের প্রোপার্টি গুলোও থাকবে। এভাবে: 

```Javascript
interface Person {
  name: string;
}

interface Student extends Person {
  roll: number;
}

```

মাল্টিপল ইনহেরিটেন্স:

```javascript
interface HasId {
  id: number;
}

interface HasEmail {
  email: string;
}

interface User extends HasId, HasEmail {
  name: string;
}
```

সেইম কাজটা 'টাইপ' এর ক্ষেত্রে করা যায় ইন্টারসেকশন এর মাধ্যমে। যেমন এভাবে: 

```javascript
type Person = {
  name: string;
};

type Student = Person & {
  roll: number;
};

```

দুটোই কাজ করে, তবে ইন্টারফেসকে একটু ক্লিন মনে হয়।

'টাইপ' এ ভিন্ন ভিন্ন ডেটা টাইপের ইউনিয়ন ঘটানো যায় এভাবে:

```js
type Status = "loading" | "success" | "error";
```

যেটা আবার ইন্টারফেস করতে পারে না। 

Primitive data type, tuple, function এর জন্য টাইপ'ই বেশ সুবিধা জনক, ইন্টারফেস কাজ করে না অথবা কাজ করলেও টাইপ এর তুলনায় বেশি শব্দবহুল।

অবজেক্ট এর জন্য ইন্টারফেস বেশি সুবিধাজনক, আর বাকি সবকিছুর জন্য টাইপ-ই বেশি ব্যবহার হয়।

---

### any, unknown, never

কোনো ভ্যারিয়েবল এর ডেটা টাইপ any/unknown ডিক্লেয়ার করলে সেটাতে যেকোনো টাইপের ডাটা স্টোর করে রাখা যায়। তবে  ব্যবহার করার আগে টাইপ চেক করে নিতে হয়। না হলে টাইপস্ক্রিপ্ট ওয়ার্নিং বা এরর দিবে।

যেমন: 

```js
let userId:any; //any
userId = "uyfgu"; //valid
userId = 54623; //still vaild

if (typeof userId === "number") {
  console.log(userId*2);
}
```

```js
let username:unknown;
username = "xyzrt"; //valid
username = 89465; //valid

console.log(typeof username); //* number

username = "bjnk"; //valid
console.log(typeof username); //* string

if(typeof username === "string"){
    console.log(username.toUpperCase());
}

```
ফাংশন এর ক্ষেত্রে

```js
const changeValue = (input: unknown) => {
  if (typeof input === "number") {
    const square = input * input;
    console.log(square);
  } else if (typeof input === "string") {
    console.log(input.toUpperCase());
  } else {
    console.log("wrong Input");
  }
};

changeValue(100);
changeValue("100 TK");
changeValue(null);

```

আর never সাধারণত ব্যবহার করা হয় function এর ক্ষেত্রে যখন একটা ফাংশন কখনোই কোনো কিছুই রিটার্ন করবে না, এটা নিশ্চিত থাকা যায়। 

যেমন:

```js
function crash(): never {
  throw new Error("Error: Something went wrong!");
}
```




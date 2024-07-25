import { faker } from "@faker-js/faker";
import process from "process";

import FirebaseService from "../src/lib/services/firebase";

const generateUsers = (num: number) => {
  return Array(num)
    .fill("")
    .map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      balance: faker.number.float({ min: 50, max: 500, precision: 0.01 }),
      isAgent: faker.datatype.boolean(),
      photo_url: faker.image.url(),
    }));
};

const data = {
  users: generateUsers(10),
  calls: [],
};

for (let i = 0; i < data.users.length; i++) {
  const user = data.users[i];

  try {
    await FirebaseService.createUser(user);
    console.log("Generated: ", user);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

console.log("Mock data generated.");
process.exit();

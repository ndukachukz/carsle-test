import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const generateUsers = (num) => {
  return Array(num)
    .fill()
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

fs.writeFileSync(
  path.join(import.meta.dirname, "..", "db.json"),
  JSON.stringify(data, null, 2)
);

console.log("Mock data generated.");

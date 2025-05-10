/**
 * You're at a party and you feel thirsty! However, you've got 5 friends who are also in need of a drink. Let's go get them a drink.
 *
 * Declare a variable that holds an empty array, called drinkTray.
 * Create a loop that runs 5 times. On each iteration, push a drink into the drinkTray variable. The drinkTray can only hold at most two instances of the same drink type, for example it can only hold 2 colas, 2 lemonades, 2 waters.
 *
 * Log to the console: "Hey guys, I brought a [INSERT VALUES FROM ARRAY]!" (For example: "Hey guys, I brought a cola, cola, lemonade, lemonade, water!")
 */

// There are 3 different types of drinks:
const drinkTypes = ["cola", "lemonade", "water"];

const drinkTray = [];
for (let i = 0; i < 5; i++) {
  // Get a random drink type
  const drinkType = drinkTypes[Math.floor(Math.random() * drinkTypes.length)];

  // Count the number of instances of the current drink type in the tray
  const count = drinkTray.filter((drink) => drink === drinkType).length;

  // Only add the drink if there are less than 2 instances already
  if (count < 2) {
    drinkTray.push(drinkType);
  } else {
    // If there are already 2 instances, get a different drink type
    const otherDrinkTypes = drinkTypes.filter((type) => type !== drinkType);
    const newDrinkType =
      otherDrinkTypes[Math.floor(Math.random() * otherDrinkTypes.length)];
    drinkTray.push(newDrinkType);
  }
}
// Log the drinks to the console
console.log(`Hey guys, I brought a ${drinkTray.join(", ")}!`);

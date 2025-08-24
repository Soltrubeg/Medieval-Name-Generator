const male = JSON.parse(await Deno.readTextFile("male.json"));
const female = JSON.parse(await Deno.readTextFile("female.json"));
const sur = JSON.parse(await Deno.readTextFile("sur.json"));

// Utility function to pick a random element
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  let gender = url.searchParams.get("gender");

  if(!gender) {
    gender = Math.random() < 0.5 ? "male" : "female";
  }

  let firstName: string;

  if (gender === "male") {
    firstName = randomChoice(male);
  } else if (gender === "female") {
    firstName = randomChoice(female);
  } else {
    firstName = randomChoice([...male, ...female]);
  }

  const surname = randomChoice(sur);

  return new Response(JSON.stringify({ firstName, surname, gender }), {
    headers: { "Content-Type": "application/json" },
  });
});

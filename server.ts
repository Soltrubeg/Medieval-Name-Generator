const male = JSON.parse(await Deno.readTextFile("male.json"));
const female = JSON.parse(await Deno.readTextFile("female.json"));
const sur = JSON.parse(await Deno.readTextFile("sur.json"));

// Utility function to pick a random element
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const genderParam = url.searchParams.get("gender");

  let firstName: string;

  if (genderParam === "male") {
    firstName = randomChoice(male);
  } else if (genderParam === "female") {
    firstName = randomChoice(female);
  } else {
    firstName = randomChoice([...male, ...female]);
  }

  const surname = randomChoice(sur);
  const username = `${firstName} ${surname}`;

  return new Response(JSON.stringify({ username }), {
    headers: { "Content-Type": "application/json" },
  });
});

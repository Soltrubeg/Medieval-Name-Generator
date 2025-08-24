const male = JSON.parse(await Deno.readTextFile("male.json"));
const female = JSON.parse(await Deno.readTextFile("female.json"));
const sur = JSON.parse(await Deno.readTextFile("sur.json"));

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  let gender = url.searchParams.get("gender");

  if(gender != "male" && gender != "female") {
    gender = Math.random() < 0.5 ? "male" : "female";
  }

  let forename: string;

  if (gender === "male") {
    forename = randomChoice(male);
  } else if (gender === "female") {
    forename = randomChoice(female);
  } else {
    forename = randomChoice([...male, ...female]);
  }

  const surname = randomChoice(sur);

  return new Response(JSON.stringify({ forename, surname, gender }), {
    headers: { "Content-Type": "application/json" },
  });
});

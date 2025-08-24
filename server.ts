const male = JSON.parse(await Deno.readTextFile("male.json"));
const female = JSON.parse(await Deno.readTextFile("female.json"));
const sur = JSON.parse(await Deno.readTextFile("sur.json"));

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  let gender = url.searchParams.get("gender");
  const amountParam = url.searchParams.get("amount");
  const amount = amountParam ? Math.max(1, Math.min(100, parseInt(amountParam))) : 1;

  if (gender != "male" && gender != "female") {
    gender = Math.random() < 0.5 ? "male" : "female";
  }

  const generateName = () => {
    let forename: string;

    if (gender === "male") {
      forename = randomChoice(male);
    } else if (gender === "female") {
      forename = randomChoice(female);
    } else {
      forename = randomChoice([...male, ...female]);
    }

    const surname = randomChoice(sur);

    return { forename, surname, gender };
  };

  const result = Array.from({ length: amount }, generateName);

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
});

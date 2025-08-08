import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (year, week, day) => {
  const date = moment()
    .year(year)
    .week(week)
    .day(day)
    .hour(random.int(0, 23))
    .minute(random.int(0, 59))
    .second(random.int(0, 59))
    .format("YYYY-MM-DD HH:mm:ss");

  const data = { date };
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(`Commit on ${date}`, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // Random year (either 2022 or 2023)
  const year = random.int(2022, 2023);

  // Random week of year (1–52)
  const week = random.int(1, 52);

  // Random day of week (0–6)
  const day = random.int(0, 6);

  const date = moment()
    .year(year)
    .week(week)
    .day(day)
    .hour(random.int(0, 23))
    .minute(random.int(0, 59))
    .second(random.int(0, 59))
    .format("YYYY-MM-DD HH:mm:ss");

  console.log(`Commit for: ${date}`);

  const data = { date };
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(`Commit on ${date}`, { "--date": date }, makeCommits.bind(this, --n));
  });
};

// Example: 200 commits spread across 2022 & 2023
makeCommits(200);

// Example: single commit for week 10 day 3 in 2023
markCommit(2023, 10, 3);

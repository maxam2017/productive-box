import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import { resolve } from 'path';

import generateBarChart from './generateBarChart';
import githubQuery from './githubQuery';
import {
  createCommittedDateQuery,
  createContributedRepoQuery,
  userInfoQuery,
} from './queries';
/**
 * get environment variable
 */
config({ path: resolve(__dirname, '../.env') });

interface IRepo {
  name: string;
  owner: string;
}

(async () => {
  /**
   * First, get user id
   */
  const userResponse = await githubQuery(userInfoQuery).catch(error =>
    console.error(`Unable to get username and id\n${error}`),
  );
  const { login: username, id } = userResponse?.data?.viewer ?? {};

  /**
   * Second, get contributed repos
   */
  const contributedRepoQuery = createContributedRepoQuery(username);
  const repoResponse = await githubQuery(contributedRepoQuery).catch(error =>
    console.error(`Unable to get the contributed repo\n${error}`),
  );
  const repos: IRepo[] =
    repoResponse?.data?.user?.repositoriesContributedTo?.nodes
      .filter(repoInfo => !repoInfo?.isFork)
      .map(repoInfo => ({
        name: repoInfo?.name,
        owner: repoInfo?.owner?.login,
      }));

  /**
   * Third, get commit time and parse into commit-time/hour diagram
   */
  const committedTimeResponseMap = await Promise.all(
    repos.map(({ name, owner }) =>
      githubQuery(createCommittedDateQuery(id, name, owner)),
    ),
  ).catch(error => console.error(`Unable to get the commit info\n${error}`));

  if (!committedTimeResponseMap) return;

  let morning = 0; // 6 - 12
  let daytime = 0; // 12 - 18
  let evening = 0; // 18 - 24
  let night = 0; // 0 - 6

  committedTimeResponseMap.forEach(committedTimeResponse => {
    committedTimeResponse?.data?.repository?.defaultBranchRef?.target?.history?.edges.forEach(
      edge => {
        const committedDate = edge?.node?.committedDate;
        const timeString = new Date(committedDate).toLocaleTimeString('en-US', {
          hour12: false,
          timeZone: process.env.TIMEZONE,
        });
        const hour = +timeString.split(':')[0];

        /**
         * voting and counting
         */
        if (hour >= 6 && hour < 12) morning++;
        if (hour >= 12 && hour < 18) daytime++;
        if (hour >= 18 && hour < 24) evening++;
        if (hour >= 0 && hour < 6) night++;
      },
    );
  });

  /**
   * Next, generate diagram
   */
  const sum = morning + daytime + evening + night;
  if (!sum) return;

  const oneDay = [
    { label: '🌞 Morning', commits: morning },
    { label: '🌆 Daytime', commits: daytime },
    { label: '🌃 Evening', commits: evening },
    { label: '🌙 Night', commits: night },
  ];

  const lines = oneDay.reduce((prev, cur) => {
    const percent = (cur.commits / sum) * 100;
    const line = [
      `${cur.label}`.padEnd(10),
      `${cur.commits.toString().padStart(5)} commits`.padEnd(14),
      generateBarChart(percent, 21),
      String(percent.toFixed(1)).padStart(5) + '%',
    ];

    return [...prev, line.join(' ')];
  }, [] as string[]);

  /**
   * Finally, write into gist
   */
  const octokit = new Octokit({ auth: `token ${process.env.GH_TOKEN}` });
  const gist = await octokit.gists
    .get({
      gist_id: `${process.env.GIST_ID}`,
    })
    .catch(error => console.error(`Unable to update gist\n${error}`));

  if (!gist) return;

  const filename = Object.keys(gist.data.files)[0];
  let greetingText = '';

  if (morning > daytime && morning > evening && morning > night) {
    greetingText = 'Early bird always the best 🐤';
  } else if (daytime > evening && daytime > night) {
    greetingText = "I'm a daytime enthusiast 🌞";
  } else if (evening > night) {
    greetingText = 'Sunset is always beautiful with you 🌇';
  } else {
    greetingText = "I'm a Moon explorer 🦉";
  }

  await octokit.gists.update({
    gist_id: `${process.env.GIST_ID}`,
    files: {
      [filename]: {
        filename: 'VA Commit Stats',
        content: lines.join('\n') + `\n${greetingText}`,
      },
    },
  });
})();

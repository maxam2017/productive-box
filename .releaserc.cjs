/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["master"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          { type: "chore", release: "patch" },
          { type: "refactor", release: "patch" },
        ],
      },
    ],
    "@semantic-release/release-notes-generator",
    [
      // update version field in package.json
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      // commit package.json
      "@semantic-release/git",
      {
        assets: ["package.json"],
      },
    ],
    "@semantic-release/github",
  ],
};

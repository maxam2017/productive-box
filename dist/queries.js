"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommittedDateQuery = exports.createContributedRepoQuery = exports.userInfoQuery = void 0;
exports.userInfoQuery = "\n  query {\n    viewer {\n      login\n      id\n    }\n  }\n";
var createContributedRepoQuery = function (username) { return "\n  query {\n    user(login: \"".concat(username, "\") {\n      repositoriesContributedTo(last: 100, includeUserRepositories: true) {\n        nodes {\n          isFork\n          name\n          owner {\n            login\n          }\n        }\n      }\n    }\n  }\n"); };
exports.createContributedRepoQuery = createContributedRepoQuery;
var createCommittedDateQuery = function (id, name, owner) { return "\n  query {\n    repository(owner: \"".concat(owner, "\", name: \"").concat(name, "\") {\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            history(first: 100, author: { id: \"").concat(id, "\" }) {\n              edges {\n                node {\n                  committedDate\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"); };
exports.createCommittedDateQuery = createCommittedDateQuery;

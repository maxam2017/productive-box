"use strict";
exports.__esModule = true;
exports.userInfoQuery = "\n  query {\n    viewer {\n      login\n      id\n    }\n  }\n";
exports.createContributedRepoQuery = function (username) { return "\n  query {\n    user(login: \"" + username + "\") {\n      repositoriesContributedTo(last: 100) {\n        nodes {\n          name\n          owner {\n            login\n          }\n        }\n      }\n    }\n  }\n"; };
exports.createCommittedDateQuery = function (id, name, owner) { return "\n  query {\n    repository(owner: \"" + owner + "\", name: \"" + name + "\") {\n      ref(qualifiedName: \"master\") {\n        target {\n          ... on Commit {\n            history(first: 100, author: { id: \"" + id + "\" }) {\n              edges {\n                node {\n                  committedDate\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"; };

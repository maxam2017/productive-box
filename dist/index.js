"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var rest_1 = require("@octokit/rest");
var githubQuery_1 = require("./githubQuery");
var generateBarChart_1 = require("./generateBarChart");
var queries_1 = require("./queries");
/**
 * get environment variable
 */
dotenv_1.config({ path: path_1.resolve(__dirname, '.env') });
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var userResponse, _a, username, id, contributedRepoQuery, repoResponse, repos, committedTimeResponseMap, morning, daytime, evening, night, sum, oneDay, lines, octokit, gist, filename;
    var _b;
    var _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, githubQuery_1["default"](queries_1.userInfoQuery)["catch"](function (error) { return console.error("Unable to get username and id\n" + error); })];
            case 1:
                userResponse = _g.sent();
                _a = (_c = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _c === void 0 ? void 0 : _c.viewer, username = _a.login, id = _a.id;
                contributedRepoQuery = queries_1.createContributedRepoQuery(username);
                return [4 /*yield*/, githubQuery_1["default"](contributedRepoQuery)["catch"](function (error) { return console.error("Unable to get the contributed repo\n" + error); })];
            case 2:
                repoResponse = _g.sent();
                repos = (_f = (_e = (_d = repoResponse === null || repoResponse === void 0 ? void 0 : repoResponse.data) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.repositoriesContributedTo) === null || _f === void 0 ? void 0 : _f.nodes.map(function (repoInfo) {
                    var _a;
                    return ({
                        name: repoInfo === null || repoInfo === void 0 ? void 0 : repoInfo.name,
                        owner: (_a = repoInfo === null || repoInfo === void 0 ? void 0 : repoInfo.owner) === null || _a === void 0 ? void 0 : _a.login
                    });
                });
                return [4 /*yield*/, Promise.all(repos.map(function (_a) {
                        var name = _a.name, owner = _a.owner;
                        return githubQuery_1["default"](queries_1.createCommittedDateQuery(id, name, owner));
                    }))["catch"](function (error) { return console.error("Unable to get the commit info\n" + error); })];
            case 3:
                committedTimeResponseMap = _g.sent();
                if (!committedTimeResponseMap)
                    return [2 /*return*/];
                morning = 0;
                daytime = 0;
                evening = 0;
                night = 0;
                committedTimeResponseMap.forEach(function (committedTimeResponse) {
                    var _a, _b, _c, _d, _e;
                    (_e = (_d = (_c = (_b = (_a = committedTimeResponse === null || committedTimeResponse === void 0 ? void 0 : committedTimeResponse.data) === null || _a === void 0 ? void 0 : _a.repository) === null || _b === void 0 ? void 0 : _b.ref) === null || _c === void 0 ? void 0 : _c.target) === null || _d === void 0 ? void 0 : _d.history) === null || _e === void 0 ? void 0 : _e.edges.forEach(function (edge) {
                        var _a;
                        var committedDate = (_a = edge === null || edge === void 0 ? void 0 : edge.node) === null || _a === void 0 ? void 0 : _a.committedDate;
                        var timeString = new Date(committedDate).toLocaleTimeString(['zh-TW'], { hour12: false });
                        var hour = +(timeString.split(':')[0]);
                        /**
                         * voting and counting
                         */
                        if (hour >= 6 && hour < 12)
                            morning++;
                        if (hour >= 12 && hour < 18)
                            daytime++;
                        if (hour >= 18 && hour < 24)
                            evening++;
                        if (hour >= 0 && hour < 6)
                            night++;
                    });
                });
                sum = morning + daytime + evening + night;
                if (!sum)
                    return [2 /*return*/];
                oneDay = [
                    { label: '🌞Morning', commits: morning },
                    { label: '🌆Daytime', commits: daytime },
                    { label: '🌃Evening', commits: evening },
                    { label: '🌙Night', commits: night },
                ];
                lines = oneDay.reduce(function (prev, cur) {
                    var percent = cur.commits / sum * 100;
                    var line = [
                        ("" + cur.label).padEnd(9),
                        (cur.commits.toString().padStart(5) + " commits").padEnd(14),
                        generateBarChart_1["default"](percent, 21),
                        String(percent.toFixed(1)).padStart(5) + '%',
                    ];
                    return __spreadArrays(prev, [line.join(' ')]);
                }, []);
                octokit = new rest_1.Octokit({ auth: "token " + process.env.GH_TOKEN });
                return [4 /*yield*/, octokit.gists.get({
                        gist_id: process.env.GIST_ID
                    })["catch"](function (error) { return console.error("Unable to update gist\n" + error); })];
            case 4:
                gist = _g.sent();
                if (!gist)
                    return [2 /*return*/];
                filename = Object.keys(gist.data.files)[0];
                return [4 /*yield*/, octokit.gists.update({
                        gist_id: process.env.GIST_ID,
                        files: (_b = {},
                            _b[filename] = {
                                // eslint-disable-next-line quotes
                                filename: (morning + daytime) > (evening + night) ? "I'm an early 🐤" : "I'm a night 🦉",
                                content: lines.join('\n')
                            },
                            _b)
                    })];
            case 5:
                _g.sent();
                return [2 /*return*/];
        }
    });
}); })();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformExistingGames = exports.waitFor = exports.rowsToJsonResponse = exports.toJsonResponse = exports.updateConfig = exports.mergeParams = exports.compareHash = exports.hashPassword = exports.parseBearerHeader = void 0;
const url_1 = require("url");
const bcrypt = require("bcrypt");
function parseBearerHeader(req) {
    const bearer = req.rawHeaders.filter((str) => str.startsWith('Bearer'))[0];
    return bearer.split(' ')[1];
}
exports.parseBearerHeader = parseBearerHeader;
async function hashPassword(rawPassword) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(rawPassword, salt);
}
exports.hashPassword = hashPassword;
async function compareHash(rawPassword, hashedPassword) {
    return bcrypt.compare(rawPassword, hashedPassword);
}
exports.compareHash = compareHash;
function mergeParams(params) {
    return new url_1.URLSearchParams(Object.assign({}, params)).toString();
}
exports.mergeParams = mergeParams;
function updateConfig(config, newConfig) {
    for (const key of Object.keys(newConfig)) {
        if (key in config) {
            config[key] = Object.assign(Object.assign({}, config[key]), newConfig[key]);
        }
    }
}
exports.updateConfig = updateConfig;
function toJsonResponse(response) {
    const res = {};
    for (const entry of response.RESULTS) {
        for (const [key, value] of Object.entries(entry)) {
            res[key] = value.length === 1 ? value[0] : [...value];
        }
    }
    if (res['error_message'])
        res['rejected'] = true;
    return Object.keys(res).length === 0 ? undefined : res;
}
exports.toJsonResponse = toJsonResponse;
function rowsToJsonResponse(response) {
    const res = {};
    for (const [entryKey, entryValue] of Object.entries(response.RESULTS)) {
        for (const [key, value] of Object.entries(entryValue || [,])) {
            if (!key || !value) {
                continue;
            }
            if ('error_message' in value) {
                res['error_message'] = value.error_message;
                continue;
            }
            if (!res[`batch-${entryKey}`]) {
                res[`batch-${entryKey}`] = [value];
                continue;
            }
            res[`batch-${entryKey}`] = [...res[`batch-${entryKey}`], value];
        }
    }
    if (res['error_message'])
        res['rejected'] = true;
    return Object.keys(res).length === 0 ? undefined : res;
}
exports.rowsToJsonResponse = rowsToJsonResponse;
function waitFor(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Timeout');
        }, timeout);
    });
}
exports.waitFor = waitFor;
function transformExistingGames(games_raw) {
    const games = [];
    while (games_raw.game_id.length) {
        games.push({
            id: games_raw.game_id.pop(),
            rival: games_raw.player.pop(),
            player: games_raw.player.pop(),
            timestamp: games_raw.timestamp.pop(),
        });
        games_raw.game_id.pop();
        games_raw.timestamp.pop();
    }
    return { games };
}
exports.transformExistingGames = transformExistingGames;
//# sourceMappingURL=helpers.js.map
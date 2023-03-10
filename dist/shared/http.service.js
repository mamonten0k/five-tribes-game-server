"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HttpService_config;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("../utils/helpers");
const helpers_2 = require("../utils/helpers");
let HttpService = class HttpService {
    constructor() {
        _HttpService_config.set(this, void 0);
        __classPrivateFieldSet(this, _HttpService_config, {
            method: '',
            body: null,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            integrity: '',
            keepalive: true,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            signal: null,
            window: null,
        }, "f");
    }
    async post(url, config) {
        const params = (0, helpers_1.mergeParams)(config.params || {});
        (0, helpers_2.updateConfig)(__classPrivateFieldGet(this, _HttpService_config, "f"), config);
        const response = await fetch(`${url}?${params}`, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _HttpService_config, "f")), { method: 'POST' }))
            .then((response) => response.json())
            .then((response) => (0, helpers_1.toJsonResponse)(response));
        return response;
    }
    async postRows(url, config) {
        const params = (0, helpers_1.mergeParams)(config.params || {});
        (0, helpers_2.updateConfig)(__classPrivateFieldGet(this, _HttpService_config, "f"), config);
        const response = await fetch(`${url}?${params}`, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _HttpService_config, "f")), { method: 'POST' }));
        const data = await response.json();
        return (0, helpers_1.rowsToJsonResponse)(data);
    }
};
_HttpService_config = new WeakMap();
HttpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecureKey = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
const generateSecureKey = () => {
    return crypto.randomBytes(32).toString('hex');
};
exports.generateSecureKey = generateSecureKey;

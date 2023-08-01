"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionIsValid = void 0;
const sessionIsValid = (session) => {
    const sessionKeys = Object.keys(session);
    return sessionKeys.includes("email");
};
exports.sessionIsValid = sessionIsValid;

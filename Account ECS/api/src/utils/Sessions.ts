
export const sessionIsValid = (session) => {

    const sessionKeys = Object.keys(session);

    return sessionKeys.includes("email");

}

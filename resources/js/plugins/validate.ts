// Regular Expressions to validate form input
export default {
    // Don't allow spaces, nor special characters.
    username: /^[A-Z0-9@._-]+$/i,

    // https://stackoverflow.com/questions/46155/how-can-you-validate-an-email-address-in-javascript
    email: /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,191})$/i,
};

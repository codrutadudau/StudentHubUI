const validation = (payload) => {

    let errors = {};

    if (!payload.firstName) {
        errors.firstName = "The first name is required";
    }

    if (!payload.lastName) {
        errors.lastName = "The last name is required";
    }

    if (!payload.email) {
        errors.email = "The email is required";
    }

    return errors;
};

export default validation;
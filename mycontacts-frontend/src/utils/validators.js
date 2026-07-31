export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\d\s\-+().]{7,20}$/;
  return re.test(phone);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, min) => {
  return value && value.trim().length >= min;
};

export const validateContactForm = (values) => {
  const errors = {};

  if (!validateRequired(values.name)) {
    errors.name = "Name is required";
  }

  if (!validateRequired(values.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validateRequired(values.phone)) {
    errors.phone = "Phone number is required";
  } else if (!validatePhone(values.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  return errors;
};

export const validateLoginForm = (values) => {
  const errors = {};

  if (!validateRequired(values.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validateRequired(values.password)) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateRegisterForm = (values) => {
  const errors = {};

  if (!validateRequired(values.username)) {
    errors.username = "Username is required";
  } else if (!validateMinLength(values.username, 3)) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!validateRequired(values.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validateRequired(values.password)) {
    errors.password = "Password is required";
  } else if (!validateMinLength(values.password, 6)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!validateRequired(values.confirmPassword)) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

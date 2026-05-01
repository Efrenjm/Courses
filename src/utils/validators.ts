export type Validator = (value: unknown) => string | null;

export const Validators = {
  required,
  email,
  minLength
};

function required(message = 'This field is required'): Validator {
  return (value) => {
    if (value === null || value === undefined) {
      return message;
    }

    if (typeof value === 'string') {
      return value.trim() === '' ? message : null;
    }

    return null;
  }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function email(message = 'Please enter a valid email address'): Validator {
  return (value) => {
    if (typeof value !== 'string') {
      return null;
    }
    return emailRegex.test(value) ? null : message;
  }
}

function minLength(min: number, message?: string): Validator {
  const msg = message ?? `Minimum length is ${min} characters`;
  return (value) => {
    if (value && (typeof value === 'string' || Array.isArray(value))) {
      return (value.length >= min) ? null : msg;
    }
    return null;
  }
}
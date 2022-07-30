const errors = {
  ACCESS_DENIED: {
    code: 10000,
    status: 'UNAUTHORIZED',
    message: 'access denied',
  },
  ACCESS_FORBIDDEN: {
    code: 10001,
    status: 'FORBIDDEN',
    message: 'access forbidden',
  },
};

export default errors;

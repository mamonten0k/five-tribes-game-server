export const Routes = {
  AUTH: 'auth',
  USERS: 'users',
};

export const Services = {
  AUTH: 'AUTH_SERVICE',
  USERS: 'USERS_SERVICE',
  REDIS: Symbol('AUTH:REDIS'),
};

export const Database = {
  URL: 'https://sql.lavro.ru/call.php',
};

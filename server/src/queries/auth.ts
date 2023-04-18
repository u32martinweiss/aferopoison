export const GET_USER_BY_USERNAME_QUERY =
  'SELECT * FROM Users WHERE username = $1';
export const CREATE_USER_QUERY =
  'INSERT INTO Users (username, display_name, password) VALUES ($1, $2, $3) RETURNING *';

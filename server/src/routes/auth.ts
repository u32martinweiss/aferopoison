import { Router } from 'express';
import bcrypt from 'bcrypt';

import { pool } from '../main';

import { GET_USER_BY_USERNAME_QUERY, CREATE_USER_QUERY } from '../queries/auth';

import { generateAccessTokenData } from '../utils/jwt';
import { getServerError } from '../utils/error';
import {
  PASSWORD_SALT_ROUNDS,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  CONFLICT_CODE,
  SERVER_ERROR_CODE,
} from '../utils/constants';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    // Validating input data
    const { username, displayName, password } = req.body;
    if (!username || !displayName || !password)
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: 'Invalid input data!',
        data: null,
      });

    // Checking if user does not already exist
    const existingUser = await pool.query(GET_USER_BY_USERNAME_QUERY, [
      username,
    ]);
    if (existingUser.rowCount !== 0)
      return res.status(CONFLICT_CODE).json({
        success: false,
        message: 'User with this username already exists!',
        data: null,
      });

    // Hashing the password
    const salt = await bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the new user
    const newUser = await pool.query(CREATE_USER_QUERY, [
      username,
      displayName,
      hashedPassword,
    ]);
    return res.status(CREATED_CODE).json({
      success: true,
      message: 'User has been successfully created!',
      data: generateAccessTokenData(newUser.rows[0].user_id),
    });
  } catch (error) {
    console.log(error);
    return res.status(SERVER_ERROR_CODE).json(getServerError());
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    // Validating input data
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: 'Invalid input data!',
        data: null,
      });

    // Checking if user exists
    const existingUser = await pool.query(GET_USER_BY_USERNAME_QUERY, [
      username,
    ]);
    if (existingUser.rowCount === 0)
      return res.status(UNAUTHORIZED_CODE).json({
        success: false,
        message: 'User with this username does not exist!',
        data: null,
      });

    // Validating the password
    const validPassword = await bcrypt.compare(
      password,
      existingUser.rows[0].password
    );
    if (!validPassword)
      return res.status(UNAUTHORIZED_CODE).json({
        success: false,
        message: 'Invalid password!',
        data: null,
      });

    // Sending the ID
    return res.json({
      success: true,
      message: 'Successfully logged in!',
      data: generateAccessTokenData(existingUser.rows[0].user_id),
    });
  } catch (error) {
    console.log(error);
    return res.status(SERVER_ERROR_CODE).json(getServerError());
  }
});

export default authRouter;

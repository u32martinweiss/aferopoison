import { APIResponse } from '../typings/api';

export const getServerError = (): APIResponse => ({
  success: false,
  message: 'Server error!',
  data: null,
});

import {LOG_USER} from './actionTypes';
import React from 'react';

export const logUser = (data) => {
  return {
    type: LOG_USER,
    payload: data,
  };
};

const base = 'http://localhost:2200';

export const GET_TODOS    = { url: base+'/todo/get', method: 'GET' };
export const CREATE_TODO  = { url: base+'/todo/new', method: 'POST' };
export const UPDATE_TODO  = { url: base+'/todo/update', method: 'PUT' };
export const REMOVE_TODO  = { url: base+'/todo/delete', method: 'POST' };

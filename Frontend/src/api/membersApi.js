import axiosClient from './axiosClient';

export const getMembers = () => axiosClient.get('/api/members');

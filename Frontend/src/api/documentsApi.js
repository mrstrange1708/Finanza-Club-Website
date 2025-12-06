import axiosClient from './axiosClient';

export const getDocuments = () => axiosClient.get('api/documents');

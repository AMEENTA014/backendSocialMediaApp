import crypto from 'crypto';
export const generateUniqueId=async()=>{return crypto.randomUUID().toString();}
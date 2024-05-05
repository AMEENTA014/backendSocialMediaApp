import  {generateUniqueId}from './index.js';
import {httpLogger} from "../logger/httpLogger.js"; 


export const loggingMiddleware = async(req, res, next) => {
  const requestId = await generateUniqueId();
    let  data={...req.body};
    delete data.password;
    delete data.newPassword;
    delete data.idToken;
  
    httpLogger.log('info','ENTERED', { 
        route: req.url,
        requestId: requestId,
        userId: req.roleData.userId,
        method:req.method,
        role: req.roleData.role,
        data: data,
        responseTime:null,
      });
    const startHrTime = process.hrtime();  
        res.on('finish', async() => { 
            let message,level; 
            const logLevel = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
        switch(logLevel){
          case 'error':message='ERROR';level=logLevel;break;
          case  'info':message='Finished';level=logLevel;break;
          case  'warn':message='minorErrorOrWarning';level=logLevel;break;
        }
        httpLogger.log(level,message, { 
            route: req.url,
            requestId: requestId,
            userId: req.roleData.userId,
            role: req.roleData.role,
            method:req.method,
            data: data,
            responseTime:  process.hrtime(startHrTime)[0]* 1000 + elapsedHrTime[1] / 1e6,
          });
         
        } ,
      next()
    )}
       

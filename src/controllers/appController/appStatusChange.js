
import * as taskModels from '../../models/taskModels/index.js';
import * as applicationModels from '../../models/applicationModels/index.js';
import { AppStatus, Role, Status } from '@prisma/client';
import { prisma } from '../../models/prisma.js';
import { createNotifyModel } from '../../models/notifyModels/index.js';
import { deleteSubModel, getTaskAllSubModel } from '../../models/subModels/index.js';

export const appStatusChange = async (req, res, next) => {
  const { taskId, applicationId, status } = req.body;
  if (!taskId || !applicationId || !status) {
    const err = new Error("No taskId or applicationId or status provided");
    err.status = 400;
    return next(err);
  }

  try {
    const task = await taskModels.getTaskModel(taskId);
    if (!task) {
        const err = new Error('Task not found');
        err.status = 404;
        return next(err);
      }
      if((task.userId !== req.roleData.userId )&&( req.roleData.role !== Role.ADMIN)){
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
   

    const application = await applicationModels.getAppModel(applicationId);
    if(application.taskId!==task.taskId){
      const err = new Error('taskAndApplicationDoesnt Match');
      err.status = 403;
      return next(err);
    }
    if (!application) {
      const err = new Error('Application not found');
      err.status = 404;
      return next(err);
    }

    if (task.status === Status.COMPLETED ) {
      const err = new Error('Cannot change application status as task is either completed in progress');
      err.status = 400;
      return next(err);
    }
    if(application.status===status){
       return  res.status(200).send('noNeedtochangeItsTheSame');
      }
      let sub=await getTaskAllSubModel(taskId);
      if(sub.length>0){
      sub=sub[0].submissionId;
      }else{
        sub=null;
      }
      if(task.status === Status.IN_PROGRESS){
        if(status===AppStatus.ACCEPTED){
            const err = new Error('cantAcceptWhenInProgress');
            err.status = 400;
            return next(err);
        }
        if(application.status===AppStatus.ACCEPTED){
          const updatedApp =applicationModels.updateAppModel(applicationId,{status:status});
          const updatedTask=taskModels.updateTaskModel(taskId,{selectedUser:null,status:Status.OPEN});
          const deletedSub= deleteSubModel(sub);
          const createdNotify=createNotifyModel({
            userId:application.userId,
            title:`Stay Informed! Your ${task.title}Task Application Status Has Altered`,
            newStatus:application.status,
            message:`your application status is changed from  ${application.status} to ${status}.You may have a chance to get accepted again`,
            type:'APP',
            referenceId:application.applicationId,
          });
          await prisma.$transaction([updatedApp,updatedTask,deletedSub,createdNotify]);
          
          return res.status(200).send({ message: 'Application status updated successfully' });
        }
        const updatedApp=applicationModels.updateAppModel(applicationId,{status:status});
        const createdNotify=createNotifyModel({
          userId:application.userId,
          title:`Stay Informed! Your ${task.title}Task Application Status Has Altered`,
          newStatus:application.status,
          message:`your application status is changed from  ${application.status} to ${status}.You may have a chance to get accepted again`,
          type:'APP',
          referenceId:application.applicationId,
        });
        await prisma.$transaction([updatedApp,createdNotify]);
        return res.status(200).send({ message: 'Application status updated successfully' });
      }
      if(status===AppStatus.ACCEPTED){
       const  updatedApp= applicationModels.updateAppModel(applicationId,{status:status});
       const updatedtask= taskModels.updateTaskModel(taskId,{selectedUser:application.userId,status:Status.IN_PROGRESS});
       const createdNotify=createNotifyModel({
        userId:application.userId,
        title:`Congrats! Your ${task.title}Task Application is ${status}`,
        newStatus:application.status,
        message:`your application status is changed from  ${application.status} to ${status}you  have chance to earn points`,
        type:'APP',
        referenceId:application.applicationId,
      });
       await prisma.$transaction([updatedApp,updatedtask,createdNotify]);
        return res.status(200).send({ message: 'Application status updated successfully' });
      }
      
     const updatedApp= applicationModels.updateAppModel(applicationId,{status:status});
      const createdNotify=createNotifyModel({
        userId:application.userId,
        title:`Stay Informed! Your ${task.title}Task Application Status Has Altered`,
        newStatus:application.status,
        message:`your application status is changed from  ${application.status} to ${status}.You may have a chance to get accepted again`,
        type:'APP',
        referenceId:application.applicationId,
      });
      await prisma.$transaction([updatedApp,createdNotify]);
    res.status(200).send({ message: 'Application status updated successfully' });
  } catch (err) {
    return next(err);
  }
};

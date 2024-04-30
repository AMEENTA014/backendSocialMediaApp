
import * as taskModels from '../../models/taskModels/index.js';
import * as applicationModels from '../../models/applicationModels/index.js';

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
    if(task.userId!==req.roleData.userId){
        const err = new Error('forbidden');
        err.status = 403;
        return next(err);
    }
   

    const application = await applicationModels.getAppModel(applicationId);
    if (!application) {
      const err = new Error('Application not found');
      err.status = 404;
      return next(err);
    }

    if (task.status === 'CLOSED' ) {
      const err = new Error('Cannot change application status as task is either closed or in progress');
      err.status = 400;
      return next(err);
    }
    if(application.status===status){
        res.status(200).send('noNeedtochangeItsTheSame');
      }
      if(task.status === 'IN_PROGRESS'){
        if(status==='ACCEPTED'){
            const err = new Error('cantAcceptWhenInProgress');
            err.status = 400;
            return next(err);
        }
        if(application.status==='ACCEPTED'){
          await applicationModels.updateAppModel(applicationId,{status:status});
          taskModels.updateTaskModel(taskId,{selectedUser:null,status:'OPEN'});
          res.status(200).send({ message: 'Application status updated successfully' });
        }
        await applicationModels.updateAppModel(applicationId,{status:status});
        res.status(200).send({ message: 'Application status updated successfully' });
      }
      if(status==='ACCEPTED'){
        await applicationModels.updateAppModel(applicationId,{status:status});
        await taskModels.updateTaskModel(taskId,{selectedUser:application.userId,status:'IN_PROGRESS'});
        res.status(200).send({ message: 'Application status updated successfully' });
      }
      
      await applicationModels.updateAppModel(applicationId,{status:status});
    res.status(200).send({ message: 'Application status updated successfully' });
  } catch (err) {
    return next(err);
  }
};

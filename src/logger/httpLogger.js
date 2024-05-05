import { prisma } from '../models/prisma.js';
import winston from 'winston';
import Transport from 'winston-transport';
const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';


class PrismaTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.io=opts.io;
  }

  async log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });
try{
    const log=await prisma.log.create({
      data: {
        route: info.data.url,
        requestId: info.data.requestId,
        userId: info.data.userId,
        role: info.data.role,
        level: info.level,
        message: info.message,
        data: info.data.data,
        responseTime: info.data.responseTime,
        createdAt:info.timestamp,
      },
    });
    this.io.to('admin').emit('log', log);
  } catch (err) {
    this.io.to('admin').emit('error', { error: err, source: 'PrismaTransport Error' });
  }
    callback();
  }
}

export const httpLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        timestamp,
        message,
        data,
      };
      return JSON.stringify(response);
    })
  ),
  transports: [new PrismaTransport({io:'ioObjectPass'})],//eda ivde matte io server object pass cheythekk
});

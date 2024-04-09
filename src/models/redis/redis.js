export async function setValue(cacheServerPromise, key, value) {
  const maxRetries = 5;
  for(let i = 0; i < maxRetries; i++) {
    try {
      const cacheServer = await cacheServerPromise;
      await cacheServer.set(key, value);
      return; 
    } catch(err) {
      console.error(`Attempt ${i} to set value failed with error: ${err.message}`);
      if(i < maxRetries - 1) {
        console.log('Retrying...');
      } else {
        throw new Error("redisServerError");
      }
    }
  }
}
export async function setExpire(cacheServerPromise,key,time){
    try{
      const cacheServer = await cacheServerPromise;
        await cacheServer.expire(key,time);
      }
      catch(err){
       throw new Error("redisServerError");
      }

}
export async function getValue(cacheServerPromise,key){
    try{
      const cacheServer = await cacheServerPromise;
        return await cacheServer.get(key);
      }
      catch(err){
       throw new Error("redisServerError");
      }
}

export async function isExpired(cacheServerPromise,key) {
    try{
      const cacheServer = await cacheServerPromise;
    const ttl = await cacheServer.ttl(key);
    return ttl === -2;   
    }catch(err){
       throw new Error('redisServerError');
    }
  }
  


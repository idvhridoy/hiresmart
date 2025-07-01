const redisClient = require('../../config/redis');

const cache = (duration) => async (req, res, next) => {
  const key = '__express__' + req.originalUrl || req.url;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.send(JSON.parse(cachedData));
    }

    res.sendResponse = res.send;
    res.send = (body) => {
      redisClient.set(key, body, { EX: duration });
      res.sendResponse(body);
    };

    next();
  } catch (err) {
    console.error('Cache error:', err);
    next();
  }
};

module.exports = cache;

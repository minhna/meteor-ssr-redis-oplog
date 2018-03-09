import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import '/imports/api/test/methods.js';
import '/imports/api/test/server/publications.js';
import '/imports/api/users/methods.js';
import '/imports/api/users/server/publications.js';

DDPRateLimiter.setErrorMessage(({ timeToReset }) => {
  const time = Math.ceil(timeToReset / 1000);
  const seconds = time === 1 ? 'second' : 'seconds';
  return `Easy on the gas, buddy. Too many requests. Try again in ${time} ${seconds}.`;
});

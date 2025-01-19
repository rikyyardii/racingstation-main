import { f as fromNodeMiddleware } from '../../runtime.mjs';
import app from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'express';
import 'sqlstring';
import 'net';
import 'tls';
import 'timers';
import 'events';
import 'stream';
import 'denque';
import 'lru.min';
import 'buffer';
import 'long';
import 'iconv-lite';
import 'process';
import 'crypto';
import 'zlib';
import 'seq-queue';
import 'generate-function';
import 'url';
import 'aws-ssl-profiles';
import 'named-placeholders';
import 'cors';
import 'express-session';
import 'multer';
import 'path';
import 'fs';
import 'slugify';
import 'redis';

const middleware = fromNodeMiddleware(async (req, res, next) => {
  const { default: app$1 } = await app;
  app$1.handle(req, res, next);
});

export { middleware as default };
//# sourceMappingURL=middleware.mjs.map

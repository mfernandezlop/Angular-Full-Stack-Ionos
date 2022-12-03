import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';

import setMongo from './mongo';
import setRoutes from './routes';

const app = express();
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
console.log(`Angular Full Stack listening on port1 ${app.get('port')}`+ __dirname +`.  app to String: `+app.toString);
const main = async (): Promise<any> => {
  try {
    await setMongo();
    setRoutes(app);
    app.get('/*', (req, res) => {
      console.log(`Angular Full Stack listening on port 2${app.get('port')}`+ __dirname +`.  app to String: `+app.toString);
      res.sendFile(path.join(__dirname, '../index.html'));
    });
    app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port3 ${app.get('port')}`+ __dirname +`.  app to String: `+app.toString));
  } catch (err) {
    console.error(err);
  }
};

main();

export { app };

import app from './app';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    app.listen(3333, () => {
      console.log('🚀 Server is running');
    });
  })
  .catch((err) => {
    console.log('Error during Server initialization', err);
  });

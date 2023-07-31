import express, { Express } from 'express';
class ServerExpress {
  private readonly app: Express;
  constructor() {
    this.app = express();

    this.init();
  }

  private init() {
    this.app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));
  }
}

export default ServerExpress;

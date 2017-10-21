const express = require('express');
const next = require('next');
const cors = require('cors');

const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8000;
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {

  const server = express();

  server.use(cors());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.get('/', (req, res) => {
    return app.render(req, res, '/home', req.query);
  });

  server.get('*', (req, res) => {
    return handler(req, res);
  });

  server.use((err, req, res) => {
    return res.status(err.status || 500).json(err);
  });

  server.listen(port, () =>
    console.log(`> Ready on port ${port}`)
  );
});

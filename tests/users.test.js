const request = require('supertest');
const app = require('../src/app');

describe('User API', () => {
  let server;

  beforeEach(() => {
    server = app.listen(4000);
  });

  afterEach(() => {
    server.close();
  });

  test('should create a new user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        name: 'Alice',
        email: 'alice@example.com'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Alice');
  });

  test('should fetch all users', async () => {
    await request(server)
      .post('/api/users')
      .send({
        name: 'Bob',
        email: 'bob@example.com'
      });

    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should fetch a user by ID', async () => {
    const user = await request(server)
      .post('/api/users')
      .send({
        name: 'Charlie',
        email: 'charlie@example.com'
      });

    const res = await request(server).get(`/api/users/${user.body.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Charlie');
  });

  test('should update a user', async () => {
    const user = await request(server)
      .post('/api/users')
      .send({
        name: 'David',
        email: 'david@example.com'
      });

    const res = await request(server)
      .put(`/api/users/${user.body.id}`)
      .send({
        name: 'David Updated',
        email: 'david.updated@example.com'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('David Updated');
  });

  test('should delete a user', async () => {
    const user = await request(server)
      .post('/api/users')
      .send({
        name: 'Eve',
        email: 'eve@example.com'
      });

    const res = await request(server).delete(`/api/users/${user.body.id}`);
    expect(res.statusCode).toEqual(204);
  });
});

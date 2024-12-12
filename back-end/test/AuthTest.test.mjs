import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import schema from '../models/schema.js';
const { User } = schema;

describe('Authentication Tests', () => {
  const testUser = {
    username: 'testuser',
    password: 'TestPass123!',
    first_name: 'Test',
    last_name: 'User'
  };

  before(async () => {
    await User.deleteMany({});
  });

  describe('Registration', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/register')
        .send(testUser);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.header).to.have.property('authorization');

      const user = await User.findById(res.body._id);
      expect(user.username).to.equal(testUser.username);
      expect(user.name).to.equal(`${testUser.first_name} ${testUser.last_name}`);
    });

    it('should reject duplicate username', async () => {
      const res = await request(app)
        .post('/register')
        .send(testUser);

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Username already taken');
    });
  });

  describe('Login', () => {
    it('should login successfully', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          username: testUser.username,
          password: testUser.password
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.header).to.have.property('authorization');
    });

    it('should reject invalid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          username: testUser.username,
          password: 'wrongpassword'
        });

      expect(res.body).to.have.property('error', 'Incorrect Username and/or Password');
    });
  });

  after(async () => {
    await User.deleteMany({});
  });
});
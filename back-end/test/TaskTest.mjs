import { use, expect } from 'chai'
import chaiHttp from 'chai-http';
import request from "supertest";
const chai = use(chaiHttp)



import app from '../app.js';

describe('Tasks API', () => {


  it('GET /tasks - should fetch all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('GET /tasks/urgent - should fetch urgent tasks', async () => {
    const res = await request(app).get('/tasks/urgent');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.at.most(3); // Assuming a maximum of 3 urgent tasks
  });

  // it('PUT /tasks/:id/status - should update task status', async function() {
  //   this.timeout(5000); 
  //   const taskId = "1"; // Mock ID; replace with an actual one if testing a live database
  //   const res = await request(app)
  //     .put(`/tasks/${taskId}/status`)
  //     .send({ status: 'ongoing' });

  //   expect(res).to.have.status(200);
  //   expect(res.body).to.have.property('status', 'ongoing');
  // });

  it('DELETE /tasks/:id - should delete a task', async () => {
    const taskId = "1"; 
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res).to.have.status(204);
  });

  it('POST /tasks - should create a new task', async () => {
    const newTask = {
      name: 'Sample Task',
      due: '2024-12-01',
      status: 'pending',
      priority: 'high',
      subject: 'Work',
      recurring_period: 'weekly'
    };
    const res = await request(app).post('/tasks').send(newTask);
    expect(res.status).to.equal(201);
    expect(res.body).to.include(newTask);
  });
});
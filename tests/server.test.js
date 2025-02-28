import { it, expect, describe, beforeAll, afterAll } from 'vitest';
import request from "supertest";
import app from '../server';

let server;

beforeAll(() => {
  server = app.listen(4000); // Start test server
});

afterAll(() => {
  server.close(); // Cleanup
});

describe('User API Endpoints', () => {
    it('should return all users', async () => {
        const res = await request(app).get("/api/users");
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should return a single user by ID', async () => {
        const res = await request(app).get("/api/users/1");
        expect(res.status).toBe(200); 
        expect(res.body).toHaveProperty("id", 1);
        expect(res.body).toHaveProperty("firstName", "Emily");
        expect(res.body).toHaveProperty("lastName", "Johnson");     
    });

    it('should return 500 if user is not found', async () => {
        const res = await request(app).get("/api/users/300");
        expect(res.status).toBe(500); 
        expect(res.body).toHaveProperty("message", "Error fetching user");
        expect(res.body).toHaveProperty("error", "Request failed with status code 404");
    })
})
// @ts-check
import { test, expect } from '@playwright/test';

// Helper functions for random data
const randomString = (length = 10) => Math.random().toString(36).substring(2, 2 + length);
const randomNumber = (min = 1, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min;

test.describe('JSONPlaceholder API Tests', () => {
  const BASE_URL = process.env.API_BASE_URL;

  test('GET /posts - Should retrieve all posts and validate schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);

    // Schema Validation
    // Validate that the first item matches the expected structure
    expect(posts[0]).toEqual(expect.objectContaining({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String)
    }));
  });

  test('POST /posts - Should create a new post with random data', async ({ request }) => {
    const newPost = {
      title: `Random Title ${randomString()}`,
      body: `Random Body Content ${randomString(20)}`,
      userId: randomNumber(),
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const createdPost = await response.json();
    
    // Schema & Data Validation
    expect(createdPost).toEqual(expect.objectContaining({
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId,
      id: expect.any(Number)
    }));
    
    console.log('Created Post:', createdPost);
  });

  test('PUT /posts/1 - Should update an existing post with random data', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: `Updated Title ${randomString()}`,
      body: `Updated Body Content ${randomString(20)}`,
      userId: randomNumber(),
    };

    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: updatedPost
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const post = await response.json();
    
    // Schema & Data Validation
    expect(post).toEqual(expect.objectContaining({
      id: 1,
      title: updatedPost.title,
      body: updatedPost.body,
      userId: updatedPost.userId
    }));
    
    console.log('Updated Post:', post);
  });

  test('DELETE /posts/1 - Should delete a post', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    // JSONPlaceholder returns empty object on delete
    const body = await response.json();
    expect(body).toEqual({});
  });
});

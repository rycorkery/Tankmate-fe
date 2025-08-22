import { BaseApiService } from './base'
// These imports will be available after running npm run api:generate
// import { CreateUserRequest, User, createUserRequestSchema, userSchema } from '@/api/generated/model';
// import { createUser, getUser } from '@/api/generated/tankmate';

/**
 * Example service showing how to use generated API client with validation
 *
 * After running `npm run api:generate`, you'll have:
 * - Generated TypeScript types for all API models
 * - Generated Zod schemas for runtime validation
 * - Generated React Query hooks for each endpoint
 * - Automatic request/response validation
 */
export class UserService extends BaseApiService {
  // Example of creating a user with validation
  // async createUser(userData: unknown): Promise<User> {
  //   // Validate request data against generated schema
  //   const validatedData = this.validateRequest(createUserRequestSchema, userData);
  //
  //   // Call generated API function with error handling
  //   return this.executeApiCall(
  //     async () => {
  //       const response = await createUser(validatedData);
  //       // Validate response against generated schema
  //       return this.validateResponse(userSchema, response);
  //     },
  //     'Create user'
  //   );
  // }
  // Example of getting a user
  // async getUserById(id: string): Promise<User> {
  //   return this.executeApiCall(
  //     async () => {
  //       const response = await getUser(id);
  //       return this.validateResponse(userSchema, response);
  //     },
  //     'Get user'
  //   );
  // }
}

export const userService = new UserService()

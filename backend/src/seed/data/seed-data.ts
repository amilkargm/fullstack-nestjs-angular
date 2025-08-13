import * as bcrypt from 'bcrypt';
import { UserRole } from '../../auth/interfaces/user-roles.enum';

interface SeedUser {
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'user@example.com',
      username: 'User',
      password: bcrypt.hashSync('abc123', 10),
      role: UserRole.USER, // Assuming UserRole is an enum with a USER value
    },
    {
      email: 'admin@example.com',
      username: 'Admin',
      password: bcrypt.hashSync('def456', 10),
      role: UserRole.ADMIN, // Assuming UserRole is an enum with an ADMIN value
    },
  ],
};

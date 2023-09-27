import { z } from "zod";

// Zod validation Schemas

export const userSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).regex(/^[a-zA-Z0-9]+$/),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    password: z.string().min(6)
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
        }
      ),
    role: z.enum(['admin', 'staff', 'user']),
  });
import { z } from 'zod';

export const loginSchema = z.object({
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['farmer', 'buyer']).optional().default('farmer'),
  language: z.enum(['hi', 'en', 'mr', 'pa', 'bn', 'te', 'ta']).optional().default('hi'),
  state: z.string().optional(),
  district: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const cropRecommendSchema = z.object({
  soilType: z.string().min(1, 'Please select soil type'),
  state: z.string().min(1, 'Please select your state'),
  district: z.string().min(1, 'Please enter your district'),
  season: z.enum(['kharif', 'rabi', 'zaid']),
  rainfall: z.number().min(0).max(5000),
  temperature: z.number().min(-10).max(60),
  budget: z.number().min(0),
  irrigationType: z.string().min(1, 'Please select irrigation type'),
  previousCrop: z.string().optional(),
  landSize: z.number().min(0).optional(),
});

export const listingSchema = z.object({
  cropName: z.string().min(1, 'Please enter crop name'),
  variety: z.string().optional(),
  quantity: z.number().min(1, 'Quantity must be greater than 0'),
  unit: z.enum(['kg', 'quintal', 'ton']),
  pricePerUnit: z.number().min(1, 'Price must be greater than 0'),
  quality: z.enum(['A', 'B', 'C']),
  description: z.string().max(1000).optional(),
  state: z.string().min(1, 'Please select state'),
  district: z.string().min(1, 'Please enter district'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CropRecommendFormData = z.infer<typeof cropRecommendSchema>;
export type ListingFormData = z.infer<typeof listingSchema>;

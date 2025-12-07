import { emailSchema, passwordSchema, loginSchema, registerSchema } from '../validations'

describe('Validation Schemas', () => {
  describe('emailSchema', () => {
    it('should validate correct email', () => {
      const result = emailSchema.safeParse('test@example.com')
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const result = emailSchema.safeParse('invalid-email')
      expect(result.success).toBe(false)
    })

    it('should lowercase and trim email', () => {
      const result = emailSchema.safeParse('  TEST@EXAMPLE.COM  ')
      if (result.success) {
        expect(result.data).toBe('test@example.com')
      } else {
        fail('Expected email to be valid')
      }
    })

    it('should reject empty email', () => {
      const result = emailSchema.safeParse('')
      expect(result.success).toBe(false)
    })
  })

  describe('passwordSchema', () => {
    it('should validate password with letter and number', () => {
      const result = passwordSchema.safeParse('password123')
      expect(result.success).toBe(true)
    })

    it('should reject password without letter', () => {
      const result = passwordSchema.safeParse('123456')
      expect(result.success).toBe(false)
    })

    it('should reject password without number', () => {
      const result = passwordSchema.safeParse('password')
      expect(result.success).toBe(false)
    })

    it('should reject password shorter than 6 characters', () => {
      const result = passwordSchema.safeParse('pass1')
      expect(result.success).toBe(false)
    })

    it('should reject password longer than 100 characters', () => {
      const longPassword = 'a'.repeat(101) + '1'
      const result = passwordSchema.safeParse(longPassword)
      expect(result.success).toBe(false)
    })
  })

  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('should reject missing email', () => {
      const result = loginSchema.safeParse({
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })

    it('should reject missing password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
      })
      expect(result.success).toBe(false)
    })

    it('should reject invalid email format', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const result = registerSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('should reject mismatched passwords', () => {
      const result = registerSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('confirmPassword')
      }
    })

    it('should reject weak password', () => {
      const result = registerSchema.safeParse({
        email: 'test@example.com',
        password: 'weak',
        confirmPassword: 'weak',
      })
      expect(result.success).toBe(false)
    })

    it('should reject missing confirmPassword', () => {
      const result = registerSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })
})


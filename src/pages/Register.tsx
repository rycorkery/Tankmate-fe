import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '@/api/generated/tankmate'
import type { RegisterRequest } from '@/api/generated/model'
import { useStore } from '@/store/useStore'
import { ButtonVariant, Routes, AlertVariant, StorageKeys, HttpStatus } from '@/lib/constants'
import {
  TankmateCard,
  TankmateCardContent,
  TankmateCardHeader,
  TankmateCardTitle,
} from '@/components/custom/TankmateCard'
import { TankmateInput } from '@/components/custom/TankmateInput'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateAlert, TankmateAlertDescription } from '@/components/custom/TankmateAlert'

interface FormErrors extends Partial<RegisterRequest> {
  confirmPassword?: string
}

export function Register() {
  const navigate = useNavigate()
  const setUser = useStore((state) => state.setUser)
  const [formData, setFormData] = useState<RegisterRequest & { confirmPassword: string }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState<string>('')

  const registerMutation = useRegister({
    mutation: {
      onSuccess: (data) => {
        if (data.token) {
          localStorage.setItem(StorageKeys.TOKEN, data.token)
        }
        if (data.refreshToken) {
          localStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken)
        }

        setUser({
          id: data.userId || '',
          email: data.email || formData.email,
          name: data.name || formData.name,
        })

        navigate(Routes.DASHBOARD)
      },
      onError: (error: unknown) => {
        const axiosError = error as { response?: { status: number; data?: { message?: string } } }
        if (axiosError.response?.status === HttpStatus.CONFLICT) {
          setApiError('An account with this email already exists')
        } else if (axiosError.response?.data?.message) {
          setApiError(axiosError.response.data.message)
        } else {
          setApiError('An error occurred during registration. Please try again.')
        }
      },
    },
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length > 255) {
      newErrors.name = 'Name must be less than 255 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    } else if (formData.email.length > 255) {
      newErrors.email = 'Email must be less than 255 characters'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter'
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter'
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')

    if (validateForm()) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = formData
      registerMutation.mutate({ data: registerData })
    }
  }

  const handleChange =
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
      if (apiError) {
        setApiError('')
      }
    }

  const getPasswordStrength = (): { strength: number; label: string; color: string } => {
    const password = formData.password
    if (!password) return { strength: 0, label: '', color: '' }

    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
    const colors = [
      '',
      'text-red-500',
      'text-orange-500',
      'text-yellow-500',
      'text-green-500',
      'text-green-600',
    ]

    return {
      strength,
      label: labels[strength],
      color: colors[strength],
    }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gradient-to-br from-brand-ocean/5 to-brand-teal/5 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-600">Join Tankmate to manage your aquarium</p>
        </div>

        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Register</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {apiError && (
                <TankmateAlert variant={AlertVariant.DESTRUCTIVE}>
                  <TankmateAlertDescription>{apiError}</TankmateAlertDescription>
                </TankmateAlert>
              )}

              <TankmateInput
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange('name')}
                error={errors.name}
                autoComplete="name"
                required
              />

              <TankmateInput
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange('email')}
                error={errors.email}
                autoComplete="email"
                required
              />

              <div>
                <TankmateInput
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange('password')}
                  error={errors.password}
                  autoComplete="new-password"
                  helperText="At least 8 characters with uppercase, lowercase, and numbers"
                  required
                />
                {formData.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.strength === 1
                            ? 'bg-red-500'
                            : passwordStrength.strength === 2
                              ? 'bg-orange-500'
                              : passwordStrength.strength === 3
                                ? 'bg-yellow-500'
                                : passwordStrength.strength === 4
                                  ? 'bg-green-500'
                                  : passwordStrength.strength === 5
                                    ? 'bg-green-600'
                                    : ''
                        }`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              <TankmateInput
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={errors.confirmPassword}
                autoComplete="new-password"
                required
              />

              <div className="pt-2">
                <TankmateButton
                  type="submit"
                  variant={ButtonVariant.DEFAULT}
                  className="w-full"
                  loading={registerMutation.isPending}
                  disabled={registerMutation.isPending}
                >
                  Create Account
                </TankmateButton>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link
                    to={Routes.LOGIN}
                    className="text-brand-ocean hover:text-brand-ocean-dark font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="text-center text-xs text-slate-500 pt-2">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-brand-ocean hover:text-brand-ocean-dark">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-brand-ocean hover:text-brand-ocean-dark">
                  Privacy Policy
                </Link>
              </div>
            </form>
          </TankmateCardContent>
        </TankmateCard>
      </div>
    </div>
  )
}

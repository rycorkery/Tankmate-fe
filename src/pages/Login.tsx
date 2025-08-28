import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/api/generated/tankmate'
import type { LoginRequest } from '@/api/generated/model'
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

export function Login() {
  const navigate = useNavigate()
  const setUser = useStore((state) => state.setUser)
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<LoginRequest>>({})
  const [apiError, setApiError] = useState<string>('')

  const loginMutation = useLogin({
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
          name: data.name || '',
        })

        navigate(Routes.DASHBOARD)
      },
      onError: (error: unknown) => {
        const axiosError = error as { response?: { status: number; data?: { message?: string } } }
        if (axiosError.response?.status === HttpStatus.UNAUTHORIZED) {
          setApiError('Invalid email or password')
        } else if (axiosError.response?.data?.message) {
          setApiError(axiosError.response.data.message)
        } else {
          setApiError('An error occurred during login. Please try again.')
        }
      },
    },
  })

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginRequest> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')

    if (validateForm()) {
      loginMutation.mutate({ data: formData })
    }
  }

  const handleChange = (field: keyof LoginRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    if (apiError) {
      setApiError('')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gradient-to-br from-brand-ocean/5 to-brand-teal/5 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your Tankmate account</p>
        </div>

        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Login</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {apiError && (
                <TankmateAlert variant={AlertVariant.DESTRUCTIVE}>
                  <TankmateAlertDescription>{apiError}</TankmateAlertDescription>
                </TankmateAlert>
              )}

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

              <TankmateInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange('password')}
                error={errors.password}
                autoComplete="current-password"
                required
              />

              <TankmateButton
                type="submit"
                variant={ButtonVariant.DEFAULT}
                className="w-full"
                loading={loginMutation.isPending}
                disabled={loginMutation.isPending}
              >
                Sign In
              </TankmateButton>

              <div className="text-center pt-4">
                <p className="text-sm text-slate-600">
                  Don't have an account?{' '}
                  <Link
                    to={Routes.SIGNUP}
                    className="text-brand-ocean hover:text-brand-ocean-dark font-medium transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              <div className="text-center">
                <Link
                  to={Routes.FORGOT_PASSWORD}
                  className="text-sm text-brand-ocean hover:text-brand-ocean-dark transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </TankmateCardContent>
        </TankmateCard>
      </div>
    </div>
  )
}

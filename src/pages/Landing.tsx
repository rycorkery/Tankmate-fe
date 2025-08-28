import { Link } from 'react-router-dom'
import { TankmateButton } from '@/components/custom'
import {
  TankmateCard,
  TankmateCardHeader,
  TankmateCardTitle,
  TankmateCardDescription,
  TankmateCardContent,
} from '@/components/custom'

export function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-brand-aqua/10 via-brand-pearl to-brand-ocean/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-brand-ocean to-brand-aqua text-white text-sm font-medium mb-6 shadow-lg">
                Built for aquarium enthusiasts
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-brand-charcoal">
              Your aquarium's
              <span className="bg-gradient-to-r from-brand-ocean to-brand-aqua bg-clip-text text-transparent">
                {' '}
                digital companion
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-brand-charcoal/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform aquarium care from guesswork to precision. Track maintenance schedules,
              manage your tanks, and keep your underwater ecosystem thriving with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/signup">
                <TankmateButton size="lg" className="min-w-[180px]">
                  Create Free Account
                </TankmateButton>
              </Link>
              <Link to="/features">
                <TankmateButton variant="outline" size="lg" className="min-w-[180px]">
                  See How It Works
                </TankmateButton>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required • Always free to get started
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-brand-seafoam/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-charcoal mb-4">
                Everything you need for <span className="text-brand-teal">healthy aquariums</span>
              </h2>
              <p className="text-lg text-brand-charcoal/70 max-w-2xl mx-auto">
                Professional-grade tools designed for both beginners and experts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <TankmateCard
                hoverable
                className="border-brand-ocean/20 hover:border-brand-ocean/40 bg-gradient-to-br from-white to-brand-ocean/5 hover:shadow-xl transition-all duration-300"
              >
                <TankmateCardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-ocean to-brand-ocean-dark flex items-center justify-center mb-4 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <TankmateCardTitle className="text-brand-charcoal">
                    Tank Management
                  </TankmateCardTitle>
                  <TankmateCardDescription className="text-brand-charcoal/70">
                    Organize and track all your aquariums in one place
                  </TankmateCardDescription>
                </TankmateCardHeader>
                <TankmateCardContent>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed">
                    Keep detailed records of tank specs, inhabitants, equipment, and history.
                    Perfect for hobbyists managing multiple aquariums.
                  </p>
                </TankmateCardContent>
              </TankmateCard>

              <TankmateCard
                hoverable
                className="border-brand-teal/20 hover:border-brand-teal/40 bg-gradient-to-br from-white to-brand-teal/5 hover:shadow-xl transition-all duration-300"
              >
                <TankmateCardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-teal to-brand-teal-dark flex items-center justify-center mb-4 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <TankmateCardTitle className="text-brand-charcoal">
                    Maintenance Schedules
                  </TankmateCardTitle>
                  <TankmateCardDescription className="text-brand-charcoal/70">
                    Never miss water changes, filter maintenance, or feeding schedules
                  </TankmateCardDescription>
                </TankmateCardHeader>
                <TankmateCardContent>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed">
                    Custom reminders adapt to your tank's needs. Track completion history and
                    optimize your maintenance routine over time.
                  </p>
                </TankmateCardContent>
              </TankmateCard>

              <TankmateCard
                hoverable
                className="border-brand-aqua/20 hover:border-brand-aqua/40 bg-gradient-to-br from-white to-brand-aqua/5 hover:shadow-xl transition-all duration-300"
              >
                <TankmateCardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-aqua to-brand-aqua-dark flex items-center justify-center mb-4 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 011-1h1m-1 1v1h1m-1-1H6m-1 0h1M5 7h1m0 0v1H5V7z"
                      />
                    </svg>
                  </div>
                  <TankmateCardTitle className="text-brand-charcoal">
                    Species Database
                  </TankmateCardTitle>
                  <TankmateCardDescription className="text-brand-charcoal/70">
                    Comprehensive care guides and compatibility information
                  </TankmateCardDescription>
                </TankmateCardHeader>
                <TankmateCardContent>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed">
                    Research any species before adding them to your tank. Get personalized care
                    recommendations based on your existing livestock.
                  </p>
                </TankmateCardContent>
              </TankmateCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-seafoam/15 via-brand-aqua/15 to-brand-ocean/15">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-charcoal mb-6">
              Ready to create your{' '}
              <span className="bg-gradient-to-r from-brand-seafoam to-brand-aqua bg-clip-text text-transparent">
                perfect aquarium
              </span>
              ?
            </h2>
            <p className="text-lg text-brand-charcoal/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of aquarists who trust Tankmate to keep their underwater worlds healthy
              and beautiful. Start your journey to stress-free aquarium keeping today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <TankmateButton size="lg" className="min-w-[200px]">
                  Start Your Free Trial
                </TankmateButton>
              </Link>
              <Link to="/features">
                <TankmateButton variant="ghost" size="lg">
                  View All Features →
                </TankmateButton>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-brand-charcoal/70">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-brand-seafoam mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                30-day free trial
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-brand-seafoam mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No setup fees
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-brand-seafoam mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

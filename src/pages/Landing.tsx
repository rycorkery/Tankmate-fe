import { Link } from 'react-router-dom'
import { TankmateButton } from '@/components/custom'
import { 
  TankmateCard, 
  TankmateCardHeader, 
  TankmateCardTitle, 
  TankmateCardDescription,
  TankmateCardContent 
} from '@/components/custom'
import { useStore } from '@/store/useStore'

export function Landing() {
  const { theme, toggleTheme } = useStore()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Welcome to Tankmate
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your comprehensive aquarium management platform. Track, monitor, and maintain your aquatic ecosystems with ease.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <TankmateButton size="lg">
                Get Started
              </TankmateButton>
            </Link>
            <Link to="/features">
              <TankmateButton variant="outline" size="lg">
                Learn More
              </TankmateButton>
            </Link>
          </div>
          <div className="mt-8">
            <TankmateButton 
              variant="ghost" 
              onClick={toggleTheme}
              className="text-sm"
            >
              Current theme: {theme}
            </TankmateButton>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <TankmateCard hoverable>
            <TankmateCardHeader>
              <TankmateCardTitle>Water Parameters</TankmateCardTitle>
              <TankmateCardDescription>
                Track pH, temperature, ammonia, and more
              </TankmateCardDescription>
            </TankmateCardHeader>
            <TankmateCardContent>
              <p className="text-sm text-muted-foreground">
                Monitor and log all critical water parameters to ensure optimal conditions for your aquatic life.
              </p>
            </TankmateCardContent>
          </TankmateCard>

          <TankmateCard hoverable>
            <TankmateCardHeader>
              <TankmateCardTitle>Maintenance Schedule</TankmateCardTitle>
              <TankmateCardDescription>
                Never miss a water change or filter cleaning
              </TankmateCardDescription>
            </TankmateCardHeader>
            <TankmateCardContent>
              <p className="text-sm text-muted-foreground">
                Set up automated reminders for all your tank maintenance tasks and keep a complete history.
              </p>
            </TankmateCardContent>
          </TankmateCard>

          <TankmateCard hoverable>
            <TankmateCardHeader>
              <TankmateCardTitle>Livestock Database</TankmateCardTitle>
              <TankmateCardDescription>
                Comprehensive species information at your fingertips
              </TankmateCardDescription>
            </TankmateCardHeader>
            <TankmateCardContent>
              <p className="text-sm text-muted-foreground">
                Access detailed care requirements, compatibility information, and health tracking for all your fish.
              </p>
            </TankmateCardContent>
          </TankmateCard>
        </section>

        <section className="bg-muted rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to dive in?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of aquarium enthusiasts who trust Tankmate to keep their underwater worlds thriving.
          </p>
          <Link to="/signup">
            <TankmateButton size="lg">
              Start Your Free Trial
            </TankmateButton>
          </Link>
        </section>
      </div>
    </div>
  )
}
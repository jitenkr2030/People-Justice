'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Lock,
  Crown,
  Star,
  Zap,
  ArrowRight,
  Check,
  X
} from 'lucide-react'
import { useSubscription } from '@/contexts/SubscriptionContext'

interface FeatureGateProps {
  feature: string
  children: React.ReactNode
  fallback?: React.ReactNode
  showUpgradePrompt?: boolean
}

export function FeatureGate({ 
  feature, 
  children, 
  fallback, 
  showUpgradePrompt = true 
}: FeatureGateProps) {
  const { canAccessFeature, isFeatureLocked, currentPlan, upgrade, isLoading } = useSubscription()

  if (canAccessFeature(feature)) {
    return <>{children}</>
  }

  if (fallback && !showUpgradePrompt) {
    return <>{fallback}</>
  }

  return (
    <div className="space-y-4">
      {showUpgradePrompt && (
        <PremiumFeaturePrompt 
          feature={feature} 
          currentPlan={currentPlan}
          onUpgrade={() => upgrade('premium')}
          isLoading={isLoading}
        />
      )}
      {fallback}
    </div>
  )
}

function PremiumFeaturePrompt({ 
  feature, 
  currentPlan, 
  onUpgrade, 
  isLoading 
}: {
  feature: string
  currentPlan: any
  onUpgrade: () => void
  isLoading: boolean
}) {
  const [showDetails, setShowDetails] = useState(false)

  const getFeatureInfo = (feature: string) => {
    const featureMap: Record<string, { name: string; description: string; benefits: string[] }> = {
      'nyayrakshak': {
        name: 'NyayRakshak - BNS 2023 Safety',
        description: 'Complete legal safety tool for modern Indian laws',
        benefits: [
          'Situation Analyzer with risk assessment',
          'Police Interaction Guide',
          'Emergency Mode for arrests',
          'Legal Risk Meter with visual indicators',
          'Evidence preservation tools'
        ]
      },
      'unlimited-templates': {
        name: 'Unlimited Templates',
        description: 'Access to all legal document templates',
        benefits: [
          'Unlimited RTI applications',
          'All legal notice templates',
          'Advanced consumer complaints',
          'Custom document generation'
        ]
      },
      'priority-support': {
        name: 'Priority Customer Support',
        description: 'Get help when you need it most',
        benefits: [
          '24/7 priority support',
          'Expert legal guidance',
          'Quick response times',
          'Video call support'
        ]
      },
      'video-guides': {
        name: 'Video Guides & Tutorials',
        description: 'Learn with step-by-step video tutorials',
        benefits: [
          'HD video explanations',
          'Scenario-based guides',
          'Expert interviews',
          'Regular updates'
        ]
      },
      'cloud-storage': {
        name: 'Cloud Document Storage',
        description: 'Secure storage for all your legal documents',
        benefits: [
          'Unlimited cloud storage',
          'Automatic backups',
          'Document sharing',
          'Access anywhere'
        ]
      }
    }

    return featureMap[feature] || {
      name: 'Premium Feature',
      description: 'Unlock advanced legal tools',
      benefits: ['Enhanced functionality', 'Expert guidance', 'Priority support']
    }
  }

  const featureInfo = getFeatureInfo(feature)

  return (
    <Alert className="border-purple-200 bg-purple-50">
      <Crown className="h-4 w-4 text-purple-600" />
      <AlertDescription className="text-purple-800">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <strong className="text-purple-900">Premium Feature: {featureInfo.name}</strong>
              <p className="text-sm text-purple-700 mt-1">{featureInfo.description}</p>
            </div>
            <Badge variant="outline" className="border-purple-300 text-purple-700">
              PREMIUM
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              onClick={onUpgrade}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  Upgrade to Premium
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide' : 'Show'} Benefits
            </Button>
          </div>

          {showDetails && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2">What you'll get:</h4>
              <ul className="space-y-1">
                {featureInfo.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-3 pt-3 border-t border-purple-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-900">
                    Only ₹999/year
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-purple-600">
                    <Star className="w-3 h-3 fill-current" />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}

// Individual feature gate components for specific features
export function NyayRakshakGate({ children }: { children: React.ReactNode }) {
  return (
    <FeatureGate 
      feature="nyayrakshak" 
      fallback={
        <Card className="border-dashed border-gray-300">
          <CardContent className="p-8 text-center">
            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">NyayRakshak</h3>
            <p className="text-sm text-gray-600 mb-4">
              BNS 2023 Legal Safety Tool
            </p>
            <p className="text-xs text-gray-500">
              Upgrade to Premium to access Situation Analyzer, Police Guide, Emergency Mode, and more.
            </p>
          </CardContent>
        </Card>
      }
    >
      {children}
    </FeatureGate>
  )
}

export function UnlimitedTemplatesGate({ children }: { children: React.ReactNode }) {
  return (
    <FeatureGate 
      feature="unlimited-templates"
      fallback={
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription>
            This template requires Premium. Upgrade to unlock unlimited templates.
          </AlertDescription>
        </Alert>
      }
    >
      {children}
    </FeatureGate>
  )
}

export function PrioritySupportGate({ children }: { children: React.ReactNode }) {
  return (
    <FeatureGate 
      feature="priority-support"
      showUpgradePrompt={false}
    >
      {children}
    </FeatureGate>
  )
}

export function VideoGuidesGate({ children }: { children: React.ReactNode }) {
  return (
    <FeatureGate 
      feature="video-guides"
      fallback={
        <div className="text-center py-8">
          <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Video guides available in Premium</p>
        </div>
      }
    >
      {children}
    </FeatureGate>
  )
}
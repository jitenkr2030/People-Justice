'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type SubscriptionTier = 'free' | 'basic' | 'premium'

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  duration: 'one-time' | 'yearly'
  tier: SubscriptionTier
  features: string[]
  popular?: boolean
  color: string
  description: string
}

export interface UserSubscription {
  tier: SubscriptionTier
  planId: string | null
  startDate: string | null
  endDate: string | null
  isActive: boolean
  autoRenew: boolean
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    duration: 'one-time',
    tier: 'free',
    features: [
      'Access to basic legal information',
      'Know Your Rights (limited)',
      'Emergency helpline numbers',
      'Basic legal awareness',
      'Language support (English only)'
    ],
    color: 'bg-gray-500',
    description: 'Get started with basic legal awareness'
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    duration: 'one-time',
    tier: 'basic',
    features: [
      'Everything in Free',
      'RTI Generator (5 templates)',
      'Legal Notice Generator (3 templates)',
      'Consumer Complaint Generator',
      'Know Your Rights (full access)',
      'Hindi & English support',
      'Offline mode',
      'Document downloads',
      'Email support'
    ],
    color: 'bg-blue-500',
    description: 'Essential legal tools for everyday needs'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    duration: 'yearly',
    tier: 'premium',
    popular: true,
    features: [
      'Everything in Basic',
      'NyayRakshak - BNS 2023 Safety Tool',
      'Unlimited RTI templates',
      'Unlimited Legal Notice templates',
      'Advanced Consumer Complaint tools',
      'Situation Analyzer & Risk Meter',
      'Emergency Mode & Police Guide',
      'Evidence Checklist & Preservation',
      'Priority customer support',
      'Video guides & tutorials',
      'Legal updates & notifications',
      'Document cloud storage',
      'Lawyer directory access',
      'Case tracking system',
      'Family sharing (up to 5 members)'
    ],
    color: 'bg-purple-500',
    description: 'Complete legal protection and empowerment'
  }
]

interface SubscriptionContextType {
  subscription: UserSubscription
  plans: SubscriptionPlan[]
  currentPlan: SubscriptionPlan | null
  upgrade: (planId: string) => Promise<void>
  cancel: () => Promise<void>
  canAccessFeature: (feature: string) => boolean
  isFeatureLocked: (feature: string) => boolean
  remainingDays: number | null
  isLoading: boolean
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<UserSubscription>({
    tier: 'free',
    planId: null,
    startDate: null,
    endDate: null,
    isActive: false,
    autoRenew: false
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load subscription from localStorage
    const saved = localStorage.getItem('peoples-justice-subscription')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Check if subscription is still valid
        if (parsed.endDate && new Date(parsed.endDate) > new Date()) {
          setSubscription(parsed)
        } else {
          // Subscription expired, reset to free
          setSubscription({
            tier: 'free',
            planId: null,
            startDate: null,
            endDate: null,
            isActive: false,
            autoRenew: false
          })
          localStorage.removeItem('peoples-justice-subscription')
        }
      } catch (error) {
        console.error('Error parsing subscription:', error)
      }
    }
  }, [])

  const currentPlan = subscriptionPlans.find(plan => plan.id === subscription.planId) || subscriptionPlans[0]

  const remainingDays = subscription.endDate 
    ? Math.ceil((new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  const upgrade = async (planId: string) => {
    setIsLoading(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const plan = subscriptionPlans.find(p => p.id === planId)
      if (!plan) throw new Error('Plan not found')

      const newSubscription: UserSubscription = {
        tier: plan.tier,
        planId: plan.id,
        startDate: new Date().toISOString(),
        endDate: plan.duration === 'yearly' 
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          : null,
        isActive: true,
        autoRenew: plan.duration === 'yearly'
      }

      setSubscription(newSubscription)
      localStorage.setItem('peoples-justice-subscription', JSON.stringify(newSubscription))
    } catch (error) {
      console.error('Upgrade failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const cancel = async () => {
    setIsLoading(true)
    try {
      // Simulate cancellation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubscription({
        tier: 'free',
        planId: null,
        startDate: null,
        endDate: null,
        isActive: false,
        autoRenew: false
      })
      localStorage.removeItem('peoples-justice-subscription')
    } catch (error) {
      console.error('Cancellation failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const canAccessFeature = (feature: string): boolean => {
    if (subscription.tier === 'premium') return true
    if (subscription.tier === 'basic') {
      const basicFeatures = [
        'rti-generator',
        'legal-notice',
        'consumer-complaint',
        'know-rights',
        'hindi-support',
        'offline-mode',
        'document-download'
      ]
      return basicFeatures.includes(feature)
    }
    return false
  }

  const isFeatureLocked = (feature: string): boolean => {
    return !canAccessFeature(feature)
  }

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      plans: subscriptionPlans,
      currentPlan,
      upgrade,
      cancel,
      canAccessFeature,
      isFeatureLocked,
      remainingDays,
      isLoading
    }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}
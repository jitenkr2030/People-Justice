'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft,
  Check,
  X,
  Star,
  Crown,
  Zap,
  Shield,
  Users,
  Clock,
  Headphones,
  Cloud,
  Video,
  BookOpen,
  HelpCircle,
  Loader2
} from 'lucide-react'
import { useSubscription } from '@/contexts/SubscriptionContext'

export default function SubscriptionPage() {
  const { plans, currentPlan, upgrade, cancel, isLoading, subscription } = useSubscription()
  const [selectedPlan, setSelectedPlan] = useState('')

  const handleUpgrade = async (planId: string) => {
    try {
      setSelectedPlan(planId)
      await upgrade(planId)
      setSelectedPlan('')
    } catch (error) {
      setSelectedPlan('')
      console.error('Upgrade failed:', error)
    }
  }

  const handleCancel = async () => {
    try {
      await cancel()
    } catch (error) {
      console.error('Cancellation failed:', error)
    }
  }

  const getPlanIcon = (tier: string) => {
    switch (tier) {
      case 'basic': return <Shield className="w-8 h-8" />
      case 'premium': return <Crown className="w-8 h-8" />
      default: return <BookOpen className="w-8 h-8" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Choose Your Plan</h1>
              <p className="text-xs text-gray-500">Legal empowerment for every budget</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Current Subscription Status */}
        {subscription.isActive && currentPlan && (
          <Alert className="mb-8 border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Current Plan: {currentPlan.name}</strong>
              {subscription.endDate && (
                <span> • Valid until {new Date(subscription.endDate).toLocaleDateString()}</span>
              )}
              {currentPlan.tier !== 'free' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-4"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cancel'}
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative transition-all duration-200 ${
                plan.popular ? 'border-purple-500 shadow-xl scale-105' : 'hover:shadow-lg'
              } ${currentPlan?.id === plan.id ? 'ring-2 ring-purple-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}>
                  {getPlanIcon(plan.tier)}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2">
                    {plan.duration === 'yearly' ? '/year' : plan.price === 0 ? '' : '/one-time'}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <Button 
                  className={`w-full ${
                    plan.popular ? 'bg-purple-500 hover:bg-purple-600' : ''
                  }`}
                  variant={currentPlan?.id === plan.id ? 'outline' : 'default'}
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isLoading || selectedPlan === plan.id || currentPlan?.id === plan.id}
                >
                  {selectedPlan === plan.id ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : currentPlan?.id === plan.id ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : null}
                  {currentPlan?.id === plan.id ? 'Current Plan' : `Get ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Feature Comparison</CardTitle>
            <CardDescription>See what's included in each plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Free</th>
                    <th className="text-center py-3 px-4">Basic (₹99)</th>
                    <th className="text-center py-3 px-4">Premium (₹999/year)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Legal Information Access</td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">RTI Generator</td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Legal Notice Generator</td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Consumer Complaint</td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">NyayRakshak (BNS 2023)</td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Hindi Language Support</td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Offline Mode</td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Priority Support</td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Video Guides</td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Family Sharing (5 members)</td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">What's the difference between Basic and Premium?</h4>
              <p className="text-sm text-gray-600">
                Basic includes essential legal tools like RTI Generator, Legal Notices, and Consumer Complaints. 
                Premium adds advanced features like NyayRakshak (BNS 2023 safety tool), priority support, 
                video guides, and family sharing.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Can I change my plan later?</h4>
              <p className="text-sm text-gray-600">
                Yes! You can upgrade your plan at any time. When upgrading, you'll only pay the prorated difference.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Is there a free trial?</h4>
              <p className="text-sm text-gray-600">
                The free plan includes basic legal information and emergency helpline numbers so you can 
                explore the platform before upgrading.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-gray-600">
                We accept UPI, credit/debit cards, net banking, and digital wallets for your convenience.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
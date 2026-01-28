'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  ShoppingBag,
  Menu,
  X,
  Globe,
  Download,
  HelpCircle,
  Phone,
  Crown,
  Star,
  Zap
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import RTIGenerator from '@/components/RTIGenerator'
import KnowYourRights from '@/components/KnowYourRights'
import LegalNoticeGenerator from '@/components/LegalNoticeGenerator'
import ConsumerComplaint from '@/components/ConsumerComplaint'
import NyayRakshak from '@/components/NyayRakshak'
import SubscriptionPage from '@/components/SubscriptionPage'
import { registerServiceWorker } from '@/lib/serviceWorker'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { NyayRakshakGate } from '@/components/FeatureGate'

const modules = [
  {
    id: 'rti',
    title: 'RTI Generator',
    description: 'File Right to Information applications easily',
    icon: FileText,
    color: 'bg-blue-500',
    features: ['Pre-built templates', 'Department auto-selection', 'Hindi & English support'],
    tier: 'basic' as const
  },
  {
    id: 'rights',
    title: 'Know Your Rights',
    description: 'Learn your legal rights in simple language',
    icon: Shield,
    color: 'bg-green-500',
    features: ['Labour rights', 'Women rights', 'Police rights', 'Consumer rights'],
    tier: 'basic' as const
  },
  {
    id: 'notice',
    title: 'Legal Notice',
    description: 'Create professional legal notices',
    icon: AlertTriangle,
    color: 'bg-orange-500',
    features: ['Payment disputes', 'Property issues', 'Service negligence', 'Fraud cases'],
    tier: 'basic' as const
  },
  {
    id: 'complaint',
    title: 'Consumer Complaint',
    description: 'Fight fraud and service issues',
    icon: ShoppingBag,
    color: 'bg-purple-500',
    features: ['E-commerce fraud', 'Payment scams', 'Product issues', 'Service disputes'],
    tier: 'basic' as const
  },
  {
    id: 'nyayrakshak',
    title: 'NyayRakshak',
    description: 'BNS 2023 Legal Safety & Protection',
    icon: Shield,
    color: 'bg-red-500',
    features: ['Situation Analyzer', 'Police Guide', 'Emergency Mode', 'Risk Assessment'],
    tier: 'premium' as const
  }
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState('home')
  const { t, language, setLanguage } = useLanguage()
  const { subscription, currentPlan, canAccessFeature, isFeatureLocked } = useSubscription()

  const renderCurrentView = () => {
    switch(currentView) {
      case 'rti':
        return <RTIGenerator />
      case 'rights':
        return <KnowYourRights />
      case 'notice':
        return <LegalNoticeGenerator />
      case 'complaint':
        return <ConsumerComplaint />
      case 'nyayrakshak':
        return <NyayRakshak />
      case 'subscription':
        return <SubscriptionPage />
      default:
        return <HomeView />
    }
  }

  const HomeView = () => {
    useEffect(() => {
      registerServiceWorker()
    }, [])

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('app.title')}</h1>
                <p className="text-xs text-gray-500">{t('app.subtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex items-center space-x-2"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
              </Button>
              
              {subscription.tier === 'free' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden sm:flex items-center space-x-2 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                  onClick={() => setCurrentView('subscription')}
                >
                  <Crown className="w-4 h-4" />
                  <span>Upgrade</span>
                </Button>
              )}
              
              {subscription.isActive && (
                <Badge variant="outline" className="hidden sm:flex items-center space-x-1">
                  <Crown className="w-3 h-3" />
                  <span>{currentPlan?.name}</span>
                </Badge>
              )}
              
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Button variant="outline" className="justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Offline Mode
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help & Support
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Helpline
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('app.subtitle')}
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('app.mission')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₹99</div>
              <div className="text-sm text-gray-600">Basic - One Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">₹999</div>
              <div className="text-sm text-gray-600">Premium - Per Year</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="text-sm">Hindi & English</Badge>
            <Badge variant="secondary" className="text-sm">Offline Support</Badge>
            <Badge variant="secondary" className="text-sm">No Login Required</Badge>
            <Badge variant="secondary" className="text-sm">100% Private</Badge>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => {
            const Icon = module.icon
            const isLocked = isFeatureLocked(module.tier)
            const canAccess = canAccessFeature(module.tier)
            
            return (
              <Card 
                key={module.id}
                className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 relative ${
                  !canAccess ? 'opacity-75' : ''
                }`}
                onClick={() => canAccess ? setCurrentView(module.id) : setCurrentView('subscription')}
              >
                {isLocked && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge variant="outline" className="text-xs border-purple-300 text-purple-700">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{t(`modules.${module.id}.title`)}</CardTitle>
                      <CardDescription className="text-sm">
                        {t(`modules.${module.id}.description`)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {module.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant={canAccess ? "outline" : "default"}
                  >
                    {canAccess ? t('common.getStarted') : (
                      <>
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Access
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Why Choose People's Justice?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Legal Confidence</h4>
              <p className="text-sm text-gray-600">
                Understand your rights and gain confidence to deal with authorities
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Ready Documents</h4>
              <p className="text-sm text-gray-600">
                Generate legally valid documents without legal knowledge
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Dispute Resolution</h4>
              <p className="text-sm text-gray-600">
                Resolve disputes early without expensive legal battles
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> People's Justice provides legal information and document assistance, not legal advice. 
            For complex matters, consult a qualified lawyer.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                © 2024 People's Justice. Empowering Indian citizens with legal tools.
              </p>
            </div>
            <div className="flex space-x-6">
              <Button variant="ghost" size="sm" className="text-gray-600">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                Terms of Use
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

  return renderCurrentView()
}
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  Shield, 
  Search,
  AlertTriangle,
  Phone,
  MapPin,
  FileText,
  Volume2,
  Download,
  CheckCircle,
  X,
  Info,
  Camera,
  Clock,
  Users,
  Building,
  MessageCircle,
  Video,
  Mic,
  Globe,
  Lock,
  HelpCircle,
  Activity,
  Zap,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const bnsSections = [
  {
    id: 'cyber_crime',
    name: 'Cyber Crime & Online Fraud',
    description: 'UPI fraud, online scams, cyber harassment',
    icon: '💻',
    riskLevel: 'high',
    sections: ['BNS 69 (Cheating)', 'BNS 316 (Cheating by personation)', 'BNS 318 (Cheating)']
  },
  {
    id: 'domestic_disputes',
    name: 'Domestic & Family Disputes',
    description: 'Family arguments, domestic issues, property disputes',
    icon: '🏠',
    riskLevel: 'medium',
    sections: ['BNS 85 (Cruelty by husband)', 'BNS 352 (Assault)', 'BNS 506 (Criminal intimidation)']
  },
  {
    id: 'workplace_issues',
    name: 'Workplace Conflicts',
    description: 'Office disputes, harassment, termination issues',
    icon: '💼',
    riskLevel: 'medium',
    sections: ['BNS 354 (Assault)', 'BNS 509 (Word, gesture or act intended to insult modesty)']
  },
  {
    id: 'financial_disputes',
    name: 'Financial & Money Matters',
    description: 'Loan defaults, payment disputes, financial fraud',
    icon: '💰',
    riskLevel: 'medium',
    sections: ['BNS 316 (Cheating)', 'BNS 420 (Cheating)', 'BNS 403 (Dishonest misappropriation)']
  },
  {
    id: 'public_places',
    name: 'Public Place Incidents',
    description: 'Road incidents, public arguments, altercations',
    icon: '🚗',
    riskLevel: 'low',
    sections: ['BNS 268 (Rash driving)', 'BNS 351 (Assault)', 'BNS 504 (Intentional insult)']
  },
  {
    id: 'social_media',
    name: 'Social Media Issues',
    description: 'Online posts, comments, digital content issues',
    icon: '📱',
    riskLevel: 'medium',
    sections: ['BNS 356 (Assault), BNS 67 (Punishment for defamation)']
  }
]

const policeRights = [
  {
    title: "Police CAN DO",
    items: [
      "Ask for your name and address if they suspect wrongdoing",
      "Question you in connection with a case",
      "Search your premises with valid warrant",
      "Arrest you with proper warrant or for cognizable offences",
      "Use reasonable force if you resist arrest"
    ],
    color: "text-green-600"
  },
  {
    title: "Police CANNOT DO",
    items: [
      "Arrest without informing the grounds of arrest",
      "Detain you beyond 24 hours without magistrate's permission",
      "Search without warrant (except specific circumstances)",
      "Use excessive force or torture during interrogation",
      "Deny you the right to consult a lawyer"
    ],
    color: "text-red-600"
  }
]

const arrestRights = [
  "Right to know the grounds of arrest",
  "Right to inform a friend/relative about arrest",
  "Right to consult a lawyer of your choice",
  "Right to be produced before magistrate within 24 hours",
  "Right to medical examination if needed",
  "Right to remain silent during interrogation",
  "Women cannot be arrested after sunset (except exceptional cases)",
  "Right to free legal aid if you cannot afford a lawyer"
]

export default function NyayRakshak() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedSituation, setSelectedSituation] = useState('')
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isEmergencyMode, setIsEmergencyMode] = useState(false)
  const [selectedRights, setSelectedRights] = useState<string[]>([])
  const [evidenceList, setEvidenceList] = useState<string[]>([])

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const analyzeRisk = () => {
    // Simple risk analysis based on situation and answers
    const situation = bnsSections.find(s => s.id === selectedSituation)
    if (situation) {
      setRiskLevel(situation.riskLevel as 'low' | 'medium' | 'high')
      if (situation.riskLevel === 'high') {
        setIsEmergencyMode(true)
      }
    }
  }

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'low': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'high': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRiskIcon = (level: string) => {
    switch(level) {
      case 'low': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'high': return <X className="w-5 h-5 text-red-600" />
      default: return <Info className="w-5 h-5 text-gray-600" />
    }
  }

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">NyayRakshak</h2>
        <p className="text-gray-600 mb-4">Legal Safety for Every Citizen</p>
        <Badge variant="outline" className="text-sm">Bharatiya Nyaya Sanhita (BNS) 2023</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-red-200"
          onClick={() => setCurrentView('analyzer')}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Situation Analyzer</CardTitle>
                <CardDescription>Identify BNS sections and risk level</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-red-200"
          onClick={() => setCurrentView('police-guide')}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Police Interaction Guide</CardTitle>
                <CardDescription>What police can & cannot do</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-red-200"
          onClick={() => setCurrentView('emergency')}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Emergency Mode</CardTitle>
                <CardDescription>Arrest & notice safety guide</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-red-200"
          onClick={() => setCurrentView('risk-meter')}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Legal Risk Meter</CardTitle>
                <CardDescription>Visual risk assessment tool</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all"
          onClick={() => setCurrentView('complaint-generator')}
        >
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-medium text-sm">Complaint Generator</h3>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all"
          onClick={() => setCurrentView('evidence-checklist')}
        >
          <CardContent className="p-4 text-center">
            <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-medium text-sm">Evidence Checklist</h3>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all"
          onClick={() => setCurrentView('rights-library')}
        >
          <CardContent className="p-4 text-center">
            <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-medium text-sm">Rights Library</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSituationAnalyzer = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Situation Analyzer</h3>
        <p className="text-sm text-gray-600">Tell us about your situation to understand potential legal implications</p>
      </div>

      {!selectedSituation ? (
        <div className="space-y-4">
          <Label>Select your situation type:</Label>
          {bnsSections.map((section) => (
            <Card 
              key={section.id}
              className={`cursor-pointer transition-all ${
                selectedSituation === section.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedSituation(section.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{section.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{section.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                    <Badge 
                      variant={section.riskLevel === 'high' ? 'destructive' : 'secondary'} 
                      className="mt-2 text-xs"
                    >
                      Risk: {section.riskLevel}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Selected: {bnsSections.find(s => s.id === selectedSituation)?.name}
            </h4>
            <p className="text-sm text-blue-700">
              Potential BNS Sections: {bnsSections.find(s => s.id === selectedSituation)?.sections.join(', ')}
            </p>
          </div>

          <div className="space-y-4">
            <Label>Answer these questions to assess your situation:</Label>
            
            <div>
              <Label htmlFor="q1">Did anyone suffer physical harm?</Label>
              <RadioGroup value={answers.q1} onValueChange={(value) => handleAnswerChange('q1', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes1" />
                  <Label htmlFor="yes1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no1" />
                  <Label htmlFor="no1">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="q2">Was there any financial loss?</Label>
              <RadioGroup value={answers.q2} onValueChange={(value) => handleAnswerChange('q2', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes2" />
                  <Label htmlFor="yes2">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no2" />
                  <Label htmlFor="no2">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="q3">Is this the first time such incident occurred?</Label>
              <RadioGroup value={answers.q3} onValueChange={(value) => handleAnswerChange('q3', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes3" />
                  <Label htmlFor="yes3">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no3" />
                  <Label htmlFor="no3">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="description">Describe what happened in simple words:</Label>
              <Textarea
                id="description"
                value={answers.description}
                onChange={(e) => handleAnswerChange('description', e.target.value)}
                placeholder="Explain your situation in simple terms..."
                rows={4}
              />
            </div>
          </div>

          <Button onClick={analyzeRisk} className="w-full">
            Analyze Risk Level
          </Button>

          {riskLevel && (
            <Alert className={riskLevel === 'high' ? 'border-red-200 bg-red-50' : riskLevel === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}>
              <div className="flex items-center space-x-2">
                {getRiskIcon(riskLevel)}
                <AlertDescription className={riskLevel === 'high' ? 'text-red-800' : riskLevel === 'medium' ? 'text-yellow-800' : 'text-green-800'}>
                  <strong>Risk Level: {riskLevel.toUpperCase()}</strong>
                  <br />
                  {riskLevel === 'high' && "Immediate legal consultation recommended. Contact a lawyer right away."}
                  {riskLevel === 'medium' && "Monitor the situation. Document everything and consider legal advice."}
                  {riskLevel === 'low' && "Low legal risk. Stay calm and avoid escalation."}
                </AlertDescription>
              </div>
            </Alert>
          )}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentView('home')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {selectedSituation && (
          <Button variant="outline" onClick={() => setSelectedSituation('')}>
            Reset
          </Button>
        )}
      </div>
    </div>
  )

  const renderPoliceGuide = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Police Interaction Guide</h3>
        <p className="text-sm text-gray-600">Understanding what police can and cannot do</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policeRights.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className={`text-lg ${section.color}`}>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      section.color === 'text-green-600' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-blue-500" />
            <span>FIR Process Explained</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">What is FIR?</h4>
              <p className="text-sm text-gray-600">First Information Report - The first document of any criminal case</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">Your Rights During FIR:</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Right to file FIR for any cognizable offence</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Right to get copy of FIR free of cost</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Right to have information recorded in your language</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Police cannot refuse to register FIR</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900">If Police Refuses FIR:</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Send written complaint to SP/Commissioner</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Approach court under Section 156(3) CrPC</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span className="text-sm text-gray-700">File complaint with State Human Rights Commission</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentView('home')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={() => setCurrentView('emergency')}>
          Emergency Guide
        </Button>
      </div>
    </div>
  )

  const renderEmergencyMode = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-red-900">Emergency Mode</h3>
        <p className="text-red-700">Arrest & Notice Safety Guide</p>
      </div>

      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>EMERGENCY ACTIVATED</strong><br/>
          If you're facing immediate arrest risk or police notice, follow these steps carefully.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span>Your Rights During Arrest</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {arrestRights.map((right, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{right}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <X className="w-5 h-5 text-red-500" />
            <span>What NOT to Say</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3 h-3 text-red-600" />
              </div>
              <span className="text-sm text-gray-700">Don't sign any document without reading</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3 h-3 text-red-600" />
              </div>
              <span className="text-sm text-gray-700">Don't make statements without lawyer present</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3 h-3 text-red-600" />
              </div>
              <span className="text-sm text-gray-700">Don't accept police version without verification</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3 h-3 text-red-600" />
              </div>
              <span className="text-sm text-gray-700">Don't agree to searches without proper warrant</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-green-500" />
            <span>Emergency Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">National Emergency</h4>
                <p className="text-sm text-gray-600">Police, Ambulance, Fire</p>
              </div>
              <Badge variant="outline">112</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Women Helpline</h4>
                <p className="text-sm text-gray-600">24/7 Women Support</p>
              </div>
              <Badge variant="outline">1091</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Legal Aid</h4>
                <p className="text-sm text-gray-600">Free Legal Services</p>
              </div>
              <Badge variant="outline">1516</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentView('home')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={() => setCurrentView('complaint-generator')}>
          Generate Complaint
        </Button>
      </div>
    </div>
  )

  const renderRiskMeter = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Legal Risk Meter</h3>
        <p className="text-sm text-gray-600">Visual assessment of your legal situation</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Risk Level</span>
                <div className="flex items-center space-x-2">
                  {getRiskIcon(riskLevel)}
                  <span className="text-sm font-bold uppercase">{riskLevel}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${riskLevel === 'low' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm">Low Risk - Advisory only</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm">Medium Risk - Action required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${riskLevel === 'high' ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm">High Risk - Urgent legal support needed</span>
                </div>
              </div>

              <Progress value={riskLevel === 'low' ? 33 : riskLevel === 'medium' ? 66 : 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Factors Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Physical Harm Involved</span>
                <Badge variant={answers.q1 === 'yes' ? 'destructive' : 'secondary'}>
                  {answers.q1 === 'yes' ? 'High Risk' : 'Low Risk'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Financial Loss</span>
                <Badge variant={answers.q2 === 'yes' ? 'destructive' : 'secondary'}>
                  {answers.q2 === 'yes' ? 'Medium Risk' : 'Low Risk'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Previous Incidents</span>
                <Badge variant={answers.q3 === 'no' ? 'destructive' : 'secondary'}>
                  {answers.q3 === 'no' ? 'Medium Risk' : 'Low Risk'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskLevel === 'low' && (
                <>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Document the incident details</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Avoid escalation of the situation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Monitor for any developments</span>
                  </div>
                </>
              )}
              
              {riskLevel === 'medium' && (
                <>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Consult a lawyer for legal advice</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Preserve all evidence safely</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Consider filing a formal complaint</span>
                  </div>
                </>
              )}
              
              {riskLevel === 'high' && (
                <>
                  <div className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm font-medium">Contact a lawyer immediately</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm font-medium">Do not speak to anyone without legal advice</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm font-medium">Activate emergency support if needed</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentView('home')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={() => setCurrentView('analyzer')}>
          Re-analyze
        </Button>
      </div>
    </div>
  )

  const renderComplaintGenerator = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Complaint Generator</h3>
        <p className="text-sm text-gray-600">Generate simple drafts for various complaints</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-lg">Police Complaint</CardTitle>
            <CardDescription>For filing complaint with police</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-lg">Online Fraud Report</CardTitle>
            <CardDescription>For cybercrime and online fraud</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-lg">Harassment Complaint</CardTitle>
            <CardDescription>For threat and harassment cases</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-lg">Legal Notice</CardTitle>
            <CardDescription>For sending legal notices</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Generate
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentView('home')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  )

  const renderEvidenceChecklist = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Evidence Checklist</h3>
        <p className="text-sm text-gray-600">What evidence matters and how to preserve it</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Digital Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              'WhatsApp messages (screenshots with timestamps)',
              'Email communications',
              'Social media posts and comments',
              'Call recordings (where legal)',
              'Bank transaction records',
              'UPI payment screenshots'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox id={`digital-${index}`} />
                <Label htmlFor={`digital-${index}`} className="text-sm">{item}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Physical Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              'Photographs of incident scene',
              'Videos of the incident',
              'Medical reports (if any)',
              'Property damage photos',
              'Witness contact information',
              'Written complaints or notices'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox id={`physical-${index}`} />
                <Label htmlFor={`physical-${index}`} className="text-sm">{item}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Important Tips:</strong><br/>
          • Always take screenshots with visible timestamps<br/>
          • Store evidence in multiple secure locations<br/>
          • Don't modify original evidence<br/>
          • Create backup copies immediately<br/>
          • Note date, time, and location of each evidence piece
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentView('home')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  )

  const renderRightsLibrary = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Rights Library</h3>
        <p className="text-sm text-gray-600">Know your fundamental legal rights</p>
      </div>

      <Tabs defaultValue="arrest" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="arrest">Arrest Rights</TabsTrigger>
          <TabsTrigger value="search">Search Rights</TabsTrigger>
          <TabsTrigger value="special">Special Rights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="arrest" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>During Arrest</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {arrestRights.map((right, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">{right}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>During Search & Seizure</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Right to see search warrant</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Right to have witnesses during search</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Right to receive seizure list</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Right to be present during search</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="special" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Special Protections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-600">Women Rights</h4>
                  <ul className="space-y-1 mt-2">
                    <li className="text-sm">Cannot be arrested after sunset (except exceptional cases)</li>
                    <li className="text-sm">Must be searched by female officers only</li>
                    <li className="text-sm">Right to have female relative/friend present</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-600">Senior Citizens Rights</h4>
                  <ul className="space-y-1 mt-2">
                    <li className="text-sm">Priority in legal proceedings</li>
                    <li className="text-sm">Protection from abuse and exploitation</li>
                    <li className="text-sm">Right to maintenance and care</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-purple-600">Minor Rights</h4>
                  <ul className="space-y-1 mt-2">
                    <li className="text-sm">Cannot be arrested without guardian</li>
                    <li className="text-sm">Special juvenile justice procedures</li>
                    <li className="text-sm">Protection from criminal prosecution</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentView('home')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  )

  const renderCurrentView = () => {
    switch(currentView) {
      case 'analyzer': return renderSituationAnalyzer()
      case 'police-guide': return renderPoliceGuide()
      case 'emergency': return renderEmergencyMode()
      case 'risk-meter': return renderRiskMeter()
      case 'complaint-generator': return renderComplaintGenerator()
      case 'evidence-checklist': return renderEvidenceChecklist()
      case 'rights-library': return renderRightsLibrary()
      default: return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentView('home')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">NyayRakshak</h1>
                <p className="text-xs text-gray-500">Legal Safety for Every Citizen</p>
              </div>
            </div>
            
            {isEmergencyMode && (
              <Badge variant="destructive" className="animate-pulse">
                Emergency Mode
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 pb-24">
        <Card>
          <CardContent className="p-6">
            {renderCurrentView()}
          </CardContent>
        </Card>
        
        {/* Legal Disclaimer */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 font-semibold">
            This platform does not replace a lawyer or court.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">
              Based on Bharatiya Nyaya Sanhita (BNS) 2023
            </p>
            <div className="flex items-center space-x-2">
              <Lock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">100% Private & Secure</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
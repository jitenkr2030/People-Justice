'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  Shield, 
  Search,
  Volume2,
  Bookmark,
  Share2,
  Download,
  Users,
  Building,
  AlertTriangle,
  Heart,
  ShoppingBag,
  Home,
  UserCheck,
  Info,
  ChevronRight,
  Star,
  Clock,
  Phone
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

const rightsCategories = [
  {
    id: 'labour',
    name: 'Labour & Worker Rights',
    icon: Users,
    color: 'bg-blue-500',
    description: 'Rights of employees, workers, and laborers',
    emergency: false,
    topics: [
      {
        title: 'Minimum Wage',
        content: {
          what: 'Minimum wage is the lowest remuneration that employers must pay their workers.',
          rights: [
            'Right to receive minimum wage as per government notification',
            'Right to receive payment on time (within 7 days)',
            'Right to receive payslip with wage details',
            'Right to approach Labour Court for non-payment'
          ],
          donts: [
            'Don\'t accept less than minimum wage',
            'Don\'t work without proper wage agreement',
            'Don\'t accept delayed payments without protest',
            'Don\'t sign blank salary slips'
          ],
          examples: [
            'A construction worker must be paid at least the state minimum wage',
            'Domestic workers are covered under minimum wage laws in many states',
            'Apprentices must be paid stipend as per apprenticeship rules'
          ],
          action: 'File complaint with Labour Commissioner or approach Labour Court'
        }
      },
      {
        title: 'Working Hours',
        content: {
          what: 'Working hours are regulated to prevent exploitation and ensure work-life balance.',
          rights: [
            'Maximum 8 hours per day and 48 hours per week',
            'Right to overtime pay for extra work',
            'Right to weekly holiday (usually Sunday)',
            'Right to paid leave as per law'
          ],
          donts: [
            'Don\'t work more than 48 hours without overtime',
            'Don\'t skip weekly holidays without compensation',
            'Don\'t work without proper attendance records',
            'Don\'t accept unpaid overtime'
          ],
          examples: [
            'If you work 9 hours, 1 hour must be paid as overtime',
            'Shop establishments must close on one day of the week',
            'Women cannot be made to work between 7 PM to 6 AM in factories'
          ],
          action: 'Report to Factory Inspector or Labour Department'
        }
      },
      {
        title: 'Social Security',
        content: {
          what: 'Social security benefits provide financial protection during contingencies.',
          rights: [
            'Right to EPF (Employees Provident Fund)',
            'Right to ESI (Employees State Insurance)',
            'Right to gratuity after 5 years of service',
            'Right to maternity benefits'
          ],
          donts: [
            'Don\'t let employer deduct PF without depositing',
            'Don\'t work without ESI coverage in eligible establishments',
            'Don\'t resign before 5 years if you need gratuity',
            'Don\'t ignore PF account statements'
          ],
          examples: [
            'All establishments with 20+ employees must provide PF',
            'ESI covers medical expenses and sickness benefits',
            'Maternity benefit is 26 weeks paid leave'
          ],
          action: 'Check EPFO portal, file complaint with EPFO or ESIC'
        }
      }
    ]
  },
  {
    id: 'women',
    name: 'Women\'s Legal Rights',
    icon: Heart,
    color: 'bg-pink-500',
    description: 'Legal protections and rights for women',
    emergency: true,
    topics: [
      {
        title: 'Workplace Harassment',
        content: {
          what: 'Sexual harassment at workplace is illegal and punishable under law.',
          rights: [
            'Right to safe working environment',
            'Right to file complaint with Internal Committee',
            'Right to confidentiality during investigation',
            'Right to protection from retaliation'
          ],
          donts: [
            'Don\'t tolerate inappropriate behavior',
            'Don\'t stay silent due to fear',
            'Don\'t blame yourself for harassment',
            'Don\'t resign without filing complaint'
          ],
          examples: [
            'Inappropriate comments, touching, or gestures',
            'Demanding sexual favors for promotions',
            'Creating hostile work environment',
            'Cyber harassment at workplace'
          ],
          action: 'File complaint with Internal Committee or Local Complaints Committee within 90 days'
        }
      },
      {
        title: 'Domestic Violence',
        content: {
          what: 'Domestic violence is a crime and civil wrong under Protection of Women from Domestic Violence Act.',
          rights: [
            'Right to live without fear and violence',
            'Right to residence in shared household',
            'Right to protection orders',
            'Right to monetary relief and compensation'
          ],
          donts: [
            'Don\'t tolerate physical or mental abuse',
            'Don\'t stay in dangerous situation',
            'Don\'t blame yourself for violence',
            'Don\'t withdraw complaint under pressure'
          ],
          examples: [
            'Physical abuse, beating, injury',
            'Verbal abuse, threats, insults',
            'Economic abuse, denying money',
            'Sexual abuse, marital rape'
          ],
          action: 'Call 181 (Women Helpline), file FIR with police, approach Protection Officer'
        }
      },
      {
        title: 'Property Rights',
        content: {
          what: 'Women have equal rights in ancestral and self-acquired property.',
          rights: [
            'Equal share in ancestral property',
            'Right to maintain self-acquired property',
            'Right to gift property to anyone',
            'Right to will property as per wish'
          ],
          donts: [
            'Don\'t give up property rights under pressure',
            'Don\'t sign property documents without understanding',
            'Don\'t accept less than legal share',
            'Don\'t delay claiming property rights'
          ],
          examples: [
            'Daughter has equal right as son in father\'s property',
            'Wife has right to husband\'s property',
            'Mother can claim share in deceased son\'s property',
            'Women can be legal heirs under Hindu Succession Act'
          ],
          action: 'Consult lawyer, file suit in civil court for property partition'
        }
      }
    ]
  },
  {
    id: 'police',
    name: 'Police & Arrest Rights',
    icon: Shield,
    color: 'bg-red-500',
    description: 'Your rights during police interaction and arrest',
    emergency: true,
    topics: [
      {
        title: 'Arrest Rights',
        content: {
          what: 'Every person has constitutional rights during arrest to prevent illegal detention.',
          rights: [
            'Right to know grounds of arrest',
            'Right to inform friend/relative about arrest',
            'Right to consult lawyer of choice',
            'Right to be produced before magistrate within 24 hours'
          ],
          donts: [
            'Don\'t make statements without lawyer',
            'Don\'t sign blank papers',
            'Don\'t resist legal arrest',
            'Don\'t accept illegal detention'
          ],
          examples: [
            'Police must inform arrest reason in writing',
            'Arrest memo must be prepared at time of arrest',
            'Medical examination must be conducted',
            'Women cannot be arrested after sunset and before sunrise'
          ],
          action: 'Immediately call lawyer, inform family, file habeas corpus petition if illegal detention'
        }
      },
      {
        title: 'Search & Seizure',
        content: {
          what: 'Police must follow legal procedures while searching premises or seizing property.',
          rights: [
            'Right to see search warrant',
            'Right to have witnesses during search',
            'Right to receive seizure list',
            'Right to be present during search'
          ],
          donts: [
            'Don\'t allow search without warrant',
            'Don\'t hand over documents without receipt',
            'Don\'t sign seizure memo without checking',
            'Don\'t allow search of women by male officers'
          ],
          examples: [
            'Search warrant must specify place and items',
            'Female officers must search women',
            'Seized items must be listed and signed',
            'Digital evidence requires special procedures'
          ],
          action: 'Demand to see warrant, call witnesses, file complaint for illegal search'
        }
      },
      {
        title: 'Interrogation Rights',
        content: {
          what: 'You have rights during police interrogation to protect against self-incrimination.',
          rights: [
            'Right to remain silent',
            'Right to have lawyer present',
            'Right to not be tortured or coerced',
            'Right to medical examination if tortured'
          ],
          donts: [
            'Don\'t make statements without lawyer',
            'Don\'t sign confessions under duress',
            'Don\'t accept third-degree methods',
            'Don\'t believe police threats'
          ],
          examples: [
            'Police cannot use force during interrogation',
            'Confessions to police are not admissible in court',
            'Interrogation must be recorded in many cases',
            'Minor cannot be interrogated without guardian'
          ],
          action: 'Remain silent, demand lawyer, report torture to magistrate or NHRC'
        }
      }
    ]
  },
  {
    id: 'tenant',
    name: 'Tenant & Housing Rights',
    icon: Home,
    color: 'bg-green-500',
    description: 'Rights of tenants and property owners',
    emergency: false,
    topics: [
      {
        title: 'Rent Agreement',
        content: {
          what: 'Rent agreements must be written and registered to protect both parties.',
          rights: [
            'Right to written rent agreement',
            'Right to peaceful enjoyment of property',
            'Right to receipts for rent payments',
            'Right to essential services'
          ],
          donts: [
            'Don\'t pay rent without receipts',
            'Don\'t accept verbal agreements',
            'Don\'t make structural changes without permission',
            'Don\'t sublet without landlord consent'
          ],
          examples: [
            'Rent agreement must be registered if over 11 months',
            'Landlord cannot cut essential services',
            'Rent cannot be increased during agreement period',
            'Security deposit must be returned at vacation'
          ],
          action: 'Register rent agreement, maintain records, approach Rent Controller for disputes'
        }
      },
      {
        title: 'Eviction Protection',
        content: {
          what: 'Tenants have legal protection against arbitrary eviction.',
          rights: [
            'Right to proper notice period',
            'Right to reasonable time to vacate',
            'Right to contest illegal eviction',
            'Right to get security deposit back'
          ],
          donts: [
            'Don\'t vacate without proper notice',
            'Don\'t accept forceful eviction',
            'Don\'t leave without getting deposit back',
            'Don\'t damage property'
          ],
          examples: [
            'Landlord must give 15 days notice for termination',
            'Eviction requires court order in many cases',
            'Landlord cannot disconnect utilities to force eviction',
            'Security deposit must be returned within reasonable time'
          ],
          action: 'File suit in civil court, approach Rent Controller, file police complaint for forceful eviction'
        }
      }
    ]
  },
  {
    id: 'consumer',
    name: 'Consumer Rights',
    icon: ShoppingBag,
    color: 'bg-purple-500',
    description: 'Rights as a consumer against fraud and bad service',
    emergency: false,
    topics: [
      {
        title: 'Product Defects',
        content: {
          what: 'Consumers have rights against defective products and services.',
          rights: [
            'Right to safety and quality',
            'Right to be informed about products',
            'Right to choose from variety',
            'Right to seek redressal'
          ],
          donts: [
            'Don\'t use defective products',
            'Don\'t accept substandard quality',
            'Don\'t ignore safety warnings',
            'Don\'t buy without bill/receipt'
          ],
          examples: [
            'Mobile phone with manufacturing defects',
            'Food products with expiry tampered',
            'Electrical appliances with safety issues',
            'Clothes that shrink after first wash'
          ],
          action: 'File complaint with seller, approach Consumer Forum, claim refund/replacement'
        }
      },
      {
        title: 'Service Deficiency',
        content: {
          what: 'Poor service quality is a violation of consumer rights.',
          rights: [
            'Right to service as promised',
            'Right to timely delivery',
            'Right to professional conduct',
            'Right to compensation for deficiency'
          ],
          donts: [
            'Don\'t accept delayed service',
            'Don\'t pay for incomplete work',
            'Don\'t tolerate unprofessional behavior',
            'Don\'t accept substandard service'
          ],
          examples: [
            'Internet service not working as per plan',
            'Courier delivery beyond promised time',
            'Bank service charges without information',
            'Educational institution not providing promised facilities'
          ],
          action: 'File written complaint, approach Consumer Forum, claim compensation for loss'
        }
      }
    ]
  },
  {
    id: 'senior',
    name: 'Senior Citizen Rights',
    icon: UserCheck,
    color: 'bg-orange-500',
    description: 'Special rights and protections for elderly citizens',
    emergency: false,
    topics: [
      {
        title: 'Maintenance Rights',
        content: {
          what: 'Senior citizens have right to maintenance from children and relatives.',
          rights: [
            'Right to maintenance from children/relatives',
            'Right to transfer property voluntarily',
            'Right to revoke property transfer',
            'Right to old age pension'
          ],
          donts: [
            'Don\'t transfer property under pressure',
            'Don\'t accept neglect from children',
            'Don\'t live without basic necessities',
            'Don\'t give up legal rights'
          ],
          examples: [
            'Children must provide maintenance if unable to maintain themselves',
            'Property transferred to children can be revoked if neglected',
            'Abandonment of senior citizens is punishable',
            'Senior citizens get priority in government services'
          ],
          action: 'File application before Maintenance Tribunal, approach Senior Citizens Welfare Department'
        }
      },
      {
        title: 'Healthcare Rights',
        content: {
          what: 'Elderly citizens have special healthcare rights and benefits.',
          rights: [
            'Right to subsidized healthcare',
            'Right to priority in government hospitals',
            'Right to free medicines in many states',
            'Right to health insurance benefits'
          ],
          donts: [
            'Don\'t accept medical neglect',
            'Don\'t pay full charges if concessions available',
            'Don\'t delay medical treatment',
            'Don\'t ignore health insurance benefits'
          ],
          examples: [
            'Many states offer free medicines for senior citizens',
            'Railway concessions for senior citizens',
            'Income tax benefits for senior citizens',
            'Special wards in government hospitals'
          ],
          action: 'Apply for senior citizen card, avail government schemes, approach Health Department'
        }
      }
    ]
  }
]

export default function KnowYourRights() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [savedRights, setSavedRights] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredCategories = rightsCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.topics.some(topic => 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const toggleSaveRight = (rightId: string) => {
    setSavedRights(prev => 
      prev.includes(rightId) 
        ? prev.filter(id => id !== rightId)
        : [...prev, rightId]
    )
  }

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      speechSynthesis.speak(utterance)
    }
  }

  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={() => setSelectedTopic(null)}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{selectedTopic.title}</h1>
                  <p className="text-xs text-gray-500">Know Your Rights</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => playAudio(selectedTopic.content.what)}
                  disabled={isPlaying}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleSaveRight(selectedTopic.title)}
                >
                  <Bookmark className={`w-4 h-4 ${savedRights.includes(selectedTopic.title) ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 pb-24">
          <div className="space-y-6">
            {/* What is this right */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  <span>What is this Right?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{selectedTopic.content.what}</p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Your Rights ✅</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {selectedTopic.content.rights.map((right: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{right}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* What Not to Do */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <X className="w-5 h-5" />
                  <span>What Not to Do ❌</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {selectedTopic.content.donts.map((dont: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">{dont}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Real Life Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-600">
                  <Star className="w-5 h-5" />
                  <span>Real Life Examples</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {selectedTopic.content.examples.map((example: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Star className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-gray-700">{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action to Take */}
            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Action to Take:</strong> {selectedTopic.content.action}
              </AlertDescription>
            </Alert>

            {/* Emergency Help */}
            {rightsCategories.find(cat => cat.id === selectedCategory)?.emergency && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Emergency:</strong> Call national helpline 1091 (Women) or 100 (Police) for immediate assistance
                </AlertDescription>
              </Alert>
            )}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Know Your Rights</h1>
                <p className="text-xs text-gray-500">Legal rights in simple language</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved ({savedRights.length})
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for your rights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 pb-24">
        <div className="grid grid-cols-1 gap-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        {category.emergency && (
                          <Badge variant="destructive" className="text-xs">
                            Emergency
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => setSelectedTopic(topic)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{topic.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {topic.content.what.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSaveRight(topic.title)
                            }}
                          >
                            <Bookmark className={`w-4 h-4 ${savedRights.includes(topic.title) ? 'fill-current text-blue-500' : 'text-gray-400'}`} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              playAudio(topic.content.what)
                            }}
                            disabled={isPlaying}
                          >
                            <Volume2 className="w-4 h-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Access */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Phone className="w-6 h-6 text-red-500" />
              <span className="text-sm">Emergency</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Download className="w-6 h-6 text-blue-500" />
              <span className="text-sm">Download</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Share2 className="w-6 h-6 text-green-500" />
              <span className="text-sm">Share</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Clock className="w-6 h-6 text-purple-500" />
              <span className="text-sm">Recent</span>
            </Button>
          </div>
        </div>
        
        {/* Legal Disclaimer */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 font-semibold">
            This platform does not replace a lawyer or court.
          </p>
        </div>
      </main>
    </div>
  )
}

// Add missing imports
import { CheckCircle, X } from 'lucide-react'
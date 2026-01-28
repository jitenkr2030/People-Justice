'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  ArrowLeft, 
  ShoppingBag,
  Building,
  Download,
  Send,
  CheckCircle,
  Info,
  AlertTriangle,
  Camera,
  FileText,
  Clock,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Receipt
} from 'lucide-react'

const complaintCategories = [
  {
    id: 'ecommerce',
    name: 'E-commerce & Online Shopping',
    description: 'Issues with online purchases, delivery, returns',
    icon: '🛒',
    companies: ['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Nykaa', 'Snapdeal', 'Tata Cliq', 'Reliance Digital'],
    commonIssues: [
      'Wrong product delivered',
      'Product not delivered',
      'Fake/counterfeit product',
      'Delivery delay',
      'Return/refund issues',
      'Payment charged but order cancelled'
    ]
  },
  {
    id: 'payment',
    name: 'Payment & Financial Services',
    description: 'UPI, wallets, banking, payment gateway issues',
    icon: '💳',
    companies: ['Paytm', 'PhonePe', 'Google Pay', 'BHIM', 'PayPal', 'Razorpay', 'SBI', 'HDFC', 'ICICI'],
    commonIssues: [
      'Payment failed but amount deducted',
      'Unauthorized transaction',
      'Refund not processed',
      'Account blocked',
      'Poor customer service',
      'Hidden charges'
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics & Appliances',
    description: 'Mobile phones, laptops, home appliances issues',
    icon: '📱',
    companies: ['Samsung', 'Apple', 'Xiaomi', 'LG', 'Whirlpool', 'Sony', 'Dell', 'HP', 'Canon'],
    commonIssues: [
      'Defective product',
      'Warranty not honored',
      'Poor after-sales service',
      'Fake product sold',
      'Technical issues',
      'No spare parts available'
    ]
  },
  {
    id: 'telecom',
    name: 'Telecom & Internet',
    description: 'Mobile services, broadband, DTH issues',
    icon: '📡',
    companies: ['Airtel', 'Jio', 'VI', 'BSNL', 'ACT Fibernet', 'Tata Sky', 'Dish TV', 'Airtel DTH'],
    commonIssues: [
      'Poor network connectivity',
      'Wrong billing',
      'Service activation issues',
      'Slow internet speed',
      'Unwanted services activated',
      'Poor customer support'
    ]
  },
  {
    id: 'education',
    name: 'Education & Coaching',
    description: 'Schools, colleges, coaching centers issues',
    icon: '📚',
    companies: ['Byju\'s', 'Unacademy', 'Vedantu', 'WhiteHat Jr', 'Physics Wallah', 'Local Schools'],
    commonIssues: [
      'False promises',
      'Refund denied',
      'Poor quality teaching',
      'Course not as advertised',
      'Certificate not provided',
      'Harassment'
    ]
  },
  {
    id: 'travel',
    name: 'Travel & Hospitality',
    description: 'Airlines, hotels, travel agencies issues',
    icon: '✈️',
    companies: ['MakeMyTrip', 'Cleartrip', 'Goibibo', 'OYO', 'Air India', 'Indigo', 'SpiceJet'],
    commonIssues: [
      'Flight cancellation without refund',
      'Hotel not as advertised',
      'Hidden charges',
      'Poor service quality',
      'Booking cancellation issues',
      'Lost baggage'
    ]
  },
  {
    id: 'food',
    name: 'Food & Restaurants',
    description: 'Food delivery, restaurants, packaged food issues',
    icon: '🍔',
    companies: ['Zomato', 'Swiggy', 'Domino\'s', 'McDonald\'s', 'KFC', 'Pizza Hut', 'Burger King'],
    commonIssues: [
      'Food contamination',
      'Wrong order delivered',
      'Overcharging',
      'Poor hygiene',
      'Expired food products',
      'Poor customer service'
    ]
  },
  {
    id: 'local',
    name: 'Local Services & Retail',
    description: 'Local shops, service centers, contractors',
    icon: '🏪',
    companies: ['Local Retailer', 'Service Center', 'Contractor', 'Local Vendor'],
    commonIssues: [
      'Poor service quality',
      'Overcharging',
      'Defective products',
      'No warranty honored',
      'Harassment',
      'Poor workmanship'
    ]
  }
]

const evidenceTypes = [
  { id: 'bill_receipt', name: 'Bill/Receipt', description: 'Original purchase bill or receipt' },
  { id: 'warranty_card', name: 'Warranty Card', description: 'Product warranty documents' },
  { id: 'photos', name: 'Photos', description: 'Photos of defective product/service' },
  { id: 'screenshots', name: 'Screenshots', description: 'Screenshots of online transactions/chat' },
  { id: 'emails', name: 'Emails', description: 'Email communication with company' },
  { id: 'chat_logs', name: 'Chat Logs', description: 'Customer support chat records' },
  { id: 'bank_statement', name: 'Bank Statement', description: 'Bank statement showing payment' },
  { id: 'delivery_proof', name: 'Delivery Proof', description: 'Proof of delivery/receipt' }
]

export default function ConsumerComplaint() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [customCompany, setCustomCompany] = useState('')
  const [selectedIssues, setSelectedIssues] = useState<string[]>([])
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([])
  const [formData, setFormData] = useState({
    complainantName: '',
    address: '',
    mobile: '',
    email: '',
    complaintDetails: '',
    amount: '',
    dateOfTransaction: '',
    orderNumber: '',
    expectedResolution: '',
    previousComplaints: '',
    companyResponse: ''
  })
  const [isDraftSaved, setIsDraftSaved] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleIssueToggle = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) 
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    )
  }

  const handleEvidenceToggle = (evidence: string) => {
    setSelectedEvidence(prev => 
      prev.includes(evidence) 
        ? prev.filter(e => e !== evidence)
        : [...prev, evidence]
    )
  }

  const saveDraft = () => {
    const draftData = {
      step,
      selectedCategory,
      selectedCompany,
      customCompany,
      selectedIssues,
      selectedEvidence,
      formData,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('consumer_complaint_draft', JSON.stringify(draftData))
    setIsDraftSaved(true)
    setTimeout(() => setIsDraftSaved(false), 3000)
  }

  const loadDraft = () => {
    const draft = localStorage.getItem('consumer_complaint_draft')
    if (draft) {
      const draftData = JSON.parse(draft)
      setStep(draftData.step)
      setSelectedCategory(draftData.selectedCategory)
      setSelectedCompany(draftData.selectedCompany)
      setCustomCompany(draftData.customCompany || '')
      setSelectedIssues(draftData.selectedIssues || [])
      setSelectedEvidence(draftData.selectedEvidence || [])
      setFormData(draftData.formData)
    }
  }

  const generateComplaintDraft = () => {
    const category = complaintCategories.find(c => c.id === selectedCategory)
    const company = selectedCompany === 'other' ? customCompany : selectedCompany
    const today = new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })

    return `
CONSUMER COMPLAINT DRAFT

To,
The Consumer Disputes Redressal Commission
[District/State]
[Address]

Date: ${today}

From:
${formData.complainantName}
${formData.address}
Mobile: ${formData.mobile}
Email: ${formData.email}

COMPLAINT AGAINST: ${company}
CATEGORY: ${category?.name}

DETAILS OF COMPLAINT:

1. Complainant purchased/availed service from ${company} on ${formData.dateOfTransaction}
2. Order/Transaction Number: ${formData.orderNumber || 'Not applicable'}
3. Amount Paid: ₹${formData.amount}

ISSUES FACED:
${selectedIssues.map(issue => `• ${issue}`).join('\n')}

DETAILED DESCRIPTION:
${formData.complaintDetails}

EVIDENCE AVAILABLE:
${selectedEvidence.map(evidence => `• ${evidence}`).join('\n')}

PREVIOUS ATTEMPTS TO RESOLVE:
${formData.previousComplaints || 'No previous attempts made'}

COMPANY'S RESPONSE:
${formData.companyResponse || 'No response received from company'}

EXPECTED RESOLUTION:
${formData.expectedResolution}

RELIEF SOUGHT:
1. Refund of ₹${formData.amount}
2. Compensation for mental agony and harassment
3. Cost of litigation
4. Any other relief this Commission deems fit

PRAYER:
The complainant most respectfully prays that this Commission may kindly:
1. Allow this complaint
2. Direct the opposite party to refund the amount
3. Award compensation as deemed appropriate
4. Pass any other order as deemed just and proper

Complainant
(Signature)

${formData.complainantName}
    `.trim()
  }

  const downloadComplaint = () => {
    const content = generateComplaintDraft()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Consumer_Complaint_${Date.now()}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Select Complaint Category</h3>
          <p className="text-sm text-gray-600">Choose the category that best fits your complaint</p>
        </div>
        <Button variant="outline" size="sm" onClick={loadDraft}>
          Load Draft
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {complaintCategories.map((category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transition-all ${
              selectedCategory === category.id 
                ? 'border-purple-500 bg-purple-50' 
                : 'hover:border-gray-300'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{category.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {category.companies.slice(0, 3).map((company, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                    {category.companies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.companies.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                  selectedCategory === category.id 
                    ? 'border-purple-500 bg-purple-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedCategory === category.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setStep(2)} 
          disabled={!selectedCategory}
        >
          Next
        </Button>
      </div>
    </div>
  )

  const renderStep2 = () => {
    const category = complaintCategories.find(c => c.id === selectedCategory)
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Company & Issues</h3>
            <p className="text-sm text-gray-600">Select company and describe your issues</p>
          </div>
          <Button variant="outline" size="sm" onClick={saveDraft}>
            {isDraftSaved ? <CheckCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
            {isDraftSaved ? 'Saved' : 'Save Draft'}
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="company">Company Name *</Label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                {category?.companies.map((company) => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
                <SelectItem value="other">Other (Specify)</SelectItem>
              </SelectContent>
            </Select>
            {selectedCompany === 'other' && (
              <Input
                className="mt-2"
                placeholder="Enter company name"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
              />
            )}
          </div>

          <div>
            <Label>Common Issues (Select all that apply)</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {category?.commonIssues.map((issue) => (
                <div key={issue} className="flex items-center space-x-2">
                  <Checkbox
                    id={issue}
                    checked={selectedIssues.includes(issue)}
                    onCheckedChange={() => handleIssueToggle(issue)}
                  />
                  <Label htmlFor={issue} className="text-sm">{issue}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="complaintDetails">Detailed Complaint Description *</Label>
            <Textarea
              id="complaintDetails"
              value={formData.complaintDetails}
              onChange={(e) => handleInputChange('complaintDetails', e.target.value)}
              placeholder="Provide complete details of your complaint. Include dates, what happened, how it affected you, and any relevant facts."
              rows={6}
            />
            <p className="text-xs text-gray-500 mt-1">
              Be specific and include all relevant details. This will help strengthen your case.
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={() => setStep(3)}
            disabled={!selectedCompany || !formData.complaintDetails}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Personal & Transaction Details</h3>
          <p className="text-sm text-gray-600">Your information and transaction details</p>
        </div>
        <Button variant="outline" size="sm" onClick={saveDraft}>
          {isDraftSaved ? <CheckCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
          {isDraftSaved ? 'Saved' : 'Save Draft'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="complainantName">Your Full Name *</Label>
          <Input
            id="complainantName"
            value={formData.complainantName}
            onChange={(e) => handleInputChange('complainantName', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input
            id="mobile"
            value={formData.mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            placeholder="10-digit mobile number"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <Label htmlFor="amount">Amount Involved (₹) *</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            placeholder="Amount in rupees"
          />
        </div>

        <div>
          <Label htmlFor="dateOfTransaction">Date of Transaction/Purchase *</Label>
          <Input
            id="dateOfTransaction"
            type="date"
            value={formData.dateOfTransaction}
            onChange={(e) => handleInputChange('dateOfTransaction', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="orderNumber">Order/Transaction Number</Label>
          <Input
            id="orderNumber"
            value={formData.orderNumber}
            onChange={(e) => handleInputChange('orderNumber', e.target.value)}
            placeholder="Order ID, transaction ID, etc."
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Your Full Address *</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="House/Street/Area/City/PIN"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(2)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setStep(4)}
          disabled={!formData.complainantName || !formData.mobile || !formData.address || !formData.amount || !formData.dateOfTransaction}
        >
          Next
        </Button>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Evidence & Resolution</h3>
          <p className="text-sm text-gray-600">Evidence available and expected resolution</p>
        </div>
        <Button variant="outline" size="sm" onClick={saveDraft}>
          {isDraftSaved ? <CheckCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
          {isDraftSaved ? 'Saved' : 'Save Draft'}
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Evidence Available (Select all that you have)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {evidenceTypes.map((evidence) => (
              <div key={evidence.id} className="flex items-center space-x-2">
                <Checkbox
                  id={evidence.id}
                  checked={selectedEvidence.includes(evidence.name)}
                  onCheckedChange={() => handleEvidenceToggle(evidence.name)}
                />
                <div>
                  <Label htmlFor={evidence.id} className="text-sm font-medium">{evidence.name}</Label>
                  <p className="text-xs text-gray-500">{evidence.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="previousComplaints">Previous Attempts to Resolve</Label>
          <Textarea
            id="previousComplaints"
            value={formData.previousComplaints}
            onChange={(e) => handleInputChange('previousComplaints', e.target.value)}
            placeholder="Describe any previous attempts to resolve this issue with the company"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="companyResponse">Company's Response (if any)</Label>
          <Textarea
            id="companyResponse"
            value={formData.companyResponse}
            onChange={(e) => handleInputChange('companyResponse', e.target.value)}
            placeholder="Describe any response received from the company"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="expectedResolution">Expected Resolution *</Label>
          <Textarea
            id="expectedResolution"
            value={formData.expectedResolution}
            onChange={(e) => handleInputChange('expectedResolution', e.target.value)}
            placeholder="What resolution do you expect? (e.g., full refund, replacement, compensation, etc.)"
            rows={3}
          />
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Make sure you have all the evidence ready before filing the complaint. 
          Original documents should be kept safe - submit only photocopies unless original is required.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(3)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setStep(5)}
          disabled={!formData.expectedResolution}
        >
          Generate Complaint
        </Button>
      </div>
    </div>
  )

  const renderStep5 = () => {
    const category = complaintCategories.find(c => c.id === selectedCategory)
    const company = selectedCompany === 'other' ? customCompany : selectedCompany

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Complaint Draft Ready!</h3>
          <p className="text-gray-600 mt-2">Your consumer complaint is ready to download and file</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Complaint Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Category:</span>
                  <p className="text-gray-600">{category?.name}</p>
                </div>
                <div>
                  <span className="font-medium">Company:</span>
                  <p className="text-gray-600">{company}</p>
                </div>
                <div>
                  <span className="font-medium">Amount:</span>
                  <p className="text-gray-600">₹{formData.amount}</p>
                </div>
                <div>
                  <span className="font-medium">Date:</span>
                  <p className="text-gray-600">{formData.dateOfTransaction}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <span className="font-medium text-sm">Issues:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedIssues.map((issue, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {issue}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-medium text-sm">Evidence:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedEvidence.map((evidence, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {evidence}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={downloadComplaint} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Complaint Draft
          </Button>
          <Button variant="outline" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Filing Guidelines
          </Button>
        </div>

        <div className="space-y-4">
          <Alert>
            <Building className="h-4 w-4" />
            <AlertDescription>
              <strong>Where to File:</strong><br/>
              1. <strong>District Commission:</strong> Claims up to ₹1 crore<br/>
              2. <strong>State Commission:</strong> Claims between ₹1 crore to ₹10 crores<br/>
              3. <strong>National Commission:</strong> Claims above ₹10 crores
            </AlertDescription>
          </Alert>

          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              <strong>Important Timelines:</strong><br/>
              • File complaint within 2 years from the cause of action<br/>
              • Commission must decide complaint within 90 days<br/>
              • Appeal period is 30 days from the order<br/>
              • Limitation period can be extended in exceptional cases
            </AlertDescription>
          </Alert>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Required Documents:</strong><br/>
              • Signed complaint copy<br/>
              • Original receipts/bills (self-attested photocopies)<br/>
              • Evidence documents<br/>
              • ID proof (Aadhaar, Voter ID, etc.)<br/>
              • Address proof
            </AlertDescription>
          </Alert>
        </div>

        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Legal Help:</strong> For claims above ₹10 lakhs or complex cases, 
            it's recommended to consult with a consumer rights lawyer. 
            Many lawyers offer free initial consultations for consumer cases.
          </AlertDescription>
        </Alert>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(4)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Edit Complaint
          </Button>
          <Button onClick={() => window.location.reload()}>
            Create New Complaint
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Consumer Complaint</h1>
                <p className="text-xs text-gray-500">Fight fraud and service issues</p>
              </div>
            </div>
            <Badge variant="secondary">
              Step {step} of 5
            </Badge>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div className={`w-full h-1 mx-2 ${
                    step > stepNumber ? 'bg-purple-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-600">Category</span>
            <span className="text-xs text-gray-600">Issues</span>
            <span className="text-xs text-gray-600">Details</span>
            <span className="text-xs text-gray-600">Evidence</span>
            <span className="text-xs text-gray-600">Generate</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 pb-24">
        <Card>
          <CardContent className="p-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
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
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Send,
  Clock,
  CheckCircle,
  Info,
  Building2,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'

const rtiCategories = [
  {
    id: 'land_records',
    name: 'Land & Property Records',
    description: 'Information about land ownership, mutations, property disputes',
    departments: ['Revenue Department', 'Land Records Office', 'Municipal Corporation']
  },
  {
    id: 'government_schemes',
    name: 'Government Schemes',
    description: 'Details about welfare schemes, subsidies, benefits',
    departments: ['Social Welfare', 'Rural Development', 'Urban Development']
  },
  {
    id: 'education',
    name: 'Education & Schools',
    description: 'School admissions, facilities, teacher appointments',
    departments: ['Education Department', 'School Board', 'University Grants']
  },
  {
    id: 'health',
    name: 'Health & Medical',
    description: 'Hospital facilities, medicine availability, doctor appointments',
    departments: ['Health Department', 'Medical Council', 'PHC Centers']
  },
  {
    id: 'municipal',
    name: 'Municipal Services',
    description: 'Water supply, drainage, roads, street lights',
    departments: ['Municipal Corporation', 'Panchayat', 'Public Works']
  },
  {
    id: 'police',
    name: 'Police & Security',
    description: 'Crime statistics, police complaints, security measures',
    departments: ['Police Department', 'Home Ministry', 'Law Enforcement']
  },
  {
    id: 'transport',
    name: 'Transport & Roads',
    description: 'Road conditions, transport services, vehicle registration',
    departments: ['RTO', 'Transport Department', 'National Highway']
  },
  {
    id: 'environment',
    name: 'Environment',
    description: 'Pollution control, tree plantation, environmental clearances',
    departments: ['Environment Ministry', 'Pollution Board', 'Forest Department']
  }
]

const centralDepartments = [
  'Prime Minister Office',
  'Home Ministry',
  'Finance Ministry',
  'Human Resource Development',
  'Health Ministry',
  'Environment Ministry',
  'Law Ministry',
  'Personnel Ministry'
]

const stateDepartments = [
  'Chief Minister Office',
  'State Home Department',
  'State Education Department',
  'State Health Department',
  'State Revenue Department',
  'State Police Department',
  'State PWD',
  'State Agriculture Department'
]

export default function RTIGenerator() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [governmentType, setGovernmentType] = useState('central')
  const [formData, setFormData] = useState({
    applicantName: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    mobile: '',
    email: '',
    subject: '',
    information: '',
    urgency: 'normal',
    format: 'electronic'
  })
  const [isDraftSaved, setIsDraftSaved] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const saveDraft = () => {
    const draftData = {
      step,
      selectedCategory,
      selectedDepartment,
      governmentType,
      formData,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('rti_draft', JSON.stringify(draftData))
    setIsDraftSaved(true)
    setTimeout(() => setIsDraftSaved(false), 3000)
  }

  const loadDraft = () => {
    const draft = localStorage.getItem('rti_draft')
    if (draft) {
      const draftData = JSON.parse(draft)
      setStep(draftData.step)
      setSelectedCategory(draftData.selectedCategory)
      setSelectedDepartment(draftData.selectedDepartment)
      setGovernmentType(draftData.governmentType)
      setFormData(draftData.formData)
    }
  }

  const generateRTIContent = () => {
    const category = rtiCategories.find(c => c.id === selectedCategory)
    const today = new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })

    return `
To,
The Public Information Officer
${selectedDepartment}
${governmentType === 'central' ? 'Central Government' : 'State Government'}

Date: ${today}

From:
${formData.applicantName}
${formData.address}
${formData.city}, ${formData.state} - ${formData.pincode}
Mobile: ${formData.mobile}
Email: ${formData.email}

Subject: Application under Right to Information Act, 2005

Respected Sir/Madam,

Under the Right to Information Act, 2005, I hereby request the following information:

${formData.information}

Category: ${category?.name}
Department: ${selectedDepartment}
Urgency: ${formData.urgency}

I request that the information may be provided in electronic format as per Section 4(4) of the RTI Act.

If any part of this application is outside the jurisdiction of your office, kindly forward it to the concerned Public Information Officer under intimation to me.

I am enclosing the prescribed application fee of ₹10/- through IPO/DD No. ______ dated ______ payable to "${selectedDepartment}".

Thank you.

Yours faithfully,
${formData.applicantName}
    `.trim()
  }

  const downloadRTI = () => {
    const content = generateRTIContent()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `RTI_Application_${Date.now()}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Choose RTI Category</h3>
          <p className="text-sm text-gray-600">Select the type of information you need</p>
        </div>
        <Button variant="outline" size="sm" onClick={loadDraft}>
          Load Draft
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {rtiCategories.map((category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transition-all ${
              selectedCategory === category.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'hover:border-gray-300'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                  selectedCategory === category.id 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedCategory === category.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {category.departments.slice(0, 3).map((dept, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                    {category.departments.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.departments.length - 3} more
                      </Badge>
                    )}
                  </div>
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

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Select Department</h3>
        <p className="text-sm text-gray-600">Choose the government department that has your information</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Government Type</Label>
          <RadioGroup value={governmentType} onValueChange={setGovernmentType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="central" id="central" />
              <Label htmlFor="central">Central Government</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="state" id="state" />
              <Label htmlFor="state">State Government</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="department">Department Name</Label>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {(governmentType === 'central' ? centralDepartments : stateDepartments).map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          If you're not sure about the department, select the most relevant one. 
          The PIO will forward your application to the correct department if needed.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setStep(3)} 
          disabled={!selectedDepartment}
        >
          Next
        </Button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Personal Details</h3>
          <p className="text-sm text-gray-600">Your contact information for the RTI application</p>
        </div>
        <Button variant="outline" size="sm" onClick={saveDraft}>
          {isDraftSaved ? <CheckCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
          {isDraftSaved ? 'Saved' : 'Save Draft'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="applicantName">Full Name *</Label>
          <Input
            id="applicantName"
            value={formData.applicantName}
            onChange={(e) => handleInputChange('applicantName', e.target.value)}
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
          <Label htmlFor="pincode">PIN Code *</Label>
          <Input
            id="pincode"
            value={formData.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            placeholder="6-digit PIN code"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Full Address *</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="House/Street/Area"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="city">City/Town *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="City name"
          />
        </div>

        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder="State name"
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
          disabled={!formData.applicantName || !formData.mobile || !formData.address || !formData.city || !formData.pincode}
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
          <h3 className="text-lg font-semibold">Information Details</h3>
          <p className="text-sm text-gray-600">Describe the information you need</p>
        </div>
        <Button variant="outline" size="sm" onClick={saveDraft}>
          {isDraftSaved ? <CheckCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
          {isDraftSaved ? 'Saved' : 'Save Draft'}
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="subject">Subject of RTI *</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Brief subject of your RTI application"
          />
        </div>

        <div>
          <Label htmlFor="information">Information Required *</Label>
          <Textarea
            id="information"
            value={formData.information}
            onChange={(e) => handleInputChange('information', e.target.value)}
            placeholder="Clearly describe what information you need. Be specific and include relevant details like time period, file numbers, locations, etc."
            rows={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            Tip: Be specific about the information you need. Include time period, file numbers, or other relevant details.
          </p>
        </div>

        <div>
          <Label>Urgency Level</Label>
          <RadioGroup value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="normal" />
              <Label htmlFor="normal">Normal (30 days response)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgent" id="urgent" />
              <Label htmlFor="urgent">Urgent (48 hours response - involves life and liberty)</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Information Format</Label>
          <RadioGroup value={formData.format} onValueChange={(value) => handleInputChange('format', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="electronic" id="electronic" />
              <Label htmlFor="electronic">Electronic (Email/CD)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="physical" id="physical" />
              <Label htmlFor="physical">Physical (Printed copy)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          You will need to pay ₹10 as RTI application fee. This can be paid through IPO (Indian Postal Order), 
          Demand Draft, or online payment depending on the department.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(3)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setStep(5)}
          disabled={!formData.subject || !formData.information}
        >
          Generate RTI
        </Button>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">RTI Application Generated!</h3>
        <p className="text-gray-600 mt-2">Your RTI application is ready to download and submit</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Application Preview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono max-h-96 overflow-y-auto">
            {generateRTIContent()}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={downloadRTI} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download RTI Application
        </Button>
        <Button variant="outline" className="w-full">
          <Send className="w-4 h-4 mr-2" />
          Submission Guidelines
        </Button>
      </div>

      <div className="space-y-4">
        <Alert>
          <Building2 className="h-4 w-4" />
          <AlertDescription>
            <strong>Submission Methods:</strong><br/>
            1. <strong>Online:</strong> Visit the department's RTI portal<br/>
            2. <strong>Email:</strong> Send to the department's PIO email<br/>
            3. <strong>Post:</strong> Send by registered post to the PIO address<br/>
            4. <strong>In Person:</strong> Submit at the department's office
          </AlertDescription>
        </Alert>

        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <strong>Important Timelines:</strong><br/>
            • Normal RTI: Response within 30 days<br/>
            • Urgent RTI: Response within 48 hours<br/>
            • First Appeal: Within 30 days of no response<br/>
            • Second Appeal: Within 90 days of first appeal decision
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(4)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Edit Application
        </Button>
        <Button onClick={() => window.location.reload()}>
          Create New RTI
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">RTI Generator</h1>
                <p className="text-xs text-gray-500">File Right to Information applications</p>
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
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div className={`w-full h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-600">Category</span>
            <span className="text-xs text-gray-600">Department</span>
            <span className="text-xs text-gray-600">Personal</span>
            <span className="text-xs text-gray-600">Details</span>
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
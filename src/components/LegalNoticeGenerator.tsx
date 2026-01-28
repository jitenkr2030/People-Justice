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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  ArrowLeft, 
  AlertTriangle, 
  FileText,
  Download,
  Send,
  Clock,
  CheckCircle,
  Info,
  User,
  Building,
  Calendar,
  Mail,
  Phone
} from 'lucide-react'

const noticeTemplates = [
  {
    id: 'salary_payment',
    name: 'Salary Payment Due',
    description: 'For unpaid salaries, wages, or bonuses',
    icon: '💰',
    category: 'employment',
    urgency: 'high',
    template: {
      subject: 'Legal Notice for Non-Payment of Salary',
      body: `To,
[Employer Name]
[Company Name]
[Company Address]

Date: [Date]

From:
[Your Name]
[Your Address]
[Your Contact Details]

Subject: Legal Notice for Non-Payment of Salary

Dear Sir/Madam,

Under instructions and on behalf of my client [Your Name], who is/was employed with your organization as [Your Position], I hereby serve you with the following legal notice:

1. That my client was employed with your organization from [Joining Date] to [Last Working Date].
2. That my client is entitled to receive salary of ₹[Amount] for the period [Month/Year].
3. That despite repeated demands, you have failed to pay the due salary amount.
4. That as per the Payment of Wages Act, 1936, wages must be paid within 7 days of due date.
5. That your failure to pay salary amounts to violation of labor laws.

You are hereby called upon to:

1. Pay the due salary amount of ₹[Amount] within 15 days from receipt of this notice.
2. Provide payment details and salary slips for the said period.
3. Apologize for the delay and harassment caused.

Should you fail to comply with the above demands within the stipulated time, my client shall be constrained to initiate appropriate legal proceedings against you in the Labor Court/Civil Court. In such event, you shall be liable to pay the due amount along with interest, costs of proceedings, and such other relief as the court may deem fit.

A copy of this notice is retained in my office for further action.

Yours faithfully,
[Your Name]
[Your Signature]`
    }
  },
  {
    id: 'refund_denial',
    name: 'Refund Denial',
    description: 'For denied refunds from products or services',
    icon: '💳',
    category: 'consumer',
    urgency: 'medium',
    template: {
      subject: 'Legal Notice for Refund Denial',
      body: `To,
[Company Name]
[Company Address]
[Contact Person/Department]

Date: [Date]

From:
[Your Name]
[Your Address]
[Your Contact Details]

Subject: Legal Notice for Refund Denial - [Product/Service Name]

Dear Sir/Madam,

Under instructions and on behalf of my client [Your Name], I hereby serve you with the following legal notice:

1. That my client purchased [Product/Service] from your establishment on [Date] for ₹[Amount].
2. That the said product/service was found to be [defective/not as described/not delivered].
3. That my client requested refund on [Date] due to [reason for refund].
4. That despite valid grounds for refund, you have wrongfully denied the refund request.
5. That as per the Consumer Protection Act, 2019, consumers have right to refund for deficient services.

You are hereby called upon to:

1. Process and refund the full amount of ₹[Amount] within 10 days from receipt of this notice.
2. Provide compensation for harassment and mental agony caused.
3. Apologize for the deficiency in service.

Should you fail to comply with the above demands, my client shall be constrained to file a consumer complaint before the Consumer Forum. In such event, you shall be liable to pay the refund amount along with compensation, costs of proceedings, and such other relief as the forum may deem fit.

Yours faithfully,
[Your Name]
[Your Signature]`
    }
  },
  {
    id: 'rent_dispute',
    name: 'Rent & Property Dispute',
    description: 'For rent issues, security deposit, or property disputes',
    icon: '🏠',
    category: 'property',
    urgency: 'medium',
    template: {
      subject: 'Legal Notice for Rent/Property Dispute',
      body: `To,
[Landlord/Tenant Name]
[Address]

Date: [Date]

From:
[Your Name]
[Your Address]
[Your Contact Details]

Subject: Legal Notice regarding [Rent/Security Deposit/Property] Dispute

Dear Sir/Madam,

Under instructions and on behalf of my client [Your Name], I hereby serve you with the following legal notice:

1. That my client is the [tenant/landlord] of the property situated at [Property Address].
2. That the rent agreement was executed on [Date] for a period of [duration].
3. That [describe the dispute - e.g., you have failed to return security deposit of ₹Amount/you have increased rent illegally/you have not maintained the property].
4. That despite repeated requests, you have failed to resolve the issue amicably.
5. That your actions amount to violation of the rent agreement and applicable laws.

You are hereby called upon to:

1. [Specific demand - e.g., return security deposit of ₹Amount/pay pending rent of ₹Amount/repair the property].
2. Comply with the terms of the rent agreement.
3. Provide written response within 15 days from receipt of this notice.

Should you fail to comply with the above demands, my client shall be constrained to initiate appropriate legal proceedings before the Rent Controller/Civil Court. In such event, you shall be liable to pay the due amount along with interest, costs of proceedings, and such other relief as the court may deem fit.

Yours faithfully,
[Your Name]
[Your Signature]`
    }
  },
  {
    id: 'service_negligence',
    name: 'Service Negligence',
    description: 'For poor service quality or professional negligence',
    icon: '🔧',
    category: 'service',
    urgency: 'medium',
    template: {
      subject: 'Legal Notice for Service Negligence',
      body: `To,
[Service Provider Name]
[Company Name]
[Company Address]

Date: [Date]

From:
[Your Name]
[Your Address]
[Your Contact Details]

Subject: Legal Notice for Service Negligence - [Service Type]

Dear Sir/Madam,

Under instructions and on behalf of my client [Your Name], I hereby serve you with the following legal notice:

1. That my client availed [service type] from your establishment on [Date].
2. That my client paid ₹[Amount] for the said service.
3. That the service provided was deficient and negligent in the following manner: [describe negligence].
4. That despite bringing the deficiencies to your notice, you have failed to rectify the same.
5. That your negligence has caused [loss/damage] to my client.

You are hereby called upon to:

1. Refund the service charges of ₹[Amount] within 15 days from receipt of this notice.
2. Compensate for the loss/damage caused due to your negligence.
3. Provide written apology for the deficiency in service.

Should you fail to comply with the above demands, my client shall be constrained to initiate appropriate legal proceedings before the Consumer Forum/Civil Court. In such event, you shall be liable to pay the refund amount along with compensation, costs of proceedings, and such other relief as the court may deem fit.

Yours faithfully,
[Your Name]
[Your Signature]`
    }
  },
  {
    id: 'fraud_cheating',
    name: 'Fraud or Cheating',
    description: 'For cases of fraud, cheating, or deception',
    icon: '⚠️',
    category: 'criminal',
    urgency: 'high',
    template: {
      subject: 'Legal Notice for Fraud and Cheating',
      body: `To,
[Person/Company Name]
[Address]

Date: [Date]

From:
[Your Name]
[Your Address]
[Your Contact Details]

Subject: Legal Notice for Fraud and Cheating under Section 420 of IPC

Dear Sir/Madam,

Under instructions and on behalf of my client [Your Name], I hereby serve you with the following legal notice:

1. That you [describe the fraudulent act - promised to deliver/sell/provide] to my client.
2. That my client paid ₹[Amount] to you on [Date] for the said purpose.
3. That you dishonestly induced my client to pay the amount by making false promises.
4. That you have failed to fulfill your promise and have misappropriated the amount.
5. That your actions constitute fraud and cheating under Section 420 of the Indian Penal Code.

You are hereby called upon to:

1. Return the misappropriated amount of ₹[Amount] within 7 days from receipt of this notice.
2. Provide compensation for the mental agony and harassment caused.
3. Tender written apology for the fraudulent act.

Should you fail to comply with the above demands, my client shall be constrained to:
1. File a criminal complaint under Section 420 IPC against you.
2. Initiate civil proceedings for recovery of the amount.
3. Report the matter to the concerned authorities.

In such event, you shall be liable for criminal prosecution and payment of the due amount along with interest, costs of proceedings, and such other relief as the court may deem fit.

Yours faithfully,
[Your Name]
[Your Signature]`
    }
  },
  {
    id: 'breach_contract',
    name: 'Breach of Contract',
    description: 'For violation of agreements or contracts',
    icon: '📋',
    category: 'civil',
    urgency: 'medium',
    template: {
      subject: 'Legal Notice for Breach of Contract',
      body: `To,
[Other Party Name]
[Address]

Date: [Date]

From:
[Your Name]
[Your Address]
[Your Contact Details]

Subject: Legal Notice for Breach of Contract dated [Contract Date]

Dear Sir/Madam,

Under instructions and on behalf of my client [Your Name], I hereby serve you with the following legal notice:

1. That my client and you entered into a contract/agreement on [Date] for [purpose of contract].
2. That as per the terms of the contract, you were obligated to [obligations].
3. That you have willfully failed to fulfill your obligations under the contract.
4. That my client has fulfilled all his/her obligations under the contract.
5. That your failure constitutes a clear breach of the contract.

You are hereby called upon to:

1. Fulfill your obligations under the contract within 15 days from receipt of this notice.
2. Pay damages for the loss caused due to breach of contract.
3. Provide written assurance of future compliance.

Should you fail to comply with the above demands, my client shall be constrained to initiate appropriate legal proceedings for specific performance of the contract and damages. In such event, you shall be liable to pay damages, costs of proceedings, and such other relief as the court may deem fit.

Yours faithfully,
[Your Name]
[Your Signature]`
    }
  }
]

export default function LegalNoticeGenerator() {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [formData, setFormData] = useState({
    yourName: '',
    yourAddress: '',
    yourMobile: '',
    yourEmail: '',
    recipientName: '',
    recipientAddress: '',
    recipientCompany: '',
    amount: '',
    dateOfTransaction: '',
    description: '',
    reliefSought: '',
    customSubject: '',
    customBody: ''
  })
  const [isDraftSaved, setIsDraftSaved] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const saveDraft = () => {
    const draftData = {
      step,
      selectedTemplate,
      formData,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('legal_notice_draft', JSON.stringify(draftData))
    setIsDraftSaved(true)
    setTimeout(() => setIsDraftSaved(false), 3000)
  }

  const loadDraft = () => {
    const draft = localStorage.getItem('legal_notice_draft')
    if (draft) {
      const draftData = JSON.parse(draft)
      setStep(draftData.step)
      setSelectedTemplate(draftData.selectedTemplate)
      setFormData(draftData.formData)
    }
  }

  const generateNoticeContent = () => {
    const template = noticeTemplates.find(t => t.id === selectedTemplate)
    if (!template) return ''

    let content = template.template.body
    
    // Replace placeholders with form data
    content = content.replace(/\[Your Name\]/g, formData.yourName)
    content = content.replace(/\[Your Address\]/g, formData.yourAddress)
    content = content.replace(/\[Your Contact Details\]/g, `Mobile: ${formData.yourMobile}, Email: ${formData.yourEmail}`)
    content = content.replace(/\[Employer Name\]/g, formData.recipientName)
    content = content.replace(/\[Company Name\]/g, formData.recipientCompany)
    content = content.replace(/\[Company Address\]/g, formData.recipientAddress)
    content = content.replace(/\[Amount\]/g, formData.amount)
    content = content.replace(/\[Date\]/g, new Date().toLocaleDateString('en-IN'))
    content = content.replace(/\[Joining Date\]/g, formData.dateOfTransaction)
    content = content.replace(/\[Last Working Date\]/g, formData.dateOfTransaction)
    content = content.replace(/\[Month\/Year\]/g, formData.description)
    content = content.replace(/\[Your Position\]/g, formData.reliefSought)
    
    return content
  }

  const downloadNotice = () => {
    const content = generateNoticeContent()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Legal_Notice_${Date.now()}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Choose Notice Type</h3>
          <p className="text-sm text-gray-600">Select the type of legal notice you want to send</p>
        </div>
        <Button variant="outline" size="sm" onClick={loadDraft}>
          Load Draft
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {noticeTemplates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'border-orange-500 bg-orange-50' 
                : 'hover:border-gray-300'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{template.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <Badge 
                      variant={template.urgency === 'high' ? 'destructive' : 'secondary'} 
                      className="text-xs"
                    >
                      {template.urgency === 'high' ? 'Urgent' : 'Normal'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                  selectedTemplate === template.id 
                    ? 'border-orange-500 bg-orange-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedTemplate === template.id && (
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
          disabled={!selectedTemplate}
        >
          Next
        </Button>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Your Details</h3>
          <p className="text-sm text-gray-600">Information about you (the sender)</p>
        </div>
        <Button variant="outline" size="sm" onClick={saveDraft}>
          {isDraftSaved ? <CheckCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
          {isDraftSaved ? 'Saved' : 'Save Draft'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="yourName">Your Full Name *</Label>
          <Input
            id="yourName"
            value={formData.yourName}
            onChange={(e) => handleInputChange('yourName', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="yourMobile">Mobile Number *</Label>
          <Input
            id="yourMobile"
            value={formData.yourMobile}
            onChange={(e) => handleInputChange('yourMobile', e.target.value)}
            placeholder="10-digit mobile number"
          />
        </div>

        <div>
          <Label htmlFor="yourEmail">Email Address</Label>
          <Input
            id="yourEmail"
            type="email"
            value={formData.yourEmail}
            onChange={(e) => handleInputChange('yourEmail', e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <Label htmlFor="dateOfTransaction">Relevant Date</Label>
          <Input
            id="dateOfTransaction"
            type="date"
            value={formData.dateOfTransaction}
            onChange={(e) => handleInputChange('dateOfTransaction', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="yourAddress">Your Full Address *</Label>
          <Textarea
            id="yourAddress"
            value={formData.yourAddress}
            onChange={(e) => handleInputChange('yourAddress', e.target.value)}
            placeholder="House/Street/Area/City/PIN"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setStep(3)}
          disabled={!formData.yourName || !formData.yourMobile || !formData.yourAddress}
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
          <h3 className="text-lg font-semibold">Recipient Details</h3>
          <p className="text-sm text-gray-600">Information about the person/company receiving the notice</p>
        </div>
        <Button variant="outline" size="sm" onClick={saveDraft}>
          {isDraftSaved ? <CheckCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
          {isDraftSaved ? 'Saved' : 'Save Draft'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="recipientName">Recipient Name *</Label>
          <Input
            id="recipientName"
            value={formData.recipientName}
            onChange={(e) => handleInputChange('recipientName', e.target.value)}
            placeholder="Person or company name"
          />
        </div>

        <div>
          <Label htmlFor="recipientCompany">Company Name (if applicable)</Label>
          <Input
            id="recipientCompany"
            value={formData.recipientCompany}
            onChange={(e) => handleInputChange('recipientCompany', e.target.value)}
            placeholder="Company/organization name"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="recipientAddress">Recipient Address *</Label>
          <Textarea
            id="recipientAddress"
            value={formData.recipientAddress}
            onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
            placeholder="Full address of recipient"
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
          disabled={!formData.recipientName || !formData.recipientAddress}
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
          <h3 className="text-lg font-semibold">Notice Details</h3>
          <p className="text-sm text-gray-600">Specific details about your legal notice</p>
        </div>
        <Button variant="outline" size="sm" onClick={saveDraft}>
          {isDraftSaved ? <CheckCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
          {isDraftSaved ? 'Saved' : 'Save Draft'}
        </Button>
      </div>

      <div className="space-y-4">
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
          <Label htmlFor="description">Detailed Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Provide detailed description of the issue, including dates, events, and relevant facts"
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1">
            Be specific about what happened, when it happened, and how it has affected you.
          </p>
        </div>

        <div>
          <Label htmlFor="reliefSought">Additional Details</Label>
          <Textarea
            id="reliefSought"
            value={formData.reliefSought}
            onChange={(e) => handleInputChange('reliefSought', e.target.value)}
            placeholder="Any additional information that should be included in the notice"
            rows={3}
          />
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This legal notice is generated based on the information provided. It is recommended to 
          consult with a lawyer for complex cases or high-value disputes.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(3)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setStep(5)}
          disabled={!formData.amount || !formData.description}
        >
          Generate Notice
        </Button>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Legal Notice Generated!</h3>
        <p className="text-gray-600 mt-2">Your legal notice is ready to download and send</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Legal Notice Preview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono max-h-96 overflow-y-auto">
            {generateNoticeContent()}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={downloadNotice} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download Notice
        </Button>
        <Button variant="outline" className="w-full">
          <Send className="w-4 h-4 mr-2" />
          Sending Guidelines
        </Button>
      </div>

      <div className="space-y-4">
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertDescription>
            <strong>Sending Methods:</strong><br/>
            1. <strong>Registered Post:</strong> Most reliable method with proof of delivery<br/>
            2. <strong>Courier:</strong> Fast delivery with tracking<br/>
            3. <strong>Email:</strong> If email address is available (follow with physical copy)<br/>
            4. <strong>Hand Delivery:</strong> With acknowledgment receipt
          </AlertDescription>
        </Alert>

        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <strong>Important Information:</strong><br/>
            • Keep a copy of the notice for your records<br/>
            • Note the date of sending and method used<br/>
            • Wait for the reply period mentioned in notice<br/>
            • Consult lawyer if no response is received<br/>
            • This notice can be used as evidence in legal proceedings
          </AlertDescription>
        </Alert>
      </div>

      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Legal Disclaimer:</strong> This notice is generated based on standard templates and the information provided. 
          For complex legal matters or high-value disputes, it is strongly recommended to consult with a qualified lawyer. 
          This is not legal advice.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(4)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Edit Notice
        </Button>
        <Button onClick={() => window.location.reload()}>
          Create New Notice
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Legal Notice Generator</h1>
                <p className="text-xs text-gray-500">Create professional legal notices</p>
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
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div className={`w-full h-1 mx-2 ${
                    step > stepNumber ? 'bg-orange-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-600">Type</span>
            <span className="text-xs text-gray-600">Your Details</span>
            <span className="text-xs text-gray-600">Recipient</span>
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
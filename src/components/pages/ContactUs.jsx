import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import ApperIcon from '@/components/ApperIcon'
import { contactService } from '@/services/api/contactService'
import { toast } from 'react-toastify'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name_c: '',
    email_c: '',
    subject_c: '',
    message_c: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name_c.trim()) {
      newErrors.name_c = 'Name is required'
    }
    
    if (!formData.email_c.trim()) {
      newErrors.email_c = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_c)) {
      newErrors.email_c = 'Please enter a valid email address'
    }
    
    if (!formData.subject_c.trim()) {
      newErrors.subject_c = 'Subject is required'
    }
    
    if (!formData.message_c.trim()) {
      newErrors.message_c = 'Message is required'
    } else if (formData.message_c.trim().length < 10) {
      newErrors.message_c = 'Message must be at least 10 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      const result = await contactService.createSubmission(formData)
      
      if (result && result.length > 0) {
        toast.success('Thank you for contacting us! We will get back to you soon.')
        // Reset form
        setFormData({
          name_c: '',
          email_c: '',
          subject_c: '',
          message_c: ''
        })
        setErrors({})
      } else {
        toast.error('Failed to submit your message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      toast.error('An error occurred while submitting your message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ApperIcon name="Mail" size={32} className="text-blue-600" />
          <h1 className="text-3xl font-display font-bold text-gray-900">Contact Us</h1>
        </div>
        <p className="text-gray-600">
          Have questions or need assistance? We're here to help! Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="MessageSquare" size={20} />
              Send Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name_c">Full Name *</Label>
                <Input
                  id="name_c"
                  name="name_c"
                  type="text"
                  value={formData.name_c}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.name_c ? 'border-red-500' : ''}
                />
                {errors.name_c && (
                  <p className="text-sm text-red-600">{errors.name_c}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email_c">Email Address *</Label>
                <Input
                  id="email_c"
                  name="email_c"
                  type="email"
                  value={formData.email_c}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={errors.email_c ? 'border-red-500' : ''}
                />
                {errors.email_c && (
                  <p className="text-sm text-red-600">{errors.email_c}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject_c">Subject *</Label>
                <Input
                  id="subject_c"
                  name="subject_c"
                  type="text"
                  value={formData.subject_c}
                  onChange={handleInputChange}
                  placeholder="What is this regarding?"
                  className={errors.subject_c ? 'border-red-500' : ''}
                />
                {errors.subject_c && (
                  <p className="text-sm text-red-600">{errors.subject_c}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message_c">Message *</Label>
                <textarea
                  id="message_c"
                  name="message_c"
                  rows={5}
                  value={formData.message_c}
                  onChange={handleInputChange}
                  placeholder="Please provide details about your inquiry..."
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-[120px] ${
                    errors.message_c ? 'border-red-500' : ''
                  }`}
                />
                {errors.message_c && (
                  <p className="text-sm text-red-600">{errors.message_c}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Send" size={16} />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Info" size={20} />
                Get In Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We're committed to providing excellent service and support. Our team is available to assist you with:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ApperIcon name="CheckCircle" size={16} className="text-green-600 mt-0.5" />
                  <span className="text-sm text-gray-700">General inquiries and information</span>
                </li>
                <li className="flex items-start gap-3">
                  <ApperIcon name="CheckCircle" size={16} className="text-green-600 mt-0.5" />
                  <span className="text-sm text-gray-700">Technical support and troubleshooting</span>
                </li>
                <li className="flex items-start gap-3">
                  <ApperIcon name="CheckCircle" size={16} className="text-green-600 mt-0.5" />
                  <span className="text-sm text-gray-700">Feature requests and suggestions</span>
                </li>
                <li className="flex items-start gap-3">
                  <ApperIcon name="CheckCircle" size={16} className="text-green-600 mt-0.5" />
                  <span className="text-sm text-gray-700">Partnership and business opportunities</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Clock" size={20} />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Zap" size={16} className="text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">General Inquiries:</span>
                  <span className="text-sm text-gray-600">Within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="AlertCircle" size={16} className="text-red-600" />
                  <span className="text-sm font-medium text-gray-700">Urgent Issues:</span>
                  <span className="text-sm text-gray-600">Within 4 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Heart" size={16} className="text-pink-600" />
                  <span className="text-sm font-medium text-gray-700">Business Hours:</span>
                  <span className="text-sm text-gray-600">Mon-Fri, 9 AM - 6 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
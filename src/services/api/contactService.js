import { getApperClient } from '@/services/apperClient'

class ContactService {
  constructor() {
    this.tableName = 'contact_us_submission_c'
  }

  async createSubmission(formData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not available')
      }

      // Prepare data with only updateable fields
      const submissionData = {
        name_c: formData.name_c?.trim(),
        email_c: formData.email_c?.trim(),
        subject_c: formData.subject_c?.trim(),
        message_c: formData.message_c?.trim()
      }

      // Remove any empty fields
      const cleanData = Object.fromEntries(
        Object.entries(submissionData).filter(([_, value]) => value && value !== '')
      )

      if (Object.keys(cleanData).length === 0) {
        throw new Error('No valid data to submit')
      }

      const params = {
        records: [cleanData]
      }

      const response = await apperClient.createRecord(this.tableName, params)

      if (!response.success) {
        console.error('Contact submission failed:', response.message)
        throw new Error(response.message || 'Failed to submit contact form')
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} contact submissions:`, failed)
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => {
                console.error(`${error.fieldLabel}: ${error.message}`)
              })
            }
            if (record.message) {
              console.error('Record error:', record.message)
            }
          })
          throw new Error('Failed to submit contact form')
        }

        return successful.map(r => r.data)
      }

      return []
    } catch (error) {
      console.error('Error creating contact submission:', error?.response?.data?.message || error.message || error)
      throw error
    }
  }
}

export const contactService = new ContactService()
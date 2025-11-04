import { Link } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="h-32 w-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            <ApperIcon name="Search" className="h-16 w-16 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-navy-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-navy-700 mb-2">Page Not Found</h2>
          <p className="text-navy-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="Home" className="h-5 w-5" />
            Back to Dashboard
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-navy-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 border border-navy-200 shadow-sm hover:shadow-md"
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5" />
            Go Back
          </button>
        </div>
        
        <div className="mt-12 pt-8 border-t border-navy-200">
          <p className="text-sm text-navy-500">
            Need help? Contact our support team or check our documentation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
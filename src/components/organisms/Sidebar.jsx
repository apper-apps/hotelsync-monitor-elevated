import { NavLink, useLocation } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  
const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Rooms", href: "/rooms", icon: "Bed" },
    { name: "Reservations", href: "/reservations", icon: "Calendar" },
    { name: "Guests", href: "/guests", icon: "Users" },
    { name: "Housekeeping", href: "/housekeeping", icon: "Sparkles" },
    { name: "Reports", href: "/reports", icon: "BarChart3" },
    { name: "Contact Us", href: "/contact", icon: "Mail" }
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-white/10">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
          <ApperIcon name="Hotel" className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-display text-white">HotelSync Pro</h1>
          <p className="text-sm text-blue-200">Management Dashboard</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/10"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <ApperIcon 
                name={item.icon} 
                className={`h-5 w-5 transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-105"
                }`} 
              />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto h-2 w-2 rounded-full bg-amber-400 shadow-sm" />
              )}
            </NavLink>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <div className="text-center text-blue-200 text-sm">
          <p className="font-medium">Grand Plaza Hotel</p>
          <p className="text-xs opacity-75">Premium Suite Experience</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-gradient-to-b from-navy-600 to-navy-800 shadow-2xl">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative w-64 bg-gradient-to-b from-navy-600 to-navy-800 shadow-2xl transform transition-transform duration-300">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ApperIcon name="X" className="h-5 w-5" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
import { Button } from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import { Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TopBar(){
  const navigate = useNavigate()
  const location = useLocation()

  // Define menu items with their routes
  const menuItems = [
    { label: 'All Snippets', route: '/' },
    { label: 'Add New', route: '/add-new' },
    { label: 'Settings', route: '/settings' }
  ]

  // Function to check if a menu item is active
  const isActive = (route) => {
    if (route === '/') {
      return location.pathname === '/' || location.pathname === ''
    }
    return location.pathname === route
  }

  return(
    <div className="mb-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo />
        <h1 className="text-lg! font-bold! m-0">Codesnip</h1>
      </div>
      <div className='flex items-center gap-x-2'>
        {menuItems.map((item) => (
          <Button 
            key={item.route}
            className={`cursor-pointer font-semibold! rounded-full transition-all duration-200 ${
              isActive(item.route) 
                ? 'text-white shadow-md hover:bg-gray-800' 
                : 'bg-transparent shadow-none text-black hover:bg-gray-300'
            }`}
            onClick={() => navigate(item.route)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-x-2">
        <a href="https://wordpress.org/support/plugin/codesnip/reviews/#new-post" className="flex items-center text-green-950! px-4 py-2 text-md font-bold bg-gray-100 leading-6 capitalize duration-100 transform rounded-full 
          cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none o 
          hover:shadow-sm">
          <Star fill="#f0b100" className="w-5 h-5 mr-2 text-yellow-500" />
          Review us
        </a>
      </div>
    </div>
  )
}
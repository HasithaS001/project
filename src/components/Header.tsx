import React from 'react';
import { Menu, X } from 'lucide-react';
import { Wand2 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Wand2 className="w-8 h-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold">Pencyl</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-purple-600 transition-colors">Benefits</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
            <button className="bg-gray-50 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Sign In
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Try Free
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-purple-600 transition-colors">Benefits</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
              <button className="bg-gray-50 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Sign In
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Try Free
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

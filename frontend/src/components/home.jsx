import React, { useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col">

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Welcome to Flash Wallet</h1>
          <p className="text-gray-400 mb-8 text-lg">Secure. Fast. Reliable.</p>
          
          <div className="space-y-4">
            {/* Import Button */}
            <button 
              className="w-full bg-white text-black py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-white/10 group"
              onClick={() => navigate('/import')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">Import Existing Wallet</span>
            </button>
            
            {/* Create Button */}
            <button 
              className="w-full bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-black/50 group border border-gray-700"
              onClick={() => navigate('/new_wallet')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Create New Wallet</span>
            </button>
          </div>
        </div>
      </main>
     
      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Support</a>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-600">&copy; 2024 Flash Wallet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
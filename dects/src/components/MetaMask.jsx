import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Shield, Download, Key, Wallet, ChevronRight, ChevronDown } from 'lucide-react';

export default function MetaMaskGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const steps = [
    {
      id: 'install',
      title: 'Install MetaMask',
      icon: Download,
      content: (
        <>
          <h3 className="text-xl font-semibold mb-4">Step 1: Install MetaMask</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">For Desktop (Browser Extension):</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Visit the official website at <span className="font-mono bg-white px-2 py-1 rounded">metamask.io</span></li>
                <li>Click "Download" and select your browser</li>
                <li>Click "Install MetaMask" for your browser</li>
                <li>Add the extension from your browser's store</li>
                <li>Pin the extension to your toolbar</li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">For Mobile:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Open Apple App Store or Google Play Store</li>
                <li>Search for "MetaMask"</li>
                <li>Download the official MetaMask app</li>
                <li>Open the app after installation</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Only download from official sources to avoid fake apps or phishing attempts.
                </p>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'create',
      title: 'Create Your Wallet',
      icon: Wallet,
      content: (
        <>
          <h3 className="text-xl font-semibold mb-4">Step 2: Create Your Wallet</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Click on the MetaMask icon or open the app</li>
                <li>Click <span className="font-semibold">"Create a new wallet"</span></li>
                <li>Review and agree to the Terms of Use</li>
                <li>Create a strong password with:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>At least 8 characters</li>
                    <li>Uppercase and lowercase letters</li>
                    <li>Numbers and symbols</li>
                  </ul>
                </li>
                <li>Confirm your password</li>
                <li>Click "Create a new wallet"</li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 <strong>Tip:</strong> Use a unique password you haven't used elsewhere. Consider using a password manager.
              </p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'recovery',
      title: 'Secure Recovery Phrase',
      icon: Key,
      content: (
        <>
          <h3 className="text-xl font-semibold mb-4">Step 3: Secure Your Secret Recovery Phrase</h3>
          
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900 mb-2">CRITICAL STEP - READ CAREFULLY</h4>
                <p className="text-red-800 text-sm">
                  Your Secret Recovery Phrase is the ONLY way to recover your wallet. Anyone with this phrase can access all your funds.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Read MetaMask's explanation about the recovery phrase</li>
                <li>Click "Secure my wallet"</li>
                <li>Click "Reveal Secret Recovery Phrase"</li>
                <li><strong>Write down all 12 words in exact order</strong></li>
                <li>Store the phrase in a safe, offline location</li>
                <li>Click "Next"</li>
              </ol>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-900 mb-2">🚨 Security Rules - NO EXCEPTIONS:</h4>
              <ul className="space-y-2 text-sm text-red-800">
                <li className="flex items-start">
                  <span className="mr-2">❌</span>
                  <span><strong>NEVER</strong> share with anyone - not even MetaMask support</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">❌</span>
                  <span><strong>NEVER</strong> save digitally (no screenshots, cloud, emails)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">❌</span>
                  <span><strong>NEVER</strong> enter it on any website</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span><strong>DO</strong> write it on paper and store securely</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span><strong>DO</strong> consider multiple secure backup locations</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'confirm',
      title: 'Confirm & Complete',
      icon: CheckCircle,
      content: (
        <>
          <h3 className="text-xl font-semibold mb-4">Step 4: Confirm Your Recovery Phrase</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>MetaMask will ask you to verify your phrase</li>
                <li>Select the words in the correct order from the list</li>
                <li>Click "Confirm"</li>
                <li>Click "Got it!" when complete</li>
              </ol>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-green-900 mb-2">Congratulations!</h4>
              <p className="text-green-800">Your MetaMask wallet is now created and ready to use.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">What You'll See:</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Your wallet address (starts with "0x")</li>
                <li>• Your account balance (initially $0)</li>
                <li>• Options to buy, send, or receive crypto</li>
              </ul>
            </div>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center mb-4">
            <Wallet className="w-10 h-10 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">MetaMask Wallet Setup Guide</h1>
          </div>
          <p className="text-gray-600">
            Follow this step-by-step guide to create your MetaMask wallet safely and securely.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => setCurrentStep(index)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        currentStep === index
                          ? 'bg-purple-600 text-white shadow-lg scale-110'
                          : currentStep > index
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </button>
                    <span className={`text-xs mt-2 text-center font-medium ${
                      currentStep === index ? 'text-purple-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 rounded ${
                      currentStep > index ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {steps[currentStep].content}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentStep === steps.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('security')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium">Security Best Practices</span>
              {expandedSections.security ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.security && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                <p>• Enable biometric authentication on mobile</p>
                <p>• Be cautious of phishing websites and scams</p>
                <p>• Always verify website URLs before entering passwords</p>
                <p>• Never share your recovery phrase or private keys</p>
                <p>• Keep password and recovery phrase separate</p>
              </div>
            )}

            <button
              onClick={() => toggleSection('troubleshooting')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium">Troubleshooting</span>
              {expandedSections.troubleshooting ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.troubleshooting && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Forgot your password?</p>
                  <p className="text-gray-600">You can reset using your recovery phrase, but accounts will need to be re-added.</p>
                </div>
                <div>
                  <p className="font-semibold">Lost your recovery phrase?</p>
                  <p className="text-gray-600">Unfortunately, there's no way to recover your wallet without it.</p>
                </div>
                <div>
                  <p className="font-semibold">Need help?</p>
                  <p className="text-gray-600">Visit support.metamask.io for official support.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
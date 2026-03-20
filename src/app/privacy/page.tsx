'use client';

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose">
        <p className="text-gray-600 mb-4">Last updated: March 2026</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p className="mb-4">
          We collect information you provide directly, including your name, email address, 
          and any content you choose to share with us through our service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To monitor the usage of our service</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Cookies and Tracking</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to track activity on our service 
          and hold certain information. You can instruct your browser to refuse all cookies 
          or to indicate when a cookie is being sent.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Third-Party Services</h2>
        <p className="mb-4">
          We may employ third-party companies and individuals to facilitate our service, 
          provide service on our behalf, perform service-related services, or assist us in 
          analyzing how our service is used. These third parties have access to your Personal 
          Data only to perform these tasks on our behalf and are obligated not to disclose or 
          use it for any other purpose.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Data Security</h2>
        <p className="mb-4">
          The security of your data is important to us. We strive to use commercially 
          acceptable means to protect your Personal Data, but no method of internet 
          transmission is 100% secure.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. 
          Contact us at privacy@goodnews.example.com for any requests.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@goodnews.example.com" className="text-green-600 hover:underline">
            privacy@goodnews.example.com
          </a>
        </p>
      </div>
    </main>
  );
}

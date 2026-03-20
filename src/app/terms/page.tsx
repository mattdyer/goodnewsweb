'use client';

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose">
        <p className="text-gray-600 mb-4">Last updated: March 2026</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using Good News, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, please do not use our service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Description of Service</h2>
        <p className="mb-4">
          Good News is an aggregator service that curates positive and uplifting news stories 
          from various sources around the world. We provide this content for informational 
          and entertainment purposes.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">User Accounts</h2>
        <p className="mb-4">
          To access certain features, you may need to create an account. You are responsible 
          for maintaining the confidentiality of your account credentials and for all 
          activities under your account.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Subscriptions</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Premium subscriptions are billed monthly</li>
          <li>You may cancel your subscription at any time</li>
          <li>Refunds are provided within 7 days of purchase</li>
          <li>Prices are subject to change with 30 days notice</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Content</h2>
        <p className="mb-4">
          The news content displayed on Good News is sourced from third-party providers. 
          We do not claim ownership of this content. Views expressed in articles are those 
          of the original authors.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
        <p className="mb-4">
          Good News shall not be liable for any indirect, incidental, special, consequential, 
          or punitive damages resulting from your use of the service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. We will notify users of 
          significant changes via email or prominent notice on our website.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Contact</h2>
        <p className="mb-4">
          Questions about these Terms? Contact us at{' '}
          <a href="mailto:legal@goodnews.example.com" className="text-green-600 hover:underline">
            legal@goodnews.example.com
          </a>
        </p>
      </div>
    </main>
  );
}

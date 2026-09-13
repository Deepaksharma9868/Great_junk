import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CtaBanner } from '../components/CtaBanner';

interface PrivacyProps {
  onOpenCall: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyProps> = ({ onOpenCall }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#091b2f] pt-16 pb-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Effective Date: January 1, 2026
          </p>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate prose-lg max-w-none text-slate-600">
            <p>
              At <strong>Great Junk Removalist</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-[#091b2f] mt-10 mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when you request a quote, book a service, or contact us. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Contact Information:</strong> Name, phone number, email address, and physical address/suburb.</li>
              <li><strong>Service Details:</strong> Information regarding the items to be removed, property details, and photographs of the junk provided by you.</li>
              <li><strong>Payment Information:</strong> Credit card details or billing information (processed securely through our third-party payment gateways; we do not store full credit card numbers).</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#091b2f] mt-10 mb-4">2. How We Use Your Information</h2>
            <p>
              The information we collect is used solely for the purpose of providing and improving our services:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>To provide accurate quotes and schedule removal services.</li>
              <li>To communicate with you regarding your booking, dispatch times, or service updates.</li>
              <li>To process payments and issue invoices.</li>
              <li>To improve our website functionality and customer service based on feedback.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#091b2f] mt-10 mb-4">3. Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may share your information only under the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Trusted Partners:</strong> Third-party service providers who assist us in operating our website, conducting our business, or servicing you (e.g., payment processors, CRM software), so long as those parties agree to keep this information confidential.</li>
              <li><strong>Legal Requirements:</strong> We may release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#091b2f] mt-10 mb-4">4. Security of Your Information</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.
            </p>

            <h2 className="text-2xl font-bold text-[#091b2f] mt-10 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, you may contact us using the information below:
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-4">
              <p className="mb-2"><strong>Great Junk Removalist</strong></p>
              <p className="mb-2"><strong>Phone:</strong> 0480 557 454</p>
              <p className="mb-0"><strong>Email:</strong> info@greatjunkremovalist.com.au</p>
            </div>
          </div>
        </div>
      </div>

      <CtaBanner
        onQuoteClick={() => navigate('/quote')}
        onCallClick={onOpenCall}
      />
    </>
  );
};

import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-16 sm:px-8 lg:px-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12 lg:p-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              About Us
            </h1>
            
            <div className="space-y-10">
              <p className="text-xl text-gray-700 leading-relaxed">
                MyPodcast is a personal podcast platform designed to give you a simple, elegant space to enjoy and follow my latest episodes. This website is where I publish my own podcasts — episodes I create, edit, and share directly from a server I manage in the cloud. Built on powerful infrastructure using IaaS (Infrastructure as a Service), the platform is hosted securely and reliably, ensuring you can stream my content anytime, anywhere. Here, you'll find carefully curated episodes across different themes like technology, wellness, creativity, and more. Each podcast comes with show notes, timestamps, and helpful links so you can dive deeper into the topics that interest you. Whether you're here to catch up on my latest release, revisit your favorite episodes, or explore new content, MyPodcast is built for a clean, distraction-free listening experience. You can stream episodes directly from your browser — no downloads, no third-party logins required. As a creator, this space gives me the freedom to publish independently, without relying on mainstream platforms. It also lets me experiment with design, features, and formats to keep things fresh. More features are coming soon, including search and filtering by topics, episode bookmarking, and optional downloads for offline listening. If you're a regular listener, make sure to check back often or bookmark the page — new content is always on the way. Thank you for visiting and tuning in. I hope you enjoy the stories, insights, and ideas I share here — and that this platform makes listening as smooth and enjoyable as possible.
              </p>
              
              <div className="border-l-4 border-primary-500 pl-8">
                <p className="text-xl text-gray-700 leading-relaxed italic">
                  License & Rationale

                  I have chosen the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) license for this project. This allows others to view and use the content for educational or personal use as long as they credit me and do not use it commercially. Since MyPodcast includes original media and code, I want to protect it from being exploited for profit while still encouraging learning and sharing in non-commercial settings. This license is ideal for independent creative projects that promote open access with some protective boundaries.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Independent Platform</h3>
                  <p className="mt-2 text-sm text-gray-600">Direct from creator to listener, with no intermediary platforms</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Cloud Infrastructure</h3>
                  <p className="mt-2 text-sm text-gray-600">Secure and reliable IaaS hosting for seamless streaming</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Creative Commons</h3>
                  <p className="mt-2 text-sm text-gray-600">Licensed for educational and personal use with attribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 
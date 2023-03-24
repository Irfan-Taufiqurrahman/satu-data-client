import React from 'react';

const Home = () => {
return (
	<div
	style={{
		display: 'flex',
		justifyContent: 'Right',
		alignItems: 'Right',
		height: '100vh'
	}}
	>
      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to my app!</h1>
            <p className="mt-2 text-gray-600">This is the main content of the app.</p>
          </div>
        </div>
      </main>
	</div>
);
};

export default Home;

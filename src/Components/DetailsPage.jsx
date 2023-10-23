import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const DetailsPage = ({ userData }) => {
  const { id } = useParams();
  const user = userData[id];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!user) {
    return <div>User not found</div>;
  } 
  const handleShare = () => {
    // Create a shareable link to the current details page
    const shareableLink = window.location.href;

    // Use the Web Share API to share the link
    if (navigator.share) {
      navigator.share({
        title: `User Details: ${user.username}`,
        text: `Check out the profile of ${user.username}`,
        url: shareableLink,
      });
    } else {
      // Provide a fallback for browsers that don't support the Web Share API
      alert(`Shareable Link: ${shareableLink}`);
    }
  };

  const handleDownload = () => {
    // Create a text string with user details
    const userDetailsText = `
    User Profile
    Username: ${user.username}
    Email: ${user.email}
    About: ${user.about}

    Education:
    ${user.education.map((edu, index) => `
    School ${index + 1}: ${edu.school}
    Year of Passing: ${edu.yearOfPassing}
    Score: ${edu.score}`).join('\n')}
    `;

    // Create a Blob and generate a downloadable link
    const blob = new Blob([userDetailsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user_details_${user.username}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const goToPreviousSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (activeIndex < user.education.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };


  const handlePrint = () => {
    // Implement the print functionality here
    window.print();
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-5 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">{user.username}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.about}</p>
      </div>

      <div className="mb-4 border-2 shadow-lg bg-white rounded-lg my-5 py-5 ">
       <Carousel
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          selectedItem={activeIndex}
          onClickItem={(index) => setActiveIndex(index)}
        >
          {user.education.map((edu, index) => (
            <div key={index} className="slide">
            <h2 className="text-xl font-semibold">{edu.school}</h2>
              <p>Year of Passing: {edu.yearOfPassing}</p>
              <p>Score: {edu.score}</p>
            </div>
          ))}
        </Carousel>
        </div>
        <div className='flex justify-center '>
        <div className="carousel-navigation space-x-6 mb-5">
          <span className="carousel-arrow cursor-pointer" onClick={goToPreviousSlide}>
            &lt;
          </span>
          <span className="page-indicator">
            {activeIndex + 1}/{user.education.length}
          </span>
          <span className="carousel-arrow cursor-pointer" onClick={goToNextSlide}>
            &gt;
          </span>
        </div>
      </div>


      <div className="mb-4">
      <button onClick={handleShare} className="bg-blue-500 text-white p-2 rounded-md mr-2">
          Share
        </button>
        <button onClick={handleDownload} className="bg-blue-500 text-white p-2 rounded-md mr-2">
          Download
        </button>
        <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded-md">
          Print
        </button>
      </div>

      <Link to="/card" className="text-blue-500">Back to Card Page</Link>
    </div>
  );
};

export default DetailsPage;

import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { ThankYouProps } from '../types';

const ThankYou: React.FC<ThankYouProps> = ({ handleContinueShopping }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(true);
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  // Sample reviews
  const sampleReviews = [
    {
      id: 1,
      name: 'Sarah J.',
      rating: 5,
      text: 'Cafe Asipiya is my new favorite spot! The ambiance is cozy, the staff is friendly, and the coffee is out of this world. Highly recommend!'
    },
    {
      id: 2,
      name: 'Sohrab',
      rating: 4,
      text: 'I had an amazing experience at Cafe Asipiya. The staff was friendly, the environment was very welcoming. I will definitely be coming back again.'
    },
    {
      id: 3,
      name: 'Maria L.',
      rating: 5,
      text: 'Cafe Asipiya has the best bubble tea in town! The flavors are authentic and the service is always excellent.'
    },
    {
      id: 4,
      name: 'David K.',
      rating: 5,
      text: 'The smoothies at Cafe Asipiya are incredible. Fresh ingredients and perfect consistency every time. My go-to place for a healthy treat!'
    }
  ];

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleMouseEnter = (hoveredStar: number) => {
    setHoveredRating(hoveredStar);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      setReviewSubmitted(true);
      setShowReviewForm(false);
      // In a real app, you would send this data to your backend
      console.log({
        rating,
        reviewText,
        userName: userName || 'Anonymous'
      });
    }
  };

  const renderStars = (count: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const filled = interactive 
        ? (hoveredRating || rating) >= starValue
        : count >= starValue;
      
      return (
        <button
          key={index}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => handleRatingClick(starValue) : undefined}
          onMouseEnter={interactive ? () => handleMouseEnter(starValue) : undefined}
          onMouseLeave={interactive ? handleMouseLeave : undefined}
          className={`${interactive ? 'cursor-pointer' : ''} focus:outline-none`}
          disabled={!interactive}
        >
          <Star 
            className={`h-6 w-6 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        </button>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank you</h2>
        <p className="text-lg text-gray-600 mb-8">for your purchase!</p>
        
        <p className="text-gray-500 mb-8">
          Your order has been received and is being processed. You will receive a confirmation email shortly.
        </p>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-center mb-4">Please Rate Your Experience</h3>
        
        {showReviewForm ? (
          <div className="max-w-md mx-auto">
            <div className="flex justify-center space-x-2 mb-6">
              {renderStars(0, true)}
            </div>
            
            <div className="text-center text-sm text-gray-500 mb-6">
              <span className="inline-block mx-2">Bad</span>
              <span className="inline-block mx-2">Poor</span>
              <span className="inline-block mx-2">OK</span>
              <span className="inline-block mx-2">Good</span>
              <span className="inline-block mx-2">Great</span>
            </div>
            
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div className="mb-4">
                <textarea
                  placeholder="Share your experience with us..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={rating === 0}
                className={`w-full px-4 py-2 text-white text-sm font-medium rounded-md ${
                  rating > 0 
                    ? 'bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Submit Review
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-4">Thank you for your feedback!</p>
          </div>
        )}
      </div>

      {/* Customer Reviews */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleReviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center text-gray-500 text-sm">
                  {review.name.charAt(0)}
                </div>
                <span className="font-medium">{review.name}</span>
              </div>
              <div className="flex mb-2">
                {renderStars(review.rating)}
              </div>
              <p className="text-sm text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleContinueShopping}
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
import React, { useState } from 'react';
import Carousel from './Carousel';
import RecentlyAdded from './RecentlyAdded';
function HomeScreen() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  return (
    <div className="App">

      <div id="content">
        <div id="popular-images">Most Popular
          {<Carousel/>/* Swipeable popular images with description and tags go here */}
        </div>

        <div id="recent-images">Recently Added
          {<RecentlyAdded/>}
        </div>

        <div id="ad-unit-300x600">
          {/* Your 300x600 ad code goes here */}
        </div>
      </div>

      <div id="ad-container">
        <div id="ad-unit-728x90">
          {/* Your 728x90 ad code goes here */}
        </div>
      </div>

      <footer>
        &copy; 2024 Your Web App. All rights reserved.
      </footer>
    </div>
  );
}

export default HomeScreen;
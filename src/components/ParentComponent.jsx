import React, { useState } from 'react';
import Checkout from './pages/Checkout';

const ParentComponent = () => {
  const [order, setOrder] = useState(null); // Define state and setter function

  return (
    <div>
      {/* Pass setOrder as a prop to Checkout */}
      <Checkout setOrder={setOrder} />
    </div>
  );
};

export default ParentComponent;

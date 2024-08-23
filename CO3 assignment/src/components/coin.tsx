import React from "react";

const CoinLogo = () => {
  return (
    <div className="relative w-64 h-64 flex justify-center items-center">
      {/* Outer Circle with Text */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="gold"
          strokeWidth="2"
        />
        <text fontSize="10" fontWeight="bold" fill="gold">
          <textPath href="#text-circle" startOffset="50%">
            POWERED BY COMMUNITY • POWERED BY COMMUNITY •
          </textPath>
        </text>
        <defs>
          <path
            id="text-circle"
            d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
          />
        </defs>
      </svg>

      {/* Inner Circle */}
      <div className="w-48 h-48 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full flex justify-center items-center">
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L16 6H12V18H8V6H4L12 2Z" fill="gold" />
        </svg>
      </div>
    </div>
  );
};

export default CoinLogo;

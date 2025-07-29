// const config = {
//     BASE_URI: `${process.env.REACT_APP_BASE_URI}`,

// };
// export default config;


//Added
const config = {
  BASE_URI: process.env.REACT_APP_BASE_URI || "http://localhost:8000", // fallback for local dev
};

export default config;

import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader 
    speed={2}
    width={400}
    height={240}
    viewBox="0 0 380 240"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"

  >
    <circle cx="155" cy="-204" r="137" /> 
    <rect x="4" y="3" rx="0" ry="0" width="520" height="508" /> 
    <rect x="31" y="445" rx="0" ry="0" width="29" height="1" />
  </ContentLoader>
)

export default MyLoader
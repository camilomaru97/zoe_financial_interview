'use client'

import AdvisorsApp from "./AdvisorsApp";
import AdvisorProvider from "./context/advisors/AdvisorProvider";

export default function Home() {
 
  return (
    <div style={{ maxWidth: "1280px" }}>
      <AdvisorProvider>
        <AdvisorsApp />
      </AdvisorProvider>
    </div>
    
  );
}

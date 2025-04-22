//use this if view reports button not needed -  even in this you can view uploaded reports on api/reports endpoint on backend url
// import React from "react";
// import Header from "../components/Header"; 
// import BountyProgram from "../components/BountyProgram";

// export default function BugBountyPage() {
//   return (
//     <div>
//       <Header /> 
//       <BountyProgram />
//     </div>
//   ); 
// }


//use this if you need view reports button on first page
import { useState } from "react";
import Header from "../components/Header";  // Import Header
import BountyProgram from "../components/BountyProgram";
import ViewReports from "../components/ViewReports";


export default function BugBountyPage() {
  const [showReports, setShowReports] = useState(false);

  return (
    <div>
      <Header />
      {showReports ? <ViewReports /> : <BountyProgram />}
       
      {/* keep this par if you want to see viewReport button , otherwise remove */} 
      <div align="center">
      <button onClick={() => setShowReports(!showReports)} className="viewReports-button">
        {showReports ? "BUG BOUNTY PROGRAM DETAILS" : "VIEW SUBMITTED REPORTS"}
      </button ></div>

    </div>
  );

}





// //just some new way -working fine
// import { useRouter } from "next/router";
// import Header from "../components/Header";
// import BountyProgram from "../components/BountyProgram";
// import ViewReports from "../components/ViewReports";

// export default function BugBountyPage() {
//   const router = useRouter();
//   const { view } = router.query;

//   const toggleView = () => {
//     if (view === "reports") {
//       router.push("/"); // back to default (form)
//     } else {
//       router.push("/?view=reports"); // show reports
//     }
//   };

//   return (
//     <div>
//       <Header />
//       {view === "reports" ? <ViewReports /> : <BountyProgram />}

//       {/* toggle button */}
//       <div align="center">
//         <button onClick={toggleView} className="viewReports-button">
//           {view === "reports" ? "BUG BOUNTY PROGRAM DETAILS" : "VIEW SUBMITTED REPORTS"}
//         </button>
//       </div>
//     </div>
//   );
// }

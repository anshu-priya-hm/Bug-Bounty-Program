//use this if view reports button not needed -  even in this you can view uploaded reports on api/reports endpoint on backend url
import { useState } from "react";
import '../styles/index.css';
import Header from "../components/Header"; 
import BountyProgram from "../components/BountyProgram";
//import SubmitReport from "../components/SubmitReport";


export default function BugBountyPage() {
  //const [showForm, setShowForm] = useState(true);
  return (
   <div>
    <BountyProgram />
    <Header /> 
    </div>); 
 }


//use this if you need view reports button on first page
// import { useState } from "react";
// import Header from "../components/Header";  // Import Header
// import BountyProgram from "../components/BountyProgram";
// import ViewReports from "../components/ViewReports";


// export default function BugBountyPage() {
//   const [showReports, setShowReports] = useState(false);

//   return (
//     <div>
//       {/* Add Header at the top */}
//       <Header />
//       {showReports ? <ViewReports /> : <BountyProgram />}
       
//       {/* keep this par if you want to see viewReport button , otherwise remove */} 
//       <div className="viewReports-button">
//       <button onClick={() => setShowReports(!showReports)} >
//         {showReports ? "Back to Form" : "View Reports"}
//       </button ></div>

//     </div>
//   );

// }



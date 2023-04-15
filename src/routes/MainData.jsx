import {
    Outlet,
    Form,
    redirect,
    useNavigation,
  } from "react-router-dom";
  import { getContacts,createContact } from "../contacts";
  //component page
  import Sidebar from "../components/sidebar";
  import Navbar from "../components/navbar";
  import Footer from "../components/footer";
  import UsersTable from "../components/Account";
import { Main } from "../components/Taksonomi/MainData";

  export default function MainData() {
    const navigation = useNavigation();
    return (
      <>
      <div className="">
        <main className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar />
          <div className="flex flex-col w-full">
            {/* Navbar */}
            <Navbar />
            <div className="md:p-10 p-4 bg-gray-50 w-full h-full flex-grow">
              <Main />
            </div>
            <div className="flex flex-col w-full ">
            <Footer />
          </div>
          </div>
  
        </main>
      </div>
      </>
    );
  }
  
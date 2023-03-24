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

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts };
}

export default function Root() {
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
            <Outlet />
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

import logoJatim from "../assets/images/SATAJatim-removebg-preview.png";

import {
  Outlet,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";

const Navbar = () => {
  const navigation = useNavigation();
  return(
    <nav className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
          </div>
        </div>
      </div>
    </div>
  </nav>
  )

}

export default Navbar;
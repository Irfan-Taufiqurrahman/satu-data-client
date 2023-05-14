import create from "zustand";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import FunctionsIcon from "@mui/icons-material/Functions";

const useNavStore = create((set, get) => ({
  activeNav: [
    {
      id: 1,
      name: "Account",
      href: "/accounts",
      active: false,
      asesi: true,
      asesor: false,
      admin: true,
      icon: <SettingsIcon />,
    },
    {
      id: 2,
      name: "Dataset",
      href: "/",
      active: true,
      asesi: true,
      asesor: true,
      admin: true,
      icon: <DashboardIcon />,
    },
    {
      id: 3,
      name: "Taksonomi Data",
      href: "/main-data",
      active: false,
      asesi: true,
      asesor: true,
      admin: false,
      icon: <NoteAltIcon />,
    },
    {
      id: 4,
      name: "Perhitungan",
      href: "/perhitungan",
      active: false,
      asesi: true,
      asesor: true,
      admin: false,
      icon: <FunctionsIcon />,
    },
  ],
  findNav: (label) => {
    return get().activeNav.find((nav) => nav.name === label);
  },
  findActiveNav: () => {
    return get().activeNav.find((nav) => nav.active === true);
  },
  switchNav: (id) =>
    set(() => ({
      activeNav: get().activeNav.map((nav) => {
        if (nav.id === id) {
          return {
            ...nav,
            active: true,
          };
        } else {
          return {
            ...nav,
            active: false,
          };
        }
      }),
    })),
}));

export default useNavStore;

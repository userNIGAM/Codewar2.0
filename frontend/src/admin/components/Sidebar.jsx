import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
    LayoutDashboard,
    Image,
    BadgeCheck,
    Clock,
    LogOut,
} from "lucide-react";

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (

        <aside className="w-64 bg-slate-900 text-white">

            <div className="text-2xl font-bold p-8">

                Admin

            </div>

            <nav className="space-y-3 px-5">

                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg ${
                            isActive
                                ? "bg-cyan-500"
                                : "hover:bg-slate-700"
                        }`
                    }
                >

                    <LayoutDashboard />

                    Dashboard

                </NavLink>

                <NavLink
                    to="/admin/sponsors"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg ${
                            isActive
                                ? "bg-cyan-500"
                                : "hover:bg-slate-700"
                        }`
                    }
                >

                    <Image />

                    Sponsors

                </NavLink>

                <NavLink
                    to="/admin/supported-by"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg ${
                            isActive
                                ? "bg-cyan-500"
                                : "hover:bg-slate-700"
                        }`
                    }
                >

                    <BadgeCheck />

                    Supported By

                </NavLink>

                <NavLink
                    to="/admin/countdown"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg ${
                            isActive
                                ? "bg-cyan-500"
                                : "hover:bg-slate-700"
                        }`
                    }
                >

                    <Clock />

                    Countdown

                </NavLink>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-slate-200 transition hover:bg-slate-700"
                >
                    <LogOut />
                    Logout
                </button>

            </nav>

        </aside>
    );
}
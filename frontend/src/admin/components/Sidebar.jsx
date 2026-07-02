import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Image,
} from "lucide-react";

export default function Sidebar() {
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

            </nav>

        </aside>
    );
}
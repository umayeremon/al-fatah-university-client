import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/sidebar.type";

const sidebarGenerator = (items: TUserPath[], role: string) => {
  const sidebarRoutes = items.reduce((acc: TSidebarItem[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name as string,
        label: item.name,
        children: item.children.map((item) => {
          if (item.name) {
            return {
              key: item.name,
              label: (
                <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
              ),
            };
          }
        }),
      });
    }
    return acc;
  }, []);
  return sidebarRoutes;
};

export default sidebarGenerator;

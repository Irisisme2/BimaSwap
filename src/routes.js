import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdAttachMoney,
  MdSwapHoriz,
  MdAccountBalanceWallet,
  MdGroup,
  MdShoppingCart,
  MdBarChart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import YieldFarming from "views/admin/YieldFarming";
import Investments from "views/admin/Investments";
import CrossChain from "views/admin/Cross-Chain";
import Pools from "views/admin/Pools";
import BIMA from "views/admin/BIMA";
import Analytics from "views/admin/Analytics";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Yield Farming",
    layout: "/admin",
    path: "/YieldFarming",
    icon: (
      <Icon
        as={MdAttachMoney}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: YieldFarming,
    secondary: true,
  },
  {
    name: "Cross-Chain Transfers",
    layout: "/admin",
    icon: <Icon as={MdSwapHoriz} width='20px' height='20px' color='inherit' />,
    path: "/Cross-Chain",
    component: CrossChain,
  },
  {
    name: "My Investments",
    layout: "/admin",
    path: "/Investments",
    icon: <Icon as={MdAccountBalanceWallet} width='20px' height='20px' color='inherit' />,
    component: Investments,
  },
  {
    name: "Social Yield Pools",
    layout: "/admin",
    path: "/Pools",
    icon: <Icon as={MdGroup} width='20px' height='20px' color='inherit' />,
    component: Pools,
  },
  {
    name: "Buy BIMA",
    layout: "/admin",
    path: "/BIMA",
    icon: <Icon as={MdShoppingCart} width='20px' height='20px' color='inherit' />,
    component: BIMA,
  },
  {
    name: "Analytics & Reports",
    layout: "/admin",
    path: "/Analytics",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    component: Analytics,
  },
];

export default routes;

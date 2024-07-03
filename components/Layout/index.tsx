import React from "react";
import Row from "./Row";
import Grid from "./Grid";
import Panel from "./Panel";

const Layout = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
);

Layout.Row = Row;
Layout.Grid = Grid;
Layout.Panel = Panel;

export default Layout;

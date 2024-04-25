import React from "react";
import Row from "./Row";
import Grid from "./Grid";

const Layout = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
);

Layout.Row = Row;
Layout.Grid = Grid;

export default Layout;
import React from "react";
import Row from "./Row";

const Layout = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

Layout.Row = Row;

export default Layout;
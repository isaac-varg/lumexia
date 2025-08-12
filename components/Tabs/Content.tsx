import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

const classes = {
  bg: {
    default: '',
    light: 'bg-base-200',
  }
};

const TabContent = ({
  identifier,
  children,
  bg = "default",
}: {
  identifier: string;
  children: React.ReactNode;
  bg?: keyof typeof classes.bg
}) => {
  return (
    <Tabs.Content value={identifier}>
      <div className={`p-4 ${classes.bg[bg]}`}>{children}</div>
    </Tabs.Content>
  );
};

export default TabContent;

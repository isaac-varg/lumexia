import config from "@/tailwind.config";

const ColorSwatches: React.FC = () => {
  const colors = config.theme?.extend?.colors || {};

  const colorShades = Object.entries(colors).reduce(
    (shades: { [key: string]: string }, [colorName, colorValue]) => {
      if (typeof colorValue === "string") {
        shades[colorName] = colorValue;
      } else if (typeof colorValue === "object") {
        Object.entries(colorValue).forEach(([shadeName, shadeValue]) => {
          shades[`${colorName}-${shadeName}`] = shadeValue as string;
        });
      }
      return shades;
    },
    {} as { [key: string]: string },
  );

  return (
    <div>
      {Object.entries(colors).map(([colorName, colorValue]) => (
        <div key={colorName} style={{ display: "flex" }}>
          <div>
            <h3>{colorName}</h3>
            <div
              style={{
                backgroundColor: colorValue,
                width: "200px",
                height: "200px",
              }}
            ></div>
          </div>
          {Object.entries(colorShades).map(([shadeName, shadeValue]) => {
            if (shadeName.startsWith(colorName)) {
              return (
                <div key={shadeName}>
                  <h4>
                    {shadeName.replace(/-/g, "").replace(/[a-zA-Z]/g, "")}
                  </h4>
                  <div
                    style={{
                      backgroundColor: shadeValue,
                      width: "50px",
                      height: "50px",
                    }}
                  ></div>
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default ColorSwatches;

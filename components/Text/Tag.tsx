import React from 'react';

const classes = {
  base: 'rounded-xl px-2 py-1',
  hover: {
    base: 'hover:bg-opacity-60',
  },
  text: {
    base: 'uppercase text-sm font-medium',
    normal: 'uppercase text-md font-medium',
    large: 'uppercase text-lg font-medium',
    larger: 'uppercase text-xl font-medium',
  },
  colors: {
    default: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300',
    rose: 'bg-rose-300 text-neutral-900  hover:bg-rose-400',
    green: 'bg-green-200 text-neutral-900 hover:bg-green-300',
    accent: 'bg-accent text-accent-content',
    primary: 'bg-primary text-primary-content'
  },
};

// so you can have autocompletion in some external conditional code
export type TagColor = keyof typeof classes.colors;

// base props that are always present
type BaseTagProps = {
  label: string;
  tooltip?: string;
  text?: keyof typeof classes.text;
  hover?: keyof typeof classes.hover;
};

// props for the predefined color mode
type PredefinedColorProps = {
  color: keyof typeof classes.colors;
  bgColor?: never;
  textColor?: never;
};

// props for the custom color mode
type CustomColorProps = {
  color?: never;
  bgColor: string;
  textColor: string;
};

// the actual tagprops is a union of the two exclusive coloring modes so
// that there can only be one at a time and there is not wonkiness with overstepping

type TagProps = BaseTagProps & (PredefinedColorProps | CustomColorProps);

const Tag = (props: TagProps) => {
  const { label, tooltip = '', text = 'base', hover = 'base' } = props;

  // determine the styling method based on the props provided
  const style = 'bgColor' in props ? { backgroundColor: props.bgColor, color: props.textColor } : {};
  const colorClass = 'color' in props ? classes.colors[props.color!] : '';

  return (
    <div
      style={style}
      className={`tooltip ${classes.base} ${classes.hover[hover]} ${colorClass}`}
      data-tip={tooltip}
    >
      <p className={`font-poppins ${classes.text[text]}`}>
        {label}
      </p>
    </div>
  );
};

export default Tag;

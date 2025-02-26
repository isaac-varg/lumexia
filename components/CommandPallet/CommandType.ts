
export type CommandType = "page" | 'item'

export type Command = {
       id: string;
       commandType: CommandType; 
       shortcut?: string;
       icon?: JSX.Element;
       label: string;
       terms?: string[];
       path?: string;
       onSelect?: () => void;
    }



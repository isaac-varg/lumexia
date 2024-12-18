export interface NotionPage {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  parent: {
    type: 'database_id' | 'page_id' | 'workspace';
    database_id?: string;
    page_id?: string;
    workspace?: boolean;
  };
  archived: boolean;
  properties: {
    [key: string]: PageProperty;
  };
  url: string;
  icon?: {
    type: 'emoji' | 'external';
    emoji?: string;
    external?: { url: string };
  };
  cover?: {
    type: 'external';
    external: { url: string };
  };
}

export interface PageProperty {
  id: string;
  type: 'title' | 'rich_text' | 'number' | 'select' | 'multi_select' | 'date' | 'people' | 'files' | 'checkbox' | 'url' | 'email' | 'phone_number' | 'formula' | 'relation' | 'rollup' | 'created_time' | 'created_by' | 'last_edited_time' | 'last_edited_by';
  // Type-specific properties
  title?: { text: RichText[] };
  rich_text?: { text: RichText[] };
  number?: number;
  // ... other property types
}

export interface RichText {
  type: 'text';
  text: {
    content: string;
    link?: { url: string };
  };
  annotations?: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
}

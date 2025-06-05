interface RouteType {
    name: string;
    path: string;
    icon?: React.ComponentType;
    load?: React.LazyExoticComponent<React.FC>;
    title?: string;
  };

  export type { RouteType }
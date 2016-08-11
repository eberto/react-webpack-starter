declare module "react-flexbox-grid" {
  interface IColProps extends __React.Props<Col> {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    style?: __React.CSSProperties
  }
  interface IRowProps extends __React.Props<Row> {
      style?: __React.CSSProperties
  }
  interface IGridProps extends __React.Props<Grid> {
      style?: __React.CSSProperties
  }
  export class Col extends __React.Component<IColProps, {}> { }
  export class Row extends __React.Component<IRowProps, {}> { }
  export class Grid extends __React.Component<IGridProps, {}> { }
}
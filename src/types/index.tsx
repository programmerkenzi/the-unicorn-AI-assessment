export type RecordMode = "text-preview" | "on-click" | "auto";

export interface Option<T> {
  label: string;
  value: T;
}

export interface SVGIconProps extends React.SVGProps<SVGSVGElement> {}

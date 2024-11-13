export * from "@/types/types-widgets/index";
export * from "@/types/types-data/index";

export interface IPage {
    id: number;
    icon?: React.ReactNode;
    name: string;
    path: string;
    element?: React.ReactNode | JSX.Element;
    badgeAccessor?: string;
    hasSubItems: boolean;
    subItems?: Array<IPage> | undefined;
}

export interface IRoute {
    title?: string;
    id: number;
    layout: string;
    pages: Array<IPage>;
}

export enum ScheduleDailyColor {
    _restday = 'linear-gradient(0deg, rgba(34,195,193,0.2) 0%, rgba(38,199,133,0.2) 50%)',
    _workday = 'linear-gradient(0deg, rgba(195,147,34,0.2) 0%, rgba(253,187,45,0.2) 100%)',
    _restday_hex = '#26C785',
    _workday_hex = '#FDBB2D'
}


export interface AlertType {
    open: boolean,
    status: "success" | "error" | "warning" | "info" | "" | null ,
    message: string | null
}

export interface BeautifyObject extends JSON {
    [key: string]: any
}

export interface ObjectFlat extends Object {
    [key:string]: any
}

export interface ApprovalStateInterface {
    buttonDisabled: boolean,
    message1Show: boolean,
}
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Fragment } from "react";

export default function InputField(props:any) {
    const {field, ...restProps} = props
    return (
        <Fragment>
            <FormControl 
                className={restProps?.className || ""}
            >
                <InputLabel
                    htmlFor={restProps?.id || ""}
                    shrink={restProps.shrink}
                >
                    {restProps?.label}
                </InputLabel>
                <OutlinedInput
                    {...restProps}
                    {...field?? null}
                />
            </FormControl>
        </Fragment>
    )
}
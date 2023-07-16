import React from "react";
import s from "./FormsControls.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormControlType= {
    meta:WrappedFieldMetaProps
    children:React.ReactNode
}
const FormControl:React.FC<FormControlType> = ({meta:{touched,error},children}) => {

    const ConditionIsError = touched && error

    return (<div className={`${s.formControl} ${ConditionIsError ? s.error : ''}`}>
            <div>
                {children}
            </div>
            {ConditionIsError && <span>{error}</span>}
        </div>
    )
}
export const Textarea:React.FC<WrappedFieldProps>= (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
}
export const Input:React.FC<WrappedFieldProps>= (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
}

export function FieldForm<KeysTypes extends string>
(placeholder:string | undefined, name:KeysTypes, type:string, component:React.FC<WrappedFieldProps>,
                        validate:Array<FieldValidatorType>,text?:string) {
    return (
        <div>
            <Field placeholder={placeholder} name={name} type={type} component={component}
                   validate={validate}/> {text}
        </div>
    )
}

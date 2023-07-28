import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import s from "./User.module.css"
import {FilterType} from "../../Redux/Users-reducer";


type Props = {
    onFilterChanged: (filter: FilterType) => void
    values:SubmitFormType
}
type SubmitFormType = yup.InferType<typeof schema>

const schema = yup.object({
    searchName: yup.string().max(20).default(''),
    UsersShowProperty: yup.string().required().nullable()
})

export const UsersUseFormChanger: React.FC<Props> = React.memo(props => {
const {values,onFilterChanged}=props;

    const {register, handleSubmit,
        formState: {errors}
    } = useForm<SubmitFormType>({
            resolver: yupResolver(schema),
            defaultValues: {
                searchName: values.searchName,
                UsersShowProperty: values.UsersShowProperty
            },
        values
        },);
    const onSubmit = (SubmitFormData: SubmitFormType) => {
        const term = SubmitFormData.searchName;
        const friend = SubmitFormData.UsersShowProperty === "true" ? true :
            SubmitFormData.UsersShowProperty === "false" ? false : null
        onFilterChanged({term: term, friend: friend})
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("searchName")} placeholder={"Entry Name of search user"}/>
            <select {...register("UsersShowProperty")} >
                <option value="null">Show all users</option>
                <option value="true">Show followed users</option>
                <option value="false">Show unfollowed users</option>
            </select>
            <input type="submit" value="Accept Searching Property"/>
            <p className={s.error}>{errors.searchName?.message}</p>
            <p className={s.error}>{errors.UsersShowProperty?.message}</p>
        </form>
    )
})




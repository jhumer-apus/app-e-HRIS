import { ViolationType } from "@/types/types-pages"
import { useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Box, Button, Modal } from "@mui/material";
import { Typography } from "@material-tailwind/react";
import InputField from "@/public-components/forms/InputField";
import axiosInstance from "@/helpers/axiosConfig";
import { useDispatch } from "react-redux";
import { HandleAlertAction } from "@/store/actions/components";

interface Props {
    open: boolean,
    handleClose: () => void
    refreshTable: () => void
}
export default function CreateViolationType(props: Props) {

    const { open, handleClose, refreshTable } = props
    const dispatch = useDispatch()

    const initialValues: ViolationType = {
        name: '',
        description: ''
    };

    const validate = (values: ViolationType) => {
        const errors: { name?: string; description?: string } = {};
    
        if (!values.name) 
            errors.name = 'Name is required';

        if (!values.description) 
            errors.description = 'Description is required';
    
        return errors;
    };

    const handleSubmit = (values:any) => {
        createViolationType(values)
    }

    const createViolationType = async (values:any) => {
        await axiosInstance
            .post(`violation_type/`, values)
            .then(res => {
                refreshTable()
                handleClose()
                dispatch(HandleAlertAction({
                    open: true,
                    status: "success",
                    message: "Successfully created new violation type"
                }))
            })
            .catch(err => {
                console.error(err)
                handleClose()
                dispatch(HandleAlertAction({
                    open: true,
                    status: "error",
                    message: "Failed to create violation type"
                }))
            })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[400px] bg-white border-2 shadow-2xl p-4">
                <Typography variant="h5" className="text-center">Create New Violation Type</Typography>
                <br></br>
                <Formik
                    initialValues={initialValues}
                    validate={validate}        // Validation function
                    onSubmit={handleSubmit}        // Submit function
                >
                    {({ values }) => (
                        <Form className="flex flex-col gap-4">
                            <div>
                                <Field
                                    id="name"
                                    name="name"  // 'name' corresponds to the key in initialValues
                                    label="Name"
                                    className="w-full"
                                    component={InputField}  // Use the custom InputField component
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <Field
                                    id="description"
                                    name="description"  // 'name' corresponds to the key in initialValues
                                    label="Description"
                                    className="w-full"
                                    inputProps={{
                                        maxLength:100
                                    }}
                                    helperText={`${values.description.length}/100`}
                                    component={InputField}  // Use the custom InputField component
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500" />
                            </div>
                            <Button variant="contained" type="submit">CREATE</Button>
                        </Form>
                    )}
                    
                </Formik>
            </Box>
        </Modal>
    

    )
}
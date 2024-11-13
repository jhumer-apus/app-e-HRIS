import axiosInstance from "@/helpers/axiosConfig"
import { INTERNAL_USER_ROLE } from "@/types/types-store";
import React, { useState } from 'react'; // This ensures JSX elements are recognized

interface Option {
    value: string;
    label: React.ReactNode; // Use React.ReactNode for JSX elements
}

interface BranchOption extends Option { 
    start: string
}

interface BranchAPIOptions {
    data: BranchOption[],
    loading: boolean
}

type APIOptions  = {
    data: Option[],
    loading: boolean
}

type AutoCompleteAPIOptions = APIOptions & {
    data: AutoCompleteType[] | Option[]
}

type AutoCompleteType = {
    id: string | number
    name: string
}


export const useOptionData = () => {

    const [positions, setPositions] = useState<APIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    const [branches, setBranches] = useState<BranchAPIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    const [departments, setDepartments] = useState<APIOptions>(
        {
            data: [],
            loading: false,
        }
    )


    const [ranks, setRanks] = useState<APIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    const [employmentStatus, setEmploymentStatus] = useState<AutoCompleteAPIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    const [approvers, setApprovers] = useState<any>(
        {
            data: [],
            loading: false,
        }
    )

    const [payrollGroup, setPayrollGroup] = useState<AutoCompleteAPIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    const bloodTypes: Option[] = [
        {
            value: "A+",
            label: "A+"
        },
        {
            value: "A-",
            label: "A-"
        },
        {
            value: "B+",
            label: "B+"
        },
        {
            value: "B-",
            label: "B-"
        },
        {
            value: "AB+",
            label: "AB+"
        },
        {
            value: "AB-",
            label: "AB-"
        },
        {
            value: "O+",
            label: "O+"
        },
        {
            value: "O-",
            label: "O-"
        },
        {
            value: "",
            label: "None"
        },
    ]

    const sex: Option[] = [
        {
            value: "M",
            label: "Male"
        },
        {
            value: "F",
            label: "Female"
        },
    ]

    const civilStatus: Option[] = [
        {
            value: "S",
            label: "Single"
        },
        {
            value: "M",
            label: "Married"
        },
        {
            value: "W",
            label: "Widowed"
        },
        {
            value: "A",
            label: "Annulled"
        },
    ]

    const separationType: Option[] = [
        {
            value: "",
            label: "N/A"
        },
        {
            value: "resigned",
            label: "Resigned"
        },
        {
            value: "retired",
            label: "Retired"
        },
        {
            value: "terminated",
            label: "Terminated"
        }
    ]

    const employeeType = [
        {
            value: "Compressed",
            label: "Compressed"
        },
        {
            value: "Normal",
            label: "Normal"
        },
        {
            value: "Field",
            label: "Field"
        },
        {
            value: "Field-Auto",
            label: "Field-Auto"
        },
    ]

    const roles: Option[] = [
        {
            value: INTERNAL_USER_ROLE.HR_Super_Admin.toString(),
            label: "HR Super Admin"
        },
        {
            value: INTERNAL_USER_ROLE.HR_Director_Manager.toString(),
            label: "HR Director / Manager"
        },
        {
            value: INTERNAL_USER_ROLE.HR_Staff.toString(),
            label: "HR Staff"
        },
        {
            value: INTERNAL_USER_ROLE.Manager.toString(),
            label: "Department Manager / Director"
        },
        {
            value: INTERNAL_USER_ROLE.Employee.toString(),
            label: "Employee"
        },
    ]

    // AXIOS API OPTIONS
    const fetchPositions = async () => {

        setPositions(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('/position')
            .then(res => {
                const mappedPositions = Array.isArray(res.data) ? res.data.map(pos => (
                    {
                        value: pos.id,
                        label: pos.pos_name
                    }
                )) : []

                setPositions(curr => (
                    {
                        data: mappedPositions,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setPositions(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchBranches = async () => {

        setBranches(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('branch/')
            .then(res => {
                const mappedBranches = Array.isArray(res.data) ? res.data.map(branch => (
                    {
                        value: branch.id,
                        label: branch.name,
                        start: branch.start
                    }
                )) : []

                setBranches(curr => (
                    {
                        data: mappedBranches,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setBranches(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchDepartments = async () => {

        setDepartments(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('department/')
            .then(res => {
                const mappedDepartments = Array.isArray(res.data) ? res.data.map(dept => (
                    {
                        value: dept.id,
                        label: dept.name
                    }
                )) : []

                setDepartments(curr => (
                    {
                        data: mappedDepartments,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setDepartments(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchRanks = async () => {

        setRanks(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('rank/')
            .then(res => {
                const mappedRanks = Array.isArray(res.data) ? res.data.map(rank => (
                    {
                        value: rank.id,
                        label: rank.rank_name
                    }
                )) : []

                setRanks(curr => (
                    {
                        data: mappedRanks,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setRanks(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchEmploymentStatus = async () => {

        setEmploymentStatus(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('emp_status_type/')
            .then(res => {
                const mappedStatus = Array.isArray(res.data) ? res.data.map(status => (
                    {
                        value: status.id,
                        label: status.name
                    }
                )) : []

                setEmploymentStatus((curr:any) => (
                    {
                        data: mappedStatus ,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setEmploymentStatus(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchApprovers = async () => {

        setApprovers((curr:any) => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('approvers/')
            .then(res => {
                const mappedApprovers = Array.isArray(res.data) ? res.data.map(approver=> (
                    {
                        id: approver.emp_no,
                        // emp_no: approver.emp_no,
                        name: approver.full_name
                    }
                )) : []

                setApprovers((curr:any) => (
                    {
                        data: mappedApprovers,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setApprovers((curr:any) => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchPayrollGroup = async () => {

        setPayrollGroup(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('payrollgroup/')
            .then(res => {
                const mappedPayrollGroup = Array.isArray(res.data) ? res.data.map(payroll => (
                    {
                        id: payroll.id,
                        name: payroll.name
                    }
                )) : []

                setPayrollGroup(curr => (
                    {
                        data: mappedPayrollGroup,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setPayrollGroup(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }


    return {
        sex,
        civilStatus,
        bloodTypes,
        separationType,
        roles,
        fetchPositions,
        fetchBranches,
        fetchDepartments,
        fetchRanks,
        fetchEmploymentStatus,
        fetchApprovers,
        fetchPayrollGroup,
        positions,
        branches,
        departments,
        ranks,
        employmentStatus,
        employeeType,
        approvers,
        payrollGroup
    }
}
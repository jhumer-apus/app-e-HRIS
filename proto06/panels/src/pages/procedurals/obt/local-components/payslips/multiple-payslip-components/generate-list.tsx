import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridValueGetterParams, GridValueFormatterParams, GridRowSelectionModel } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { Button, Typography } from '@mui/material';

const GenerateListColumns: GridColDef[] = [
    {
        field: 'credit_date',
        headerName: 'Credit Date',
        width: 150,
        valueGetter: (params: GridValueGetterParams) => {
          const date = new Date(params.row.cutoff.credit_date);
          return date.toLocaleDateString();
        },
      },
      { field: 'emp_cname', headerName: 'Employee Name', width: 160 },
      {
        field: 'net_pay',
        headerName: 'Net Pay',
        width: 150,
        valueFormatter: (params: GridValueFormatterParams) => {
          const netpay = params.value as number;
          return netpay.toLocaleString(undefined, {
            style: 'currency',
            currency: 'PHP',
          })
        },
      },
];

interface GenerateListInterface {
    multiplePayslipsData?: ViewPayrollPayPerEmployee[];
    setMultiplePayslipsData: (key: ViewPayrollPayPerEmployee[]) => void; 
}


function GenerateList(props: GenerateListInterface) {
    const { data: currentPayrollListData, status: currentPayrollListStatus } = useSelector((state: RootState)=> state.payroll.viewPayroll);
    const { setMultiplePayslipsData } = props;
    const handleSelection = (newSelection: GridRowSelectionModel) => {
        let multiple_payslips_data_locale = [] as Array<ViewPayrollPayPerEmployee>;
        newSelection.forEach((id) => {
          const row = currentPayrollListData?.find((row) => row.id === id);
          if (row) {
            multiple_payslips_data_locale.push(row);
          }
        });
        console.log(multiple_payslips_data_locale, "final mama?")
        setMultiplePayslipsData(multiple_payslips_data_locale);
      };
    return (
        <div className='flex flex-col m-12' style={{minHeight: '620px'}}>
            <Typography sx={{marginBottom: '25px'}}>
                Tick the checkboxes you want to generate multiple payslips preview;
            </Typography>
            <div style={{height: '600px'}}>
            <DataGrid
                rows={currentPayrollListData}
                columns={GenerateListColumns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 100 },
                    },
                }}
                pageSizeOptions={[25, 50, 75, 100]}
                // onRowClick={(e) => {
                //     setMultiplePayslipsData(e.row);
                //     // console.log(e, "this is pancit")
                //     // setSinglePayslipOpen(true);
                //     // spButtonIndex === 2 ? gridRowClick(e) : null
                // }}
                onRowSelectionModelChange={handleSelection}
                checkboxSelection
                // disableRowSelectionOnClick={false}
                // disableSelectionOnClick 
                // style={{ cursor: spButtonIndex === 2 ? 'pointer': 'default'}}
                localeText={{ noRowsLabel: `${currentPayrollListStatus === 'loading' ? `${currentPayrollListStatus?.toUpperCase()}...` : currentPayrollListStatus === 'failed' ?  'No employee lists found. Contact your administrator/support.' : (currentPayrollListStatus === null || currentPayrollListStatus === undefined) ? 'Server Error. Contact your admin/developers.': 'SUCCEEDED...'}` }}
            />
            </div>
        </div>
    );
}

export default GenerateList;
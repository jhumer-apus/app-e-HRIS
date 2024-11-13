import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import PrintTableButton from './local-components/additional-features/print-table-button';
import ExportToCsvButton from './local-components/additional-features/export-to-csv-button';
import { ApprovalUAPageDescriptions, ApprovalUAPageColumns } from '@/data/pages-data/your-approvals-data/ua-data';
import CreateUAComponent from './local-components/create-ua-component';
import ViewUASingleModal from './local-components/main-modals/view-ua-single-modal';
import { UAViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

// import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';
import { UAViewAction, UAViewFilterApproverAction, UAViewFilterEmployeeAction } from '@/store/actions/procedurals';
import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';
import { globalServerErrorMsg } from '@/store/configureStore';
import { HandleModalAction } from '@/store/actions/components';



export default function ApprovalUAPage() {
  const [printing, setIsPrinting] = useState(false);
  const [singleUAOpenModal, setSingleUAOpenModal] = useState<boolean>(false);
  const [singleUADetailsData, setSingleUADetailsData] = useState<UAViewInterface>({
      ua_description: '',
      ua_date_from: '',
      ua_date_to: '',
      emp_no: NaN,
      id: NaN,
      ua_reason_disapproval: null,
      ua_date_approved1: null,
      ua_date_approved2: null,
      ua_date_filed: '',
      ua_approval_status: '',
      ua_total_hours: NaN,
      ua_approver1_empno: null,
      ua_approver2_empno: null,
      cutoff_code: NaN,
      applicant_rank: NaN,
  });
  const dispatch = useDispatch();
  const { UAViewFilterApprover, UAViewFilterEmployeeAndUA } = useSelector((state: RootState) => state.procedurals);
  const user = useSelector((state: RootState) => state.auth.employee_detail);
  const { data, status, error } = UAViewFilterApprover;
  const UAViewData = data as UAViewInterface[];

  useEffect(()=> {
    dispatch(UAViewFilterApproverAction({emp_no: user?.emp_no}))
  }, []);

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(UAViewData?.length && UAViewData?.length >= 11){
      return UAViewData?.length / 25 * 1400
    } else {
      return 600
    }
  };
  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewUASingleModal setSingleUADetailsData={setSingleUADetailsData} singleUADetailsData={singleUADetailsData} singleUAOpenModal={singleUAOpenModal} setSingleUAOpenModal={setSingleUAOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ApprovalUAPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={UAViewData? UAViewData as UAViewInterface[]:[]}
          columns={ApprovalUAPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleUADetailsData(e.row);
            setSingleUAOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}

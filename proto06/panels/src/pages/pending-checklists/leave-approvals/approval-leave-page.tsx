import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import PrintTableButton from './local-components/additional-features/print-table-button';
import ExportToCsvButton from './local-components/additional-features/export-to-csv-button';
import { ApprovalLEAVEPageDescriptions, ApprovalLEAVEPageColumns } from '@/data/pages-data/your-approvals-data/leaves-data';
import CreateLEAVEComponent from './local-components/create-leaves-component';
import ViewLEAVESingleModal from './local-components/main-modals/view-leaves-single-modal';
import { LEAVEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

// import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';
import { LEAVEViewAction, LEAVEViewFilterApproverAction } from '@/store/actions/procedurals';
import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';
import { globalServerErrorMsg } from '@/store/configureStore';
import { HandleModalAction } from '@/store/actions/components';

export default function ApprovalLEAVEPage() {
  const [printing, setIsPrinting] = useState(false);
  const [singleLEAVEOpenModal, setSingleLEAVEOpenModal] = useState<boolean>(false);
  const [singleLEAVEDetailsData, setSingleLEAVEDetailsData] = useState<LEAVEViewInterface>({
      leave_type: 1,
      leave_remarks: '',
      leave_date_from: '',
      leave_date_to: '',
      emp_no: NaN,
      id: NaN,
      leave_reason_disapproval: null,
      leave_date_approved1: null,
      leave_date_approved2: null,
      leave_date_filed: '',
      leave_approval_status: '',
      leave_total_hours: NaN,
      leave_approver1_empno: null,
      leave_approver2_empno: null,
      leave_number_days: 0,
      cutoff_code: NaN,
      applicant_rank: NaN,
  });
  const dispatch = useDispatch();
  const { LEAVEViewFilterApprover } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = LEAVEViewFilterApprover;
  const LEAVEViewData = data as LEAVEViewInterface[];
  const user = useSelector((state:RootState) => state.auth.employee_detail)

  useEffect(()=> {
    dispatch(LEAVEViewFilterApproverAction({emp_no: user?.emp_no}))
  }, []);


  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(LEAVEViewData?.length && LEAVEViewData?.length >= 11){
      return LEAVEViewData?.length / 25 * 1400
    } else {
      return 600
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewLEAVESingleModal setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} singleLEAVEDetailsData={singleLEAVEDetailsData} singleLEAVEOpenModal={singleLEAVEOpenModal} setSingleLEAVEOpenModal={setSingleLEAVEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ApprovalLEAVEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={LEAVEViewData? LEAVEViewData as LEAVEViewInterface[]:[]}
          columns={ApprovalLEAVEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleLEAVEDetailsData(e.row);
            setSingleLEAVEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
        {/* <GeneratePDFButton data={LEAVEViewData} columns={ApprovalLEAVEPageColumns} /> */}
      </div>
    </Fragment>
  );
}

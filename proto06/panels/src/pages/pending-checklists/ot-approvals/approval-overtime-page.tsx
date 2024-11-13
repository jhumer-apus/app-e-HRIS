import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import { ApprovalOVERTIMEPageDescriptions, ApprovalOVERTIMEPageColumns } from '@/data/pages-data/your-approvals-data/overtime-data';
import ViewOVERTIMESingleModal from './local-components/main-modals/view-overtime-single-modal';
import { OVERTIMEViewInterface } from '@/types/types-pages';
import { OVERTIMEViewAction, OVERTIMEViewFilterApproverAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';
import { HandleModalAction } from '@/store/actions/components';

export default function ApprovalOvertimePage() {
  const [singleOVERTIMEOpenModal, setSingleOVERTIMEOpenModal] = useState<boolean>(false);
  const [singleOVERTIMEDetailsData, setSingleOVERTIMEDetailsData] = useState<OVERTIMEViewInterface>({
      id: NaN,
      ot_reason_disapproval: null,
      ot_date_approved1: null,
      ot_date_approved2: null,
      ot_date_filed: '',
      ot_type: '',
      ot_remarks: '',
      ot_date_from: '',
      ot_date_to: '',
      ot_approval_status: '',
      ot_total_hours: NaN,
      ot_approver1_empno: null,
      ot_approver2_empno: null,
      emp_no: NaN,
      cutoff_code: NaN,
      applicant_rank: NaN,
  });
  const dispatch = useDispatch();
  const { OVERTIMEViewFilterApprover } = useSelector((state: RootState) => state.procedurals);
  const user = useSelector((state: RootState) => state.auth.employee_detail);
  const { data, status, error } = OVERTIMEViewFilterApprover;
  const OVERTIMEViewData = data as OVERTIMEViewInterface[];

  useEffect(()=> {
    dispatch(OVERTIMEViewFilterApproverAction({emp_no: user?.emp_no}))
  }, []);

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewOVERTIMESingleModal setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} singleOVERTIMEDetailsData={singleOVERTIMEDetailsData} singleOVERTIMEOpenModal={singleOVERTIMEOpenModal} setSingleOVERTIMEOpenModal={setSingleOVERTIMEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ApprovalOVERTIMEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '660px', width: '100%' }}>
        <DataGrid
          rows={OVERTIMEViewData? OVERTIMEViewData as OVERTIMEViewInterface[]:[]}
          columns={ApprovalOVERTIMEPageColumns}
        initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleOVERTIMEDetailsData(e.row);
            setSingleOVERTIMEOpenModal(true);

            // uncomment if dev want redux store approach on hiding modals
            // dispatch(HandleModalAction({
            //   name: "viewOtModal",
            //   value:true
            // }))
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}

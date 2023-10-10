import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { EAONBOARDINGREQUIREMENTSPageDescriptions, EAONBOARDINGREQUIREMENTSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-onboarding-requirements-data';
import ViewONBOARDINGREQUIREMENTSSingleModal from './local-components/main-modals/aa-asset-list-single-modal';
import { ONBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';
import { ONBOARDINGREQUIREMENTSViewAction } from '@/store/actions/employee-and-applicants';

export default function EAONBOARDINGREQUIREMENTSPageHistory() {
  const [singleONBOARDINGREQUIREMENTSOpenModal, setSingleONBOARDINGREQUIREMENTSOpenModal] = useState<boolean>(false);
  const [singleONBOARDINGREQUIREMENTSDetailsData, setSingleONBOARDINGREQUIREMENTSDetailsData] = useState<ONBOARDINGREQUIREMENTSViewInterface>({
    id: NaN,
    date_deleted: '',
    facilitator: NaN,
    onboarding_title: '',
    commencement_date: '',
    emp_remarks: '',
    facilitator_remarks: '',
    status: 'Pending',
    date_added: ''
  });
  const dispatch = useDispatch();
  const { ONBOARDINGREQUIREMENTSView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status } = ONBOARDINGREQUIREMENTSView;
  const ONBOARDINGREQUIREMENTSViewData = data as ONBOARDINGREQUIREMENTSViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((ONBOARDINGREQUIREMENTSViewData?.length <= 0 || ONBOARDINGREQUIREMENTSViewData === null || ONBOARDINGREQUIREMENTSViewData === undefined ) && curr_user){
      dispatch(ONBOARDINGREQUIREMENTSViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          {/* <ViewONBOARDINGREQUIREMENTSSingleModal setSingleONBOARDINGREQUIREMENTSDetailsData={setSingleONBOARDINGREQUIREMENTSDetailsData} singleONBOARDINGREQUIREMENTSDetailsData={singleONBOARDINGREQUIREMENTSDetailsData} singleONBOARDINGREQUIREMENTSOpenModal={singleONBOARDINGREQUIREMENTSOpenModal} setSingleONBOARDINGREQUIREMENTSOpenModal={setSingleONBOARDINGREQUIREMENTSOpenModal}/> */}
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EAONBOARDINGREQUIREMENTSPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={ONBOARDINGREQUIREMENTSViewData? ONBOARDINGREQUIREMENTSViewData as ONBOARDINGREQUIREMENTSViewInterface[]:[]}
          columns={EAONBOARDINGREQUIREMENTSPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleONBOARDINGREQUIREMENTSDetailsData(e.row);
            setSingleONBOARDINGREQUIREMENTSOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No Asset Lists found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for Asset List Epic hasn\'t been set up, please contact your frontend developer': 'There is no ONBOARDINGREQUIREMENTS to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
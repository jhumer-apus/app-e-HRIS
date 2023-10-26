import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { EAOFFBOARDINGREQUIREMENTSPageDescriptions, EAOFFBOARDINGREQUIREMENTSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-offboarding-requirements-data';
import ViewOFFBOARDINGREQUIREMENTSSingleModal from './local-components/main-modals/aa-asset-list-single-modal';
import { OFFBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';
import { OFFBOARDINGREQUIREMENTSViewAction } from '@/store/actions/employee-and-applicants';

export default function EAOFFBOARDINGREQUIREMENTSPageHistory() {
  const [singleOFFBOARDINGREQUIREMENTSOpenModal, setSingleOFFBOARDINGREQUIREMENTSOpenModal] = useState<boolean>(false);
  const [singleOFFBOARDINGREQUIREMENTSDetailsData, setSingleOFFBOARDINGREQUIREMENTSDetailsData] = useState<OFFBOARDINGREQUIREMENTSViewInterface>({
    id: NaN,
    date_deleted: '',
    facilitator: NaN,
    offboarding_title: '',
    accomplished_date: '',
    emp_remarks: '',
    facilitator_remarks: '',
    status: 'Pending',
    date_added: ''
  });
  const dispatch = useDispatch();
  const { OFFBOARDINGREQUIREMENTSView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status } = OFFBOARDINGREQUIREMENTSView;
  const OFFBOARDINGREQUIREMENTSViewData = data as OFFBOARDINGREQUIREMENTSViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((OFFBOARDINGREQUIREMENTSViewData?.length <= 0 || OFFBOARDINGREQUIREMENTSViewData === null || OFFBOARDINGREQUIREMENTSViewData === undefined ) && curr_user){
      dispatch(OFFBOARDINGREQUIREMENTSViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          {/* <ViewOFFBOARDINGREQUIREMENTSSingleModal setSingleOFFBOARDINGREQUIREMENTSDetailsData={setSingleOFFBOARDINGREQUIREMENTSDetailsData} singleOFFBOARDINGREQUIREMENTSDetailsData={singleOFFBOARDINGREQUIREMENTSDetailsData} singleOFFBOARDINGREQUIREMENTSOpenModal={singleOFFBOARDINGREQUIREMENTSOpenModal} setSingleOFFBOARDINGREQUIREMENTSOpenModal={setSingleOFFBOARDINGREQUIREMENTSOpenModal}/> */}
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EAOFFBOARDINGREQUIREMENTSPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={OFFBOARDINGREQUIREMENTSViewData? OFFBOARDINGREQUIREMENTSViewData as OFFBOARDINGREQUIREMENTSViewInterface[]:[]}
          columns={EAOFFBOARDINGREQUIREMENTSPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleOFFBOARDINGREQUIREMENTSDetailsData(e.row);
            setSingleOFFBOARDINGREQUIREMENTSOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No Asset Lists found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for Asset List Epic hasn\'t been set up, please contact your frontend developer': 'There is no OFFBOARDINGREQUIREMENTS to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { EAJOBPOSTINGSPageDescriptions, EAJOBPOSTINGSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-job-postings-data';
import ViewJOBPOSTINGSSingleModal from './local-components/main-modals/ea-job-postings-single-modal';
import { JOBPOSTINGSViewInterface } from '@/types/types-employee-and-applicants';
import { JOBPOSTINGSViewAction } from '@/store/actions/employee-and-applicants';

export default function EAJOBPOSTINGSPageHistory() {
  const [singleJOBPOSTINGSOpenModal, setSingleJOBPOSTINGSOpenModal] = useState<boolean>(false);
  const [singleJOBPOSTINGSDetailsData, setSingleJOBPOSTINGSDetailsData] = useState<JOBPOSTINGSViewInterface>({
    id: NaN,
    date_added: '',
    date_deleted: '',
    position_title: '',
    job_description: '',
    job_salary_range: '',
    qualifications: '',
    responsibilities: '',
    objectives: '',
    position_code: NaN,
  });
  const dispatch = useDispatch();
  const { JOBPOSTINGSView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status } = JOBPOSTINGSView;
  const JOBPOSTINGSViewData = data as JOBPOSTINGSViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((JOBPOSTINGSViewData?.length <= 0 || JOBPOSTINGSViewData === null || JOBPOSTINGSViewData === undefined ) && curr_user){
      dispatch(JOBPOSTINGSViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewJOBPOSTINGSSingleModal setSingleJOBPOSTINGSDetailsData={setSingleJOBPOSTINGSDetailsData} singleJOBPOSTINGSDetailsData={singleJOBPOSTINGSDetailsData} singleJOBPOSTINGSOpenModal={singleJOBPOSTINGSOpenModal} setSingleJOBPOSTINGSOpenModal={setSingleJOBPOSTINGSOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EAJOBPOSTINGSPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={JOBPOSTINGSViewData? JOBPOSTINGSViewData as JOBPOSTINGSViewInterface[]:[]}
          columns={EAJOBPOSTINGSPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleJOBPOSTINGSDetailsData(e.row);
            setSingleJOBPOSTINGSOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No Asset Lists found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for Asset List Epic hasn\'t been set up, please contact your frontend developer': 'There is no JOBPOSTINGS to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
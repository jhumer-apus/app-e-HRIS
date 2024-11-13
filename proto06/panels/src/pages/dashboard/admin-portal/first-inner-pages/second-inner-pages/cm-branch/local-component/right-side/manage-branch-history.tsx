import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ManageBRANCHPageDescriptions, ManageBRANCHPageColumns } from '@/data/pages-data/manage-categories-data/manage-branch-data';
import ViewBRANCHSingleModal from './local-components/main-modals/view-branch-single-modal';
import { BRANCHViewInterface } from '@/types/types-pages';
import { BRANCHViewAction } from '@/store/actions/categories';
import { globalServerErrorMsg } from '@/store/configureStore';

export default function ManageBRANCHPageHistory() {
  const [singleBRANCHOpenModal, setSingleBRANCHOpenModal] = useState<boolean>(false);
  const [singleBRANCHDetailsData, setSingleBRANCHDetailsData] = useState<BRANCHViewInterface>({
    id: NaN,
    date_added: '',
    date_deleted: null,
    branch_name: '',
    branch_address: '',
    branch_email: '',
    branch_contact_number: '',
    branch_oic: NaN,
  });
  
  const dispatch = useDispatch();
  const { BRANCHView } = useSelector((state: RootState) => state.categories);
  const { data, status, error } = BRANCHView;
  const BRANCHViewData = data as BRANCHViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((BRANCHViewData?.length <= 0 || BRANCHViewData === null || BRANCHViewData === undefined ) && curr_user){
      dispatch(BRANCHViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewBRANCHSingleModal setSingleBRANCHDetailsData={setSingleBRANCHDetailsData} singleBRANCHDetailsData={singleBRANCHDetailsData} singleBRANCHOpenModal={singleBRANCHOpenModal} setSingleBRANCHOpenModal={setSingleBRANCHOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ManageBRANCHPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          className='overflow-auto'
          rows={BRANCHViewData? BRANCHViewData as BRANCHViewInterface[]:[]}
          columns={ManageBRANCHPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleBRANCHDetailsData(e.row);
            setSingleBRANCHOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}

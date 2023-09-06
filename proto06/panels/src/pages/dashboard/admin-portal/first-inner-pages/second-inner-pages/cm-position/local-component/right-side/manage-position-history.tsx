import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ManagePOSITIONPageDescriptions, ManagePOSITIONPageColumns } from '@/data/pages-data/manage-categories-data/manage-position-data';
import ViewPOSITIONSingleModal from './local-components/main-modals/view-position-single-modal';
import { POSITIONViewInterface } from '@/types/types-pages';
import { POSITIONViewAction } from '@/store/actions/categories';

export default function ManagePOSITIONPageHistory() {
  const [singlePOSITIONOpenModal, setSinglePOSITIONOpenModal] = useState<boolean>(false);
  const [singlePOSITIONDetailsData, setSinglePOSITIONDetailsData] = useState<POSITIONViewInterface>({
    id: NaN,
    date_added: '',
    date_deleted: null,
    pos_name: '',
    pos_description: '',
  });
  const dispatch = useDispatch();
  const { POSITIONView } = useSelector((state: RootState) => state.categories);
  const { data, status } = POSITIONView;
  const POSITIONViewData = data as POSITIONViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((POSITIONViewData?.length <= 0 || POSITIONViewData === null || POSITIONViewData === undefined ) && curr_user){
      dispatch(POSITIONViewAction())
    }
  }, [curr_user]);
  // console.log(singlePOSITIONDetailsData, "123???")
  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewPOSITIONSingleModal setSinglePOSITIONDetailsData={setSinglePOSITIONDetailsData} singlePOSITIONDetailsData={singlePOSITIONDetailsData} singlePOSITIONOpenModal={singlePOSITIONOpenModal} setSinglePOSITIONOpenModal={setSinglePOSITIONOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ManagePOSITIONPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={POSITIONViewData? POSITIONViewData as POSITIONViewInterface[]:[]}
          columns={ManagePOSITIONPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            // console.log(e.row, "123?")
            setSinglePOSITIONDetailsData(e.row);
            setSinglePOSITIONOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No cutoff lists found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for POSITION Epic hasn\'t been set up, please contact your frontend developer': 'There is no POSITION to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
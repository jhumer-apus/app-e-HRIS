import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import { ProceduralLEAVECREDITPageDescriptions, ProceduralLEAVECREDITPageColumns } from '@/data/pages-data/procedural-data/leave-credit-data';
import ViewLEAVECREDITSingleModal from './local-components/main-modals/view-leave-credit-single-modal';
import { LEAVECREDITViewInterface } from '@/types/types-pages';
import { LEAVECREDITViewAction } from '@/store/actions/procedurals';

export default function ProceduralLEAVECREDITPageHistory() {
  const [singleLEAVECREDITOpenModal, setSingleLEAVECREDITOpenModal] = useState<boolean>(false);
  const [singleLEAVECREDITDetailsData, setSingleLEAVECREDITDetailsData] = useState<LEAVECREDITViewInterface>({
    id: null,
    leave_name: null,
    allowed_days: null,
    credit_used: null,
    credit_remaining: null,
    expiry: null,
    is_converted: null,
    date_added: null,
    date_deleted: null,
    emp_no: null,
    leave_type_code: null,
  });
  const dispatch = useDispatch();
  const { spButtonIndex, dtrStatus } = useDtrState();
  const { LEAVECREDITView } = useSelector((state: RootState) => state.procedurals);
  const { data } = LEAVECREDITView;
  const LEAVECREDITViewData = data as LEAVECREDITViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((LEAVECREDITViewData?.length <= 0 || LEAVECREDITViewData === null || LEAVECREDITViewData === undefined ) && curr_user){
      dispatch(LEAVECREDITViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewLEAVECREDITSingleModal setSingleLEAVECREDITDetailsData={setSingleLEAVECREDITDetailsData} singleLEAVECREDITDetailsData={singleLEAVECREDITDetailsData} singleLEAVECREDITOpenModal={singleLEAVECREDITOpenModal} setSingleLEAVECREDITOpenModal={setSingleLEAVECREDITOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ProceduralLEAVECREDITPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={LEAVECREDITViewData? LEAVECREDITViewData as LEAVECREDITViewInterface[]:[]}
          columns={ProceduralLEAVECREDITPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleLEAVECREDITDetailsData(e.row);
            setSingleLEAVECREDITOpenModal(true);
          }}
          disableRowSelectionOnClick 
          style={{ cursor: spButtonIndex === 2 ? 'pointer': 'default'}}
          localeText={{ noRowsLabel: `${dtrStatus === 'loading' ? `${dtrStatus?.toUpperCase()}...` : dtrStatus === 'failed' ?  'No cutoff lists found. Contact your administrator/support.' : (dtrStatus === null || dtrStatus === undefined) ? 'The caller for LEAVECREDIT Epic hasn\'t been set up, please contact your frontend developer': 'There is no LEAVECREDIT to generate. Double check with a Database Admin'}` }}
        />
      </div>
    </Fragment>
  );
}

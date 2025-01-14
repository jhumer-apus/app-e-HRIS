import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ProceduralOBTPageDescriptions, ProceduralOBTPageColumns } from '@/data/pages-data/procedural-data/obt-data';
import ViewOBTSingleModal from './local-components/main-modals/view-obt-single-modal';
import { OBTViewFilterEmployeeInitialState, OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { OBTViewAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';
import useFetchFileApplicationByApprover from '@/custom-hooks/use-fetch-file-application-by-approver';
import { HandleModalAction } from '@/store/actions/components';


export default function ProceduralOBTPage() {
  const [printing, setIsPrinting] = useState(false);
  const [singleOBTOpenModal, setSingleOBTOpenModal] = useState<boolean>(false);
  const [singleOBTDetailsData, setSingleOBTDetailsData] = useState<OBTViewInterface>(OBTViewFilterEmployeeInitialState);
  const dispatch = useDispatch();
  const { OBTView } = useSelector((state: RootState) => state.procedurals);
  const currUser = useSelector((state: RootState) => state.auth.employee_detail);
  const { data, status, error } = currUser?.user?.role == 2? useFetchFileApplicationByApprover(`obt`): OBTView;
  // const { data, status, error } = OBTView;
  const OBTViewData = data as OBTViewInterface[];

  useEffect(()=> {
    dispatch(OBTViewAction())
  }, []);

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(OBTViewData?.length && OBTViewData?.length >= 11){
      return OBTViewData?.length / 25 * 1400
    } else {
      return 600
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewOBTSingleModal setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData} singleOBTOpenModal={singleOBTOpenModal} setSingleOBTOpenModal={setSingleOBTOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ProceduralOBTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={OBTViewData? OBTViewData as OBTViewInterface[]:[]}
          columns={ProceduralOBTPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleOBTDetailsData(e.row);

            dispatch(HandleModalAction({
              name: "viewObtModal",
              value: true
            }))
            // setSingleOBTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}

import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { QuickAccessOBTPageColumns } from '@/data/pages-data/quick-accesses-data/obt-data';
import { OBTViewFilterEmployeeInitialState, OBTViewInterface } from '@/types/types-pages';

import { OBTViewFilterEmployeeAction } from '@/store/actions/procedurals';

export default function PerfectAttendanceTable() {
  const [singleOBTOpenModal, setSingleOBTOpenModal] = useState<boolean>(false);
  const [singleOBTDetailsData, setSingleOBTDetailsData] = useState<OBTViewInterface>(OBTViewFilterEmployeeInitialState);
  const dispatch = useDispatch();
  const { OBTViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = OBTViewFilterEmployee;
  const OBTViewData = data as OBTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((OBTViewData?.length <= 0 || OBTViewData === null || OBTViewData === undefined ) && curr_user){
      dispatch(OBTViewFilterEmployeeAction({emp_no: curr_user}))
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div style={{ height: '600px', width: '100%' , padding: "10px"}}>
        <DataGrid
          rows={OBTViewData? OBTViewData as OBTViewInterface[]:[]}
          columns={QuickAccessOBTPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          onRowClick={(e) => {
            setSingleOBTDetailsData(e.row);
            setSingleOBTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${error}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}

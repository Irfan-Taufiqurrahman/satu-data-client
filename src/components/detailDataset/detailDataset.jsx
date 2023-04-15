import { useQuery } from "react-query"
import { getAllDetailData } from "../../api/Dataset"
import { useRef, useState } from "react"
import Loading from "../Loading"

const DetailDetasetTable = () => {
    const DetailDataset = useQuery("detailDatasetSkema", getAllDetailData, {
        // refetchInterval:2000;
    })
    const tableRef = useRef(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
      }, []);
      return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1>Detail Data</h1>
            {DetailDataset.isLoading ? (
                <Loading />
            ): (
                <div className="table-auto" ref={tableRef}>
                    <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3">id</th>
                        <th scope="col" className="px-6 py-3">name</th>
                        <th scope="col" className="px-6 py-3">source</th>
                        <th scope="col" className="px-6 py-3">description</th>
                        <th scope="col" className="px-6 py-3">action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {DetailDataset.data?.map((detail)=>
                            <tr className="bg-white border-b" key={detail.}>
                                
                            </tr>
                        )}
                    </tbody>
                </div>
            )}
        </div>
      )
}
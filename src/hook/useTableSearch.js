import { useState, useEffect } from "react";

export const useTableSearch = ({ searchVal, retrieve }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setOrigData(retrieve);
      setFilteredData(retrieve);
      if (retrieve) setLoading(false);
    };
    fetchData();
  }, [retrieve]);

  useEffect(() => {
    if (searchVal && searchVal != "ALL") {
      const reqData =
      retrieve?.length > 0 &&
        retrieve?.map((task, index) => {
          if (
            task.status == searchVal
          )
            return origData[index];
          return null;
        });
      setFilteredData(
        reqData.length > 0 &&
          reqData?.filter((task) => {
            if (task) return true;
            return false;
          })
      );
    } else {
      setFilteredData(origData);
    }
  }, [searchVal, origData]);

  return { filteredData, loading };
};

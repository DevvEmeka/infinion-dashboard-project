import React, { useEffect, useState } from "react";
import axios from "axios";

const userDataFetcher = () => {
  const API_URL =
    "https://infinion-test-int-test.azurewebsites.net/api/Campaign";
  const totalPages = 300;
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Ensure loading state is set
      const page = Math.min(currentPage + 1, totalPages);
      try {
        const result = await axios.get(`${API_URL}?page=${page}`);
        setPages(result.data); // Assuming result.data contains the pages array
        console.log(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading is false after fetch (whether success or error)
      }
    };
    fetchData();
  }, [currentPage]); // Dependency array ensures fetch is called when `currentPage` changes

  return {
    loading,
    pages,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default userDataFetcher;

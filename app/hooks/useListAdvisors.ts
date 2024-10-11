'use client'

import { useCallback, useMemo, useState } from "react";
import { AdvisorSort, type Advisor } from "../types";
import { config } from "../config/config-app";

interface Props {
  data: Advisor[]
}

const useListAdvisors = ({ data }: Props) => {
  
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortConfig, setSortConfig] = useState<{ 
      key: keyof AdvisorSort; direction: 'ascending' 
      | 'descending' }>({ key: 'name', direction: 'ascending' 
  })
  
  const itemsPerPage = +config.paginationPerPage
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
    })
  }, [data, sortConfig])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem)


  const requestSort = useCallback((key: keyof AdvisorSort) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }, [sortConfig])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  };

  return {
    currentItems,
    totalPages,
    sortConfig,
    currentPage,
    handlePageChange,
    requestSort,
  }
}
export default useListAdvisors